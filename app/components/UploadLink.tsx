'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, LogOut } from 'lucide-react'
import {useRouter} from 'next/navigation'

export default function UploadLink() {
    const router = useRouter()
    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [username, setUsername] = useState(localStorage.getItem("username") || '')

    const handleUploadLink = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, link, title, description })
            })
            const data = await res.json()
            if (res.ok) {
                setMessage('✅ Link added successfully!')
                setLink('')
                setTitle('')
                setDescription('')
                setTimeout(() => setMessage(''), 3000)
                router.refresh()
            } else {
                setMessage(`❌ ${data.message}`)
            }
        } catch (err) {
            setMessage('❌ Error uploading link')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("username")
        window.location.href = '/'
    }

    return (
        <div className=' gap-4 flex flex-col min-w-screen justify-center min-h-screen items-center'>
            <div className='flex gap-4'>
                <Button><Link href={`/${username}`} >My Dashboard</Link></Button>
                <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
                    <LogOut size={18} /> Logout
                </Button>
            </div>
            <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-slate-900 mb-6 flex items-center'>
                    <Plus size={24} className='mr-2 text-indigo-600' />
                    Add a New Link
                </h2>

                <form onSubmit={handleUploadLink} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Username</label>
                        <input
                            type='text'
                            placeholder='Your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500'
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Link URL</label>
                        <input
                            type='url'
                            placeholder='https://example.com'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className='w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500'
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Title (Optional)</label>
                        <input
                            type='text'
                            placeholder='Give your link a title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Description (Optional)</label>
                        <textarea
                            placeholder='Describe what this link is about'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none'
                            rows={3}
                        />
                    </div>

                    <Button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold'
                    >
                        {loading ? 'Adding...' : 'Add Link'}
                    </Button>
                </form>

                {message && (
                    <p className='mt-4 text-center text-sm font-medium'>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}