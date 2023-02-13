"use client";

import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import Image from "next/image";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
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
          <h1 className="font-mono text-2xl font-semibold text-neutral-800">
            BB.Chat
          </h1>
        </div>
        <div className="flex-1">
          <div className="mt-6 lg:mt-8">
            <NewChat />
            <h2 className="mt-6 font-semibold text-neutral-500 lg:mt-8">
              Chat récents
            </h2>
            <div className="flex flex-col mt-6 space-y-8">
              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-2 pb-6 space-x-12">
        <button
          className="p-2 border rounded-full border-neutral-300"
          onClick={() => signOut()}
        >
          <ArrowLeftOnRectangleIcon className="w-7 h-7 fill-neutral-800" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
