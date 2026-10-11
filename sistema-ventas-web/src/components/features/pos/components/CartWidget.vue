<script setup lang="ts">
defineProps<{
  carrito: any[]
  subtotal: number
  igv: number
  total: number
  mensaje?: string
}>()

const emit = defineEmits(['quitar', 'agregar', 'procesar'])
</script>

<template>
  <div class="cart-container">
    <header class="cart-header">
      <div>
        <h3 class="cart-title">Detalle de Venta</h3>
        <p class="cart-caption">Resumen rápido del pedido actual.</p>
      </div>
      <div class="cart-chips">
        <span class="cart-chip">IGV 18%</span>
        <span class="cart-chip">POS</span>
      </div>
    </header>

    <div v-if="carrito.length === 0" class="empty">El carrito está vacío.</div>

    <div v-else class="list">
      <article v-for="item in carrito" :key="item.id" class="item">
        <div class="item-info">
          <h5>{{ item.name }}</h5>
          <small>S/. {{ item.price.toFixed(2) }} × {{ item.quantity }}</small>
        </div>

        <div class="actions">
          <button @click="emit('quitar', item.id)" class="btn-qty" aria-label="Quitar unidad">−</button>
          <span class="qty-value">{{ item.quantity }}</span>
          <button @click="emit('agregar', item.id)" class="btn-qty" aria-label="Agregar unidad">+</button>
        </div>
      </article>
    </div>

    <div class="totals">
      <div class="summary-row"><span>Subtotal</span><strong>S/. {{ subtotal.toFixed(2) }}</strong></div>
      <div class="summary-row"><span>IGV</span><strong>S/. {{ igv.toFixed(2) }}</strong></div>
      <div class="summary-row summary-row--total"><span>Total</span><strong>S/. {{ total.toFixed(2) }}</strong></div>
      <button @click="emit('procesar')" :disabled="carrito.length === 0" class="btn-pay">Confirmar Venta</button>
    </div>

    <p v-if="mensaje" class="cart-message">{{ mensaje }}</p>
  </div>
</template>

<style scoped src="../styles/cart-widget.css"></style>