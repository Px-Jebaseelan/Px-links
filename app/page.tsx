'use client';
import { useEffect, useState } from "react"
import CreateUser from "./components/CreateUser"
import UploadLink from "./components/UploadLink"
export default function Home() {
  const [userCreated, setUserCreated] = useState('')
  useEffect(() => {
    const username = localStorage.getItem("username")
    if (username) {
      setUserCreated(username)
    }
  },[userCreated])
  return (

    <div>
      <div>
        {!userCreated && (
          <CreateUser />
        )}
        {userCreated && (
          <UploadLink />
        )}
      </div>
    </div>
  )
}