"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const session = useSession();
  return (
    <div>
      DASHBOARD FILE
      <p>
        {JSON.stringify(session)}
      </p>

      <button onClick={()=>signOut()}>sign me out</button>
    </div>
  )
}

export default Page
