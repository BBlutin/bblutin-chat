"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const model = "text-davinci-001";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const context = await getDocs(
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

    let promptPrefix = "";

    context.docs.forEach((prefix) => {
      promptPrefix += `${prefix.data().text}\n`;
    });

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?background=a3a3a3&name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("BB.Chat est en train de réfléchir...", {
      style: {
        border: "1px solid #a3a3a3",
        padding: "16px",
        color: "#404040",
      },
      iconTheme: {
        primary: "#404040",
        secondary: "#fafafa",
      },
    });

    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/askQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptPrefix + input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("BB.Chat vous a répondu !", {
        id: notification,
        iconTheme: {
          primary: "#84cc16",
          secondary: "#fafafa",
        },
      });
    });
  };

  return (
    <div className="text-sm border-t rounded-b-3xl border-neutral-200 text-neutral-700">
      <form onSubmit={sendMessage} className="flex p-6 space-x-5">
        <input
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-500"
          type="text"
          placeholder="Saisissez votre message ici..."
        />
        <button
          disabled={!session || !prompt}
          type="submit"
          className="flex items-center justify-center h-12 w-12 rounded-full bg-lime-500 disabled:opacity-50 hover:rotate-45 transition-all ease-in-out duration-500"
        >
          <PaperAirplaneIcon className="w-6 h-6 -mt-[1px]  -rotate-45 stroke-neutral-50" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
