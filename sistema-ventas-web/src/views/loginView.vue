<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const email = ref('admin@gmail.com')
const password = ref('12345678')
const name = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const isRegistering = ref(false)

const isValid = computed(() => email.value.trim().length > 0 && password.value.trim().length >= 6)

const isValidRegister = computed(() => {
  return name.value.trim().length >= 2 &&
    email.value.trim().length > 0 &&
    password.value.trim().length >= 8 &&
    password.value === confirmPassword.value
})

const storeSession = (payload) => {
  const role = (payload.user?.role || 'user').toLowerCase()

  localStorage.setItem('token', payload.token)
  localStorage.setItem('userRole', role)
  localStorage.setItem('user', JSON.stringify(payload.user))

  return role
}

const login = async () => {
  if (!isValid.value) {
    alert('Ingresa un correo válido y una contraseña de al menos 6 caracteres.')
    return
  }

  loading.value = true

  try {
    const response = await api.post('/auth/login', {
      email: email.value.trim(),
      password: password.value
    })

    const role = storeSession(response.data)

    router.push(role === 'admin' ? '/usuarios' : '/pos')
  } catch (error) {
    const message = error?.response?.data?.message || 'No se pudo iniciar sesión. Revisa la conexión con el backend.'
    alert(message)
  } finally {
    loading.value = false
  }
}

const register = async () => {
  if (!isValidRegister.value) {
    alert('Completa tu nombre, un correo válido, una contraseña de al menos 8 caracteres y confirma la contraseña.')
    return
  }

  loading.value = true

  try {
    const response = await api.post('/auth/register', {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      password_confirmation: confirmPassword.value
    })

    const role = storeSession(response.data)

    router.push(role === 'admin' ? '/usuarios' : '/pos')
  } catch (error) {
    const message = error?.response?.data?.message || 'No se pudo iniciar sesión. Revisa la conexión con el backend.'
    alert(message)
  } finally {
    loading.value = false
  }
}

const submit = async () => {
  if (isRegistering.value) {
    await register()
    return
  }

  await login()
}

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
}
</script>

<template>
  <section class="login-shell">
    <article class="login-card">
      <h2>{{ isRegistering ? 'Crear cuenta' : 'Bienvenido' }}</h2>
      <p>{{ isRegistering ? 'Registra un usuario nuevo para entrar al POS.' : 'Ingresa tus credenciales para acceder al POS.' }}</p>

      <label v-if="isRegistering" class="login-field">
        <span>Nombre</span>
        <input v-model="name" type="text" placeholder="Tu nombre completo" />
      </label>

      <label class="login-field">
        <span>Correo</span>
        <input v-model="email" type="email" placeholder="usuario@correo.com" />
      </label>

      <label class="login-field">
        <span>Contraseña</span>
        <input v-model="password" type="password" placeholder="••••••••" />
      </label>

      <label v-if="isRegistering" class="login-field">
        <span>Confirmar contraseña</span>
        <input v-model="confirmPassword" type="password" placeholder="Repite tu contraseña" />
      </label>

      <button class="login-button" :disabled="loading" @click="submit">
        {{ loading ? (isRegistering ? 'Creando usuario...' : 'Ingresando...') : (isRegistering ? 'Crear cuenta' : 'Ingresar') }}
      </button>

      <button class="login-button secondary" type="button" @click="toggleMode">
        {{ isRegistering ? 'Ya tengo cuenta' : '¿No tienes cuenta? Crear una' }}
      </button>

      <p class="login-note">Si no puedes entrar, revisa que el backend esté corriendo.</p>
    </article>
  </section>
</template>

<style scoped src="@/components/features/auth/LoginCard.css"></style>