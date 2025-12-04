<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { moduleRoutes } from './router'

const isSidebarOpen = ref(false)

const handleNavigate = () => {
  isSidebarOpen.value = false
}
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
