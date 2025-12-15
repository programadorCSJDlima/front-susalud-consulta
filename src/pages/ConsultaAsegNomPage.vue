<script setup lang="ts">
import { reactive, ref } from 'vue'
import { apiClient } from '../services/apiClient'

type ConsultaAsegNomPayload = {
  coExcepcion: string
  txNombre: string
  coIafa: string
  apatern: string
  amatern: string
  name: string
  tiDoPaciente: string
  nuDoPaciente: string
}

type ConsultaAsegNomDetalle = {
  caPaciente: string
  apPaternoPaciente: string
  noPaciente: string
  coAfPaciente: string
  apMaternoPaciente: string
  coEsPaciente: string
  tiDoPaciente: string
  nuDoPaciente: string
  nuContratoPaciente: string
  coProducto: string
  coDescripcion: string
  nuSCTR: string
  coParentesco: string
  nuPlan: string
  feNacimiento: string
  genero: string
  esMarital: string
  tiCaContratante: string
  noPaContratante: string
  noContratante: string
  noMaContratante: string
  tiDoContratante: string
  idReContratante: string
  coReContratante: string
}

type ConsultaAsegNomDoc = {
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
  nuRucReceptor: string | null
  inConNom271Detalles: ConsultaAsegNomDetalle[]
  nuControl: string | null
  nuControlST: string | null
  detalles?: ConsultaAsegNomDetalle[]
}

type ConsultaAsegNomResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  resultNomDoc: ConsultaAsegNomDoc[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/consultarAseguradoxNom')
const loading = ref(false)
const error = ref<string | null>(null)
const expandedDocIndex = ref<number | null>(null)

const formData = reactive<ConsultaAsegNomPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: '20004',
  apatern: 'RAMOS',
  amatern: '',
  name: 'JUAN',
  tiDoPaciente: '',
  nuDoPaciente: '',
})

const sampleResponse: ConsultaAsegNomResponse = {
  coError: '0000',
  txNombre: '271_CON_NOM',
  coIafa: '20028',
  txRespuesta:
    'ISA*00*          *00*          *ZZ*20028          *ZZ*00008786       *251210*1941*|*00501*000000001*0*T*:~GS*HB*20028          *00008786       *20251210*194159  *022625147*X *00501       ~ST*271*89055126 *                                   ~BHT*0022*11~HL*1           *            *20*1~NM1*PR *2*                                                            *                                   *                         *          *          *PI*20028               *  *   *                                                            ~HL*2           *1           *21*1~NM1*1P *2*                                                            *                                   *                         *          *          *FI*20563648202         *  *   *                                                            ~HL*3           *2           *22*0~NM1*IL *1*SUAREZ                                                      *JUAN CARLOS                        *                         *          *          *MI*13660               *  *   *LA TORRE                                                    ~REF*ACC*1                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :44960708            :   :                    :   :                    ~REF*CT *21668A1                                                                         *                                                                                ~REF*PRT*PS040                                                                           *INTEGRAL PLUS INDIVIDUAL                                                        *ZZ :                    :   :                    :   :                    ~REF*ZZ *5                                                                               *                                                                                ~REF*18 *21668A1                                                                         *                                                                                ~DMG*D8 *19870724                           *2*1*                    *  *   ~NM1*P5 *1*LA TORRE                                                    *NORMA CECILIA                      *                         *          *          *  *                    *  *   *SILVA                                                       ~REF*DD *1                                                                               *                                                                                *XX5:07411059            :   :                    :   :                    ~SE*19        *89055126 ~GE*1     *022625147~IEA*1    *000000001~',
  resultNomDoc: [
    {
      noTransaccion: '271_CON_NOM',
      idRemitente: '20028',
      idReceptor: '00008786',
      feTransaccion: '20251210',
      hoTransaccion: '194159',
      idCorrelativo: '000000001',
      idTransaccion: '271',
      tiFinalidad: '11',
      caRemitente: '2',
      caReceptor: '2',
      nuRucReceptor: '20563648202',
      inConNom271Detalles: [
        {
          caPaciente: '1',
          apPaternoPaciente: 'SUAREZ',
          noPaciente: 'JUAN CARLOS',
          coAfPaciente: '13660',
          apMaternoPaciente: 'LA TORRE',
          coEsPaciente: '1',
          tiDoPaciente: '1',
          nuDoPaciente: '44960708',
          nuContratoPaciente: '21668A1',
          coProducto: 'PS040',
          coDescripcion: 'INTEGRAL PLUS INDIVIDUAL',
          nuSCTR: '',
          coParentesco: '5',
          nuPlan: '21668A1',
          feNacimiento: '19870724',
          genero: '2',
          esMarital: '1',
          tiCaContratante: '1',
          noPaContratante: 'LA TORRE',
          noContratante: 'NORMA CECILIA',
          noMaContratante: 'SILVA',
          tiDoContratante: '1',
          idReContratante: 'XX5',
          coReContratante: '07411059',
        },
      ],
      nuControl: null,
      nuControlST: null,
      detalles: [
        {
          caPaciente: '1',
          apPaternoPaciente: 'SUAREZ',
          noPaciente: 'JUAN CARLOS',
          coAfPaciente: '13660',
          apMaternoPaciente: 'LA TORRE',
          coEsPaciente: '1',
          tiDoPaciente: '1',
          nuDoPaciente: '44960708',
          nuContratoPaciente: '21668A1',
          coProducto: 'PS040',
          coDescripcion: 'INTEGRAL PLUS INDIVIDUAL',
          nuSCTR: '',
          coParentesco: '5',
          nuPlan: '21668A1',
          feNacimiento: '19870724',
          genero: '2',
          esMarital: '1',
          tiCaContratante: '1',
          noPaContratante: 'LA TORRE',
          noContratante: 'NORMA CECILIA',
          noMaContratante: 'SILVA',
          tiDoContratante: '1',
          idReContratante: 'XX5',
          coReContratante: '07411059',
        },
      ],
    },
  ],
}

