<template>
  <BaseLayout v-if="!isPublicPage">
    <RouterView />
  </BaseLayout>

  <RouterView v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from './components/features/layout/BaseLayout.vue'

const route = useRoute()
const isPublicPage = computed(() => route.meta.layout === 'public')
</script>