import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (containers: Projects | TasksWithProjects) => {
    const filteredContainers = containers.filter((container) => container.collaborators.length)

    const promises = filteredContainers.map((container) =>
      getProfilesByIds(container.collaborators)
    )

    const results = await Promise.all(promises)

    filteredContainers.forEach((container, index) => {
      groupedCollabs.value[container.id] = results[index]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs
  }
}
