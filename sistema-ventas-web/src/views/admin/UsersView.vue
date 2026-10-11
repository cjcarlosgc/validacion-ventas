<script setup lang="ts">
import { onMounted } from 'vue'
import api from '@/services/api' 

const realizarHandshake = async () => {
  try {
    console.log("🚀 Iniciando Handshake con el servidor...");
    
    // Vamos a intentar obtener los usuarios (esta ruta suele ser pública o semi-pública)
    const response = await api.get('/users') 
    
    console.log("✅ ¡Handshake exitoso! El servidor respondió:", response.data)
  } catch (error: any) {
    console.error("❌ Error en el Handshake:")
    
    if (error.response) {
      // El servidor contestó, pero con un error (ej. 401, 403, 404)
      console.error("Estado:", error.response.status)
      console.error("Detalle:", error.response.data)
    } else if (error.request) {
      // El servidor NO contestó (es un problema de red o CORS)
      console.error("El servidor no respondió. ¿Está encendido? ¿Es la URL correcta?")
    } else {
      console.error("Error de configuración:", error.message)
    }
  }
}

onMounted(realizarHandshake)
</script>

<template>
  <div>
    <h1>Probando conexión...</h1>
    <p>Revisa la consola (F12) para ver el resultado.</p>
  </div>
</template>