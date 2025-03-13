/* eslint-env node */

import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async (numData) => {
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
  const { data, error, status } = await supabase.from('projects').insert(projects)
  console.log(data, status, error)
}

await seedProjects(10)
