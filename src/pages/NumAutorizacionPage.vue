<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { apiClient } from '../services/apiClient'
import { useConsultaAsegNomStore, type ConsultaAsegNomDetalle } from '../stores/consulta-aseg-nom.store'
import { useConsultaAsegCodStore } from '../stores/consulta-aseg-cod.store'
import { useNumAutorizacionStore } from '../stores/num-autorizacion.store'
import { useLogAcreInsertStore } from '../stores/log-acre-insert.store'
import { useUtilInputsStore } from '../stores/util-inputs.store'
import { useToast } from 'vue-toast-notification'

type NumAutorizacionPayload = {
  coExcepcion: string
  txNombre: string
  coIafa: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  coAdmisionista: string
  apPaternoPaciente: string
  noPaciente: string
  coAfPaciente: string
  apMaternoPaciente: string
  coEsPaciente: string
  tiDoPaciente: string
  nuDoPaciente: string
  nuIdenEmpleador: string
  nuContratoPaciente: string
  nuPoliza: string
  nuCertificado: string
  coTiPolizaAfiliacion: string
  coProducto: string
  deProducto: string
  nuPlan: string
  tiPlanSalud: string
  coMoneda: string
  coParentesco: string
  soBeneficio: string
  nuSoBeneficio: string
  coEspecialidad: string
  feNacimiento: string
  genero: string
  esMarital: string
  feIniVigencia: string
  feFinVigencia: string
  esCobertura: string
  nuDecAccidente: string
  idInfAccidente: string
  deTiAccidente: string
  feAfiliacion: string
  feOcuAccidente: string
  nuAtencion: string
  idDerFarmacia: string
  tiProducto: string
  deProductoDeFarmacia: string
  feAtencion: string
  nuCobertura: string
  obsCobertura: string
  msgObs: string
  msgConEspeciales: string
  caContratante: string
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
  idReTitular: string
  nuDoTitular: string
  feIncTitular: string
  nuCobPreExistencia: string
  beMaxInicial: string
  canServicio: string
  idDeProducto: string
  coTiCobertura: string
  coSubTiCobertura: string
  msgObsPre: string
  msgConEspecialesPre: string
  coTiMoneda: string
  coPagoFijo: string
  coCalServicio: string
  canCalServicio: string
  coPagoVariable: string
  flagCG: string
  deflagCG: string
  feFinCarencia: string
  feFinEspera: string
  caRegafi: string
  noPaRegafi: string
  noRegafi: string
  coAfRegafi: string
  noMaRegafi: string
  tiDoRegafi: string
  idReRegafi: string
  nuDoRegafi: string
  feNaRegafi: string
  geRegafi: string
  coPaisRegafi: string
}

type NumAutorizacionDoc = {
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  nuAutorizacion: string
  coSeguridad: string
  coError: string
  inCoErrorEncontrado: string
  nuControl: string | null
  nuControlST: string | null
}

type NumAutorizacionResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txtConsulta?: string
  txRespuesta: string
  resAut?: NumAutorizacionDoc[]
}

const endpoint = ref('/getNumAutorizacion')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)

const utilInputsStore = useUtilInputsStore()
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)

const consultaAsegNomStore = useConsultaAsegNomStore()
const numAutorizacionStore = useNumAutorizacionStore()
numAutorizacionStore.hydrateFromStorage()
const consultaAsegCodStore = useConsultaAsegCodStore()
const logAcreInsertStore = useLogAcreInsertStore()
const toast = useToast()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const currentPaciente = datosPaciente.value

const getFechaActual = () => {
  const hoy = new Date()
  const yyyy = hoy.getFullYear()
  const mm = String(hoy.getMonth() + 1).padStart(2, '0')
  const dd = String(hoy.getDate()).padStart(2, '0')
  return `${yyyy}${mm}${dd}`
}

const getHoraActual = () => {
  const hoy = new Date()
  const HH = String(hoy.getHours()).padStart(2, '0')
  const MM = String(hoy.getMinutes()).padStart(2, '0')
  const SS = String(hoy.getSeconds()).padStart(2, '0')
  return `${HH}${MM}${SS}`
}

