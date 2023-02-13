"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    console.log("click");
    const docRef = await setDoc(
      doc(db, `users/${session?.user?.email!}/chats/test`),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    // router.push(`/chat/${docRef.id}`);
    console.log(docRef);
  };

  return (
    <button
      onClick={createNewChat}
      className="flex items-center justify-center w-full px-4 py-3 border border-stone-300 rounded-xl hover:bg-lime-500 hover:border-lime-500 group transition-all ease-in-out"
    >
      <PlusIcon className="w-4 h-4 mr-1 stroke-neutral-800 group-hover:stroke-neutral-50" />
      <p className="text-sm font-bold text-neutral-800 group-hover:text-neutral-50">
        Nouvelle discussion
      </p>
    </button>
  );
};

export default NewChat;
