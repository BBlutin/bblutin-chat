"use client";

import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="py-6 px-4 flex-col justify-between h-screen hidden md:flex w-[15rem] lg:w-[20rem] 2xl:w-[25rem]">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="h-[50px] w-[50px] rounded-full relative overflow-hidden mr-4">
            {session && (
              <Image
                src={
                  session.user?.image ||
                  `https://ui-avatars.com/api/?background=a3a3a3&name=${session?.user?.name}`
                }
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>
          <Link href="/">
            <h1 className="font-mono text-2xl font-semibold text-neutral-800">
              BB.Chat
            </h1>
          </Link>
        </div>
        <div className="flex-1">
          <div className="mt-6 lg:mt-8">
            <NewChat />
            <h2 className="mt-6 font-semibold text-neutral-500 lg:mt-8">
              Chats récents
            </h2>
            <div className="flex flex-col mt-6 space-y-8">
              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-2 pb-6 space-x-8">
        <button
          className="p-2 border rounded-full border-neutral-300"
          onClick={() => signOut()}
        >
          <ArrowLeftOnRectangleIcon className="w-7 h-7 stroke-neutral-800" />
        </button>
        <Link
          href="https://twitter.com/BBlutin_"
          target="_blank"
          className="p-[10px] border rounded-full border-neutral-300"
        >
          <svg viewBox="0 0 20 20" className="w-6 h-6 fill-neutral-700">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
