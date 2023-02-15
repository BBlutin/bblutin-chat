import React from "react";
import Image from "next/image";
import MobileHeader from "../../components/MobileHeader";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ChatPage = () => {
  return (
    <div className="flex flex-col items-center h-full md:justify-center text-neutral-800">
      <div className="w-full mb-4">
        <MobileHeader />
      </div>
      <Image
        src="/images/bot.svg"
        className="justify-self-center"
        alt="BBChat"
        width={400}
        height={400}
      />
      <div className="flex items-start justify-center max-w-sm p-4 mx-4 text-sm border lg:mt-4 md:max-w-lg lg:text-base lg:max-w-2xl border-neutral-200 rounded-3xl">
        <ExclamationTriangleIcon className="flex-shrink-0 mt-1 mr-3 w-9 h-9 stroke-neutral-400" />
        <p>
          L'application est en Beta. Vous pourrez donc rencontrez certains bugs.
          Merci de me le remonter en MP sur Twitter si vous en avez le temps 😊
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
