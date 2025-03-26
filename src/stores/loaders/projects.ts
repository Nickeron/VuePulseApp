import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
const projectsKey = 'projects'
export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const loadProjects = useMemoize(async (_key: string) => await projectsQuery)

  const validateCache = () => {
    if (!projects.value) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(data) !== JSON.stringify(projects.value)) {
          loadProjects.delete(projectsKey)
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects(projectsKey)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      projects.value = data
    }

    validateCache()
  }

  return {
    projects,
    getProjects
  }
})
