import NewChat from "./NewChat";

const SideBar = () => {
  return (
    <div className="py-6 px-4 flex-col h-screen hidden md:flex min-w-[15rem] lg:min-w-[20rem] 2xl:min-w-[25rem]">
      <div></div>
      <h1 className="text-2xl text-neutral-800 font-semibold font-mono">
        BB.Chat
      </h1>
      <div className="flex-1">
        <div className="mt-5">
          <NewChat />
          <h2 className="text-neutral-500 font-semibold mt-5">Chat récents</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
