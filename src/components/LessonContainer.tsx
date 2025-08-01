import React from 'react';
import LessonCard from './LessonCard';

interface Lesson {
  id: string;
  userId: string;
  completed: boolean;
  start_time: string;
  end_time: string;
  subject: string;
  location: string;
}

interface LessonContainerProps {
  initialLessons: Lesson[];
  userId: string;
}

const LessonContainer: React.FC<LessonContainerProps> = ({ initialLessons, userId }) => {
  // Split lessons into upcoming and completed
  const upcomingLessons = initialLessons.filter(lesson => !lesson.completed);
  const completedLessons = initialLessons.filter(lesson => lesson.completed);

  return (
    <div className="w-full max-w-4xl mx-auto my-8" id="lesson-container">
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Lessons</h2>
          <div className="space-y-4">
            {upcomingLessons.length > 0 ? (
              upcomingLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <div className="p-4 border border-gray-200 rounded-lg bg-white text-gray-500">
                No upcoming lessons
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Completed Lessons</h2>
          <div className="space-y-4">
            {completedLessons.length > 0 ? (
              completedLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <div className="p-4 border border-gray-200 rounded-lg bg-white text-gray-500">
                No completed lessons
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LessonContainer;