<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { moduleRoutes } from './router'
import { createDefaultCatalogSyncPayload, syncCatalogos } from './services/catalogService'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const isSidebarOpen = ref(false)
const catalogSyncing = ref(false)
const catalogSyncError = ref<string | null>(null)
const catalogSyncSuccess = ref(false)
const catalogPayload = reactive(createDefaultCatalogSyncPayload())

const handleNavigate = () => {
  isSidebarOpen.value = false
}

const handleCatalogSync = async () => {
  if (catalogSyncing.value) return
  catalogSyncError.value = null
  catalogSyncSuccess.value = false

  try {
    catalogSyncing.value = true
    await syncCatalogos({ ...catalogPayload })
    catalogSyncSuccess.value = true
    toast.success('Catálogos actualizados correctamente. Puedes continuar trabajando.')
  } catch (error) {
    const friendlyMessage =
      'No pudimos actualizar los catálogos. Inténtalo nuevamente en unos minutos.'
    catalogSyncError.value = friendlyMessage
    toast.error(friendlyMessage)
    console.error('Error al sincronizar catálogos', error)
  } finally {
    catalogSyncing.value = false
  }
}

const catalogButtonLabel = computed(() =>
  catalogSyncing.value ? 'Sincronizando...' : 'Catalogos',
)

const catalogButtonTitle = computed(() => {
  if (catalogSyncError.value) return `Error: ${catalogSyncError.value}`
  if (catalogSyncSuccess.value)
    return 'Catálogos actualizados correctamente. Puedes continuar trabajando.'
  return 'Sincronizar catálogos'
})
</script>

<template>
  <div class="app-shell">
    <Sidebar :links="moduleRoutes" :open="isSidebarOpen" @navigate="handleNavigate" />

    <main class="content">
      <header class="top-bar">
        <button class="menu-toggle" type="button" @click="isSidebarOpen = !isSidebarOpen">
          <span class="sr-only">Abrir menú</span>
          ☰
        </button>
        <div class="top-bar-right">
          <div class="catalog-inputs" aria-label="Parámetros de catálogos">
            <label class="sr-only" for="catalog-nu-version">Versión de catálogos</label>
            <input
              id="catalog-nu-version"
              v-model="catalogPayload.nuVersion"
              class="catalog-input"
              type="text"
              placeholder="Versión"
            />
            <label class="sr-only" for="catalog-no-archivo">Nombre del archivo</label>
            <input
              id="catalog-no-archivo"
              v-model="catalogPayload.noArchivo"
              class="catalog-input"
              type="text"
              placeholder="Archivo"
            />
          </div>
          <button
            class="btn catalog-button"
            type="button"
            :disabled="catalogSyncing"
            :aria-busy="catalogSyncing ? 'true' : undefined"
            :title="catalogButtonTitle"
            @click="handleCatalogSync"
          >
            {{ catalogButtonLabel }}
          </button>
          <span v-if="catalogSyncError" class="sr-only" role="status">
            Error al actualizar catálogos: {{ catalogSyncError }}
          </span>
          <div class="brand-inline">
            <div class="icon-circle">
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                <rect x="28" y="12" width="8" height="40" rx="4" />
                <rect x="12" y="28" width="40" height="8" rx="4" />
              </svg>
            </div>
            <div class="brand-text">
              <span class="brand-title">Salud</span>
              <span class="brand-subtitle">consultas</span>
            </div>
          </div>
        </div>
      </header>

      <section class="view-area">
        <RouterView />
      </section>
    </main>

    <div
      v-if="isSidebarOpen"
      class="backdrop"
      role="presentation"
      @click="isSidebarOpen = false"
    />
  </div>
</template>
