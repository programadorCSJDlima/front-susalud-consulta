<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import type { ModuleLink } from '../router'

defineProps<{
  links: ModuleLink[]
  open: boolean
}>()

const emit = defineEmits<{
  navigate: []
}>()

const route = useRoute()
</script>

<template>
  <aside :class="['sidebar', { open }]">
    <div class="sidebar-header">
      <div class="icon-circle">
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <rect x="28" y="12" width="8" height="40" rx="4" />
          <rect x="12" y="28" width="40" height="8" rx="4" />
        </svg>
      </div>
      <div class="brand-text">
        <span class="brand-title">Salud</span>
        <span class="brand-subtitle">Consultas</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="nav-item"
        :class="{ active: route.path === link.path }"
        @click="emit('navigate')"
      >
        <span class="nav-dot" />
        <span class="nav-label">{{ link.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>
