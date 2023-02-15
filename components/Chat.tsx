"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

type Props = {
  chatId: string;
  apiResponse: string;
};

const Chat = ({ chatId, apiResponse }: Props) => {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col items-start flex-1 p-6 space-y-8 overflow-y-auto">
      {messages?.empty && (
        <>
          <p className="self-center mt-12 font-mono text-lg font-semibold text-center text-neutral-600">
            Saisissez quelque chose ci-dessous pour commencer à utiliser BB.Chat
          </p>
          <ArrowDownCircleIcon className="w-10 h-10 mx-auto mt-5 stroke-lime-500 animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <>
          {message.data().user._id === "BB.Chat" ? (
            <BotMessage key={message.id} message={message.data()} />
          ) : (
            <UserMessage key={message.id} message={message.data()} />
          )}
        </>
      ))}
      {messages?.docs[messages?.docs.length - 1].data().user._id !=
        "BB.Chat" && (
        <div className="text-sm font-medium text-neutral-800">
          <p>{apiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
