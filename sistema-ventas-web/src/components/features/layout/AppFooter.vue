<script setup lang="ts">
// Lógica simple para el footer profesional
const version = '3.0.4';
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span class="status-dot"></span>
        ADN Software POS <span class="version-tag">v{{ version }}</span>
      </div>
      
      <div class="footer-center">
        Sistema de Gestión Comercial - Agencia ADN
      </div>

      <div class="footer-right">
        &copy; {{ currentYear }} Todos los derechos reservados
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  color: #94a3b8;
  padding: 12px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #cbd5e1;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.version-tag {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.footer-center {
  opacity: 0.7;
}

.footer-right {
  font-weight: 500;
}
</style>