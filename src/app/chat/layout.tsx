import { getSession } from "@auth0/nextjs-auth0";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getSession();

  return (
    <div>
      <header className="border-b border-gray-100 bg-gray-900 text-white shadow-sm w-full py-3  px-6 flex items-center justify-between">
        <div></div>
        <div>
          <div>
            Welcome!{" "}
            <strong>
              {session?.user?.nickname ||
                session?.user?.name ||
                session?.user?.email}
            </strong>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-9 px-6">{children}</main>
    </div>
  );
}
