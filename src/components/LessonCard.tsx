"use client";

import React, { useState } from 'react';

interface Lesson {
  id: string;
  userId: string;
  completed: boolean;
  start_time: string | null;
  end_time: string | null;
  subject: string;
  location: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onStatusChange: (updatedLesson: Lesson) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson: initialLesson, onStatusChange }) => {
  // Use state to manage the lesson data so we can update it locally
  const [lesson, setLesson] = useState(initialLesson);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Format the date and time for display with proper error handling
  const formatDateTime = (dateString: string | null) => {
    try {
      if (!dateString) return 'Time not scheduled';
      
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      return 'Date error';
    }
  };

  // Calculate duration in minutes
  const getDuration = () => {
    try {
      if (!lesson.start_time || !lesson.end_time) return 'N/A';
      
      const start = new Date(lesson.start_time);
      const end = new Date(lesson.end_time);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 'N/A';
      }
      
      const durationMs = end.getTime() - start.getTime();
      return Math.round(durationMs / 60000); // Convert ms to minutes
    } catch {
      return 'N/A';
    }
  };

  // Handler that sends the lesson_id to the API and notifies parent component
  const handleCompletionToggle = async () => {
    // Optimistic UI update - toggle the current state
    setIsUpdating(true);
    const newCompletedState = !lesson.completed;
    
    // Create updated lesson object
    const updatedLesson = { ...lesson, completed: newCompletedState };
    
    // Update local state
    setLesson(updatedLesson);
    
    // Notify parent component about the status change
    onStatusChange(updatedLesson);
    
    try {
      // Send API request with the new completed state
      const response = await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lesson_id: lesson.id,
          completed: newCompletedState  // Add this line to send the new state
        }),
      });
      
      if (!response.ok) {
        // If the API call fails, revert the UI change
        const errorData = await response.json();
        console.error('Failed to toggle lesson status:', errorData);
        
        // Revert local state
        const revertedLesson = { ...lesson, completed: !newCompletedState };
        setLesson(revertedLesson);
        
        // Notify parent about reversion
        onStatusChange(revertedLesson);
        
        alert('Failed to update lesson status. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error updating lesson status:', error);
      
      // Revert local state
      const revertedLesson = { ...lesson, completed: !newCompletedState };
      setLesson(revertedLesson);
      
      // Notify parent about reversion
      onStatusChange(revertedLesson);
      
      alert('Network error while updating lesson status. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div 
      className={`p-4 border rounded-lg transition-all duration-200 hover:shadow-md ${
        lesson.completed 
          ? 'bg-gray-100 opacity-70 border-gray-200 hover:bg-gray-200 hover:opacity-80' 
          : 'bg-blue-50 border-blue-100 hover:bg-blue-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          {/* Completion checkbox */}
          <div className="mr-3 pt-1">
            <input
              type="checkbox"
              checked={lesson.completed}
              onChange={handleCompletionToggle}
              disabled={isUpdating}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              aria-label={`Toggle completion status for ${lesson.subject}`}
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{lesson.subject}</h3>
            <p className="text-gray-600">{lesson.location}</p>
          </div>
        </div>
        
        {lesson.completed && (
          <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
            Completed
          </span>
        )}
      </div>
      
      <div className="mt-3 flex items-center text-sm">
        <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>
          {formatDateTime(lesson.start_time)} • {getDuration()} mins
        </span>
      </div>
    </div>
  );
};

export default LessonCard;
