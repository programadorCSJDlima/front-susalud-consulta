<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'

type ConsultaEntVinculadaPayload = {
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
  caIPRESS: string
  noIPRESS: string
  tiDoIPRESS: string
  nuRucIPRESS: string
  nuControl: string
  nuControlST: string
}

type EntidadVinculada = {
  noTransaccion: string
  idRemitente: string
  idReceptor: string
  feTransaccion: string
  hoTransaccion: string
  idCorrelativo: string
  idTransaccion: string
  tiFinalidad: string
  caIPRESS: string | null
  noIPRESS: string | null
  tiDoIPRESS: string | null
  nuRucIPRESS: string | null
  nuControl: string | null
  nuControlST: string | null
}

type ConsultaEntVinculadaResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  detalles?: string
  entidadesVinculadas?: EntidadVinculada[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/getConsultaEntVinculada')
const loading = ref(false)
const error = ref<string | null>(null)

const formData = reactive<ConsultaEntVinculadaPayload>({
  coExcepcion: '0000',
  txNombre: '278_CON_ENT_VINC',
  coIafa: '30004',
  noTransaccion: '278_CON_ENT_VINC',
  idRemitente: '00008786',
  idReceptor: '30004',
  feTransaccion: '20250121',
  hoTransaccion: '102000',
  idCorrelativo: '0001',
  idTransaccion: '278',
  tiFinalidad: '13',
  caIPRESS: '2',
  noIPRESS: 'CLINICA HOGAR SAN JUAN DE DIOS',
  tiDoIPRESS: '6',
  nuRucIPRESS: '20144442629',
  nuControl: '',
  nuControlST: '',
})

const sampleResponse: ConsultaEntVinculadaResponse = {
  coError: '0000',
  txNombre: '278_RES_ENT_VINC',
  coIafa: '30004',
  txRespuesta:
    'ISA*00*          *00*          *ZZ*30004          *ZZ*00008786       *251215*1009*|*00501*202500216*0*T*:~GS*HB*30004          *00008786       *20251215*100909  *030981308*X *00501       ~ST*278*18320132 *                                   ~BHT*0020*11~HL*1           *            *20*0~CRC*ZZ*Y*00 ~MSG*Es Entidad vinculada                                                                                                                                                                                                                                                    *  *  ~SE*7         *18320132 ~GE*1     *030981308~IEA*1    *202500216~',
  detalles: 'pe.gob.susalud.jr.transaccion.susalud.bean.InConEntVinc278@4f5639bf',
  entidadesVinculadas: [
    {
      noTransaccion: '278_CON_ENT_VINC',
      idRemitente: '30004',
      idReceptor: '00008786',
      feTransaccion: '20251215',
      hoTransaccion: '100909',
      idCorrelativo: '202500216',
      idTransaccion: '278',
      tiFinalidad: '11',
      caIPRESS: null,
      noIPRESS: null,
      tiDoIPRESS: null,
      nuRucIPRESS: null,
      nuControl: null,
      nuControlST: null,
    },
  ],
}

const responseData = ref<ConsultaEntVinculadaResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  try {
    const data = await apiClient.post<ConsultaEntVinculadaResponse>(endpoint.value, formData)
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
    <h1>ConsultaEntVinculada</h1>
    <p class="muted">
      Consulta la entidad vinculada. El formulario envia los datos al endpoint
      <code>{{ apiBaseUrl }}{{ endpoint }}</code>.
    </p>

    <div class="card-grid">
      <div class="api-box">
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Campo</th>
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
              <tr><td>caIPRESS</td><td><input v-model="formData.caIPRESS" class="input" /></td></tr>
              <tr><td>noIPRESS</td><td><input v-model="formData.noIPRESS" class="input" /></td></tr>
              <tr><td>tiDoIPRESS</td><td><input v-model="formData.tiDoIPRESS" class="input" /></td></tr>
              <tr><td>nuRucIPRESS</td><td><input v-model="formData.nuRucIPRESS" class="input" /></td></tr>
              <tr><td>nuControl</td><td><input v-model="formData.nuControl" class="input" /></td></tr>
              <tr><td>nuControlST</td><td><input v-model="formData.nuControlST" class="input" /></td></tr>
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

        <div v-if="responseData && !error" class="output scroll-output">
          <div>
            <p class="muted small">txRespuesta (EDI crudo)</p>
            <pre class="code-block">{{ responseData.txRespuesta }}</pre>
          </div>
          <div v-if="responseData.detalles">
            <p class="muted small">detalles</p>
            <pre class="code-block">{{ responseData.detalles }}</pre>
          </div>
        </div>

        <div class="table-wrapper response-table details-scroll">
          <table class="data-table">
            <thead>
              <tr>
                <th>Transaccion</th>
                <th>Remitente</th>
                <th>Receptor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Finalidad</th>
                <th>IPRESS</th>
                <th>RUC IPRESS</th>
                <th>Controles</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.entidadesVinculadas?.length && !error">
              <tr v-for="(item, index) in responseData.entidadesVinculadas" :key="item.idCorrelativo || index">
                <td>{{ item.noTransaccion }}</td>
                <td>{{ item.idRemitente }}</td>
                <td>{{ item.idReceptor }}</td>
                <td>{{ item.feTransaccion }}</td>
                <td>{{ item.hoTransaccion }}</td>
                <td>{{ item.tiFinalidad }}</td>
                <td>{{ item.noIPRESS || '-' }}</td>
                <td>{{ item.nuRucIPRESS || '-' }}</td>
                <td>
                  <div>
                    <div>nuControl: {{ item.nuControl || '-' }}</div>
                    <div>nuControlST: {{ item.nuControlST || '-' }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="9" class="muted">Aun no hay entidades vinculadas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-output {
  max-height: 320px;
  overflow: auto;
}

.details-scroll {
  max-height: 360px;
  overflow-y: auto;
}

.code-block {
  max-height: 240px;
  overflow: auto;
}
</style>
