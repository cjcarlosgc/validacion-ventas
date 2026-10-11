import { computed, ref, type Ref } from 'vue'

export interface Producto {
  id: number
  name: string
  price: number
  stock: number
  image: string
}

export interface ItemCarrito {
  id: number
  name: string
  price: number
  quantity: number
}

export function usePosCart(productos: Ref<Producto[]>) {
  const carrito = ref<ItemCarrito[]>([])
  const mensaje = ref('')

  const subtotal = computed(() =>
    carrito.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const igv = computed(() => subtotal.value * 0.18)
  const total = computed(() => subtotal.value + igv.value)

  const cantidadTotal = computed(() =>
    carrito.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const agregarAlCarrito = (producto: Producto) => {
    const productoEnCatalogo = productos.value.find((entry) => entry.id === producto.id)

    if (!productoEnCatalogo || productoEnCatalogo.stock <= 0) {
      mensaje.value = `No hay stock disponible para ${producto.name}.`
      return
    }

    const item = carrito.value.find((entry) => entry.id === producto.id)

    if (item) {
      if (item.quantity >= productoEnCatalogo.stock) {
        mensaje.value = `Solo quedan ${productoEnCatalogo.stock} unidades de ${producto.name}.`
        return
      }

      item.quantity += 1
    } else {
      carrito.value.push({
        id: producto.id,
        name: producto.name,
        price: producto.price,
        quantity: 1,
      })
    }

    productoEnCatalogo.stock -= 1
    mensaje.value = `${producto.name} agregado al carrito.`
  }

  const agregarAlCarritoPorId = (id: number) => {
    const producto = productos.value.find((entry) => entry.id === id)

    if (producto) {
      agregarAlCarrito(producto)
      return
    }

    mensaje.value = 'No se encontró el producto seleccionado.'
  }

  const quitarDelCarrito = (id: number) => {
    const item = carrito.value.find((entry) => entry.id === id)
    const productoEnCatalogo = productos.value.find((entry) => entry.id === id)

    if (!item || !productoEnCatalogo) return

    if (item.quantity > 1) {
      item.quantity -= 1
      productoEnCatalogo.stock += 1
      mensaje.value = 'Cantidad actualizada.'
      return
    }

    productoEnCatalogo.stock += item.quantity
    carrito.value = carrito.value.filter((entry) => entry.id !== id)
    mensaje.value = 'Producto eliminado del carrito.'
  }

  const procesarVenta = () => {
    if (carrito.value.length === 0) {
      mensaje.value = 'Agrega productos antes de confirmar la venta.'
      return
    }

    window.alert(`¡Venta procesada! Total: S/. ${total.value.toFixed(2)}`)
    carrito.value = []
    mensaje.value = 'Venta confirmada correctamente.'
  }

  return {
    carrito,
    cantidadTotal,
    mensaje,
    subtotal,
    igv,
    total,
    agregarAlCarrito,
    agregarAlCarritoPorId,
    quitarDelCarrito,
    procesarVenta,
  }
}
