<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'

type ConsultaSctrPayload = {
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

type ConsultaSctrDetalle = {
  tiCaContratante: string
  noEmApPaContratante: string
  coEmContratante: string
  idCaReContratante: string
  reIdContratante: string
  tiCaLuAtencion: string
  noEmLuAtencion: string
  coEmReLuAtencion: string
  idCaReLuAtencion: string
  reIdLuAtencion: string
  coLuAtencion: string
  deTiAccidente: string
  feAfiliacion: string
  feOcAccidente: string
}

type ConsultaSctrResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  detalles: ConsultaSctrDetalle[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/consultarSctr')
const loading = ref(false)
const error = ref<string | null>(null)

const formData = reactive<ConsultaSctrPayload>({
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

const sampleResponse: ConsultaSctrResponse = {
  coError: '0000',
  txNombre: '271_RES_SCTR',
  coIafa: '20028',
  txRespuesta: 'ISA*00*...~GS* HI*...~IEA*1 * 080332586 * ~ (ejemplo truncado)',
  detalles: [
    {
      tiCaContratante: '2',
      noEmApPaContratante: 'COLTUR PERUANA DE TU',
      coEmContratante: '00001',
      idCaReContratante: '4A',
      reIdContratante: '20100054184',
      tiCaLuAtencion: '2',
      noEmLuAtencion: 'CLINICA INTERNACIONAL',
      coEmReLuAtencion: '980001C',
      idCaReLuAtencion: '4A',
      reIdLuAtencion: '20100973473',
      coLuAtencion: '471000',
      deTiAccidente: '',
      feAfiliacion: '20040701',
      feOcAccidente: '20150330',
    },
  ],
}

const responseData = ref<ConsultaSctrResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  try {
    const data = await apiClient.post<ConsultaSctrResponse>(endpoint.value, formData)
    responseData.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
    responseData.value = null
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="module-view">
    <h1>ConsultaSCTR</h1>
    <p class="muted">
      Consulta accidentes del asegurado
       <!-- <code>{{ apiBaseUrl }}{{ endpoint }}</code>. La respuesta incluye
      el EDI y los datos del contratante y lugar de atención. -->
    </p>

    <div class="card-grid">
      <div class="api-box">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Código</th>
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
                <th>Tipo Contratante</th>
                <th>Contratante</th>
                <th>ID Contratante</th>
                <th>Lugar atención</th>
                <th>ID Lugar</th>
                <th>Accidente</th>
                <th>Afiliación</th>
                <th>Fecha Accidente</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.detalles?.length && !error">
              <tr v-for="(detalle, index) in responseData.detalles" :key="index">
                <td>{{ detalle.tiCaContratante }}</td>
                <td>{{ detalle.noEmApPaContratante }}</td>
                <td>{{ detalle.idCaReContratante }}: {{ detalle.reIdContratante }}</td>
                <td>{{ detalle.noEmLuAtencion }}</td>
                <td>{{ detalle.idCaReLuAtencion }}: {{ detalle.reIdLuAtencion }}</td>
                <td>{{ detalle.deTiAccidente || '—' }}</td>
                <td>{{ detalle.feAfiliacion }}</td>
                <td>{{ detalle.feOcAccidente }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="8" class="muted">Aún no hay detalles.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
