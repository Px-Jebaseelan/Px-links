import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let cached = (global as any).mongoose

if (!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null}
}

export default async function ConnectDB() {
    if (cached.conn)
        return cached.conn
    if (!cached.promise) {
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            throw new Error("MONGO_URI Not configured")
        }
        try {
            cached.promise = mongoose.connect(MONGO_URI)
            await cached.promise
            console.log("Mongo DB Connected!")
        }
        catch(err) {
            cached.promise = null
            console.log("Something Went Wrong")
            throw err
        }
    }
    cached.conn = await cached.promise
    return cached.conn
}

ConnectDB()