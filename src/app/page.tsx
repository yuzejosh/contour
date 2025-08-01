import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function RootPage() {
  // Create the Supabase client with cookies
  const supabase = await createClient()

  // Check if the user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()

  // If user is authenticated, redirect to dashboard
  if (user && !error) {
    redirect('/dashboard')
  }
  
  // If user is not authenticated, redirect to login
  redirect('/login')
}