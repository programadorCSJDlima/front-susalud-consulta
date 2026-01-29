<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { apiClient } from '../services/apiClient'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'
import { useNumAutorizacionStore } from '../stores/num-autorizacion.store'
import { useLogAcreInsertStore } from '../stores/log-acre-insert.store'

type NumAutorizacionPayload = {
  coExcepcion: string
  txNombre: string
  coIafa: string
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  tiFinalidad: string
  caRemitente: string
  nuRucRemitente: string
  caReceptor: string
  coAdmisionista: string
  caPaciente: string
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

const consultaAsegNomStore = useConsultaAsegNomStore()
const numAutorizacionStore = useNumAutorizacionStore()
const logAcreInsertStore = useLogAcreInsertStore()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const formData = reactive<NumAutorizacionPayload>({
  coExcepcion: '0000',
  txNombre: '271_SOL_AUT',
  coIafa: '20028',
  noTransaccion: '271_SOL_AUT',
  idRemitente: '00008786',
  idReceptor: '20028',
  feTransaccion: '20250121',
  hoTransaccion: '102000',
  idCorrelativo: '0001',
  idTransaccion: '271',
  tiFinalidad: '13',
  caRemitente: '2',
  nuRucRemitente: '20144442629',
  caReceptor: '2',
  coAdmisionista: '',
  caPaciente: '1',
  apPaternoPaciente: 'SUAREZ',
  noPaciente: 'JUAN CARLOS',
  coAfPaciente: '13660',
  apMaternoPaciente: '',
  coEsPaciente: '',
  tiDoPaciente: '1',
  nuDoPaciente: '44960708',
  nuIdenEmpleador: '',
  nuContratoPaciente: '',
  nuPoliza: '',
  nuCertificado: '',
  coTiPolizaAfiliacion: '1',
  coProducto: 'PS040',
  deProducto: 'INTEGRAL PLUS INDIVIDUAL',
  nuPlan: '21668A1',
  tiPlanSalud: '',
  coMoneda: '1',
  coParentesco: '',
  soBeneficio: '',
  nuSoBeneficio: '',
  coEspecialidad: '',
  feNacimiento: '19870724',
  genero: '',
  esMarital: '',
  feIniVigencia: '20040701',
  feFinVigencia: '',
  esCobertura: '',
  nuDecAccidente: '',
  idInfAccidente: '',
  deTiAccidente: '',
  feAfiliacion: '',
  feOcuAccidente: '',
  nuAtencion: '',
  idDerFarmacia: '',
  tiProducto: '',
  deProductoDeFarmacia: '',
  feAtencion: '',
  nuCobertura: '4',
  obsCobertura: '',
  msgObs: '',
  msgConEspeciales: '',
  caContratante: '2',
  noPaContratante: 'LA TORRE',
  noContratante: 'NORMA CECILIA',
  noMaContratante: 'SILVA',
  tiDoContratante: '1',
  idReContratante: 'XX5',
  coReContratante: '07411059',
  caTitular: '',
  noPaTitular: '',
  noTitular: '',
  coAfTitular: '',
  noMaTitular: '',
  tiDoTitular: '',
  idReTitular: '',
  nuDoTitular: '',
  feIncTitular: '20040701',
  nuCobPreExistencia: '4',
  beMaxInicial: '50',
  canServicio: '1',
  idDeProducto: '',
  coTiCobertura: '4',
  coSubTiCobertura: '100',
  msgObsPre: '',
  msgConEspecialesPre: '',
  coTiMoneda: '1',
  coPagoFijo: '60',
  coCalServicio: 'Z3',
  canCalServicio: '',
  coPagoVariable: '0.50',
  flagCG: '0',
  deflagCG: '',
  feFinCarencia: '',
  feFinEspera: '',
  caRegafi: '1',
  noPaRegafi: 'SUAREZ',
  noRegafi: 'JUAN CARLOS',
  coAfRegafi: '13660',
  noMaRegafi: '',
  tiDoRegafi: '1',
  idReRegafi: 'XX5',
  nuDoRegafi: '44960708',
  feNaRegafi: '19870724',
  geRegafi: '',
  coPaisRegafi: '',
})

watch(
  datosPaciente,
  (paciente) => {
    if (!paciente) return

    if (paciente.feNacimiento) {
      formData.feNaRegafi = paciente.feNacimiento
      formData.feNacimiento = paciente.feNacimiento
    }
    if (paciente.nuDoPaciente) {
      formData.nuDoRegafi = paciente.nuDoPaciente
      formData.nuDoPaciente = paciente.nuDoPaciente
    }
    if (paciente.tiDoPaciente) {
      formData.tiDoRegafi = paciente.tiDoPaciente
      formData.tiDoPaciente = paciente.tiDoPaciente
    }
    if (paciente.coAfPaciente) {
      formData.coAfRegafi = paciente.coAfPaciente
      formData.coAfPaciente = paciente.coAfPaciente
    }
    if (paciente.noPaciente) {
      formData.noRegafi = paciente.noPaciente
      formData.noPaciente = paciente.noPaciente
    }
    if (paciente.apPaternoPaciente) {
      formData.noPaRegafi = paciente.apPaternoPaciente
      formData.apPaternoPaciente = paciente.apPaternoPaciente
    }
    if (paciente.idReContratante) {
      formData.idReRegafi = paciente.idReContratante
      formData.idReContratante = paciente.idReContratante
    }
    if (paciente.coReContratante) {
      formData.coReContratante = paciente.coReContratante
    }
    if (paciente.tiDoContratante) {
      formData.tiDoContratante = paciente.tiDoContratante
    }
    if (paciente.noMaContratante) {
      formData.noMaContratante = paciente.noMaContratante
    }
    if (paciente.noContratante) {
      formData.noContratante = paciente.noContratante
    }
    if (paciente.noPaContratante) {
      formData.noPaContratante = paciente.noPaContratante
    }
    if (paciente.coDescripcion) {
      formData.deProducto = paciente.coDescripcion
    }
    if (paciente.coProducto) {
      formData.coProducto = paciente.coProducto
    }
    if (paciente.apMaternoPaciente) {
      formData.apMaternoPaciente = paciente.apMaternoPaciente
    }
  },
  { immediate: true }
)

const sampleResponse: NumAutorizacionResponse = {
  coError: '0000',
  txNombre: '997_RES_AUT',
  coIafa: '20028',
  txtConsulta:
    'ISA*00*          *00*          *ZZ*20028          *ZZ*00008786       *251210*2316*|*00501*000000001*0*T*:~GS*FA*20028 ... (trama de consulta de ejemplo)',
  txRespuesta:
    'ISA*00*          *00*          *ZZ*20028          *ZZ*00008786       *251210*2316*|*00501*000000001*0*T*:~GS*FA*20028          *00008786       *20251210*231628  *046960512*X *00501       ~ST*997*16833427 *                                   ~AK1*PO*46960512 *000000360   ~AK2*997*16833427 *                                   ~AK5*A*001~AK9*A*1*1     *1     ~SE*7         *16833427 ~GE*1     *046960512~IEA*1    *000000001~',
  resAut: [
    {
      noTransaccion: '997_RES_AUT',
      idRemitente: '20028',
      idReceptor: '00008786',
      feTransaccion: '20251210',
      hoTransaccion: '231628',
      idCorrelativo: '000000001',
      idTransaccion: '997',
      nuAutorizacion: '000000360',
      coSeguridad: '',
      coError: 'A',
      inCoErrorEncontrado: '001',
      nuControl: null,
      nuControlST: null,
    },
  ],
}

const responseData = ref<NumAutorizacionResponse | null>(sampleResponse)

const enviarConsulta = async () => {
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
              <tr><td>noTransaccion</td><td><input v-model="formData.noTransaccion" class="input" /></td></tr>
              <tr><td>idRemitente</td><td><input v-model="formData.idRemitente" class="input" /></td></tr>
              <tr><td>idReceptor</td><td><input v-model="formData.idReceptor" class="input" /></td></tr>
              <tr><td>feTransaccion</td><td><input v-model="formData.feTransaccion" class="input" /></td></tr>
              <tr><td>hoTransaccion</td><td><input v-model="formData.hoTransaccion" class="input" /></td></tr>
              <tr><td>idCorrelativo</td><td><input v-model="formData.idCorrelativo" class="input" /></td></tr>
              <tr><td>idTransaccion</td><td><input v-model="formData.idTransaccion" class="input" /></td></tr>
              <tr><td>tiFinalidad</td><td><input v-model="formData.tiFinalidad" class="input" /></td></tr>
              <tr><td>caRemitente</td><td><input v-model="formData.caRemitente" class="input" /></td></tr>
              <tr><td>nuRucRemitente</td><td><input v-model="formData.nuRucRemitente" class="input" /></td></tr>
              <tr><td>caReceptor</td><td><input v-model="formData.caReceptor" class="input" /></td></tr>
              <tr><td>coAdmisionista</td><td><input v-model="formData.coAdmisionista" class="input" /></td></tr>
              <tr><td>caPaciente</td><td><input v-model="formData.caPaciente" class="input" /></td></tr>
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
