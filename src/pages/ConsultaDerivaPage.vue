<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'

type ConsultaDerivaPayload = {
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

type ConsultaDerivaDetalle = {
  caPaciente: string
  apPaternoPaciente: string
  noPaciente: string
  coAfPaciente: string
  apMaternoPaciente: string
  coTiDoPaciente: string
  nuDoPaciente: string
  coParentesco: string
  tiDoTrabajoAfiliado: string
  nuDoTrabajoAfiliado: string
  nuAtencion: string
  teMsgLibre1: string
  coTiProducto: string
  deProducto: string
  coTiCobertura: string
  coSubTiCobertura: string
  feAtSalud: string
  noLuAtencion: string
  coLuAtencion: string
  tiDoContratante: string
  idCaReferencia: string
  reIdContratante: string
}

type ConsultaDerivaResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  detalles: ConsultaDerivaDetalle[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/consultarDerivacion')
const loading = ref(false)
const error = ref<string | null>(null)

const formData = reactive<ConsultaDerivaPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: '20028',
  tipodocument: '1',
  document: '44741346',
  apPaterno: 'RAMOS',
  apMaterno: '',
  nombres: 'JUAN RUPERTO',
  coAfiliado: '13660',
  coProducto: 'R',
  deProducto: 'SEGURO COMPLEM. TRABAJO DE RIESG',
  coEspecialidad: '6',
  coParentesco: '1',
  nuPlan: '20',
  tiCaContratante: '2',
  noPaContratante: 'ECO-RIN S.A.C.',
  noContratante: 'ECO-RIN S.A.C. ECO-RIN S.A.C.',
  noMaContratante: 'ECO-RIN S.A.C.',
  tiDoContratante: '2',
  coReContratante: '20523354851',
})

const sampleResponse: ConsultaDerivaResponse = {
  coError: '0440',
  txNombre: '271_RES_DERIVA',
  coIafa: '20028',
  txRespuesta: 'La IPRESS no tiene convenio con la IAFAS',
  detalles: [],
}

const responseData = ref<ConsultaDerivaResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  responseData.value = null
  loading.value = true
  error.value = null
  try {
    const data = await apiClient.post<ConsultaDerivaResponse>(endpoint.value, formData)
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
    <h1>ConsultaDeriva</h1>

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
          <p class="muted small">txRespuesta</p>
          <pre class="code-block">{{ responseData.txRespuesta }}</pre>
        </div>

        <div class="table-wrapper response-table">
          <table class="data-table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Doc</th>
                <th>Parentesco</th>
                <th>Atención</th>
                <th>Producto</th>
                <th>Plan/Cobertura</th>
                <th>Lugar</th>
                <th>Contratante</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.detalles?.length && !error">
              <tr v-for="(detalle, index) in responseData.detalles" :key="index">
                <td>
                  {{ detalle.apPaternoPaciente }} {{ detalle.apMaternoPaciente }}
                  {{ detalle.noPaciente }}
                </td>
                <td>{{ detalle.coTiDoPaciente }} - {{ detalle.nuDoPaciente }}</td>
                <td>{{ detalle.coParentesco }}</td>
                <td>{{ detalle.nuAtencion }}</td>
                <td>{{ detalle.coTiProducto }} {{ detalle.deProducto }}</td>
                <td>{{ detalle.coTiCobertura }} / {{ detalle.coSubTiCobertura }}</td>
                <td>{{ detalle.noLuAtencion }} ({{ detalle.coLuAtencion }})</td>
                <td>{{ detalle.idCaReferencia }}: {{ detalle.reIdContratante }}</td>
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
