<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  type ConsultaAsegNomDoc,
  type ConsultaAsegNomPayload,
  useConsultaAsegNomStore,
} from '../stores/consulta-aseg-nom.store'
import { useUtilInputsStore } from '../stores/util-inputs.store'

const consultaAsegNomStore = useConsultaAsegNomStore()
const utilInputsStore = useUtilInputsStore()
const { response, loading, error } = storeToRefs(consultaAsegNomStore)
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)
const expandedDocIndex = ref<number | null>(null)

const formData = reactive<ConsultaAsegNomPayload>({
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: consultaNomCoIafa.value,
  apatern: 'RAMOS',
  amatern: '',
  name: 'JUAN',
  tiDoPaciente: '',
  nuDoPaciente: '',
})

watch(
  () => formData.coIafa,
  value => {
    if (value !== consultaNomCoIafa.value) {
      utilInputsStore.setConsultaNomCoIafa(value)
    }
  }
)

watch(
  consultaNomCoIafa,
  value => {
    if (value !== formData.coIafa) {
      formData.coIafa = value
    }
  }
)

const enviarConsulta = async () => {
  expandedDocIndex.value = null
  await consultaAsegNomStore.consultarPorNombre({ ...formData })
}

const toggleDetalles = (index: number) => {
  const newIndex = expandedDocIndex.value === index ? null : index
  expandedDocIndex.value = newIndex
  if (newIndex !== null) {
    consultaAsegNomStore.seleccionarPaciente(index)
  }
}

const seleccionarDetalle = (docIndex: number, detalleIndex: number) => {
  consultaAsegNomStore.seleccionarPaciente(docIndex, detalleIndex)
}

const getDetalleList = (doc: ConsultaAsegNomDoc) => {
  return doc.inConNom271Detalles?.length ? doc.inConNom271Detalles : doc.detalles || []
}
</script>

<template>
  <section class="module-view">
    <h1>ConsultaAsegNom</h1>
    <p class="muted">Consulta los datos del asegurado por nombre o documento.</p>

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

        <div v-if="response && !error" class="summary-grid">
          <div class="summary-item">
            <p class="muted small">coError</p>
            <p class="summary-value">{{ response.coError }}</p>
          </div>
          <div class="summary-item">
            <p class="muted small">txNombre</p>
            <p class="summary-value">{{ response.txNombre }}</p>
          </div>
          <div class="summary-item">
            <p class="muted small">coIafa</p>
            <p class="summary-value">{{ response.coIafa }}</p>
          </div>
        </div>

        <div v-if="response && !error" class="output">
          <p class="muted small">txRespuesta (EDI crudo)</p>
          <pre class="code-block">{{ response.txRespuesta }}</pre>
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
            <tbody v-if="response?.resultNomDoc?.length && !error">
              <template v-for="(doc, index) in response.resultNomDoc" :key="doc.idCorrelativo || index">
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
                          <tr
                            v-for="(detalle, detailIndex) in getDetalleList(doc)"
                            :key="detailIndex"
                            class="clickable-row"
                            @click.stop="seleccionarDetalle(index, detailIndex)"
                          >
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
