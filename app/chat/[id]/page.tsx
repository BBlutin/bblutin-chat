"use client";

import { useState } from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import MobileHeader from "../../../components/MobileHeader";

type Props = {
  params: {
    id: string;
  };
};

const MessagePage = ({ params: { id } }: Props) => {
  const [apiResponse, setApiResponse] = useState("");

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200">
        <MobileHeader />
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <Chat chatId={id} apiResponse={apiResponse} />
        <ChatInput chatId={id} setApiResponse={setApiResponse} />
      </div>
    </>
  );
};

export default MessagePage;
