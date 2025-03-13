/* eslint-env node */

import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const logStep = (message) => {
  console.log(`\n🌱 ${message}`)
}

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  )
  process.exit(1)
}

const seedProjects = async (numData) => {
  logStep('Seeding projects...')
  const projects = []
  for (let i = 0; i < numData; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5])
    })
  }
  const { data, error } = await supabase.from('projects').insert(projects).select('id')
  if (error) {
    return logErrorAndExit('Projects', error)
  }
  logStep('Projects seeded successfully')
  return data
}

const seedTasks = async (numData, projectIds) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numData; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3, 4, 5])
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')
  if (error) {
    return logErrorAndExit('Tasks', error)
  }
  logStep('Tasks seeded successfully')
  return data
}

const seedDatabase = async (numEntriesPerTable) => {
  const projectsIds = (await seedProjects(numEntriesPerTable)).map((project) => project.id)
  await seedTasks(numEntriesPerTable, projectsIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
