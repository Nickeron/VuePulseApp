import {
  taskQuery,
  tasksWithProjectsQuery,
  taskUpdateCommand,
  type Task,
  type TasksWithProjects
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

const tasksKey = 'tasks'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (_key: string) => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: number) => await taskQuery(id))

  const validateTasksCache = () => {
    if (!tasks.value) {
      tasksWithProjectsQuery.then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(tasks.value)) {
          loadTasks.delete(tasksKey)
          if (!error) tasks.value = data
        }
      })
    }
  }

  const validateTaskCache = (id: number) => {
    if (!task.value) {
      taskQuery(id).then(({ data, error }) => {
        if (JSON.stringify(data) !== JSON.stringify(task.value)) {
          loadTask.delete(id)
          if (!error) task.value = data
        }
      })
    }
  }

  const getTasks = async () => {
    tasks.value = null
    const { data, error, status } = await loadTasks(tasksKey)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      tasks.value = data
    }

    validateTasksCache()
  }

  const getTask = async (id: number) => {
    task.value = null
    const { data, error, status } = await loadTask(id)
    if (error) {
      useErrorStore().setError({ error, customCode: status })
    } else {
      task.value = data
    }

    validateTaskCache(id)
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...propertiesToUpdate } = task.value

    await taskUpdateCommand(propertiesToUpdate, task.value.id)
  }

  return {
    tasks,
    task,
    getTasks,
    getTask,
    updateTask
  }
})
