"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-6 pt-2 lg:pt-6">
      <Image src="/images/login.svg" alt="" width={400} height={400} />
      <h1 className="font-mono text-2xl font-medium text-center md:mt-4 text-neutral-800">
        Connectez-vous pour utiliser BB.Chat
      </h1>
      <div className="flex items-start justify-center max-w-sm p-4 mx-4 mt-4 text-xs border md:text-sm md:max-w-lg lg:max-w-2xl border-neutral-200 rounded-xl">
        <ExclamationTriangleIcon className="flex-shrink-0 mt-1 mr-3 w-7 h-7 stroke-neutral-400" />
        <p>
          L'authentification est nécessaire pour que vous puissiez avoir
          l'historique de vos conversations. Nous ne récoltons aucune donnée
          personnelle 💚
        </p>
      </div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-16 py-3 mt-6 transition-all ease-in-out border border-stone-300 rounded-xl hover:bg-lime-500 hover:border-lime-500 group"
      >
        <p className="font-bold text-neutral-800 group-hover:text-neutral-50">
          Me connecter
        </p>
      </button>
    </div>
  );
};

export default Login;
