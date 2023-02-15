import React from "react";
import Image from "next/image";
import MobileHeader from "../../components/MobileHeader";

const ChatPage = () => {
  return (
    <div className="flex flex-col items-center h-full md:justify-center text-neutral-800">
      <div className="mb-20">
        <MobileHeader />
      </div>
      <Image
        src="/images/bot.svg"
        className="justify-self-center"
        alt="BBChat"
        width={400}
        height={400}
      />
    </div>
  );
};

export default ChatPage;
