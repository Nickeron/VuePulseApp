<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>(null);
(async () => {
    const { data, error } = await supabase.from('tasks').select('*')
    if (error) {
        console.log(error)
    } else {
        tasks.value = data
    }
})()
</script>

<template>
    <div>
        <h1>Tasks</h1>
        <RouterLink to="/">Go Home</RouterLink>
        <ul>
            <li v-for="task in tasks" :key="task.id">
                <RouterLink :to="`/tasks/${task.id}`">{{ task.name }}</RouterLink>
            </li>
        </ul>
    </div>
</template>
