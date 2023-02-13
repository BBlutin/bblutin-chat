import React from "react";
import Image from "next/image";

const ChatPage = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center px-2 text-neutral-800">
      <Image src="/images/bot.svg" alt="BBChat" width={400} height={400} />
    </div>
  );
};

export default ChatPage;
