"use client";

import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

const SideBar = () => {
  const { data: session } = useSession();

  return (
    <div className="py-6 px-4 flex-col justify-between h-screen hidden md:flex min-w-[15rem] lg:min-w-[20rem] 2xl:min-w-[25rem]">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="h-[50px] w-[50px] rounded-full relative overflow-hidden mr-4">
            {session && (
              <Image
                src={session.user?.image!}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>
          <h1 className="text-2xl text-neutral-800 font-semibold font-mono">
            BB.Chat
          </h1>
        </div>
        <div className="flex-1">
          <div className="mt-6 lg:mt-8">
            <NewChat />
            <h2 className="text-neutral-500 font-semibold mt-6 lg:mt-8">
              Chat récents
            </h2>
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-12 pb-6 px-2">
        <button
          className="p-2 rounded-full border border-neutral-300"
          onClick={() => signOut()}
        >
          <ArrowLeftOnRectangleIcon className="w-7 h-7 fill-neutral-800" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
