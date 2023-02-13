"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="text-sm border-t-2 rounded-b-3xl border-neutral-200 text-neutral-700">
      <form className="flex p-6 space-x-5">
        <input
          value={prompt}
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-500"
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Saisissez votre message ici..."
        />
        <button type="submit" className="p-3 rounded-full bg-lime-500">
          <PaperAirplaneIcon className="w-6 h-6 -rotate-45 stroke-neutral-50" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
