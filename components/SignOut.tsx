"use client";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button onClick={() => signOut()}>
      <ArrowLeftOnRectangleIcon className="w-6 h-6 lg:h-8 lg:w-8 fill-neutral-400" />
    </button>
  );
};

export default SignOut;
