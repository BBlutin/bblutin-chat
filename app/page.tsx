import React from "react";
import Image from "next/image";
import { PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import SignOut from "../components/SignOut";
import Hello from "../components/Hello";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="container relative flex flex-col items-center justify-center h-screen mx-auto text-neutral-800 ">
      <Image src="/images/illustration.svg" alt="" width={400} height={400} />
      <h2 className="px-4 mt-16 text-xl font-semibold text-neutral-500 md:px-0">
        Content de vous revoir
      </h2>
      <h1 className="px-4 mt-2 mb-10 font-mono text-2xl font-semibold text-center md:text-3xl lg:text-4xl lg:mb-16 md:px-0">
        Que puis-je faire pour vous aujourd’hui ?
      </h1>
      <Hello />
      <div className="absolute w-full bottom-6 lg:bottom-12 lg:px-[30%] left-0 p-4 px-12 flex items-center justify-between">
        <SignOut />
        <button className="p-2 border-2 rounded-2xl border-neutral-300 animate-bounce">
          <PlusIcon className="w-10 h-10" />
        </button>
        <Link href="/chat">
          <QueueListIcon className="w-6 h-6 lg:h-8 lg:w-8 stroke-neutral-400" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
