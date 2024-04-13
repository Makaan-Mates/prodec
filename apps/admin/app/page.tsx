"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return (
    <main className="bg-[#161616] min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="text-yellow-700 text-3xl ">Prodec</div>
      <button
        className="bg-red-50 px-2 border rounded-lg text-black"
        onClick={async () =>
          await signIn("google", { callbackUrl: "/onboarding" })
        }
      >
        Get Started
      </button>
    </main>
  );
}
