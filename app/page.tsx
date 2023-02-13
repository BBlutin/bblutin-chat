import React from "react";
import Image from "next/image";
import { PlusIcon, QueueListIcon } from "@heroicons/react/24/outline";
import SignOut from "../components/SignOut";
import Hello from "../components/Hello";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="text-neutral-800 container flex h-screen flex-col items-center mx-auto relative justify-center ">
      <Image src="/images/illustration.svg" alt="" width={400} height={400} />
      <h2 className="text-xl text-neutral-500 mt-16 font-semibold px-4 md:px-0">
        Content de vous revoir
      </h2>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-center mb-10 lg:mb-16 px-4 md:px-0 font-mono">
        Que puis-je faire pour vous aujourd’hui ?
      </h1>
      <Hello />
      <div className="absolute w-full bottom-6 lg:bottom-12 lg:px-[30%] left-0 p-4 px-12 flex items-center justify-between">
        <SignOut />
        <button className="rounded-2xl border-neutral-300 border-2 p-2 animate-bounce">
          <PlusIcon className="h-10 w-10" />
        </button>
        <Link href="/chat">
          <QueueListIcon className="w-6 h-6 lg:h-8 lg:w-8  stroke-neutral-400" />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
