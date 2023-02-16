"use client";

import { Fragment, useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  ChevronLeftIcon,
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
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="flex items-center justify-between w-full h-16 px-6 md:hidden">
        <button
          className="p-1 border rounded-full outline-none border-neutral-300"
          onClick={openModal}
        >
          <Bars3Icon className="w-7 h-7" />
        </button>
        <Link href="/">
          <h1 className="font-mono text-2xl font-semibold">BB.Chat</h1>
        </Link>
        <div className="p-1 ">
          <div className="w-8"></div>
        </div>
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
                  <button
                    className="self-start p-1 mb-4 border rounded-full outline-none border-neutral-300"
                    onClick={closeModal}
                  >
                    <ChevronLeftIcon className="w-7 h-7 -ml-[1px] mr-[1px] stroke-neutral-800" />
                  </button>
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
                    <Link href="/">
                      <h1 className="font-mono text-2xl font-semibold text-neutral-800">
                        BB.Chat
                      </h1>
                    </Link>
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
                      href="https://twitter.com/BBlutin_"
                      target="_blank"
                      className="p-[10px] border rounded-full border-neutral-300"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="w-6 h-6 fill-neutral-700"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
                      </svg>
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
