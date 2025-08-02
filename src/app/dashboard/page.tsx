import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import LessonContainer from '../../components/LessonContainer'
import LogoutButton from '../../components/LogoutButton'

// Define proper types for the data structure
interface UserLesson {
  lesson_id: string;
  is_completed: boolean;
  lessons: {
    start_time: string | null;
    end_time: string | null;
    subject: string;
    location: string;
  };
}

export default async function Dashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  
  // Fetch user lessons from Supabase
  const { data: userLessons, error: lessonsError } = await supabase
    .from('user_lessons')
    .select('lesson_id, is_completed, lessons(start_time, end_time, subject, location)')
    .eq('user_id', data.user.id) as { data: UserLesson[] | null, error: any }
  
  // Transform the data structure with proper typing
  const formattedLessons = (userLessons || []).map(item => ({
    id: item.lesson_id,
    userId: data.user.id,
    completed: item.is_completed,
    start_time: item.lessons?.start_time || null,
    end_time: item.lessons?.end_time || null,
    subject: item.lessons?.subject || 'No subject',
    location: item.lessons?.location || 'No location',
  }))

  return (
    <div className="flex flex-col">
      <main className="w-full max-w-6xl mx-auto pl-0 pr-1 sm:pl-0.5 sm:pr-2 md:pl-1 md:pr-3 lg:pl-1.5 lg:pr-4">
        <div className="flex justify-between items-center my-6">
          <div>
            <div className="overflow-hidden py-0.5">
              <h1 className="text-3xl font-bold animate-fade-in-down">
                Welcome back,
              </h1>
            </div>
            <div className="overflow-hidden pt-0.5 pb-1">
              <h1 className="text-5xl font-bold flex items-center animate-fade-in-down animation-delay-300">
                {data.user.email?.split('@')[0] || 'User'}!{' '}
                <span className="ml-2 inline-block">👋</span>
              </h1>
            </div>
          </div>
          
          {/* Logout button */}
          <LogoutButton />
        </div>
        
        {/* Dashboard content */}
        <div className="grid grid-cols-1 gap-4">
          {lessonsError ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p className="font-medium">Error loading lessons</p>
              <p className="text-sm">{lessonsError.message}</p>
            </div>
          ) : (
            <LessonContainer initialLessons={formattedLessons}/>
          )}
        </div>
      </main>
    </div>
  )
}