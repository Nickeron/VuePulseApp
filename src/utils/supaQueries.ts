import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectsQuery = supabase.from('tasks').select(`*, projects(id,name,slug)`)
export const taskQuery = (id: number) =>
  supabase.from('tasks').select(`*, projects(id,name,slug)`).eq('id', id).single()

export const projectsQuery = supabase.from('projects').select('*')
export const projectQuery = (slug: string) =>
  supabase.from('projects').select('*, tasks(id, name, status, due_date)').eq('slug', slug).single()

export const profileByIdQuery = (id: string) =>
  supabase.from('profiles').select('*').eq('id', id).single()

export const profileByUsernameQuery = (username: string) =>
  supabase.from('profiles').select('*').eq('username', username).single()

export const groupedProfilesQuery = (userIds: string[]) =>
  supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>
export type Task = QueryData<ReturnType<typeof taskQuery>> // because this is a function

export type Projects = QueryData<typeof projectsQuery>
export type Project = QueryData<ReturnType<typeof projectQuery>> // because this is a function

export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>
