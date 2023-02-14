import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type ChatProps = {
  id: string;
};

const ChatRow = ({ id }: ChatProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/chat");
  };

  return (
    <Link href={`/chat/${id}`}>
      <div className="flex items-start justify-start">
        {active ? (
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5 mt-[1px] mr-2 fill-lime-500" />
        ) : (
          <ChatBubbleLeftIcon className="w-4 h-4 mt-[3px] mr-2 stroke-neutral-600" />
        )}
        <p className="flex-1 text-sm text-neutral-700 truncate">
          {messages?.docs[messages?.docs.length - 1]?.data().text ||
            "Nouvelle discussion"}
        </p>
        <TrashIcon
          onClick={removeChat}
          className="w-4 h-4 ml-3 mt-[1px] stroke-neutral-500 hover:stroke-red-500"
        />
      </div>
    </Link>
  );
};

export default ChatRow;
