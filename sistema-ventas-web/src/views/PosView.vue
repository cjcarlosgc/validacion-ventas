<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '../components/features/pos/components/ProductCard.vue'
import CartWidget from '../components/features/pos/components/CartWidget.vue'
import { usePosCart, type Producto } from '../components/features/pos/composables/usePosCart'

// Datos demo
const productosDemo = ref<Producto[]>([
  { id: 1, name: 'Laptop Core i7 Gen 13', price: 3499, stock: 8, image: '💻' },
  { id: 2, name: 'Monitor Gamer 27" 165Hz', price: 899, stock: 12, image: '🖥️' },
  { id: 3, name: 'Teclado Mecánico RGB', price: 249, stock: 25, image: '⌨️' },
  { id: 4, name: 'Mouse Gamer 16000 DPI', price: 159, stock: 30, image: '🖱️' },
  { id: 5, name: 'Auriculares HyperX Cloud', price: 319, stock: 15, image: '🎧' },
])

// Lógica del carrito
const { 
  carrito, subtotal, igv, total, mensaje, cantidadTotal, 
  agregarAlCarrito, agregarAlCarritoPorId, quitarDelCarrito, procesarVenta 
} = usePosCart(productosDemo)

// Buscador
const searchQuery = ref('')
const productosFiltrados = computed(() =>
  productosDemo.value.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

// Función Logout
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}
</script>

<template>
  <div class="pos-container">
    <header class="pos-header">
      <div class="brand-block">
        <div class="brand-mark" aria-label="Logo del negocio">ADN</div>
        <div>
          <p class="brand-kicker">ADN Software</p>
          <h1 class="brand-title">Punto de Venta</h1>
          <p class="brand-copy">Venta rápida, stock en tiempo real y carrito fijo para operar con claridad.</p>
        </div>
      </div>

      <div class="header-actions">
        <label class="search-box">
          <span>🔎</span>
          <input v-model="searchQuery" type="search" placeholder="Buscar producto" />
        </label>

        <button @click="logout" class="btn-logout" aria-label="Cerrar sesión">Salir</button>
        
        <div class="session-chip" aria-label="Usuario de sesión">AU</div>
      </div>
    </header>

    <main class="pos-layout">
      <section class="pos-panel pos-panel--catalog">
        <div class="panel-heading">
          <div>
            <p class="panel-label">Catálogo</p>
            <h2 class="panel-title">Productos disponibles</h2>
          </div>
          <span class="chip">{{ productosFiltrados.length }} visibles</span>
        </div>

        <div v-if="productosFiltrados.length" class="pos-grid">
          <ProductCard
            v-for="prod in productosFiltrados"
            :key="prod.id"
            :producto="prod"
            @agregar="agregarAlCarrito(prod)"
          />
        </div>

        <div v-else class="empty-state">
          <p>No se encontraron productos con ese nombre.</p>
        </div>
      </section>

      <aside class="pos-panel pos-panel--cart">
        <div class="cart-summary-header">
          <div>
            <p class="panel-label">Carrito</p>
            <h3 class="cart-title">Resumen de compra</h3>
          </div>
          <span class="chip chip--success">{{ carrito.length }} ítems</span>
        </div>

        <CartWidget
          :carrito="carrito"
          :subtotal="subtotal"
          :igv="igv"
          :total="total"
          :mensaje="mensaje"
          @quitar="quitarDelCarrito"
          @agregar="agregarAlCarritoPorId"
          @procesar="procesarVenta"
        />
      </aside>
    </main>
  </div>
</template>

<style scoped src="../components/features/pos/styles/pos-view.css"></style>