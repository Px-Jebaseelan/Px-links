import Link from '@/models/Links'
import ConnectDB from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    await ConnectDB()
    try {
        const {linkId, username} = await req.json()
        if (!linkId?.trim()) return NextResponse.json({message: "Invalid Link ID"}, {status: 400})

        if (!username?.trim()) return NextResponse.json({message: "Invalid Username"}, {status: 400})

        const updatedLink = await Link.findByIdAndUpdate(linkId, { $inc: {clicks: 1}}, {new: true})
        return NextResponse.json({clicks: updatedLink.clicks}, {status: 200})
    }
    catch(err) {
        return NextResponse.json({message: `Server Error: ${err}`}, {status:500})
    }
}