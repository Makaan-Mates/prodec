"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    image: string | null;
    role: string;
    newUser: boolean;
  };
}

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session && session.user) {
    if (!session.user.newUser) {
      router.push("/dashboard");
    }
  }

  const onboardingCompleted = async () => {
    try {
      if (session && session.user) {
        const response = await axios.post(
          "http://localhost:3000/api/user/new-user",
          {
            userId: session.user.id,
          },
        );
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#161616] min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col w-96 text-white border p-6 rounded-md">
        <span>WorkSpace</span>

        {session && session?.user ? (
          <>
            <span>{session.user.name}</span>
            <span>{session.user.username}</span>
            <span>
              New User status : {JSON.stringify(session.user.newUser)}
            </span>
          </>
        ) : (
          <span>Guest</span>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        >
          Sign Out
        </button>
        <button onClick={onboardingCompleted}>Continue</button>
      </div>
    </div>
  );
};

export default page;
