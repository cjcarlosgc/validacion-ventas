<script setup lang="ts">
// Recuerda: sin importar defineProps ni defineEmits
const emit = defineEmits(['openCart'])
defineProps<{ cantidadTotal: number }>()
</script>

<template>
  <header class="pos-header">
    <div class="logo-group">
      <h1>ADN Software</h1>
    </div>
    <div class="search-wrapper">
      <input type="search" placeholder="Buscar productos..." />
    </div>
    <button @click="emit('openCart')" class="cart-trigger">
      🛒 Carrito <span v-if="cantidadTotal > 0" class="badge">{{ cantidadTotal }}</span>
    </button>
  </header>
</template>

<style scoped src="./AppHeader.css"></style>