"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-6">
      <Image src="/images/login.svg" alt="" width={400} height={400} />
      <h1 className="text-2xl text-neutral-800 font-mono mt-6 font-medium text-center">
        Connectez-vous pour utiliser BB.Chat
      </h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="mt-12 px-16 py-3 border border-stone-300 rounded-xl hover:bg-lime-500 hover:border-lime-500 group transition-all ease-in-out"
      >
        <p className="font-bold text-neutral-800 group-hover:text-neutral-50">
          Me connecter
        </p>
      </button>
    </div>
  );
};

export default Login;
