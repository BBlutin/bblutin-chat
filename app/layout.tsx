import { getServerSession } from "next-auth";
import Login from "../components/Login";
import SessionProvider from "../components/SessionProvider";
import "../styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          <main className="flex h-screen bg-neutral-100">
            {!session ? <Login /> : <>{children}</>}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
