import { defineStore } from 'pinia'
import { apiClient } from '../services/apiClient'

export type ConsultaAsegCodPayload = {
  coExcepcion: string
  txNombre: string
  coIafa: string
  tipodocument: string
  document: string
  apPaterno: string
  apMaterno: string
  nombres: string
  coAfiliado: string
  coProducto: string
  deProducto: string
  coEspecialidad: string
  coParentesco: string
  nuPlan: string
  tiCaContratante: string
  noPaContratante: string
  noContratante: string
  noMaContratante: string
  tiDoContratante: string
  coReContratante: string
}

export type ConsultaAsegCodBeneficio = {
  infBeneficio: string
  nuCobertura: string
  beMaxInicial: string
  moCobertura: string
  coInRestriccion: string
  canServicio: string
  idProducto: string
  coTiCobertura: string
  coSubTiCobertura: string
  msgObs: string
  msgConEspeciales: string
  coTiMoneda: string
  coPagoFijo: string
  coCalServicio: string
  canCalServicio: string
  coPagoVariable: string
  flagCaGarantia: string
  deflagCaGarantia: string
  feFinCarencia: string
  feFinEspera: string
}

export type ConsultaAsegCodDoc = {
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  tiFinalidad: string
  caRemitente: string
  userRemitente: string
  passRemitente: string
  feUpFoto: string
  caReceptor: string
  nuRucReceptor: string
  caPaciente: string
  apPaternoPaciente: string
  noPaciente: string
  coAfPaciente: string
  apMaternoPaciente: string
  coEsPaciente: string
  tiDoPaciente: string
  nuDoPaciente: string
  nuIdenPaciente: string
  nuContratoPaciente: string
  nuPoliza: string
  nuCertificado: string
  coTiPoliza: string
  coProducto: string
  deProducto: string
  nuPlan: string
  tiPlanSalud: string
  coMoneda: string
  coParentesco: string
  soBeneficio: string
  nuSoBeneficio: string
  feNacimiento: string
  genero: string
  esMarital: string
  feIniVigencia: string
  feFinVigencia: string
  tiCaContratante: string
  noPaContratante: string
  noContratante: string
  noMaContratante: string
  tiDoContratante: string
  idReContratante: string
  coReContratante: string
  caTitular: string
  noPaTitular: string
  noTitular: string
  coAfTitular: string
  noMaTitular: string
  tiDoTitular: string
  nuDoTitular: string
  feInsTitular: string
  nuControl: string | null
  nuControlST: string | null
  inConCod271Detalles: ConsultaAsegCodBeneficio[]
}

export type ConsultaAsegCodResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultCod?: ConsultaAsegCodDoc[]
}

const sampleResponse: ConsultaAsegCodResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txRespuesta: '',
  resultCod: [],
}

type PersistedConsultaAsegCodState = {
  response: ConsultaAsegCodResponse | null
  lastPayload: ConsultaAsegCodPayload | null
  error: string | null
}

const STORAGE_KEY = 'consultaAsegCodStore'

const loadPersistedState = (): PersistedConsultaAsegCodState | null => {
  if (typeof window === 'undefined') {
    return null
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PersistedConsultaAsegCodState) : null
  } catch {
    return null
  }
}

const persistStoreState = (state: PersistedConsultaAsegCodState) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignorar errores de almacenamiento para no romper el flujo
  }
}

const getFallbackState = (): PersistedConsultaAsegCodState => ({
  response: sampleResponse,
  lastPayload: null,
  error: null,
})

const initialPersistedState = loadPersistedState() || getFallbackState()

export const useConsultaAsegCodStore = defineStore('consultaAsegCod', {
  state: () => ({
    response: initialPersistedState.response,
    loading: false,
    error: initialPersistedState.error,
    lastPayload: initialPersistedState.lastPayload,
  }),
  actions: {
    persistirEstado() {
      persistStoreState({
        response: this.response,
        lastPayload: this.lastPayload,
        error: this.error,
      })
    },
    async consultarPorCodigo(payload: ConsultaAsegCodPayload) {
      this.loading = true
      this.error = null
      this.response = null
      this.lastPayload = { ...payload }
      this.persistirEstado()
      try {
        const data = await apiClient.post<ConsultaAsegCodResponse>('/consultarAseguradoxCod', payload)
        this.response = data
        this.persistirEstado()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error desconocido'
        this.response = null
        this.persistirEstado()
      } finally {
        this.loading = false
      }
    },
  },
})
