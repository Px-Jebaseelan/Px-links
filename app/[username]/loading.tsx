'use client'

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingLinksCard() {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex justify-between px-8 py-6">
                <h1 className="flex text-3xl font-bold text-slate-900">
                    <Skeleton className="w-36 h-9" />
                </h1>
                <h1 className="flex text-2xl font-bold">
                    <Skeleton className="w-48 h-8" />
                </h1>
            </div>
            <div className="gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center flex-col mx-auto w-10/12 bg-indigo-100 m-4 px-6 py-5 mb-4 rounded-3xl">
                        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
                            <Skeleton className="w-32 h-5" />
                            <Skeleton className="w-64 h-5" />
                            <Skeleton className="w-40 h-10 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}