import Link from '@/models/Links'
import ConnectDB from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/User'

export async function POST(req: NextRequest) {
    await ConnectDB()
    try {
        const {username, link, title, description} = await req.json()

        if (!username?.trim()) return NextResponse.json({message: "Invalid Username"}, {status: 400})
        
        if (!link?.trim()) return NextResponse.json({message: "Invalid Link"}, {status: 400})

        const newLink = new Link({
            username: username,
            link: link,
            title: title || '',
            description: description || '',
            clicks: 0
        })
        const AddedLink = await newLink.save()
        return NextResponse.json({
            message: "Link Uploaded", 
            link: {id: AddedLink._id, username, link, title: AddedLink.title, description: AddedLink.description, clicks: AddedLink.clicks}
        }, {status: 201})
        
    }
    catch(err) {
        return NextResponse.json({message: `Server Error: ${err}`}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    await ConnectDB()
    try {
        const { searchParams } = new URL(req.url)
        const username = searchParams.get('username')
        
        if(!username?.trim()) return NextResponse.json({message: "Username Required"}, {status: 400})
        
        const userExists =  await User.findOne({username: username}) 
        if (!userExists) {
            return NextResponse.json({message: "User does not exist"}, {status: 404})
        }
        const links = await Link.find({username: username})
        if (links.length === 0) {
            return NextResponse.json({message: "No link Found"}, {status: 401})
        }
        return NextResponse.json({links}, {status: 200})
    }
    catch(err) {
        return NextResponse.json({message: `Server Error : ${err}`}, {status: 500})
    }
}

export async function PUT(req: NextRequest) {
    await ConnectDB()
    try {
        const {linkId, link, title, description} = await req.json()

        if (!linkId?.trim()) return NextResponse.json({message: "Invalid Link ID"}, {status: 400})
        
        const updateData: any = {}
        if (link?.trim()) updateData.link = link
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description

        const updatedLink = await Link.findByIdAndUpdate(linkId, updateData, {new: true})
        
        if (!updatedLink) {
            return NextResponse.json({message: "Link not found"}, {status: 404})
        }

        return NextResponse.json({
            message: "Link Updated", 
            link: updatedLink
        }, {status: 200})
        
    }
    catch(err) {
        return NextResponse.json({message: `Server Error: ${err}`}, {status: 500})
    }
}

export async function DELETE(req: NextRequest) {
    await ConnectDB()
    try {
        const {linkId} = await req.json()

        if (!linkId?.trim()) return NextResponse.json({message: "Invalid Link ID"}, {status: 400})

        const deletedLink = await Link.findByIdAndDelete(linkId)
        
        if (!deletedLink) {
            return NextResponse.json({message: "Link not found"}, {status: 404})
        }

        return NextResponse.json({
            message: "Link Deleted"
        }, {status: 200})
        
    }
    catch(err) {
        return NextResponse.json({message: `Server Error: ${err}`}, {status: 500})
    }
}
