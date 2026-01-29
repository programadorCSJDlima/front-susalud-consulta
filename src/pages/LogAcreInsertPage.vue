<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useConsultaAsegNomStore } from '../stores/consulta-aseg-nom.store'
import { useNumAutorizacionStore } from '../stores/num-autorizacion.store'
import { useLogAcreInsertStore } from '../stores/log-acre-insert.store'
import { apiClient } from '../services/apiClient'

const logAcreInsertStore = useLogAcreInsertStore()
const consultaAsegNomStore = useConsultaAsegNomStore()
const numAutorizacionStore = useNumAutorizacionStore()

const { formData } = storeToRefs(logAcreInsertStore)
const { datosPaciente } = storeToRefs(consultaAsegNomStore)
const { resAutDocs } = storeToRefs(numAutorizacionStore)

const x12n = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

watch(
  datosPaciente,
  (paciente) => {
    logAcreInsertStore.updateFromPaciente(paciente || null)
  },
  { immediate: true }
)

watch(
  resAutDocs,
  (docs) => {
    logAcreInsertStore.updateFromResAut(docs)
  },
  { immediate: true }
)

const resetForm = () => {
  logAcreInsertStore.reset()
  logAcreInsertStore.updateFromPaciente(datosPaciente.value || null)
  logAcreInsertStore.updateFromResAut(resAutDocs.value)
}

