'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function CreateUser() {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [usernameError, setUsernameError] = useState('')

    const validateUsername = (value: string) => {
        if (value.length < 3) {
            setUsernameError('Username must be at least 3 characters')
            return false
        }
        if (!/^[a-z0-9_-]+$/.test(value)) {
            setUsernameError('Only letters, numbers, hyphens, and underscores allowed')
            return false
        }
        setUsernameError('')
        return true
    }

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateUsername(username)) return

        setLoading(true)
        setMessage('')
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })
            const data = await res.json()
            if (res.ok) {
                setMessage('✅ User created! Redirecting...')
                localStorage.setItem("username",username)
                setUsername('')
                setTimeout(() => window.location.href = `/${username}`, 1500)
            } else {
                setMessage(`❌ ${data.message}`)
            }
        } catch (err) {
            setMessage('❌ Error creating user')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-500 to-pink-500 relative overflow-hidden'>
            {/* Background decorations */}
            <div className='absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
            <div className='absolute -bottom-8 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
            
            <div className='relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md'>
                <div className='flex justify-center mb-6'>
                    <div className='bg-linear-to-br from-indigo-600 to-purple-600 p-3 rounded-full'>
                        <Sparkles size={32} color='white' />
                    </div>
                </div>
                
                <h1 className='text-4xl font-bold text-center mb-2 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Create Your Profile</h1>
                <p className='text-center text-slate-600 mb-8'>Get your unique link dashboard</p>
                
                <form onSubmit={handleCreateUser} className='space-y-5'>
                    <div>
                        <label className='block text-sm font-semibold text-slate-700 mb-2'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value.toLowerCase())
                                if (e.target.value) validateUsername(e.target.value.toLowerCase())
                            }}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                                usernameError 
                                    ? 'border-red-500 focus:border-red-600' 
                                    : 'border-slate-300 focus:border-indigo-500'
                            }`}
                            required
                        />
                        {usernameError && <p className='text-red-500 text-sm mt-1'>{usernameError}</p>}
                        <p className='text-gray-500 text-xs mt-1'>3+ characters, letters, numbers, hyphens, underscores</p>
                    </div>
                    
                    <Button
                        type='submit'
                        disabled={loading || !username || usernameError !== ''}
                        className='w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all'
                    >
                        {loading ? 'Creating...' : 'Create Profile'}
                    </Button>
                </form>

                {message && (
                    <p className='mt-6 text-center text-sm font-medium p-3 rounded-lg bg-slate-100'>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}