<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="main-wrapper">
    <AppHeader :cantidad-total="0" />
    <main class="page-content">
      <slot /> 
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page-content {
  flex: 1; /* Esto hace que el main siempre ocupe todo el espacio central */
}
</style>