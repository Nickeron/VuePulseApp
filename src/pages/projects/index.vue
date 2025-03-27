<script setup lang="ts">
import { useProjectsStore } from '@/stores/loaders/projects';
import { columns } from '@/utils/tableColumns/projectsColumns';

usePageStore().pageData.title = "Projects";

const projectsLoader = useProjectsStore();
const { projects } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;

await getProjects();

const { getGroupedCollabs, groupedCollabs } = useCollabs();

if (projects.value) {
	getGroupedCollabs(projects.value);
}

const columnsWithCollabs = columns(groupedCollabs)
</script>

<template>
	<DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects"></DataTable>
</template>
