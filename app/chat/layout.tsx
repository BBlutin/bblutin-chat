import SideBar from "../../components/SideBar";
import "../../styles/globals.css";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <section className="bg-neutral-50 flex-1 md:my-4 md:rounded-l-3xl">
        {children}
      </section>
    </>
  );
}
