'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-red-500 to-pink-600'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center'>
                <AlertCircle className='w-16 h-16 text-red-600 mx-auto mb-4' />
                
                <h1 className='text-3xl font-bold text-slate-900 mb-2'>Oops! Something Went Wrong</h1>
                
                <p className='text-slate-600 mb-4'>
                    We encountered an error while loading this page. Please try again.
                </p>

                <p className='text-sm text-slate-500 bg-slate-100 p-3 rounded-lg mb-6 wrap-break-words'>
                    {error.message || 'Unknown error occurred'}
                </p>

                <div className='flex gap-3'>
                    <Button
                        onClick={() => reset()}
                        className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold'
                    >
                        Try Again
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        className='flex-1 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg font-semibold'
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    )
}