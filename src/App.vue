<script setup lang="ts">
import AppErrorPage from './components/AppError/AppErrorPage.vue';

const errorStore = useErrorStore();

onErrorCaptured((error) => { errorStore.setError({ error }) });

onMounted(() => {
  useAuthStore().trackAuthChanges();
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback>
          <span>Loading...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>