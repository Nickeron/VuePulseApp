<script setup lang="ts">
import AppErrorPage from '@/components/AppError/AppErrorPage.vue'
import { useErrorStore } from '@/stores/error';

useErrorStore().setError 
</script>

<template>
	<AppErrorPage />
</template>
