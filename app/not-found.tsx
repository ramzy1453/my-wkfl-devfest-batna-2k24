import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='text-8xl font-bold text-primary'>
        <h1>404</h1>
      </div>

      <div className='text-2xl font-bold text-muted-foreground text-center'>
        <h2>Page Not Found</h2>
        <p className='mt-2'>The page you are looking for does not exist</p>
       <div className='mt-10'>
        <Link 
          href={"/"} 
          className='text-2xl font-bold items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg:primary/80 transition-colors'>
          Back to Home
        </Link>
        </div>

      </div>
    </div>
  )
}
