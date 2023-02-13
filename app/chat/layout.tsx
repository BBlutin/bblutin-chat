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
      <section className="flex-1 bg-white md:my-4 md:rounded-l-3xl">
        {children}
      </section>
    </>
  );
}
