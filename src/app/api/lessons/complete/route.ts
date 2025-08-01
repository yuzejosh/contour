import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lesson_id, completed } = await req.json()
  
  console.log('API received:', { lesson_id, completed, user_id: user.id })

  // Use the completed value from the request
  const { error } = await supabase
    .from('user_lessons')
    .update({ is_completed: completed })
    .eq('user_id', user.id)
    .eq('lesson_id', lesson_id)

  if (error) {
    console.error('Database update error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }
  
  console.log('Successfully updated lesson completion status')
  return NextResponse.json({ success: true })
}