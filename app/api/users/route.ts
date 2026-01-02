import User from '@/models/User'
import ConnectDB from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await ConnectDB()
    try {
        const { username } = await req.json()
        if (!username?.trim()) return NextResponse.json({message: "Invalid Username!"}, {status: 400})
        
        if (await User.findOne({username: username})) {
            return NextResponse.json({message: "User already exists!"}, {status: 400})
        }
        else {
            const newUser = new User({username: username})

            const CreatedUser = await newUser.save()
            return NextResponse.json({
                message: "User Created!",
                user: {id: CreatedUser._id, timeStamp: CreatedUser.createdAt, username}
            }, {status: 201})
        }
    }
    catch(err) {
        return NextResponse.json({message: `Server Error : ${err}`}, {status: 500})
    }
}