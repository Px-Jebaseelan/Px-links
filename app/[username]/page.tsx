import LinksCard from '../components/LinksCard'
import LinksNotFound from '../components/LinksNotFound'
import dotenv from 'dotenv'

dotenv.config()

export default async function LinksPage({ params }: {params: {username: string}}) {
    const {username} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links?username=${username}`)
    if (res.status === 404)  throw Error(`User ${username} not found`)
    
    const data = await res.json()
    if (!data.links || data.links.length === 0) {
        return (
            <LinksNotFound />
        )
    }
    return (
        <div>
            <LinksCard data={data.links}/>
        </div>
    )
}