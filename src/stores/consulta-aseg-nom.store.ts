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
  coError: '0000',
  txNombre: '271_CON_NOM',
  coIafa: '20028',
  txRespuesta:
    'ISA*00*          *00*          *ZZ*20028          *ZZ*00008786       *251210*1941*|*00501*000000001*0*T*:~GS*HB*20028          *00008786       *20251210*194159  *022625147*X *00501       ~ST*271*89055126 *                                   ~BHT*0022*11~HL*1           *            *20*1~NM1*PR *2*                                                            *                                   *                         *          *          *PI*20028               *  *   *                                                            ~HL*2           *1           *21*1~NM1*1P *2*                                                            *                                   *                         *          *          *FI*20563648202         *  *   *                                                            ~HL*3           *2           *22*0~NM1*IL *1*SUAREZ                                                      *JUAN CARLOS                        *                         *          *          *MI*13660               *  *   *LA TORRE                                                    ~REF*ACC*1                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :44960708            :   :                    :   :                    ~REF*CT *21668A1                                                                         *                                                                                ~REF*PRT*PS040                                                                           *INTEGRAL PLUS INDIVIDUAL                                                        *ZZ :                    :   :                    :   :                    ~REF*ZZ *5                                                                               *                                                                                ~REF*18 *21668A1                                                                         *                                                                                ~DMG*D8 *19870724                           *2*1*                    *  *   ~NM1*P5 *1*LA TORRE                                                    *NORMA CECILIA                      *                         *          *          *  *                    *  *   *SILVA                                                       ~REF*DD *1                                                                               *                                                                                *XX5:07411059            :   :                    :   :                    ~SE*19        *89055126 ~GE*1     *022625147~IEA*1    *000000001~',
  resultNomDoc: [
    {
      noTransaccion: '271_CON_NOM',
      idRemitente: '20028',
      idReceptor: '00008786',
      feTransaccion: '20251210',
      hoTransaccion: '194159',
      idCorrelativo: '000000001',
      idTransaccion: '271',
      tiFinalidad: '11',
      caRemitente: '2',
      caReceptor: '2',
      nuRucReceptor: '20563648202',
      inConNom271Detalles: [
        {
          caPaciente: '1',
          apPaternoPaciente: 'SUAREZ',
          noPaciente: 'JUAN CARLOS',
          coAfPaciente: '13660',
          apMaternoPaciente: 'LA TORRE',
          coEsPaciente: '1',
          tiDoPaciente: '1',
          nuDoPaciente: '44960708',
          nuContratoPaciente: '21668A1',
          coProducto: 'PS040',
          coDescripcion: 'INTEGRAL PLUS INDIVIDUAL',
          nuSCTR: '',
          coParentesco: '5',
          nuPlan: '21668A1',
          feNacimiento: '19870724',
          genero: '2',
          esMarital: '1',
          tiCaContratante: '1',
          noPaContratante: 'LA TORRE',
          noContratante: 'NORMA CECILIA',
          noMaContratante: 'SILVA',
          tiDoContratante: '1',
          idReContratante: 'XX5',
          coReContratante: '07411059',
        },
      ],
      nuControl: null,
      nuControlST: null,
      detalles: [
        {
          caPaciente: '1',
          apPaternoPaciente: 'SUAREZ',
          noPaciente: 'JUAN CARLOS',
          coAfPaciente: '13660',
          apMaternoPaciente: 'LA TORRE',
          coEsPaciente: '1',
          tiDoPaciente: '1',
          nuDoPaciente: '44960708',
          nuContratoPaciente: '21668A1',
          coProducto: 'PS040',
          coDescripcion: 'INTEGRAL PLUS INDIVIDUAL',
          nuSCTR: '',
          coParentesco: '5',
          nuPlan: '21668A1',
          feNacimiento: '19870724',
          genero: '2',
          esMarital: '1',
          tiCaContratante: '1',
          noPaContratante: 'LA TORRE',
          noContratante: 'NORMA CECILIA',
          noMaContratante: 'SILVA',
          tiDoContratante: '1',
          idReContratante: 'XX5',
          coReContratante: '07411059',
        },
      ],
    },
  ],
}

const initialDatosPaciente =
  sampleResponse.resultNomDoc?.length && getDetalleList(sampleResponse.resultNomDoc[0]).length
    ? getDetalleList(sampleResponse.resultNomDoc[0])[0]
    : null

export const useConsultaAsegNomStore = defineStore('consultaAsegNom', {
  state: () => ({
    response: sampleResponse as ConsultaAsegNomResponse | null,
    loading: false,
    error: null as string | null,
    lastPayload: null as ConsultaAsegNomPayload | null,
    datosPaciente: initialDatosPaciente as ConsultaAsegNomDetalle | null,
  }),
  actions: {
    seleccionarPaciente(docIndex: number, detalleIndex = 0) {
      if (!this.response?.resultNomDoc?.length) {
        this.datosPaciente = null
        return
      }

      const doc = this.response.resultNomDoc[docIndex]
      if (!doc) {
        this.datosPaciente = null
        return
      }

      const detalles = getDetalleList(doc)
      this.datosPaciente = detalles[detalleIndex] || detalles[0] || null
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

      try {
        const data = await apiClient.post<ConsultaAsegNomResponse>('/consultarAseguradoxNom', payload)
        this.response = data
        if (data?.resultNomDoc?.length) {
          this.seleccionarPaciente(0, 0)
        } else {
          this.datosPaciente = null
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error desconocido'
      } finally {
        this.loading = false
      }
    },
  },
})
