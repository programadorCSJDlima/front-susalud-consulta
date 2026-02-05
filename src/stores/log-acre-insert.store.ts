import { defineStore } from 'pinia'
import type { ConsultaAsegNomDetalle } from './consulta-aseg-nom.store'
import type { NumAutorizacionDoc } from './num-autorizacion.store'
import { DEFAULT_CONSULTA_NOM_CO_IAFA } from './util-inputs.store'

export type LogAcreInsertPayload = {
  NoTransaccion: string
  IdRemitente: string
  IdReceptor: string
  FeTransaccion: string
  HoTransaccion: string
  IdCorrelativo: string
  IdTransaccion: string
  TiFinalidad: string
  CaRemitente: string
  NuRucRemitente: string
  CaReceptor: string
  CoAdmisionista: string
  CaPaciente: string
  ApPaternoPaciente: string
  NoPaciente: string
  CoAfPaciente: string
  ApMaternoPaciente: string
  CoEsPaciente: string
  TiDoPaciente: string
  NuDoPaciente: string
  NuContratoPaciente: string
  CoTiPolizaAfiliacion: string
  CoProducto: string
  NuPlan: string
  CoParentesco: string
  FeNacimiento: string
  Genero: string
  FeIniVigencia: string
  NuCobertura: string
  DeCobertura: string
  CaContratante: string
  TiDoContratante: string
  IdReContratante: string
  RucContratante: string
  CoAfiliadoTitular: string
  CaResponsableAut: string
  NoPaResponsableAut: string
  NoResponsableAut: string
  NoMaResponsableAut: string
  TiDoResponsableAut: string
  NuDoResponsableAut: string
  NuAutorizacion: string
  FeHoAutorizacion: string
  BeMaxInicial: string
  CoPagoFijo: string
  CoPagoVariable: string
  FlagCartaGarantia: string
  DeFlagCartaGarantia: string
}

const initialPayload: LogAcreInsertPayload = {
  NoTransaccion: '271_LOG_ACRE_INSERT',
  IdRemitente: '00008786',
  IdReceptor: DEFAULT_CONSULTA_NOM_CO_IAFA,
  FeTransaccion: getFechaActual(), // FECHA sistema
  HoTransaccion: getHoraActual(),  // HORA sistema
  IdCorrelativo: '01',
  IdTransaccion: '271',
  TiFinalidad: '13',
  CaRemitente: '2',
  NuRucRemitente: '20144442629',
  CaReceptor: '2',
  CoAdmisionista: 'ADM123',
  CaPaciente: '1',
  ApPaternoPaciente: 'SUAREZ',
  NoPaciente: 'JUAN CARLOS',
  CoAfPaciente: '13660',
  ApMaternoPaciente: '',
  CoEsPaciente: '6',
  TiDoPaciente: '1',
  NuDoPaciente: '44960708',
  NuContratoPaciente: '466099',
  CoTiPolizaAfiliacion: '',
  CoProducto: 'R',
  NuPlan: '20',
  CoParentesco: '01',
  FeNacimiento: '19961104',
  Genero: '1',
  FeIniVigencia: '20040701',
  NuCobertura: '4',
  DeCobertura: '2',
  CaContratante: '1',
  TiDoContratante: '2',
  IdReContratante: 'XX5',
  RucContratante: '20144442629',
  CoAfiliadoTitular: '13660',
  CaResponsableAut: '1',
  NoPaResponsableAut: 'LA TORRE',
  NoResponsableAut: 'NORMA CECILIA',
  NoMaResponsableAut: '',
  TiDoResponsableAut: '',
  NuDoResponsableAut: '',
  NuAutorizacion: '',
  FeHoAutorizacion: getFechaHoraActual(), //FECHA Y HORA EN FORMATO CCYYMMDDHHMM
  BeMaxInicial: '50',
  CoPagoFijo: '60',
  CoPagoVariable: '0.50',
  FlagCartaGarantia: '0',
  DeFlagCartaGarantia: '',
}

