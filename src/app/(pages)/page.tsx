"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <h1 className="mb-2 text-xl">Welcome {session.user.email}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <h1 className="mb-2 text-xl">Sign in</h1>
          <button className="border" onClick={() => signIn("github")}>
            Sign in
          </button>
        </>
      )}
    </>
  );
}
