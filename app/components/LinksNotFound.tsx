'use client'
import {Button} from '../../components/ui/button'
import { Plus, ArrowRight } from 'lucide-react'

export default function LinksNotFound() {
    return(
        <div className='min-h-screen flex flex-col justify-center items-center bg-linear-to-br from-slate-50 to-slate-100' >
            <div className='text-center space-y-6'>
                <div>
                    <h1 className='text-4xl font-bold text-slate-900 mb-2'>No Links Yet</h1>
                    <p className='text-lg text-slate-600'>Start building your link collection now!</p>
                </div>
                
                <Button 
                    onClick={() => window.location.href = '/'} 
                    className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mx-auto'
                >
                    <Plus size={20} /> Add Your First Link
                    <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    )
}