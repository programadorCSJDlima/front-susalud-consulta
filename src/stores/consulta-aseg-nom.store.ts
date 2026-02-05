import { defineStore } from 'pinia'
import { apiClient } from '../services/apiClient'

export type ConsultaAsegNomPayload = {
  coExcepcion: string
  txNombre: string
  coIafa: string
  apatern: string
  amatern: string
  name: string
  tiDoPaciente: string
  nuDoPaciente: string
}

export type ConsultaAsegNomDetalle = {
  caPaciente: string
  apPaternoPaciente: string
  noPaciente: string
  coAfPaciente: string
  apMaternoPaciente: string
  coEsPaciente: string
  tiDoPaciente: string
  nuDoPaciente: string
  nuContratoPaciente: string
  coProducto: string
  coDescripcion: string
  nuSCTR: string
  coParentesco: string
  nuPlan: string
  feNacimiento: string
  genero: string
  esMarital: string
  tiCaContratante: string
  noPaContratante: string
  noContratante: string
  noMaContratante: string
  tiDoContratante: string
  idReContratante: string
  coReContratante: string
}

export type ConsultaAsegNomDoc = {
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  tiFinalidad: string
  caRemitente: string
  caReceptor: string
  nuRucReceptor: string | null
  inConNom271Detalles: ConsultaAsegNomDetalle[]
  nuControl: string | null
  nuControlST: string | null
  detalles?: ConsultaAsegNomDetalle[]
}

export type ConsultaAsegNomResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultNomDoc: ConsultaAsegNomDoc[]
}

const getDetalleList = (doc: ConsultaAsegNomDoc) =>
  doc.inConNom271Detalles?.length ? doc.inConNom271Detalles : doc.detalles || []

const sampleResponse: ConsultaAsegNomResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txRespuesta:
    '',
  resultNomDoc: [
   
  ],
}

type PersistedConsultaAsegNomState = {
  response: ConsultaAsegNomResponse | null
  datosPaciente: ConsultaAsegNomDetalle | null
  lastPayload: ConsultaAsegNomPayload | null
}

const STORAGE_KEY = 'consultaAsegNomStore'

const loadPersistedState = (): PersistedConsultaAsegNomState | null => {
  if (typeof window === 'undefined') {
    return null
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as PersistedConsultaAsegNomState) : null
  } catch {
    return null
  }
}

const persistStoreState = (state: PersistedConsultaAsegNomState) => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignorar errores de almacenamiento para no romper el flujo
  }
}

const fallbackDatosPaciente =
  sampleResponse.resultNomDoc?.length && getDetalleList(sampleResponse.resultNomDoc[0]).length
    ? getDetalleList(sampleResponse.resultNomDoc[0])[0]
    : null

const getFallbackState = (): PersistedConsultaAsegNomState => ({
  response: sampleResponse as ConsultaAsegNomResponse | null,
  datosPaciente: fallbackDatosPaciente,
  lastPayload: null,
})

const initialPersistedState = loadPersistedState() || getFallbackState()

export const useConsultaAsegNomStore = defineStore('consultaAsegNom', {
  state: () => ({
    response: initialPersistedState.response,
    loading: false,
    error: null as string | null,
    lastPayload: initialPersistedState.lastPayload,
    datosPaciente: initialPersistedState.datosPaciente,
  }),
  actions: {
    persistirEstado() {
      persistStoreState({
        response: this.response,
        datosPaciente: this.datosPaciente,
        lastPayload: this.lastPayload,
      })
    },
    seleccionarPaciente(docIndex: number, detalleIndex = 0) {
      if (!this.response?.resultNomDoc?.length) {
        this.datosPaciente = null
        this.persistirEstado()
        return
      }

      const doc = this.response.resultNomDoc[docIndex]
      if (!doc) {
        this.datosPaciente = null
        this.persistirEstado()
        return
      }

      const detalles = getDetalleList(doc)
      this.datosPaciente = detalles[detalleIndex] || detalles[0] || null
      this.persistirEstado()
    },
    async consultarPorNombre(payload: ConsultaAsegNomPayload) {
      if (!payload.apatern.trim() && (!payload.tiDoPaciente.trim() || !payload.nuDoPaciente.trim())) {
        this.error = 'Si no se envia apatern, tiDoPaciente y nuDoPaciente son obligatorios.'
        return
      }

      this.loading = true
      this.error = null
      this.response = null
      this.lastPayload = { ...payload }
      this.persistirEstado()

      try {
        const data = await apiClient.post<ConsultaAsegNomResponse>('/consultarAseguradoxNom', payload)
        this.response = data
        if (data?.resultNomDoc?.length) {
          this.seleccionarPaciente(0, 0)
        } else {
          this.datosPaciente = null
          this.persistirEstado()
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error desconocido'
      } finally {
        this.loading = false
      }
    },
  },
})
