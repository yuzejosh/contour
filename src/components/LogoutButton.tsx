"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutButton() {
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        router.push('/login')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-white hover:bg-gray-100 hover:cursor-pointer text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm transition-colors duration-200"
    >
      Logout
    </button>
  )
}