const formData = reactive<NumAutorizacionPayload>({
  coExcepcion: '0000',
  txNombre: '271_SOL_AUT',
  coIafa: consultaNomCoIafa.value,
  idReceptor: consultaNomCoIafa.value,
  feTransaccion: getFechaActual(),
  hoTransaccion: getHoraActual(),
  coAdmisionista: 'UP_OFTALMOSALUD',
  
  apPaternoPaciente: currentPaciente?.apPaternoPaciente ?? '',
  noPaciente: currentPaciente?.noPaciente ?? '',
  coAfPaciente: currentPaciente?.coAfPaciente ?? '',
  apMaternoPaciente: currentPaciente?.apMaternoPaciente ?? '',
  coEsPaciente: currentPaciente?.coEsPaciente ?? '1', //vigente->
  tiDoPaciente: currentPaciente?.tiDoPaciente ?? '1',
  nuDoPaciente: currentPaciente?.nuDoPaciente ?? '',
  nuIdenEmpleador:currentPaciente?.coReContratante??'', //ruc o dni del contratante->
  nuContratoPaciente:currentPaciente?.nuContratoPaciente??'', //contrato paciente->
  nuPoliza: '', //poliza-->se pide nunca se envia vacio
  nuCertificado: '',
  coTiPolizaAfiliacion: '1',
  coProducto: currentPaciente?.coProducto ?? '',
  deProducto: currentPaciente?.coDescripcion ?? '',
  nuPlan: currentPaciente?.nuPlan ?? '',
  tiPlanSalud: '', //tipo de planse pide nunca se envia vacio
  coMoneda: '', //tipo de planse pide nunca se envia vacio
  coParentesco: '', //tipo de planse pide nunca se envia vacio
  soBeneficio: '', //-> nopide toast
  nuSoBeneficio: '', //-> no pide toast
  coEspecialidad: currentPaciente?.coEsPaciente ?? '',
  feNacimiento: currentPaciente?.feNacimiento ?? '',
  genero: currentPaciente?.genero ?? '',
  esMarital:currentPaciente?.esMarital ?? '',
  feIniVigencia: getFechaActual(), 
  feFinVigencia: '',
  //acctidente
  esCobertura: '1', //nose de donde viene
  nuDecAccidente: '',
  idInfAccidente: '',
  deTiAccidente: '',
  feAfiliacion: '',
  feOcuAccidente: '',
  //derivacion farmacia
  nuAtencion: '',
  idDerFarmacia: '',
  tiProducto: '',
  deProductoDeFarmacia: '',
  feAtencion: '',
  //cobertura
  nuCobertura: '4',
  obsCobertura: '',
  msgObs: '',
  msgConEspeciales: '',

  // contratante
  caContratante: '2',
  noPaContratante: currentPaciente?.noPaContratante ?? '',
  noContratante: currentPaciente?.noContratante ?? '',
  noMaContratante: currentPaciente?.noMaContratante ?? '',
  tiDoContratante: currentPaciente?.tiDoContratante ?? '1',
  idReContratante: currentPaciente?.idReContratante ?? '',
  coReContratante: currentPaciente?.coReContratante ?? '',
  
  // titular
  caTitular: '', //->
  noPaTitular: '', //->
  noTitular: '', //->
  coAfTitular: '', //->
  noMaTitular: '', //->
  tiDoTitular: '', //->
  idReTitular: 'XX5',
  nuDoTitular: '',
  feIncTitular: getFechaActual(),

  //Coberturas preexistencias
  nuCobPreExistencia: '4', //hc->
  beMaxInicial: '50', //->
  canServicio: '1', //->hc opc
  idDeProducto: '', //->
  coTiCobertura: '', //->
  coSubTiCobertura: '', //->
  msgObsPre: '',//puede Ir Vacio
  msgConEspecialesPre: '', //puede Ir Vacio
  coTiMoneda: '1', //->
  coPagoFijo: '60', //->
  coCalServicio: '', //->
  canCalServicio: '', //->
  coPagoVariable: '0.50', //->
  flagCG: '0', //->
  deflagCG: '', // puede ir vacio
  feFinCarencia: '', //puede irvacio
  feFinEspera: '', //puede ir vacio
  
  caRegafi: '1',
  noPaRegafi: currentPaciente?.apPaternoPaciente ?? '',
  noRegafi: currentPaciente?.noPaciente ?? '',
  coAfRegafi: currentPaciente?.coAfPaciente ?? '',
  noMaRegafi: currentPaciente?.apMaternoPaciente ?? '',
  tiDoRegafi: currentPaciente?.tiDoPaciente ?? '1',
  idReRegafi: currentPaciente?.idReContratante ?? '',
  nuDoRegafi: currentPaciente?.nuDoPaciente ?? '',
  feNaRegafi: currentPaciente?.feNacimiento ?? '',
  geRegafi: '',
  coPaisRegafi: '',
})

