"use client";
import { useSession, signOut } from "next-auth/react";
export default function Page(): JSX.Element {
  const { data: session } = useSession();

  return (
    <main className="bg-[#161616] min-h-screen p-4 flex flex-col items-center justify-center">
      Dashboard
      {session?.user ? (
        <div>
          <span>{session.user.name}</span>
          <br></br>
          <span>{session.user.username}</span>
          <br></br>
          <span>{JSON.stringify(session.user)}</span>
          <button
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </main>
  );
}
