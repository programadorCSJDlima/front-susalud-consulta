<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'
import { useUtilInputsStore } from '../stores/util-inputs.store'
import { storeToRefs } from 'pinia'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'

type ConsultaObsPayload = {
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
  coInProducto: string
  nuCobertura: string
  nuPlan: string
}

type ConsultaObsDoc = {
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
  coAfPaciente: string
  apMaternoPaciente: string
  coSubCobertura: string
  teMsgLibre1: string
  teMsgLibre2: string
  nuControl: string | null
  nuControlST: string | null
}

type ConsultaObsResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resObs?: ConsultaObsDoc[]
}

const endpoint = ref('/getConsultaObservacion')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)

const utilInputsStore = useUtilInputsStore()
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)

const consultaAsegNomStore = useConsultaAsegNomStore()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const currentPaciente = datosPaciente.value


const formData = reactive<ConsultaObsPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: consultaNomCoIafa.value,
  tipodocument: currentPaciente?.tiDoPaciente ?? '1',
  document: currentPaciente?.nuDoPaciente ?? '',
  apPaterno: currentPaciente?.apPaternoPaciente ?? '',
  apMaterno: currentPaciente?.apMaternoPaciente ?? '',
  nombres: currentPaciente?.noPaciente ?? '',
  coAfiliado: currentPaciente?.coAfPaciente ?? '',
  coProducto: currentPaciente?.coProducto ?? '',
  deProducto: currentPaciente?.coDescripcion ?? '',
  coInProducto: '001',
  nuCobertura: '6',
  nuPlan: currentPaciente?.nuPlan ?? '',
})

const sampleResponse: ConsultaObsResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txRespuesta:
    '',
  resObs: [

  ],
}

const responseData = ref<ConsultaObsResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  expandedDocIndex.value = null
  try {
    const data = await apiClient.post<ConsultaObsResponse>(endpoint.value, formData)
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

const detalleList = computed(() => responseData.value?.resObs || [])
</script>

<template>
  <section class="module-view">
    <h1>ConsultaObservacion</h1>
    <p class="muted">
      Consulta observaciones del asegurado
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
              <tr><td>coInProducto</td><td><input v-model="formData.coInProducto" class="input" /></td></tr>
              <tr><td>nuCobertura</td><td><input v-model="formData.nuCobertura" class="input" /></td></tr>
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
                <th>Paciente</th>
                <th>Afiliado</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="detalleList.length && !error">
              <template v-for="(doc, index) in detalleList" :key="doc.idCorrelativo || index">
                <tr class="clickable-row" @click="toggleDetalles(index)">
                  <td>{{ doc.noTransaccion }}</td>
                  <td>{{ doc.idRemitente }}</td>
                  <td>{{ doc.idReceptor }}</td>
                  <td>{{ doc.feTransaccion }}</td>
                  <td>{{ doc.hoTransaccion }}</td>
                  <td>{{ doc.idCorrelativo }}</td>
                  <td>{{ doc.apPaternoPaciente }} {{ doc.apMaternoPaciente }} {{ doc.noPaciente }}</td>
                  <td>{{ doc.coAfPaciente }}</td>
                  <td>1 registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="9">
                    <div class="table-wrapper response-table details-scroll">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>SubCobertura</th>
                            <th>Mensaje 1</th>
                            <th>Mensaje 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{{ doc.coSubCobertura || '-' }}</td>
                            <td>{{ doc.teMsgLibre1 || '-' }}</td>
                            <td>{{ doc.teMsgLibre2 || '-' }}</td>
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
                <td colspan="9" class="muted">Aun no hay observaciones.</td>
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
