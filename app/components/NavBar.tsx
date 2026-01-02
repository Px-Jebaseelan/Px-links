'use client'
import { Link as LinkIcon } from "lucide-react"
import { Button } from "../../components/ui/button"

export default function NavBar() {
    return (
        <div className="bg-linear-to-r from-slate-900 to-slate-800 px-8 py-4 border-b-2 border-indigo-600 shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <LinkIcon size="24" color='white'/>
                    </div>
                    <h1 className="text-white text-2xl font-bold font-mono">Phoenix Links</h1>
                </div>
                <Button 
                    onClick={() => window.location.href = '/'} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all hover:shadow-lg"
                >
                    Get Started
                </Button>
            </div>
        </div>
    )
}