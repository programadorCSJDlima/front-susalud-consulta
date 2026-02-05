<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  useConsultaAsegCodStore,
  type ConsultaAsegCodDoc,
  type ConsultaAsegCodPayload,
} from '../stores/consulta-aseg-cod.store'
import { useUtilInputsStore } from '../stores/util-inputs.store'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'

type DocInfoEntry = {
  label: string
  value: string | null
}

const consultaAsegCodStore = useConsultaAsegCodStore()
const { response, loading, error } = storeToRefs(consultaAsegCodStore)
const expandedDocIndex = ref<number | null>(null)

const utilInputsStore = useUtilInputsStore()
const { consultaNomCoIafa } = storeToRefs(utilInputsStore)

const consultaAsegNomStore = useConsultaAsegNomStore()
const { datosPaciente } = storeToRefs(consultaAsegNomStore)

const currentPaciente = datosPaciente.value

const defaultFormValues: ConsultaAsegCodPayload = {
  coExcepcion: '0000',
  txNombre: '270_CON_ASE',
  coIafa: consultaNomCoIafa.value,
  tipodocument: currentPaciente?.tiDoPaciente ?? '',
  document: currentPaciente?.nuDoPaciente ?? '',
  apPaterno: currentPaciente?.apPaternoPaciente ?? '',
  apMaterno: currentPaciente?.apMaternoPaciente ?? '',
  nombres: currentPaciente?.noPaciente ?? '',
  coAfiliado: currentPaciente?.coAfPaciente ?? '',
  coProducto: currentPaciente?.coProducto ?? '',
  deProducto: currentPaciente?.coDescripcion ?? '',
  coEspecialidad: currentPaciente?.coEsPaciente ?? '',
  coParentesco: currentPaciente?.coParentesco ?? '',
  nuPlan: currentPaciente?.nuPlan ?? '',
  tiCaContratante: currentPaciente?.tiCaContratante ?? '',
  noPaContratante: currentPaciente?.noPaContratante ?? '',
  noContratante: currentPaciente?.noContratante ?? '',
  noMaContratante: currentPaciente?.noMaContratante ?? '',
  tiDoContratante: currentPaciente?.tiDoContratante ?? '',
  coReContratante: currentPaciente?.coReContratante ?? '',
}

const formData = reactive<ConsultaAsegCodPayload>({ ...defaultFormValues })
formData.coIafa = consultaNomCoIafa.value

const populateFormFromPaciente = () => {
  const paciente = datosPaciente.value
  if (!paciente) {
    return
  }

  formData.tipodocument = paciente.tiDoPaciente || formData.tipodocument
  formData.document = paciente.nuDoPaciente || formData.document
  formData.apPaterno = paciente.apPaternoPaciente || formData.apPaterno
  formData.apMaterno = paciente.apMaternoPaciente || formData.apMaterno
  formData.nombres = paciente.noPaciente || formData.nombres
  formData.coAfiliado = paciente.coAfPaciente || formData.coAfiliado
  formData.coProducto = paciente.coProducto || formData.coProducto
  formData.deProducto = paciente.coDescripcion || formData.deProducto
  formData.coEspecialidad = paciente.coEsPaciente || formData.coEspecialidad
  formData.coParentesco = paciente.coParentesco || formData.coParentesco
  formData.nuPlan = paciente.nuPlan || formData.nuPlan
  formData.tiCaContratante = paciente.tiCaContratante || '1'
  formData.noPaContratante = paciente.noPaContratante || formData.noPaContratante
  formData.noContratante = paciente.noContratante || formData.noContratante
  formData.noMaContratante = paciente.noMaContratante || formData.noMaContratante
  formData.tiDoContratante = paciente.tiDoContratante || formData.tiDoContratante
  formData.coReContratante = paciente.coReContratante || formData.coReContratante
}

populateFormFromPaciente()

watch(
  () => formData.coIafa,
  value => {
    if (value !== consultaNomCoIafa.value) {
      utilInputsStore.setConsultaNomCoIafa(value)
    }
  }
)

watch(datosPaciente, () => {
  populateFormFromPaciente()
})

watch(
  consultaNomCoIafa,
  value => {
    if (value !== formData.coIafa) {
      formData.coIafa = value
    }
  }
)


const enviarConsulta = async () => {
  if (!formData.tiCaContratante) {
    formData.tiCaContratante = '1'
  }
  expandedDocIndex.value = null
  await consultaAsegCodStore.consultarPorCodigo({ ...formData })
}

const toggleDetalles = (index: number) => {
  expandedDocIndex.value = expandedDocIndex.value === index ? null : index
}

const getDetalleList = (doc: ConsultaAsegCodDoc) => doc.inConCod271Detalles || []

