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

type ConsultaAsegNomResponse = {
  coError: string
  txNombre: string
  coIafa: string
  txRespuesta: string
  detalles: ConsultaAsegNomDetalle[]
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085'
const endpoint = ref('/consultarAseguradoxNom')
const loading = ref(false)
const error = ref<string | null>(null)

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
  coIafa: '20004',
  txRespuesta:
    'ISA*00*          *00*          *ZZ*20004          *ZZ*00008786       *251204*0829*|*00501*009430636*0*T*:~GS*HB*20004          *00008786       *20251204*082902  *028428433*X *00501       ~ST*271*80043177 *                                   ~BHT*0022*11~HL*1           *            *20*1~NM1*PR *2*                                                            *                                   *                         *          *          *PI*20004               *  *   *                                                            ~HL*2           *1           *21*1~NM1*1P *2*                                                            *                                   *                         *          *          *FI*20144442629         *  *   *                                                            ~HL*3           *2           *22*0~NM1*IL *6*RAMOS                                                       *JUAN                               *                         *          *          *MI*0009209882          *  *   *ISLA                                                        ~REF*ACC*6                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :16774765            :   :                    :   :                    ~REF*CT *666108                                                                          *                                                                                ~REF*PRT*R                                                                               *SEGURO COMPLEM. TRABAJO DE RIESGO                                               *ZZ :                    :   :                    :   :                    ~REF*ZZ *1                                                                               *                                                                                ~REF*18 *20                                                                              *                                                                                ~DMG*D8 *19761109                           *1*1*                    *  *   ~NM1*P5 * *AGRICOLA CERRO PRIETO S.A.                                  *AGRICOLA CERRO PRIETO S.A. AGRICOLA*                         *          *          *  *                    *  *   *AGRICOLA CERRO PRIETO S.A.                                  ~REF*DD *2                                                                               *                                                                                *XX5:20461642706         :   :                    :   :                    ~NM1*IL *6*RAMOS                                                       *JUAN JOSE                          *                         *          *          *MI*0009276729          *  *   *LOBATON                                                     ~REF*ACC*6                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :40823681            :   :                    :   :                    ~REF*CT *669128                                                                          *                                                                                ~REF*PRT*R                                                                               *SEGURO COMPLEM. TRABAJO DE RIESGO                                               *ZZ :                    :   :                    :   :                    ~REF*ZZ *1                                                                               *                                                                                ~REF*18 *20                                                                              *                                                                                ~DMG*D8 *19801230                           *1*1*                    *  *   ~NM1*P5 * *MUNICIPALIDAD DE SANTIAGO DE SURCO                          *MUNICIPALIDAD DE SANTIAGO DE SURCO *                         *          *          *  *                    *  *   *MUNICIPALIDAD DE SANTIAGO DE SURCO                          ~REF*DD *2                                                                               *                                                                                *XX5:20131367423         :   :                    :   :                    ~NM1*IL *6*RAMOS                                                       *JUAN                               *                         *          *          *MI*0009494837          *  *   *NUÑEZ                                                       ~REF*ACC*6                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :20719533            :   :                    :   :                    ~REF*CT *821742                                                                          *                                                                                ~REF*PRT*R                                                                               *SEGURO COMPLEM. TRABAJO DE RIESGO                                               *ZZ :                    :   :                    :   :                    ~REF*ZZ *1                                                                               *                                                                                ~REF*18 *20                                                                              *                                                                                ~DMG*D8 *19681227                           *1*1*                    *  *   ~NM1*P5 * *TRANSPORTES Y SERVICIOS DINAMO E.I.R.L. - TRASERDIN E.I.R.L.*TRANSPORTES Y SERVICIOS DINAMO E.I.*                         *          *          *  *                    *  *   *TRANSPORTES Y SERVICIOS DINAMO E.I.R.L. - TRASERDIN E.I.R.L.~REF*DD *2                                                                               *                                                                                *XX5:20517635058         :   :                    :   :                    ~NM1*IL *6*RAMOS                                                       *JUAN RUPERTO                       *                         *          *          *MI*0009473240          *  *   *DURAND                                                      ~REF*ACC*6                                                                               *                                                                                ~REF*DD *1                                                                               *                                                                                *4A :44741346            :   :                    :   :                    ~REF*CT *367003                                                                          *                                                                                ~REF*PRT*R                                                                               *SEGURO COMPLEM. TRABAJO DE RIESGO                                               *ZZ :                    :   :                    :   :                    ~REF*ZZ *1                                                                               *                                                                                ~REF*18 *20                                                                              *                                                                                ~DMG*D8 *19860429                           *1*1*                    *  *   ~NM1*P5 * *ECO-RIN S.A.C.                                              *ECO-RIN S.A.C. ECO-RIN S.A.C.      *                         *          *          *  *                    *  *   *ECO-RIN S.A.C.                                              ~REF*DD *2                                                                               *                                                                                *XX5:20523354851         :   :                    :   :                    ~SE*49        *80043177 ~GE*1     *028428433~IEA*1    *009430636~',
  detalles: [
    {
      caPaciente: '6',
      apPaternoPaciente: 'RAMOS',
      noPaciente: 'JUAN',
      coAfPaciente: '0009209882',
      apMaternoPaciente: 'ISLA',
      coEsPaciente: '6',
      tiDoPaciente: '1',
      nuDoPaciente: '16774765',
      nuContratoPaciente: '666108',
      coProducto: 'R',
      coDescripcion: 'SEGURO COMPLEM. TRABAJO DE RIESGO',
      nuSCTR: '',
      coParentesco: '1',
      nuPlan: '20',
      feNacimiento: '19761109',
      genero: '1',
      esMarital: '1',
      tiCaContratante: '',
      noPaContratante: 'AGRICOLA CERRO PRIETO S.A.',
      noContratante: 'AGRICOLA CERRO PRIETO S.A. AGRICOLA',
      noMaContratante: 'AGRICOLA CERRO PRIETO S.A.',
      tiDoContratante: '2',
      idReContratante: 'XX5',
      coReContratante: '20461642706',
    },
    {
      caPaciente: '6',
      apPaternoPaciente: 'RAMOS',
      noPaciente: 'JUAN JOSE',
      coAfPaciente: '0009276729',
      apMaternoPaciente: 'LOBATON',
      coEsPaciente: '6',
      tiDoPaciente: '1',
      nuDoPaciente: '40823681',
      nuContratoPaciente: '669128',
      coProducto: 'R',
      coDescripcion: 'SEGURO COMPLEM. TRABAJO DE RIESGO',
      nuSCTR: '',
      coParentesco: '1',
      nuPlan: '20',
      feNacimiento: '19801230',
      genero: '1',
      esMarital: '1',
      tiCaContratante: '',
      noPaContratante: 'MUNICIPALIDAD DE SANTIAGO DE SURCO',
      noContratante: 'MUNICIPALIDAD DE SANTIAGO DE SURCO',
      noMaContratante: 'MUNICIPALIDAD DE SANTIAGO DE SURCO',
      tiDoContratante: '2',
      idReContratante: 'XX5',
      coReContratante: '20131367423',
    },
    {
      caPaciente: '6',
      apPaternoPaciente: 'RAMOS',
      noPaciente: 'JUAN',
      coAfPaciente: '0009494837',
      apMaternoPaciente: 'NUÑEZ',
      coEsPaciente: '6',
      tiDoPaciente: '1',
      nuDoPaciente: '20719533',
      nuContratoPaciente: '821742',
      coProducto: 'R',
      coDescripcion: 'SEGURO COMPLEM. TRABAJO DE RIESGO',
      nuSCTR: '',
      coParentesco: '1',
      nuPlan: '20',
      feNacimiento: '19681227',
      genero: '1',
      esMarital: '1',
      tiCaContratante: '',
      noPaContratante: 'TRANSPORTES Y SERVICIOS DINAMO E.I.R.L. - TRASERDIN E.I.R.L.',
      noContratante: 'TRANSPORTES Y SERVICIOS DINAMO E.I.',
      noMaContratante: 'TRANSPORTES Y SERVICIOS DINAMO E.I.R.L. - TRASERDIN E.I.R.L.',
      tiDoContratante: '2',
      idReContratante: 'XX5',
      coReContratante: '20517635058',
    },
    {
      caPaciente: '6',
      apPaternoPaciente: 'RAMOS',
      noPaciente: 'JUAN RUPERTO',
      coAfPaciente: '0009473240',
      apMaternoPaciente: 'DURAND',
      coEsPaciente: '6',
      tiDoPaciente: '1',
      nuDoPaciente: '44741346',
      nuContratoPaciente: '367003',
      coProducto: 'R',
      coDescripcion: 'SEGURO COMPLEM. TRABAJO DE RIESGO',
      nuSCTR: '',
      coParentesco: '1',
      nuPlan: '20',
      feNacimiento: '19860429',
      genero: '1',
      esMarital: '1',
      tiCaContratante: '',
      noPaContratante: 'ECO-RIN S.A.C.',
      noContratante: 'ECO-RIN S.A.C. ECO-RIN S.A.C.',
      noMaContratante: 'ECO-RIN S.A.C.',
      tiDoContratante: '2',
      idReContratante: 'XX5',
      coReContratante: '20523354851',
    },
  ],
}

const responseData = ref<ConsultaAsegNomResponse | null>(sampleResponse)

const enviarConsulta = async () => {
  if (!formData.apatern.trim()) {
    if (!formData.tiDoPaciente.trim() || !formData.nuDoPaciente.trim()) {
      error.value = 'Si no se envía apatern, tiDoPaciente y nuDoPaciente son obligatorios.'
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
</script>

<template>
  <section class="module-view">
    <h1>ConsultaAsegNom</h1>
    <p class="muted">
      Consulta los datos dela asegurado por nombre o documento 
      <!-- <code>{{ apiBaseUrl }}{{ endpoint }}</code>. La respuesta se muestra en el resumen y la tabla
      de detalles. -->
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
                <th>caPaciente</th>
                <th>Paciente</th>
                <th>Doc</th>
                <th>Contrato</th>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Nacimiento</th>
                <th>Parentesco</th>
                <th>Contratante</th>
              </tr>
            </thead>
            <tbody v-if="responseData?.detalles?.length && !error">
              <tr v-for="(detalle, index) in responseData.detalles" :key="index">
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
                <td colspan="9" class="muted">Aún no hay detalles.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
