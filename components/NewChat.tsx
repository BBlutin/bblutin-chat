import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const docRef = await addDoc(
      collection(doc(db, "users", session?.user?.email!), "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${docRef.id}`);
  };

  return (
    <button
      onClick={createNewChat}
      className="flex items-center justify-center w-full px-4 py-3 transition-all ease-in-out border outline-none border-stone-300 focus:text-neutral-800 rounded-xl md:hover:bg-lime-500 md:hover:border-lime-500 md:hover:text-neutral-50 group"
    >
      <PlusIcon className="w-4 h-4 mr-1 stroke-neutral-800 group-hover:stroke-neutral-50" />
      <p className="text-sm font-bold text-neutral-800 group-hover:text-neutral-50">
        Nouvelle discussion
      </p>
    </button>
  );
};

export default NewChat;
