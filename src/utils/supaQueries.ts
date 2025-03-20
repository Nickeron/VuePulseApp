import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects(id,name,slug)`)
export const taskQuery = (id: number) =>
  supabase.from('tasks').select(`*, projects(id,name,slug)`).eq('id', id).single()

export const projectsQuery = supabase.from('projects').select('*')
export const projectQuery = (slug: string) =>
  supabase.from('projects').select('*, tasks(id, name, status, due_date)').eq('slug', slug).single()

export type TaskWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Task = QueryData<ReturnType<typeof taskQuery>> // because this is a function
export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>> // because this is a function
