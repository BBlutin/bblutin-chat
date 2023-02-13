import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <main className="bg-neutral-200 flex h-screen">{children}</main>
      </body>
    </html>
  );
}
