"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check for token in URL
  useEffect(() => {
    const processToken = async () => {
      setIsLoading(true);
      
      // Get token from URL if present (Supabase sometimes sends it as a query param)
      const token = searchParams.get('token');
      
      if (token) {
        // If we have a token in the URL, try to verify it
        try {
          // Type will be 'recovery' for reset password
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'recovery'
          });
          
          if (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Token verification error:', error);
          } else {
            setMessage('Token verified. You can now reset your password.');
          }
        } catch (err) {
          console.error('Error processing token:', err);
          setMessage('Error processing the reset token.');
        }
      }
      
      // Check session status regardless of token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setMessage(message || 'No active session. Please use the link from your email to reset your password.');
      }
      
      setIsLoading(false);
    };
    
    processToken();
  }, [searchParams, supabase.auth]);

  useEffect(() => {
    // Check if we have an access token in the URL
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // For password reset, the user should have a valid session but still be on the recovery path
      if (!session) {
        setMessage(message || 'Please use the link from your email to reset your password.');
      } else {
        console.log('Session detected, you can reset your password');
      }
    };
    
    checkSession();
  }, [supabase.auth, message]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Password updated successfully!');
        // Redirect to login after a short delay
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (err) {
      setMessage('An unexpected error occurred. Please try again.');
      console.error('Password update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007FFF] focus:border-[#007FFF] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007FFF] focus:border-[#007FFF] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {message && (
            <p className={`mt-2 text-sm ${message.includes('Error') || message.includes('match') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#007FFF] hover:bg-[#0066CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007FFF] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
