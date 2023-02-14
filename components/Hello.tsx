"use client";

import { useSession } from "next-auth/react";

const Hello = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status != "loading" && (
        <div className="bg-neutral-800 bg-opacity-40 px-4 py-2 rounded-full backdrop-blur-sm absolute top-[25vh] right-4 md:right-10 xl:right-60">
          <span className="font-medium text-neutral-50">
            Hey {session?.user?.name} 👋
          </span>
        </div>
      )}
    </>
  );
};

export default Hello;