const docInfoFields: Array<{ key: keyof ConsultaAsegCodDoc; label: string }> = [
  { key: 'noTransaccion', label: 'noTransaccion' },
  { key: 'idRemitente', label: 'idRemitente' },
  { key: 'idReceptor', label: 'idReceptor' },
  { key: 'feTransaccion', label: 'feTransaccion' },
  { key: 'hoTransaccion', label: 'hoTransaccion' },
  { key: 'idCorrelativo', label: 'idCorrelativo' },
  { key: 'idTransaccion', label: 'idTransaccion' },
  { key: 'tiFinalidad', label: 'tiFinalidad' },
  { key: 'caRemitente', label: 'caRemitente' },
  { key: 'userRemitente', label: 'userRemitente' },
  { key: 'passRemitente', label: 'passRemitente' },
  { key: 'feUpFoto', label: 'feUpFoto' },
  { key: 'caReceptor', label: 'caReceptor' },
  { key: 'nuRucReceptor', label: 'nuRucReceptor' },
  { key: 'caPaciente', label: 'caPaciente' },
  { key: 'apPaternoPaciente', label: 'apPaternoPaciente' },
  { key: 'apMaternoPaciente', label: 'apMaternoPaciente' },
  { key: 'noPaciente', label: 'noPaciente' },
  { key: 'coAfPaciente', label: 'coAfPaciente' },
  { key: 'coEsPaciente', label: 'coEsPaciente' },
  { key: 'tiDoPaciente', label: 'tiDoPaciente' },
  { key: 'nuDoPaciente', label: 'nuDoPaciente' },
  { key: 'nuIdenPaciente', label: 'nuIdenPaciente' },
  { key: 'nuContratoPaciente', label: 'nuContratoPaciente' },
  { key: 'nuPoliza', label: 'nuPoliza' },
  { key: 'nuCertificado', label: 'nuCertificado' },
  { key: 'coTiPoliza', label: 'coTiPoliza' },
  { key: 'coProducto', label: 'coProducto' },
  { key: 'deProducto', label: 'deProducto' },
  { key: 'nuPlan', label: 'nuPlan' },
  { key: 'tiPlanSalud', label: 'tiPlanSalud' },
  { key: 'coMoneda', label: 'coMoneda' },
  { key: 'coParentesco', label: 'coParentesco' },
  { key: 'soBeneficio', label: 'soBeneficio' },
  { key: 'nuSoBeneficio', label: 'nuSoBeneficio' },
  { key: 'feNacimiento', label: 'feNacimiento' },
  { key: 'genero', label: 'genero' },
  { key: 'esMarital', label: 'esMarital' },
  { key: 'feIniVigencia', label: 'feIniVigencia' },
  { key: 'feFinVigencia', label: 'feFinVigencia' },
  { key: 'tiCaContratante', label: 'tiCaContratante' },
  { key: 'noPaContratante', label: 'noPaContratante' },
  { key: 'noMaContratante', label: 'noMaContratante' },
  { key: 'noContratante', label: 'noContratante' },
  { key: 'tiDoContratante', label: 'tiDoContratante' },
  { key: 'idReContratante', label: 'idReContratante' },
  { key: 'coReContratante', label: 'coReContratante' },
  { key: 'caTitular', label: 'caTitular' },
  { key: 'noPaTitular', label: 'noPaTitular' },
  { key: 'noMaTitular', label: 'noMaTitular' },
  { key: 'noTitular', label: 'noTitular' },
  { key: 'coAfTitular', label: 'coAfTitular' },
  { key: 'tiDoTitular', label: 'tiDoTitular' },
  { key: 'nuDoTitular', label: 'nuDoTitular' },
  { key: 'feInsTitular', label: 'feInsTitular' },
  { key: 'nuControl', label: 'nuControl' },
  { key: 'nuControlST', label: 'nuControlST' },
]

const getDocInfoEntries = (doc: ConsultaAsegCodDoc): DocInfoEntry[] =>
  docInfoFields.map(field => ({
    label: field.label,
    value: doc[field.key] ?? null,
  }))
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
              <tr>
                <td>tiCaContratante</td>
                <td>
                  <select v-model="formData.tiCaContratante" class="input">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </td>
              </tr>
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
                <th>Paciente</th>
                <th>Documento</th>
                <th>Plan</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody v-if="response?.resultCod?.length && !error">
              <template v-for="(doc, index) in response.resultCod" :key="doc.idCorrelativo || index">
                <tr
                  class="clickable-row"
                  :class="{ 'is-selected': expandedDocIndex === index }"
                  @click="toggleDetalles(index)"
                >
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
                      <p class="muted small">Datos completos del documento</p>
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Campo</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="entry in getDocInfoEntries(doc)" :key="entry.label">
                            <td>{{ entry.label }}</td>
                            <td>{{ entry.value ?? '-' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr v-if="expandedDocIndex === index">
                  <td colspan="7">
                    <div class="table-wrapper response-table details-scroll">
                      <p class="muted small">Beneficios (inConCod271Detalles)</p>
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
  transition: background-color 0.2s ease;
}

.clickable-row:hover,
.clickable-row.is-selected {
  background-color: var(--panel-strong);
}

.details-scroll {
  max-height: 360px;
  overflow-y: auto;
}
</style>
