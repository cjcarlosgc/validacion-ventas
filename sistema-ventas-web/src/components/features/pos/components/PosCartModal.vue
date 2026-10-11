<script setup lang="ts">
import CartWidget from './CartWidget.vue'

defineProps<{
  show: boolean
  carrito: any[]
  subtotal: number
  igv: number
  total: number
  mensaje?: string
}>()

const emit = defineEmits(['close', 'quitar', 'agregar', 'procesar'])
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
    <section class="modal-card" role="dialog" aria-modal="true" aria-label="Carrito de venta">
      <header class="modal-header">
        <div>
          <p class="modal-eyebrow">Resumen profesional</p>
          <h3 class="modal-title">Carrito de venta</h3>
          <p class="modal-copy">Revisa el detalle de la compra antes de confirmar.</p>
        </div>
        <button class="modal-close" type="button" @click="emit('close')" aria-label="Cerrar carrito">×</button>
      </header>

      <CartWidget
        :carrito="carrito"
        :subtotal="subtotal"
        :igv="igv"
        :total="total"
        :mensaje="mensaje"
        @quitar="emit('quitar', $event)"
        @agregar="emit('agregar', $event)"
        @procesar="emit('procesar')"
      />
    </section>
  </div>
</template>

<style scoped src="../styles/pos-cart-modal.css"></style>
