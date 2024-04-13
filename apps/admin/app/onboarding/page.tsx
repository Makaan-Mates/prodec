"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import OnboardingHeader from "../../components/OnboardingHeader";

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
    <div className="bg-gradient-to-b from-[#0F151A] via-[#090D10] to-[#090D10] min-h-screen  flex flex-col">
      <OnboardingHeader />
      <div className="flex items-center justify-center">
        <section className="mt-[5.38rem] w-[30.43rem] ">
          <div>
            <div className="text-[1.5rem]  text-[#E3E6E8] text-center">
              Create a new workspace
            </div>
            <div className="text-[#6F757B] mt-[1.25rem] text-center text-[0.9375rem]">
              Workspaces are shared environments where you can create decks,
              roadmaps and share among your customers.
            </div>
          </div>
          <div className="form bg-[#12171C] w-[30.43rem] h-[28.81rem] rounded-lg mt-[2rem]"></div>
        </section>
      </div>

      {/* <div className="flex flex-col w-96 text-white border p-6 rounded-md">
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
      </div> */}
    </div>
  );
};

export default page;
