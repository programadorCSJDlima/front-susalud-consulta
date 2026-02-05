<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'
import { useUtilInputsStore } from '../stores/util-inputs.store'
import { storeToRefs } from 'pinia'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'

type ConsultaCondMedPayload = {
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
  nuPlan: string
}

type ConsultaCondMedDetalle = {
  coSeCIE10: string
  coRestriccion: string
  dePreexistencia: string
  msgObsPr: string
  idFuenteRE: string
  esCobertura: string
  moDiagnostico: string
  tiEspera: string
}

type ConsultaCondMedDoc = {
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
  nuRucReceptor: string
  caPaciente: string
  apPaternoPaciente: string
  noPaciente: string
  coPaciente: string
  apMaternoPaciente: string
  inConMed271Detalles: ConsultaCondMedDetalle[]
  nuControl: string | null
  nuControlST: string | null
}

type ConsultaCondMedResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultConMed?: ConsultaCondMedDoc[]
}

const endpoint = ref('/consultarCondicionMedica')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)


const utilInputsStore = useUtilInputsStore()
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)

const consultaAsegNomStore = useConsultaAsegNomStore()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const currentPaciente = datosPaciente.value


const formData = reactive<ConsultaCondMedPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: consultaNomCoIafa.value,
  tipodocument: '1',
  document: currentPaciente?.nuDoPaciente ?? '',
  apPaterno: currentPaciente?.apPaternoPaciente ?? '',
  apMaterno: currentPaciente?.apMaternoPaciente ?? '',
  nombres: currentPaciente?.noPaciente ?? '',
  coAfiliado: currentPaciente?.coAfPaciente ?? '',
  coProducto: currentPaciente?.coProducto ?? '',
  deProducto: currentPaciente?.coDescripcion ?? '',
  nuPlan: currentPaciente?.nuPlan ?? '',
})

const sampleResponse: ConsultaCondMedResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txRespuesta:
    '',
  resultConMed: [
   
  ],
}

const responseData = ref<ConsultaCondMedResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  expandedDocIndex.value = null
  try {
    const data = await apiClient.post<ConsultaCondMedResponse>(endpoint.value, formData)
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

const getDetalleList = (doc: ConsultaCondMedDoc) => doc.inConMed271Detalles || []
</script>

<template>
  <section class="module-view">
    <h1>CondicionMedica</h1>
    <p class="muted">
      Consulta condiciones medicas del asegurado
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
              <tr><td>tipodocument</td><td><input v-model="formData.tipodocument" class="input" /></td></tr>
              <tr><td>document</td><td><input v-model="formData.document" class="input" /></td></tr>
              <tr><td>apPaterno</td><td><input v-model="formData.apPaterno" class="input" /></td></tr>
              <tr><td>apMaterno</td><td><input v-model="formData.apMaterno" class="input" /></td></tr>
              <tr><td>nombres</td><td><input v-model="formData.nombres" class="input" /></td></tr>
              <tr><td>coAfiliado</td><td><input v-model="formData.coAfiliado" class="input" /></td></tr>
              <tr><td>coProducto</td><td><input v-model="formData.coProducto" class="input" /></td></tr>
              <tr><td>deProducto</td><td><input v-model="formData.deProducto" class="input" /></td></tr>
              <tr><td>nuPlan</td><td><input v-model="formData.nuPlan" class="input" /></td></tr>
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
                <th>Fecha</th>
                <th>Hora</th>
                <th>Correlativo</th>
                <th>IdTransaccion</th>
                <th>Finalidad</th>
                <th>CaRemitente</th>
                <th>CaReceptor</th>
                <th>RucReceptor</th>
                <th>Paciente</th>
                <th>Afiliado</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.resultConMed?.length && !error">
              <template v-for="(doc, index) in responseData.resultConMed" :key="doc.idCorrelativo || index">
                <tr class="clickable-row" @click="toggleDetalles(index)">
                  <td>{{ doc.noTransaccion }}</td>
                  <td>{{ doc.idRemitente }}</td>
                  <td>{{ doc.idReceptor }}</td>
                  <td>{{ doc.feTransaccion }}</td>
                  <td>{{ doc.hoTransaccion }}</td>
                  <td>{{ doc.idCorrelativo }}</td>
                  <td>{{ doc.idTransaccion }}</td>
                  <td>{{ doc.tiFinalidad }}</td>
                  <td>{{ doc.caRemitente }}</td>
                  <td>{{ doc.caReceptor }}</td>
                  <td>{{ doc.nuRucReceptor }}</td>
                  <td>{{ doc.apPaternoPaciente }} {{ doc.apMaternoPaciente }} {{ doc.noPaciente }}</td>
                  <td>{{ doc.coPaciente }}</td>
                  <td>{{ getDetalleList(doc).length }} registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="14">
                    <div class="table-wrapper response-table details-scroll">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>CIE10</th>
                            <th>Restriccion</th>
                            <th>Preexistencia</th>
                            <th>Obs</th>
                            <th>Fuente</th>
                            <th>Cobertura</th>
                            <th>Diagnostico</th>
                            <th>Espera</th>
                          </tr>
                        </thead>
                        <tbody v-if="getDetalleList(doc).length">
                          <tr v-for="(detalle, detailIndex) in getDetalleList(doc)" :key="detailIndex">
                            <td>{{ detalle.coSeCIE10 }}</td>
                            <td>{{ detalle.coRestriccion }}</td>
                            <td>{{ detalle.dePreexistencia }}</td>
                            <td>{{ detalle.msgObsPr }}</td>
                            <td>{{ detalle.idFuenteRE }}</td>
                            <td>{{ detalle.esCobertura }}</td>
                            <td>{{ detalle.moDiagnostico }}</td>
                            <td>{{ detalle.tiEspera }}</td>
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
                <td colspan="14" class="muted">Aun no hay detalles.</td>
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
