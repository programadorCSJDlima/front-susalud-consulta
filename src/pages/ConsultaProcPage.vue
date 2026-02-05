<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'
import { useUtilInputsStore } from '../stores/util-inputs.store'
import { storeToRefs } from 'pinia'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'

const utilInputsStore = useUtilInputsStore()
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)

const consultaAsegNomStore = useConsultaAsegNomStore()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const currentPaciente = datosPaciente.value


type ConsultaProcPayload = {
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
  nuCobertura: string
  caServicio: string
  coCalservicio: string
  beMaxInicial: string
  coTiCobertura: string
  coSuTiCobertura: string
  coEspecialidad: string
  nuPlan: string
}

type ConsultaProcDetalle = {
  coInProcedimiento: string
  coInRestriccion: string
  coProcedimiento: string
  imDeducible: string
  poCuExDecimal: string
  nuFrecuencia: string
  coSexo: string
  tiNuDias: string
  teMsgObservacion: string
  idFuentePE: string
  coTiEspera: string
  deTiEspera: string
  feFinVigencia: string
  teMsgTiEspera: string
  idFuenteTE: string
  coExCarencia: string
  deExCarencia: string
  teMsgExCarencia: string
  idFuenteEC: string
}

type ConsultaProcDoc = {
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
  inConProc271Detalles: ConsultaProcDetalle[]
  nuControl: string | null
  nuControlST: string | null
}

type ConsultaProcResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultConPro?: ConsultaProcDoc[]
}

const endpoint = ref('/consultarProc')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)

const formData = reactive<ConsultaProcPayload>({
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
  nuCobertura: '4',
  caServicio: '1',
  coCalservicio: 'Z3',
  beMaxInicial: '50',
  coTiCobertura: '4',
  coSuTiCobertura: '001',
  coEspecialidad: '006',
  nuPlan: currentPaciente?.nuPlan ?? '', 
})

const sampleResponse: ConsultaProcResponse = {
  coError: '',
  txNombre: '',
  coIafa: '',
  txRespuesta:
    '',
  resultConPro: [

  ],
}

const responseData = ref<ConsultaProcResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  expandedDocIndex.value = null
  try {
    const data = await apiClient.post<ConsultaProcResponse>(endpoint.value, formData)
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

const getDetalleList = (doc: ConsultaProcDoc) => doc.inConProc271Detalles || []
</script>

<template>
  <section class="module-view">
    <h1>ConsultaProc</h1>
    <p class="muted">
      Consulta de restricciones por cobertura (DEL ASEGURADO)
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
              <tr><td>coEspecialidad</td><td><input v-model="formData.coEspecialidad" class="input" /></td></tr>
              <tr><td>nuCobertura</td><td><input v-model="formData.nuCobertura" class="input" /></td></tr>
              <tr><td>caServicio</td><td><input v-model="formData.caServicio" class="input" /></td></tr>
              <tr><td>coCalservicio</td><td><input v-model="formData.coCalservicio" class="input" /></td></tr>
              <tr><td>beMaxInicial</td><td><input v-model="formData.beMaxInicial" class="input" /></td></tr>
              <tr><td>coTiCobertura</td><td><input v-model="formData.coTiCobertura" class="input" /></td></tr>
              <tr><td>coSuTiCobertura</td><td><input v-model="formData.coSuTiCobertura" class="input" /></td></tr>
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
            <tbody v-if="responseData?.resultConPro?.length && !error">
              <template v-for="(doc, index) in responseData.resultConPro" :key="doc.idCorrelativo || index">
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
                  <td>{{ doc.coAfPaciente }}</td>
                  <td>{{ getDetalleList(doc).length }} registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="14">
                    <div class="table-wrapper response-table details-scroll">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Procedimiento</th>
                            <th>Restriccion</th>
                            <th>Codigo</th>
                            <th>Deducible</th>
                            <th>Cuota</th>
                            <th>Frecuencia</th>
                            <th>Sexo</th>
                            <th>Duracion</th>
                            <th>Observacion</th>
                            <th>Espera</th>
                            <th>Fin vigencia</th>
                            <th>Msg espera</th>
                            <th>Carencia</th>
                            <th>Msg carencia</th>
                          </tr>
                        </thead>
                        <tbody v-if="getDetalleList(doc).length">
                          <tr v-for="(detalle, detailIndex) in getDetalleList(doc)" :key="detailIndex">
                            <td>{{ detalle.coInProcedimiento }}</td>
                            <td>{{ detalle.coInRestriccion }}</td>
                            <td>{{ detalle.coProcedimiento }}</td>
                            <td>{{ detalle.imDeducible }}</td>
                            <td>{{ detalle.poCuExDecimal }}</td>
                            <td>{{ detalle.nuFrecuencia }}</td>
                            <td>{{ detalle.coSexo }}</td>
                            <td>{{ detalle.tiNuDias }}</td>
                            <td>{{ detalle.teMsgObservacion }}</td>
                            <td>{{ detalle.deTiEspera }}</td>
                            <td>{{ detalle.feFinVigencia }}</td>
                            <td>{{ detalle.teMsgTiEspera }}</td>
                            <td>{{ detalle.deExCarencia }}</td>
                            <td>{{ detalle.teMsgExCarencia }}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="14" class="muted">Sin detalles.</td>
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
