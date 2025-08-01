import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lesson_id, completed } = await req.json()

  const { error } = await supabase
    .from('user_lessons')
    .update({ is_completed: true })
    .eq('user_id', user.id)
    .eq('lesson_id', lesson_id)

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true })
}