<script setup lang="ts">
import type { Producto } from '../composables/usePosCart'

defineProps<{ producto: Producto }>()
const emit = defineEmits(['agregar'])
</script>

<template>
  <article class="product-card">
    <span class="product-badge" :class="{ 'product-badge--out': producto.stock === 0 }">
      {{ producto.stock > 0 ? 'Disponible' : 'Sin stock' }}
    </span>
    <div class="product-emoji">{{ producto.image }}</div>
    <h4 class="product-name">{{ producto.name }}</h4>
    <p class="product-price">S/. {{ producto.price.toFixed(2) }}</p>
    <small class="product-stock">Stock: {{ producto.stock }} u.</small>
    <button
      @click="emit('agregar')"
      class="btn-add"
      :disabled="producto.stock <= 0"
    >
      {{ producto.stock > 0 ? 'Agregar' : 'Agotado' }}
    </button>
  </article>
</template>

<style scoped src="../styles/product-card.css"></style>