export const useLogAcreInsertStore = defineStore('logAcreInsert', {
  state: () => ({
    formData: { ...initialPayload } as LogAcreInsertPayload,
  }),
  actions: {
    reset() {
      Object.assign(this.formData, initialPayload)
      this.syncFechaHora()
      this.syncFechaHoraAutorizacion()
    },
    updateFromPaciente(paciente: (ConsultaAsegNomDetalle & { feIniVigencia?: string }) | null) {
      if (!paciente) return
      const fd = this.formData

      if (paciente.apPaternoPaciente) fd.ApPaternoPaciente = paciente.apPaternoPaciente
      if (paciente.noPaciente) fd.NoPaciente = paciente.noPaciente
      if (paciente.coAfPaciente) fd.CoAfPaciente = paciente.coAfPaciente
      if (paciente.apMaternoPaciente) fd.ApMaternoPaciente = paciente.apMaternoPaciente
      if (paciente.coEsPaciente) fd.CoEsPaciente = paciente.coEsPaciente
      if (paciente.tiDoPaciente) fd.TiDoPaciente = paciente.tiDoPaciente
      if (paciente.nuDoPaciente) fd.NuDoPaciente = paciente.nuDoPaciente
      if (paciente.nuContratoPaciente) fd.NuContratoPaciente = paciente.nuContratoPaciente
      if (paciente.coProducto) fd.CoProducto = paciente.coProducto
      if (paciente.nuPlan) fd.NuPlan = paciente.nuPlan
      if (paciente.coParentesco) fd.CoParentesco = paciente.coParentesco
      if (paciente.feNacimiento) fd.FeNacimiento = paciente.feNacimiento
      if (paciente.genero) fd.Genero = paciente.genero
      if (paciente.feIniVigencia) fd.FeIniVigencia = paciente.feIniVigencia
      if (paciente.tiDoContratante) fd.TiDoContratante = paciente.tiDoContratante
      if (paciente.idReContratante) fd.IdReContratante = paciente.idReContratante
      if (paciente.coReContratante) fd.RucContratante = paciente.coReContratante
      if (paciente.coAfPaciente) fd.CoAfiliadoTitular = paciente.coAfPaciente
      if (paciente.caPaciente) fd.CaPaciente = paciente.caPaciente
      if (paciente.noPaContratante) fd.NoPaResponsableAut = paciente.noPaContratante
      if (paciente.noContratante) fd.NoResponsableAut = paciente.noContratante
      if (paciente.noMaContratante) fd.NoMaResponsableAut = paciente.noMaContratante
    },
    updateFromResAut(docs: NumAutorizacionDoc[] | null | undefined) {
      if (!docs?.length) {
        this.formData.NuAutorizacion = ''
        return
      }
      const doc = docs[0]
      this.formData.NuAutorizacion = doc.nuAutorizacion || ''
    },
    setIdReceptorFromUtil(value: string) {
      this.formData.IdReceptor = value || DEFAULT_CONSULTA_NOM_CO_IAFA
    },
    syncFechaHora() {
      this.formData.FeTransaccion = getFechaActual()
      this.formData.HoTransaccion = getHoraActual()
    },
    syncFechaHoraAutorizacion() {
      this.formData.FeHoAutorizacion = getFechaHoraActual()
    },
    clearNumAutorizacion() {
      this.formData.NuAutorizacion = ''
    },
  },
})

function getFechaActual() {
  const hoy = new Date()
  const yyyy = hoy.getFullYear()
  const mm = String(hoy.getMonth() + 1).padStart(2, '0')
  const dd = String(hoy.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

function getHoraActual() {
  const hoy = new Date()
  const HH = String(hoy.getHours()).padStart(2, '0')
  const MM = String(hoy.getMinutes()).padStart(2, '0')
  const SS = String(hoy.getSeconds()).padStart(2, '0')
  return `${HH}${MM}${SS}`
}

function getFechaHoraActual() {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const HH = String(now.getHours()).padStart(2, '0')
  const MM = String(now.getMinutes()).padStart(2, '0')
  return `${yyyy}${mm}${dd}${HH}${MM}`
}
