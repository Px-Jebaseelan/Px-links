'use client'

import { LayoutDashboard, Search, Copy, Check, ExternalLink } from "lucide-react";
import LinkItem from '../components/LinkItem'
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LinkCard({ data }: {data: any[]}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [copied, setCopied] = useState(false)

    const filteredLinks = data.filter(link => {
        const searchLower = searchQuery.toLowerCase()
        return (
            link.title?.toLowerCase().includes(searchLower) ||
            link.link?.toLowerCase().includes(searchLower) ||
            link.description?.toLowerCase().includes(searchLower)
        )
    })

    const handleCopyProfileUrl = () => {
        const profileUrl = `${window.location.origin}/${data[0].username}`
        navigator.clipboard.writeText(profileUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900'>
            {/* Header Section */}
            <div className="bg-linear-to-r from-slate-800 to-slate-700 border-b border-indigo-500/30 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-xl">
                {/* Top Row: Title, Username and Share Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-600/20 rounded-lg">
                                <LayoutDashboard size={32} className="text-indigo-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Links</h1>
                                <p className="text-sm text-slate-400 mt-1">Manage and share your links</p>
                            </div>
                        </div>
                        <div className="ml-14 flex items-center gap-2">
                            <span className="text-sm text-slate-400">Profile:</span>
                            <span className="text-base font-semibold text-indigo-300">@{data[0].username}</span>
                        </div>
                    </div>
                    <Button
                        onClick={handleCopyProfileUrl}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 w-full sm:w-auto justify-center'
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        <span className="hidden xs:inline">{copied ? 'Copied!' : 'Share Profile'}</span>
                        <span className="inline xs:hidden">{copied ? 'Copied!' : 'Share'}</span>
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="relative mt-6">
                    <Search className="absolute left-3 top-3 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title, URL, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full pl-10 pr-4 py-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:bg-slate-700 transition-all'
                    />
                </div>

                {/* Search Results Counter */}
                {searchQuery && (
                    <p className="text-sm text-slate-400 mt-3">
                        Found <span className="text-indigo-400 font-semibold">{filteredLinks.length}</span> of <span className="text-indigo-400 font-semibold">{data.length}</span> links
                    </p>
                )}
            </div>

            {/* Links Container */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {filteredLinks.length === 0 ? (
                    <div className="flex flex-col justify-center items-center min-h-96">
                        <div className="text-center">
                            <div className="mb-4 p-4 bg-slate-700/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                                <ExternalLink size={32} className="text-slate-500" />
                            </div>
                            <p className="text-lg sm:text-xl text-slate-400 font-medium">
                                {searchQuery ? 'No links match your search' : 'No links found'}
                            </p>
                            {!searchQuery && (
                                <p className="text-slate-500 text-sm mt-2">Start by adding your first link</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredLinks.map((link) =>(
                            <LinkItem key={link._id} link={link} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}