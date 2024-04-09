'use client';
import { signIn } from "next-auth/react";

export default function Page(): JSX.Element {
  return (
    <main className="bg-[#161616] min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="text-yellow-700 text-3xl ">Prodec</div>
      <button
        className="bg-red-50 px-2 border rounded-lg text-black"
        onClick={() => signIn("google")}
      >
        Get Started
      </button>
    </main>
  );
}
