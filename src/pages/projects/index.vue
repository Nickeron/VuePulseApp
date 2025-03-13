<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null);
(async () => {
	const { data, error } = await supabase.from('projects').select('*')
	if (error) {
		console.error(error)
	} else {
		projects.value = data
	}
})()
</script>

<template>
	<div>
		<h1>Projects</h1>
		<RouterLink to="/">Go Home</RouterLink>
		<ul>
			<li v-for="project in projects" :key="project.id">
				<RouterLink :to="`/projects/${project.id}`">{{ project.name }}</RouterLink>
			</li>
		</ul>
	</div>
</template>