const populateFormFromPaciente = (paciente: ConsultaAsegNomDetalle | null) => {
  if (!paciente) {
    return
  }
  formData.apPaternoPaciente = paciente.apPaternoPaciente ?? formData.apPaternoPaciente
  formData.apMaternoPaciente = paciente.apMaternoPaciente ?? ''
  formData.noPaciente = paciente.noPaciente ?? formData.noPaciente
  formData.coAfPaciente = paciente.coAfPaciente ?? formData.coAfPaciente
  formData.coEsPaciente = paciente.coEsPaciente ?? formData.coEsPaciente
  formData.tiDoPaciente = paciente.tiDoPaciente ?? formData.tiDoPaciente
  formData.nuDoPaciente = paciente.nuDoPaciente ?? formData.nuDoPaciente
  formData.coProducto = paciente.coProducto ?? formData.coProducto
  formData.deProducto = paciente.coDescripcion ?? formData.deProducto
  formData.nuPlan = paciente.nuPlan ?? formData.nuPlan
  formData.coEspecialidad = paciente.coEsPaciente ?? formData.coEspecialidad
  formData.feNacimiento = paciente.feNacimiento ?? formData.feNacimiento
  formData.noPaContratante = paciente.noPaContratante ?? formData.noPaContratante
  formData.noContratante = paciente.noContratante ?? formData.noContratante
  formData.noMaContratante = paciente.noMaContratante ?? formData.noMaContratante
  formData.tiDoContratante = paciente.tiDoContratante ?? formData.tiDoContratante
  formData.idReContratante = paciente.idReContratante ?? formData.idReContratante
  formData.coReContratante = paciente.coReContratante ?? formData.coReContratante
  formData.noPaRegafi = paciente.apPaternoPaciente ?? formData.noPaRegafi
  formData.noRegafi = paciente.noPaciente ?? formData.noRegafi
  formData.coAfRegafi = paciente.coAfPaciente ?? formData.coAfRegafi
  formData.noMaRegafi = paciente.apMaternoPaciente ?? formData.noMaRegafi
  formData.tiDoRegafi = paciente.tiDoPaciente ?? formData.tiDoRegafi
  formData.idReRegafi = paciente.idReContratante ?? formData.idReRegafi
  formData.nuDoRegafi = paciente.nuDoPaciente ?? formData.nuDoRegafi
  formData.feNaRegafi = paciente.feNacimiento ?? formData.feNaRegafi
}

populateFormFromPaciente(currentPaciente || null)

watch(datosPaciente, paciente => {
  populateFormFromPaciente(paciente || null)
})

watch(
  () => formData.coIafa,
  value => {
    if (value !== consultaNomCoIafa.value) {
      utilInputsStore.setConsultaNomCoIafa(value)
    }
    formData.idReceptor = value
  }
)