const responseData = ref<ConsultaAsegNomResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  if (!formData.apatern.trim()) {
    if (!formData.tiDoPaciente.trim() || !formData.nuDoPaciente.trim()) {
      error.value = 'Si no se envia apatern, tiDoPaciente y nuDoPaciente son obligatorios.'
      return
    }
  }

  responseData.value = null
  loading.value = true
  error.value = null
  try {
    const data = await apiClient.post<ConsultaAsegNomResponse>(endpoint.value, formData)
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

const getDetalleList = (doc: ConsultaAsegNomDoc) => {
  return doc.inConNom271Detalles?.length ? doc.inConNom271Detalles : doc.detalles || []
}
</script>

<template>
  <section class="module-view">
    <h1>ConsultaAsegNom</h1>
    <p class="muted">
      Consulta los datos del asegurado por nombre o documento
      <!-- <code>{{ apiBaseUrl }}{{ endpoint }}</code>. La respuesta se muestra en el resumen y la tabla
      de detalles. -->
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
              <tr>
                <td>coExcepcion</td>
                <td><input v-model="formData.coExcepcion" class="input" /></td>
              </tr>
              <tr>
                <td>txNombre</td>
                <td><input v-model="formData.txNombre" class="input" /></td>
              </tr>
              <tr>
                <td>coIafa</td>
                <td><input v-model="formData.coIafa" class="input" /></td>
              </tr>
              <tr>
                <td>apatern</td>
                <td><input v-model="formData.apatern" class="input" /></td>
              </tr>
              <tr>
                <td>amatern</td>
                <td><input v-model="formData.amatern" class="input" /></td>
              </tr>
              <tr>
                <td>name</td>
                <td><input v-model="formData.name" class="input" /></td>
              </tr>
              <tr>
                <td>tiDoPaciente</td>
                <td><input v-model="formData.tiDoPaciente" class="input" /></td>
              </tr>
              <tr>
                <td>nuDoPaciente</td>
                <td><input v-model="formData.nuDoPaciente" class="input" /></td>
              </tr>
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
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.resultNomDoc?.length && !error">
              <template v-for="(doc, index) in responseData.resultNomDoc" :key="doc.idCorrelativo || index">
                <tr class="clickable-row" @click="toggleDetalles(index)">
                  <td>{{ doc.noTransaccion }}</td>
                  <td>{{ doc.idRemitente }}</td>
                  <td>{{ doc.idReceptor }}</td>
                  <td>{{ doc.feTransaccion }}</td>
                  <td>{{ doc.hoTransaccion }}</td>
                  <td>{{ doc.idCorrelativo }}</td>
                  <td>{{ getDetalleList(doc).length }} registro(s)</td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="7">
                    <div class="table-wrapper response-table">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>caPaciente</th>
                            <th>Paciente</th>
                            <th>Doc</th>
                            <th>Contrato</th>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Nacimiento</th>
                            <th>Parentesco</th>
                            <th>Contratante</th>
                          </tr>
                        </thead>
                        <tbody v-if="getDetalleList(doc).length">
                          <tr v-for="(detalle, detailIndex) in getDetalleList(doc)" :key="detailIndex">
                            <td>{{ detalle.caPaciente }}</td>
                            <td>
                              {{ detalle.apPaternoPaciente }} {{ detalle.apMaternoPaciente }}
                              {{ detalle.noPaciente }}
                            </td>
                            <td>{{ detalle.tiDoPaciente }} - {{ detalle.nuDoPaciente }}</td>
                            <td>{{ detalle.nuContratoPaciente }}</td>
                            <td>{{ detalle.coProducto }}</td>
                            <td>{{ detalle.coDescripcion }}</td>
                            <td>{{ detalle.feNacimiento }}</td>
                            <td>{{ detalle.coParentesco }}</td>
                            <td>{{ detalle.noContratante }}</td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="9" class="muted">Sin detalles.</td>
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
</style>
