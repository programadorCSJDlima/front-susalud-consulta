<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'

type ConsultaAsegCodPayload = {
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

type ConsultaAsegCodBeneficio = {
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

type ConsultaAsegCodDoc = {
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

type ConsultaAsegCodResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultCod?: ConsultaAsegCodDoc[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/consultarAseguradoxCod')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)

const formData = reactive<ConsultaAsegCodPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: '20028',
  tipodocument: '1',
  document: '44960708',
  apPaterno: 'SUAREZ',
  apMaterno: '',
  nombres: 'JUAN CARLOS',
  coAfiliado: '13660',
  coProducto: 'PS040',
  deProducto: 'INTEGRAL PLUS INDIVIDUAL',
  coEspecialidad: '006',
  coParentesco: '5',
  nuPlan: '21668A1',
  tiCaContratante: '1',
  noPaContratante: 'LA TORRE',
  noContratante: 'NORMA CECILIA',
  noMaContratante: 'SILVA',
  tiDoContratante: '1',
  coReContratante: '07411059',
})

const sampleResponse: ConsultaAsegCodResponse = {
  coError: '0000',
  txNombre: '271_CON_COD',
  coIafa: '20028',
  txRespuesta: 'ISA*00*          *00*          *ZZ*20028 ... (truncado de ejemplo EDI)',
  resultCod: [
    {
      noTransaccion: '271_CON_COD',
      idRemitente: '20028',
      idReceptor: '00008786',
      feTransaccion: '20251210',
      hoTransaccion: '231645',
      idCorrelativo: '000000001',
      idTransaccion: '271',
      tiFinalidad: '11',
      caRemitente: '2',
      userRemitente: '',
      passRemitente: '',
      feUpFoto: '',
      caReceptor: '2',
      nuRucReceptor: '20563648202',
      caPaciente: '1',
      apPaternoPaciente: 'SUAREZ',
      noPaciente: 'JUAN CARLOS',
      coAfPaciente: '13660',
      apMaternoPaciente: 'LA TORRE',
      coEsPaciente: '1',
      tiDoPaciente: '1',
      nuDoPaciente: '44960708',
      nuIdenPaciente: '',
      nuContratoPaciente: '216681',
      nuPoliza: '21668',
      nuCertificado: '',
      coTiPoliza: '1',
      coProducto: 'PS040',
      deProducto: 'INTEGRAL PLUS INDIVIDUAL',
      nuPlan: '21668A1',
      tiPlanSalud: '3',
      coMoneda: '1',
      coParentesco: '5',
      soBeneficio: '',
      nuSoBeneficio: '',
      feNacimiento: '19870724',
      genero: '1',
      esMarital: '1',
      feIniVigencia: '20240507',
      feFinVigencia: '20260507',
      tiCaContratante: '1',
      noPaContratante: 'LA TORRE',
      noContratante: 'NORMA CECILIA',
      noMaContratante: 'SILVA',
      tiDoContratante: '1',
      idReContratante: 'XX5',
      coReContratante: '07411059',
      caTitular: '1',
      noPaTitular: 'LA TORRE',
      noTitular: 'NORMA CECILIA',
      coAfTitular: '24505',
      noMaTitular: 'SILVA',
      tiDoTitular: '1',
      nuDoTitular: '07411059',
      feInsTitular: '20240507',
      nuControl: null,
      nuControlST: null,
      inConCod271Detalles: [
        {
          infBeneficio: '1',
          nuCobertura: '4',
          beMaxInicial: '15000.0000',
          moCobertura: '',
          coInRestriccion: '0',
          canServicio: '',
          idProducto: '',
          coTiCobertura: '4',
          coSubTiCobertura: '100',
          msgObs: '',
          msgConEspeciales: '',
          coTiMoneda: '1',
          coPagoFijo: '35.0000',
          coCalServicio: '01',
          canCalServicio: '',
          coPagoVariable: '65.0000',
          flagCaGarantia: '0',
          deflagCaGarantia: '',
          feFinCarencia: '',
          feFinEspera: '',
        },
        {
          infBeneficio: '1',
          nuCobertura: '4',
          beMaxInicial: '15000.0000',
          moCobertura: '',
          coInRestriccion: '1',
          canServicio: '',
          idProducto: '',
          coTiCobertura: '4',
          coSubTiCobertura: '266',
          msgObs:
            'LAS PREEXISTENCIAS TIPO A SOLO SON: HIPERTENSION, DIABETES, DISLIPIDEMIA, OTITIS, HIPERTIROIDISMO, HIPOTIROIDISMO, ASMA, GASTRITIS Y BRONQUITIS CRONICAS O DE ACUERDO A LO QUE LAS CONDICIONES MEDICAS INDICADAS EN SITEDS',
          msgConEspeciales: '',
          coTiMoneda: '1',
          coPagoFijo: '35.0000',
          coCalServicio: '01',
          canCalServicio: '',
          coPagoVariable: '50.0000',
          flagCaGarantia: '0',
          deflagCaGarantia: '',
          feFinCarencia: '',
          feFinEspera: '',
        },
        {
          infBeneficio: '1',
          nuCobertura: '4',
          beMaxInicial: '15000.0000',
          moCobertura: '',
          coInRestriccion: '0',
          canServicio: '',
          idProducto: '',
          coTiCobertura: '4',
          coSubTiCobertura: '267',
          msgObs: '',
          msgConEspeciales: '',
          coTiMoneda: '1',
          coPagoFijo: '35.0000',
          coCalServicio: '01',
          canCalServicio: '',
          coPagoVariable: '5.0000',
          flagCaGarantia: '0',
          deflagCaGarantia: '',
          feFinCarencia: '',
          feFinEspera: '',
        },
      ],
    },
  ],
}

const responseData = ref<ConsultaAsegCodResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  expandedDocIndex.value = null
  try {
    const data = await apiClient.post<ConsultaAsegCodResponse>(endpoint.value, formData)
    responseData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
    responseData.value = null
  } finally {
    loading.value = false
  }
}

const toggleDetalles = (index: number) => {
  expandedDocIndex.value = expandedDocIndex.value === index ? null : index
}

const getDetalleList = (doc: ConsultaAsegCodDoc) => doc.inConCod271Detalles || []
</script>

<template>
  <section class="module-view">
    <h1>ConsultaAsegCod</h1>
    <p class="muted">
      Consultar asegurado por codigo
      <!-- <code>{{ apiBaseUrl }}{{ endpoint }}</code>. La respuesta
      se muestra en el resumen y la tabla de beneficios. -->
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
              <tr><td>tipodocument</td><td><input v-model="formData.tipodocument" class="input" /></td></tr>
              <tr><td>document</td><td><input v-model="formData.document" class="input" /></td></tr>
              <tr><td>apPaterno</td><td><input v-model="formData.apPaterno" class="input" /></td></tr>
              <tr><td>apMaterno</td><td><input v-model="formData.apMaterno" class="input" /></td></tr>
              <tr><td>nombres</td><td><input v-model="formData.nombres" class="input" /></td></tr>
              <tr><td>coAfiliado</td><td><input v-model="formData.coAfiliado" class="input" /></td></tr>
              <tr><td>coProducto</td><td><input v-model="formData.coProducto" class="input" /></td></tr>
              <tr><td>deProducto</td><td><input v-model="formData.deProducto" class="input" /></td></tr>
              <tr><td>coEspecialidad</td><td><input v-model="formData.coEspecialidad" class="input" /></td></tr>
              <tr><td>coParentesco</td><td><input v-model="formData.coParentesco" class="input" /></td></tr>
              <tr><td>nuPlan</td><td><input v-model="formData.nuPlan" class="input" /></td></tr>
              <tr><td>tiCaContratante</td><td><input v-model="formData.tiCaContratante" class="input" /></td></tr>
              <tr><td>noPaContratante</td><td><input v-model="formData.noPaContratante" class="input" /></td></tr>
              <tr><td>noContratante</td><td><input v-model="formData.noContratante" class="input" /></td></tr>
              <tr><td>noMaContratante</td><td><input v-model="formData.noMaContratante" class="input" /></td></tr>
              <tr><td>tiDoContratante</td><td><input v-model="formData.tiDoContratante" class="input" /></td></tr>
              <tr><td>coReContratante</td><td><input v-model="formData.coReContratante" class="input" /></td></tr>
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
                <th>Paciente</th>
                <th>Documento</th>
                <th>Plan</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.resultCod?.length && !error">
              <template v-for="(doc, index) in responseData.resultCod" :key="doc.idCorrelativo || index">
                <tr class="clickable-row" @click="toggleDetalles(index)">
                  <td>{{ doc.noTransaccion }}</td>
                  <td>{{ doc.idRemitente }}</td>
                  <td>{{ doc.idReceptor }}</td>
                  <td>{{ doc.apPaternoPaciente }} {{ doc.apMaternoPaciente }} {{ doc.noPaciente }}</td>
                  <td>{{ doc.tiDoPaciente }} - {{ doc.nuDoPaciente }}</td>
                  <td>{{ doc.nuPlan }}</td>
                  <td>{{ getDetalleList(doc).length }} registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="7">
                    <div class="table-wrapper response-table details-scroll">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Beneficio</th>
                            <th>Cobertura</th>
                            <th>Tipo/Subtipo</th>
                            <th>Pago fijo</th>
                            <th>Pago variable</th>
                            <th>Max inicial</th>
                            <th>Restriccion</th>
                            <th>Obs</th>
                          </tr>
                        </thead>
                        <tbody v-if="getDetalleList(doc).length">
                          <tr v-for="(detalle, detailIndex) in getDetalleList(doc)" :key="detailIndex">
                            <td>{{ detalle.infBeneficio }}</td>
                            <td>{{ detalle.nuCobertura }}</td>
                            <td>{{ detalle.coTiCobertura }} / {{ detalle.coSubTiCobertura }}</td>
                            <td>{{ detalle.coPagoFijo }}</td>
                            <td>{{ detalle.coPagoVariable }}</td>
                            <td>{{ detalle.beMaxInicial }}</td>
                            <td>{{ detalle.coInRestriccion }}</td>
                            <td>{{ detalle.msgObs || '-' }}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="8" class="muted">Sin detalles.</td>
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
                <td colspan="7" class="muted">Aun no hay detalles.</td>
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
