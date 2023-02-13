import React from "react";
import Image from "next/image";
import { PlusIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

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
      <div className="bg-neutral-800 bg-opacity-40 px-4 py-2 rounded-full backdrop-blur-sm absolute top-[25vh] right-4 md:right-10 xl:right-60">
        <span className="font-medium text-neutral-50">Hey Thomas 👋</span>
      </div>
      <div className="absolute w-full bottom-6 lg:bottom-12 left-0 p-4 px-12 flex items-center justify-between">
        <div className="w-6 lg:w-8"></div>
        <button className="rounded-2xl border-neutral-300 border-2 p-2 animate-bounce">
          <PlusIcon className="h-10 w-10" />
        </button>
        <button>
          <ArrowLeftOnRectangleIcon className="w-6 h-6 lg:h-8 lg:w-8 fill-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