const generarX12n = async () => {
  loading.value = true
  error.value = null
  x12n.value = ''
  try {
    const fd = formData.value
    const payload = {
      noTransaccion: fd.NoTransaccion,
      idRemitente: fd.IdRemitente,
      idReceptor: fd.IdReceptor,
      feTransaccion: fd.FeTransaccion,
      hoTransaccion: fd.HoTransaccion,
      idCorrelativo: fd.IdCorrelativo,
      idTransaccion: fd.IdTransaccion,
      tiFinalidad: fd.TiFinalidad,
      caRemitente: fd.CaRemitente,
      nuRucRemitente: fd.NuRucRemitente,
      caReceptor: fd.CaReceptor,
      caPaciente: fd.CaPaciente,
      apPaternoPaciente: fd.ApPaternoPaciente,
      noPaciente: fd.NoPaciente,
      coAfPaciente: fd.CoAfPaciente,
      apMaternoPaciente: fd.ApMaternoPaciente,
      coEsPaciente: fd.CoEsPaciente,
      tiDoPaciente: fd.TiDoPaciente,
      nuDoPaciente: fd.NuDoPaciente,
      nuContratoPaciente: fd.NuContratoPaciente,
      coTiPolizaAfiliacion: fd.CoTiPolizaAfiliacion,
      coProducto: fd.CoProducto,
      nuPlan: fd.NuPlan,
      coParentesco: fd.CoParentesco,
      feNacimiento: fd.FeNacimiento,
      genero: fd.Genero,
      feIniVigencia: fd.FeIniVigencia,
      nuCobertura: fd.NuCobertura,
      deCobertura: fd.DeCobertura,
      caContratante: fd.CaContratante,
      tiDoContratante: fd.TiDoContratante,
      idReContratante: fd.IdReContratante,
      rucContratante: fd.RucContratante,
      coAfiliadoTitular: fd.CoAfiliadoTitular,
      caResponsableAut: fd.CaResponsableAut,
      noPaResponsableAut: fd.NoPaResponsableAut,
      noResponsableAut: fd.NoResponsableAut,
      noMaResponsableAut: fd.NoMaResponsableAut,
      tiDoResponsableAut: fd.TiDoResponsableAut,
      nuDoResponsableAut: fd.NuDoResponsableAut,
      nuAutorizacion: fd.NuAutorizacion,
      feHoAutorizacion: fd.FeHoAutorizacion,
      beMaxInicial: fd.BeMaxInicial,
      coPagoFijo: fd.CoPagoFijo,
      coPagoVariable: fd.CoPagoVariable,
      flagCartaGarantia: fd.FlagCartaGarantia,
      deFlagCartaGarantia: fd.DeFlagCartaGarantia,
    }
    const data = await apiClient.post<{ x12n: string } | string>('/generarLogAcreInsert', payload)
    x12n.value = typeof data === 'string' ? data : data?.x12n || ''
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="module-view">
    <h1>LogAcreInsert</h1>
    <p class="muted">
      Completa los campos del log de acreencia. Se precargan datos del paciente seleccionado y la
      autorizacion obtenida.
    </p>

    <div class="actions">
      <div v-if="x12n" class="x12n-box">
        <p class="muted small">X12N generado</p>
        <pre class="code-block">{{ x12n }}</pre>
      </div>
      <button class="btn" type="button" :disabled="loading" @click="generarX12n">
        {{ loading ? 'Generando...' : 'Generar X12N' }}
      </button>
      <button class="btn ghost" type="button" @click="resetForm">Restablecer valores por defecto</button>
      <p v-if="error" class="error-text">Error: {{ error }}</p>
    </div>

    <div class="form-grid">
      <label class="field">
        <span class="field-label">NoTransaccion</span>
        <input v-model="formData.NoTransaccion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">IdRemitente</span>
        <input v-model="formData.IdRemitente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">IdReceptor</span>
        <input v-model="formData.IdReceptor" class="input" />
      </label>
      <label class="field">
        <span class="field-label">FeTransaccion</span>
        <input v-model="formData.FeTransaccion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">HoTransaccion</span>
        <input v-model="formData.HoTransaccion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">IdCorrelativo</span>
        <input v-model="formData.IdCorrelativo" class="input" />
      </label>
      <label class="field">
        <span class="field-label">IdTransaccion</span>
        <input v-model="formData.IdTransaccion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">TiFinalidad</span>
        <input v-model="formData.TiFinalidad" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CaRemitente</span>
        <input v-model="formData.CaRemitente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuRucRemitente</span>
        <input v-model="formData.NuRucRemitente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CaReceptor</span>
        <input v-model="formData.CaReceptor" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CaPaciente</span>
        <input v-model="formData.CaPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">ApPaternoPaciente</span>
        <input v-model="formData.ApPaternoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NoPaciente</span>
        <input v-model="formData.NoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoAfPaciente</span>
        <input v-model="formData.CoAfPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">ApMaternoPaciente</span>
        <input v-model="formData.ApMaternoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoEsPaciente</span>
        <input v-model="formData.CoEsPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">TiDoPaciente</span>
        <input v-model="formData.TiDoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuDoPaciente</span>
        <input v-model="formData.NuDoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuContratoPaciente</span>
        <input v-model="formData.NuContratoPaciente" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoTiPolizaAfiliacion</span>
        <input v-model="formData.CoTiPolizaAfiliacion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoProducto</span>
        <input v-model="formData.CoProducto" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuPlan</span>
        <input v-model="formData.NuPlan" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoParentesco</span>
        <input v-model="formData.CoParentesco" class="input" />
      </label>
      <label class="field">
        <span class="field-label">FeNacimiento</span>
        <input v-model="formData.FeNacimiento" class="input" />
      </label>
      <label class="field">
        <span class="field-label">Genero</span>
        <input v-model="formData.Genero" class="input" />
      </label>
      <label class="field">
        <span class="field-label">FeIniVigencia</span>
        <input v-model="formData.FeIniVigencia" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuCobertura</span>
        <input v-model="formData.NuCobertura" class="input" />
      </label>
      <label class="field">
        <span class="field-label">DeCobertura</span>
        <input v-model="formData.DeCobertura" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CaContratante</span>
        <input v-model="formData.CaContratante" class="input" />
      </label>
      <label class="field">
        <span class="field-label">TiDoContratante</span>
        <input v-model="formData.TiDoContratante" class="input" />
      </label>
      <label class="field">
        <span class="field-label">IdReContratante</span>
        <input v-model="formData.IdReContratante" class="input" />
      </label>
      <label class="field">
        <span class="field-label">RucContratante</span>
        <input v-model="formData.RucContratante" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoAfiliadoTitular</span>
        <input v-model="formData.CoAfiliadoTitular" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CaResponsableAut</span>
        <input v-model="formData.CaResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NoPaResponsableAut</span>
        <input v-model="formData.NoPaResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NoResponsableAut</span>
        <input v-model="formData.NoResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NoMaResponsableAut</span>
        <input v-model="formData.NoMaResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">TiDoResponsableAut</span>
        <input v-model="formData.TiDoResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuDoResponsableAut</span>
        <input v-model="formData.NuDoResponsableAut" class="input" />
      </label>
      <label class="field">
        <span class="field-label">NuAutorizacion</span>
        <input v-model="formData.NuAutorizacion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">FeHoAutorizacion</span>
        <input v-model="formData.FeHoAutorizacion" class="input" />
      </label>
      <label class="field">
        <span class="field-label">BeMaxInicial</span>
        <input v-model="formData.BeMaxInicial" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoPagoFijo</span>
        <input v-model="formData.CoPagoFijo" class="input" />
      </label>
      <label class="field">
        <span class="field-label">CoPagoVariable</span>
        <input v-model="formData.CoPagoVariable" class="input" />
      </label>
      <label class="field">
        <span class="field-label">FlagCartaGarantia</span>
        <input v-model="formData.FlagCartaGarantia" class="input" />
      </label>
      <label class="field">
        <span class="field-label">DeFlagCartaGarantia</span>
        <input v-model="formData.DeFlagCartaGarantia" class="input" />
      </label>
    </div>

    <div class="output">
      <p class="muted small">Payload generado</p>
      <pre class="code-block">{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </section>
</template>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 12px 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 13px;
  color: var(--muted, #64748b);
}

.x12n-box {
  width: 100%;
  max-height: 280px;
  overflow: auto;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.actions .btn {
  align-self: flex-start;
}
</style>
