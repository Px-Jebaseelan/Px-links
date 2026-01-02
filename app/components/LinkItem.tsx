'use client'

import { useOptimistic, startTransition, useState } from 'react'
import {vote} from '../api/actions'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, Copy, Check, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LinkItem( {link} : any) {
    const router = useRouter()
    const [optimisticClick, addOptimisticClick] = useOptimisticClick(link.clicks)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(link.title || '')
    const [editDescription, setEditDescription] = useState(link.description || '')
    const [editUrl, setEditUrl] = useState(link.link)
    const [editLoading, setEditLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    function useOptimisticClick(initialClicks: number) {
        return useOptimistic(initialClicks, (state: number) => state + 1)
    }

    function handleClick() {
        window.open(link.link, '_blank')
        startTransition(() => {
            addOptimisticClick(1)
        })
        vote(link._id, link.username)
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this link?')) return
        
        setDeleteLoading(true)
        try {
            const res = await fetch('/api/links', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ linkId: link._id })
            })
            if (res.ok) {
                router.refresh()
            }
        } catch (err) {
            alert('Error deleting link')
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleEdit = async () => {
        if (!editUrl?.trim()) {
            alert('URL cannot be empty')
            return
        }

        setEditLoading(true)
        try {
            const res = await fetch('/api/links', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    linkId: link._id,
                    link: editUrl,
                    title: editTitle,
                    description: editDescription
                })
            })
            if (res.ok) {
                setIsEditing(false)
                router.refresh()
            }
        } catch (err) {
            alert('Error updating link')
        } finally {
            setEditLoading(false)
        }
    }

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(link.link)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (isEditing) {
        return (
            <div className="w-full bg-linear-to-r from-slate-700 to-slate-600 rounded-xl border border-slate-500/30 shadow-lg p-4 sm:p-6 hover:border-slate-400/50 transition-all">
                <div className="space-y-4">
                    <div>
                        <label className='block text-sm font-semibold text-slate-300 mb-2'>Title (Optional)</label>
                        <input
                            type='text'
                            placeholder='Enter link title'
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className='w-full px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-800 transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-300 mb-2'>URL *</label>
                        <input
                            type='url'
                            placeholder='https://example.com'
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className='w-full px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-800 transition-all'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-slate-300 mb-2'>Description (Optional)</label>
                        <textarea
                            placeholder='Enter link description'
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className='w-full px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-800 transition-all resize-none'
                            rows={2}
                        />
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2'>
                        <Button
                            onClick={handleEdit}
                            disabled={editLoading}
                            className='flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold'
                        >
                            {editLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            className='flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold'
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // Main Link Display
    const hasTitle = link.title?.trim()
    const hasDescription = link.description?.trim()

    return (
        <div className="w-full bg-linear-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500/30 shadow-lg hover:shadow-xl hover:border-indigo-500/50 transition-all overflow-hidden">
            {/* Main Content Area */}
            <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Left: Link Info */}
                    <div className="flex-1 min-w-0">
                        {/* Title Section */}
                        {hasTitle && (
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
                                {link.title}
                            </h3>
                        )}

                        {/* Description Section */}
                        {hasDescription && (
                            <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                                {link.description}
                            </p>
                        )}

                        {/* URL Section */}
                        <div className="flex items-start gap-2 mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                            <ExternalLink size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                            <Button
                                variant="link"
                                className="px-0 text-indigo-300 hover:text-indigo-200 text-sm sm:text-base break-all text-left h-auto p-0 font-medium"
                                onClick={handleClick}
                            >
                                {link.link}
                            </Button>
                        </div>

                        {/* Metadata Row */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-indigo-500/30">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                                {optimisticClick} {optimisticClick === 1 ? 'click' : 'clicks'}
                            </span>
                        </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className='flex flex-wrap sm:flex-col gap-2 w-full lg:w-auto'>
                        <Button
                            size="sm"
                            onClick={handleCopyUrl}
                            className='flex-1 sm:flex-none bg-blue-600/80 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5'
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                            <span className="sm:hidden">{copied ? '✓' : 'Copy'}</span>
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className='flex-1 sm:flex-none bg-amber-600/80 hover:bg-amber-700 text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5'
                        >
                            <Edit2 size={16} /> 
                            <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className='flex-1 sm:flex-none bg-red-600/80 hover:bg-red-700 text-white text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-1.5'
                        >
                            <Trash2 size={16} /> 
                            <span className="hidden sm:inline">{deleteLoading ? 'Deleting...' : 'Delete'}</span>
                            <span className="sm:hidden">{deleteLoading ? '...' : '✕'}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}