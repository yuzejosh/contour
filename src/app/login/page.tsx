import { login, signup } from './actions';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function LoginPage() {

    // redirect to dashboard if user is already authenticated
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user && !error) {
        redirect('/dashboard');
    }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image 
              src="/contour_education.png" 
              width={200} 
              height={80} 
              alt="Contour Education Logo" 
              priority
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account or create a new one
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007FFF] focus:border-[#007FFF] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#007FFF] focus:border-[#007FFF] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#007FFF] focus:ring-[#007FFF] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-[#007FFF] hover:text-[#0066CC]">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              formAction={login}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#007FFF] hover:bg-[#0066CC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007FFF]"
            >
              Sign in
            </button>
            <button
              formAction={signup}
              className="w-full flex justify-center py-2 px-4 border border-[#007FFF] rounded-md shadow-sm text-sm font-medium text-[#007FFF] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007FFF] dark:bg-transparent dark:hover:bg-gray-700 dark:text-[#66b2ff] dark:border-[#66b2ff]"
            >
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}