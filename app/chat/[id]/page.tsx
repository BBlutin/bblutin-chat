"use client";

import { useState } from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

type Props = {
  params: {
    id: string;
  };
};

const MessagePage = ({ params: { id } }: Props) => {
  const [apiResponse, setApiResponse] = useState("");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Chat chatId={id} apiResponse={apiResponse} />
      <ChatInput chatId={id} setApiResponse={setApiResponse} />
    </div>
  );
};

export default MessagePage;
