"use client";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-[#161616] min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="flex flex-col w-96 text-white border p-6 rounded-md">
        <span>WorkSpace</span>
        {session?.user ? (
          <>
            <span>{session.user.name}</span>
            <span>{session.user.username}</span>
          </>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </div>
  );
};

export default page;
