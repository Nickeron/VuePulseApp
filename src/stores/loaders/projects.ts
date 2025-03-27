import { projectQuery, projectsQuery, type Project, type Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

const projectsKey = 'projects'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (_key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug))

  const validateProjectsCache = () => {
    if (!projects.value) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(projects.value)) {
          loadProjects.delete(projectsKey)
          if (!error) projects.value = data
        }
      })
    }
  }

  const validateProjectCache = (slug: string) => {
    if (!project.value) {
      projectQuery(slug).then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(project.value)) {
          loadProject.delete(slug)
          if (!error) project.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects(projectsKey)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      projects.value = data
    }

    validateProjectsCache()
  }

  const getProject = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      project.value = data
    }

    validateProjectCache(slug)
  }

  return {
    projects,
    project,
    getProjects,
    getProject
  }
})
