"use client"
import { signOut, useSession } from "next-auth/react";


export default function Home() {
const session = useSession();

  return (
    <div>
      <p>
        {JSON.stringify(session)}
      </p>
      <h1> this is my code</h1>
      <button onClick={()=>signOut()}>log out me</button>
    </div>
  );
}
