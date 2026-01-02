'use server'

import ConnectDB from "@/lib/db";
import Links from "@/models/Links";
import { revalidatePath } from "next/cache";

export async function vote(linkId : string, username: string) {
    await ConnectDB()
    await Links.findByIdAndUpdate(linkId, { $inc : {clicks: 1}})
    revalidatePath(`/${username}`)
}