watch(consultaNomCoIafa, value => {
  if (value !== formData.coIafa) {
    formData.coIafa = value
  }
  formData.idReceptor = value
})

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.nuPoliza,
  value => {
    if (value) {
      formData.nuPoliza = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.tiPlanSalud,
  value => {
    if (value) {
      formData.tiPlanSalud = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.coParentesco,
  value => {
    if (value) {
      formData.coParentesco = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.coMoneda,
  value => {
    if (value) {
      formData.coMoneda = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.soBeneficio,
  value => {
    if (value) {
      formData.soBeneficio = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.nuSoBeneficio,
  value => {
    if (value) {
      formData.nuSoBeneficio = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.numCobertura ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.nuCobertura,
  value => {
    if (value) {
      formData.nuCobertura = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.caTitular,
  value => {
    if (value) {
      formData.caTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.noPaTitular,
  value => {
    if (value) {
      formData.noPaTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.noTitular,
  value => {
    if (value) {
      formData.noTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.coAfTitular,
  value => {
    if (value) {
      formData.coAfTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.noMaTitular,
  value => {
    if (value) {
      formData.noMaTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.tiDoTitular,
  value => {
    if (value) {
      formData.tiDoTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.nuDoTitular,
  value => {
    if (value) {
      formData.nuDoTitular = value
    }
  },
  { immediate: true }
)

watch(
  () => consultaAsegCodStore.response?.resultCod?.[0]?.feInsTitular,
  value => {
    if (value) {
      formData.feIncTitular = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.beMaxInicial ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.beMaxInicial,
  value => {
    if (value) {
      formData.beMaxInicial = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.idProducto ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.idProducto,
  value => {
    if (value) {
      formData.idDeProducto = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coTiCobertura ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coTiCobertura,
  value => {
    if (value) {
      formData.coTiCobertura = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coSubTiCobertura ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coSubTiCobertura,
  value => {
    if (value) {
      formData.coSubTiCobertura = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coTiMoneda ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coTiMoneda,
  value => {
    if (value) {
      formData.coTiMoneda = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coPagoFijo ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coPagoFijo,
  value => {
    if (value) {
      formData.coPagoFijo = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coCalServicio ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coCalServicio,
  value => {
    if (value) {
      formData.coCalServicio = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.canCalServicio ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.canCalServicio,
  value => {
    if (value) {
      formData.canCalServicio = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.coPagoVariable ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.coPagoVariable,
  value => {
    if (value) {
      formData.coPagoVariable = value
    }
  },
  { immediate: true }
)

watch(
  () =>
    consultaAsegCodStore.response?.resultCod?.[0]?.detalles?.[0]?.flagCartaGarantia ??
    consultaAsegCodStore.response?.resultCod?.[0]?.inConCod271Detalles?.[0]?.flagCaGarantia,
  value => {
    if (value) {
      formData.flagCG = value
    }
  },
  { immediate: true }
)

const sampleResponse: NumAutorizacionResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txtConsulta:
    '',
  txRespuesta:
    '',
  resAut: [

  ],
}

const responseData = ref<NumAutorizacionResponse | null>(sampleResponse)

const syncFechaHora = () => {
  formData.feTransaccion = getFechaActual()
  formData.hoTransaccion = getHoraActual()
}

let fechaHoraInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  syncFechaHora()
  fechaHoraInterval = setInterval(syncFechaHora, 1000)
})

onUnmounted(() => {
  if (fechaHoraInterval) {
    clearInterval(fechaHoraInterval)
    fechaHoraInterval = null
  }
})

const enviarConsulta = async () => {
  if (!formData.nuPoliza.trim()) {
    const msg = 'Debe contar con un número de póliza antes de registrar.'
    toast.error(msg)
    error.value = msg
    return
  }
  if (!formData.tiPlanSalud.trim()) {
    const msg = 'Debe contar con un tipo de plan de salud antes de registrar.'
    toast.error(msg)
    error.value = msg
    return
  }
  if (!formData.coParentesco.trim()) {
    const msg = 'Debe contar con un grado de parentesco antes de registrar.'
    toast.error(msg)
    error.value = msg
    return
  }
  if (!formData.coMoneda.trim()) {
    const msg = 'Debe contar con un tipo de moneda antes de registrar.'
    toast.error(msg)
    error.value = msg
    return
  }
  syncFechaHora()
  responseData.value = null
  loading.value = true
  error.value = null
  expandedDocIndex.value = null
  numAutorizacionStore.reset()
  logAcreInsertStore.updateFromPaciente(datosPaciente.value || null)
  try {
    const data = await apiClient.post<NumAutorizacionResponse>(endpoint.value, formData)
    responseData.value = data
    numAutorizacionStore.setResAut(data.resAut)
    logAcreInsertStore.updateFromResAut(data.resAut)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
    responseData.value = null
    numAutorizacionStore.reset()
  } finally {
    loading.value = false
  }
}

const toggleDetalles = (index: number) => {
  expandedDocIndex.value = expandedDocIndex.value === index ? null : index
}
</script>

<template>
  <section class="module-view">
    <h1>NumAutorizacion</h1>
    <p class="muted">
      Consulta número de autorización
      <!-- <code>{{ endpoint }}</code>. La respuesta se muestra en el resumen y la tabla. -->
    </p>

    <div class="card-grid">
      <div class="api-box">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>coExcepcion</td><td><input v-model="formData.coExcepcion" class="input" /></td></tr>
              <tr><td>txNombre</td><td><input v-model="formData.txNombre" class="input" /></td></tr>
              <tr><td>coIafa</td><td><input v-model="formData.coIafa" class="input" /></td></tr>
              <tr><td>idReceptor</td><td><input v-model="formData.idReceptor" class="input" /></td></tr>
              <tr><td>feTransaccion</td><td><input v-model="formData.feTransaccion" class="input" /></td></tr>
              <tr><td>hoTransaccion</td><td><input v-model="formData.hoTransaccion" class="input" /></td></tr>
              <tr><td>coAdmisionista</td><td><input v-model="formData.coAdmisionista" class="input" /></td></tr>
              <tr><td>apPaternoPaciente</td><td><input v-model="formData.apPaternoPaciente" class="input" /></td></tr>
              <tr><td>apMaternoPaciente</td><td><input v-model="formData.apMaternoPaciente" class="input" /></td></tr>
              <tr><td>noPaciente</td><td><input v-model="formData.noPaciente" class="input" /></td></tr>
              <tr><td>coAfPaciente</td><td><input v-model="formData.coAfPaciente" class="input" /></td></tr>
              <tr><td>coEsPaciente</td><td><input v-model="formData.coEsPaciente" class="input" /></td></tr>
              <tr><td>tiDoPaciente</td><td><input v-model="formData.tiDoPaciente" class="input" /></td></tr>
              <tr><td>nuDoPaciente</td><td><input v-model="formData.nuDoPaciente" class="input" /></td></tr>
              <tr><td>nuIdenEmpleador</td><td><input v-model="formData.nuIdenEmpleador" class="input" /></td></tr>
              <tr><td>nuContratoPaciente</td><td><input v-model="formData.nuContratoPaciente" class="input" /></td></tr>
              <tr><td>nuPoliza</td><td><input v-model="formData.nuPoliza" class="input" /></td></tr>
              <tr><td>nuCertificado</td><td><input v-model="formData.nuCertificado" class="input" /></td></tr>
              <tr><td>coTiPolizaAfiliacion</td><td><input v-model="formData.coTiPolizaAfiliacion" class="input" /></td></tr>
              <tr><td>coProducto</td><td><input v-model="formData.coProducto" class="input" /></td></tr>
              <tr><td>deProducto</td><td><input v-model="formData.deProducto" class="input" /></td></tr>
              <tr><td>nuPlan</td><td><input v-model="formData.nuPlan" class="input" /></td></tr>
              <tr><td>tiPlanSalud</td><td><input v-model="formData.tiPlanSalud" class="input" /></td></tr>
              <tr><td>coMoneda</td><td><input v-model="formData.coMoneda" class="input" /></td></tr>
              <tr><td>coParentesco</td><td><input v-model="formData.coParentesco" class="input" /></td></tr>
              <tr><td>soBeneficio</td><td><input v-model="formData.soBeneficio" class="input" /></td></tr>
              <tr><td>nuSoBeneficio</td><td><input v-model="formData.nuSoBeneficio" class="input" /></td></tr>
              <tr><td>coEspecialidad</td><td><input v-model="formData.coEspecialidad" class="input" /></td></tr>
              <tr><td>feNacimiento</td><td><input v-model="formData.feNacimiento" class="input" /></td></tr>
              <tr><td>genero</td><td><input v-model="formData.genero" class="input" /></td></tr>
              <tr><td>esMarital</td><td><input v-model="formData.esMarital" class="input" /></td></tr>
              <tr><td>feIniVigencia</td><td><input v-model="formData.feIniVigencia" class="input" /></td></tr>
              <tr><td>feFinVigencia</td><td><input v-model="formData.feFinVigencia" class="input" /></td></tr>
              <tr><td>esCobertura</td><td><input v-model="formData.esCobertura" class="input" /></td></tr>
              <tr><td>nuDecAccidente</td><td><input v-model="formData.nuDecAccidente" class="input" /></td></tr>
              <tr><td>idInfAccidente</td><td><input v-model="formData.idInfAccidente" class="input" /></td></tr>
              <tr><td>deTiAccidente</td><td><input v-model="formData.deTiAccidente" class="input" /></td></tr>
              <tr><td>feAfiliacion</td><td><input v-model="formData.feAfiliacion" class="input" /></td></tr>
              <tr><td>feOcuAccidente</td><td><input v-model="formData.feOcuAccidente" class="input" /></td></tr>
              <tr><td>nuAtencion</td><td><input v-model="formData.nuAtencion" class="input" /></td></tr>
              <tr><td>idDerFarmacia</td><td><input v-model="formData.idDerFarmacia" class="input" /></td></tr>
              <tr><td>tiProducto</td><td><input v-model="formData.tiProducto" class="input" /></td></tr>
              <tr><td>deProductoDeFarmacia</td><td><input v-model="formData.deProductoDeFarmacia" class="input" /></td></tr>
              <tr><td>feAtencion</td><td><input v-model="formData.feAtencion" class="input" /></td></tr>
              <tr><td>nuCobertura</td><td><input v-model="formData.nuCobertura" class="input" /></td></tr>
              <tr><td>obsCobertura</td><td><input v-model="formData.obsCobertura" class="input" /></td></tr>
              <tr><td>msgObs</td><td><input v-model="formData.msgObs" class="input" /></td></tr>
              <tr><td>msgConEspeciales</td><td><input v-model="formData.msgConEspeciales" class="input" /></td></tr>
              <tr><td>caContratante</td><td><input v-model="formData.caContratante" class="input" /></td></tr>
              <tr><td>noPaContratante</td><td><input v-model="formData.noPaContratante" class="input" /></td></tr>
              <tr><td>noContratante</td><td><input v-model="formData.noContratante" class="input" /></td></tr>
              <tr><td>noMaContratante</td><td><input v-model="formData.noMaContratante" class="input" /></td></tr>
              <tr><td>tiDoContratante</td><td><input v-model="formData.tiDoContratante" class="input" /></td></tr>
              <tr><td>idReContratante</td><td><input v-model="formData.idReContratante" class="input" /></td></tr>
              <tr><td>coReContratante</td><td><input v-model="formData.coReContratante" class="input" /></td></tr>
              <tr><td>caTitular</td><td><input v-model="formData.caTitular" class="input" /></td></tr>
              <tr><td>noPaTitular</td><td><input v-model="formData.noPaTitular" class="input" /></td></tr>
              <tr><td>noTitular</td><td><input v-model="formData.noTitular" class="input" /></td></tr>
              <tr><td>coAfTitular</td><td><input v-model="formData.coAfTitular" class="input" /></td></tr>
              <tr><td>noMaTitular</td><td><input v-model="formData.noMaTitular" class="input" /></td></tr>
              <tr><td>tiDoTitular</td><td><input v-model="formData.tiDoTitular" class="input" /></td></tr>
              <tr><td>idReTitular</td><td><input v-model="formData.idReTitular" class="input" /></td></tr>
              <tr><td>nuDoTitular</td><td><input v-model="formData.nuDoTitular" class="input" /></td></tr>
              <tr><td>feIncTitular</td><td><input v-model="formData.feIncTitular" class="input" /></td></tr>
              <tr><td>nuCobPreExistencia</td><td><input v-model="formData.nuCobPreExistencia" class="input" /></td></tr>
              <tr><td>beMaxInicial</td><td><input v-model="formData.beMaxInicial" class="input" /></td></tr>
              <tr><td>canServicio</td><td><input v-model="formData.canServicio" class="input" /></td></tr>
              <tr><td>idDeProducto</td><td><input v-model="formData.idDeProducto" class="input" /></td></tr>
              <tr><td>coTiCobertura</td><td><input v-model="formData.coTiCobertura" class="input" /></td></tr>
              <tr><td>coSubTiCobertura</td><td><input v-model="formData.coSubTiCobertura" class="input" /></td></tr>
              <tr><td>msgObsPre</td><td><input v-model="formData.msgObsPre" class="input" /></td></tr>
              <tr><td>msgConEspecialesPre</td><td><input v-model="formData.msgConEspecialesPre" class="input" /></td></tr>
              <tr><td>coTiMoneda</td><td><input v-model="formData.coTiMoneda" class="input" /></td></tr>
              <tr><td>coPagoFijo</td><td><input v-model="formData.coPagoFijo" class="input" /></td></tr>
              <tr><td>coCalServicio</td><td><input v-model="formData.coCalServicio" class="input" /></td></tr>
              <tr><td>canCalServicio</td><td><input v-model="formData.canCalServicio" class="input" /></td></tr>
              <tr><td>coPagoVariable</td><td><input v-model="formData.coPagoVariable" class="input" /></td></tr>
              <tr><td>flagCG</td><td><input v-model="formData.flagCG" class="input" /></td></tr>
              <tr><td>deflagCG</td><td><input v-model="formData.deflagCG" class="input" /></td></tr>
              <tr><td>feFinCarencia</td><td><input v-model="formData.feFinCarencia" class="input" /></td></tr>
              <tr><td>feFinEspera</td><td><input v-model="formData.feFinEspera" class="input" /></td></tr>
              <tr><td>caRegafi</td><td><input v-model="formData.caRegafi" class="input" /></td></tr>
              <tr><td>noPaRegafi</td><td><input v-model="formData.noPaRegafi" class="input" /></td></tr>
              <tr><td>noRegafi</td><td><input v-model="formData.noRegafi" class="input" /></td></tr>
              <tr><td>coAfRegafi</td><td><input v-model="formData.coAfRegafi" class="input" /></td></tr>
              <tr><td>noMaRegafi</td><td><input v-model="formData.noMaRegafi" class="input" /></td></tr>
              <tr><td>tiDoRegafi</td><td><input v-model="formData.tiDoRegafi" class="input" /></td></tr>
              <tr><td>idReRegafi</td><td><input v-model="formData.idReRegafi" class="input" /></td></tr>
              <tr><td>nuDoRegafi</td><td><input v-model="formData.nuDoRegafi" class="input" /></td></tr>
              <tr><td>feNaRegafi</td><td><input v-model="formData.feNaRegafi" class="input" /></td></tr>
              <tr><td>geRegafi</td><td><input v-model="formData.geRegafi" class="input" /></td></tr>
              <tr><td>coPaisRegafi</td><td><input v-model="formData.coPaisRegafi" class="input" /></td></tr>
            </tbody>
          </table>
        </div>

        <div class="actions">
          <button class="btn" type="button" :disabled="loading" @click="enviarConsulta">
            {{ loading ? 'Consultando...' : 'Consultar' }}
          </button>
        </div>

        <p v-if="error" class="error-text">Error: {{ error }}</p>
      </div>

      <div class="api-box">
        <div class="box-header">
          <p class="muted small">Respuesta</p>
          <p class="muted small">Se actualiza tras cada consulta</p>
        </div>

        <div v-if="responseData?.txtConsulta && !error" class="output">
          <p class="muted small">txtConsulta (EDI enviado)</p>
          <pre class="code-block">{{ responseData.txtConsulta }}</pre>
        </div>

        <div v-if="responseData && !error" class="summary-grid">
          <div class="summary-item">
            <p class="muted small">coError</p>
            <p class="summary-value">{{ responseData.coError }}</p>
          </div>
          <div class="summary-item">
            <p class="muted small">txNombre</p>
            <p class="summary-value">{{ responseData.txNombre }}</p>
          </div>
          <div class="summary-item">
            <p class="muted small">coIafa</p>
            <p class="summary-value">{{ responseData.coIafa }}</p>
          </div>
        </div>

        <div v-if="responseData && !error" class="output">
          <p class="muted small">txRespuesta (EDI crudo)</p>
          <pre class="code-block">{{ responseData.txRespuesta }}</pre>
        </div>

        <div class="table-wrapper response-table">
          <table class="data-table">
            <thead>
              <tr>
                <th>Transaccion</th>
                <th>Remitente</th>
                <th>Receptor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Correlativo</th>
                <th>IdTransaccion</th>
                <th>Num Autorizacion</th>
                <th>Error</th>
                <th>Error Encontrado</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.resAut?.length && !error">
              <template v-for="(doc, index) in responseData.resAut" :key="doc.idCorrelativo || index">
                <tr class="clickable-row" @click="toggleDetalles(index)">
                  <td>{{ doc.noTransaccion }}</td>
                  <td>{{ doc.idRemitente }}</td>
                  <td>{{ doc.idReceptor }}</td>
                  <td>{{ doc.feTransaccion }}</td>
                  <td>{{ doc.hoTransaccion }}</td>
                  <td>{{ doc.idCorrelativo }}</td>
                  <td>{{ doc.idTransaccion }}</td>
                  <td>{{ doc.nuAutorizacion }}</td>
                  <td>{{ doc.coError }}</td>
                  <td>{{ doc.inCoErrorEncontrado }}</td>
                  <td>1 registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="11">
                    <div class="table-wrapper response-table details-scroll">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Seguridad</th>
                            <th>Control</th>
                            <th>Control ST</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{ doc.coSeguridad || '-' }}</td>
                            <td>{{ doc.nuControl ?? '-' }}</td>
                            <td>{{ doc.nuControlST ?? '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="11" class="muted">Aun no hay datos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.clickable-row {
  cursor: pointer;
}

.details-scroll {
  max-height: 360px;
  overflow-y: auto;
}
</style>
