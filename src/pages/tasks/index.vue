<script setup lang="ts">
import { useErrorStore } from '@/stores/error';
import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries';
import { columns } from '@/utils/tableColumns/tasksColumns';

usePageStore().pageData.title = "Tasks";

const tasks = ref<TasksWithProjects | null>(null);
const getTasks = async () => {
    const { data, error, status } = await tasksWithProjectsQuery;
    if (error) {
        useErrorStore().setError({ error, customCode: status })
    } else {
        tasks.value = data
    }
};

await getTasks();
</script>

<template>
    <DataTable v-if="tasks" :columns="columns" :data="tasks"></DataTable>
</template>
