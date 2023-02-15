"use client";

import { Fragment, useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import Link from "next/link";

const MobileHeader = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-between w-full h-16 px-6 mb-20 md:hidden">
        <button onClick={openModal}>
          <Bars3Icon className="w-8 h-8" />
        </button>
        <h1 className="font-mono text-2xl font-medium">BB.Chat</h1>
        <div className="w-8"></div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="flex flex-col w-full h-full p-6 overflow-hidden text-left align-middle transition-all transform shadow bg-neutral-50">
                  <XMarkIcon
                    onClick={closeModal}
                    className="w-8 h-8 mb-4 stroke-neutral-800"
                  />
                  <div className="flex items-center mb-6">
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
                    <h1 className="font-mono text-2xl font-semibold text-neutral-800">
                      BB.Chat
                    </h1>
                  </div>
                  <NewChat />
                  <h2 className="mt-4 font-semibold text-neutral-500 lg:mt-8">
                    Chats récents
                  </h2>
                  <div className="flex flex-col flex-1 mt-4 space-y-6 overflow-y-scroll">
                    {chats?.docs.map((chat) => (
                      <ChatRow key={chat.id} id={chat.id} />
                    ))}
                  </div>
                  <div className="flex items-center flex-shrink-0 px-2 mt-6 space-x-8 justify-self-end">
                    <button
                      className="p-2 border rounded-full border-neutral-300"
                      onClick={() => signOut()}
                    >
                      <ArrowLeftOnRectangleIcon className="w-7 h-7 stroke-neutral-800" />
                    </button>
                    <Link
                      href="/settings"
                      className="p-2 border rounded-full border-neutral-300"
                    >
                      <Cog6ToothIcon className="w-7 h-7 stroke-neutral-800" />
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileHeader;
