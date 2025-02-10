import UserInfoTop from "@/components/user-info-top";
import { ChatList } from "./components/chat-list";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div>
      <header className="border-b border-gray-100 bg-gray-800 text-white shadow-lg w-full py-3  px-6 flex items-center justify-between">
        <div></div>
        <div>
          <UserInfoTop />
        </div>
      </header>

      <div>
        <main className="flex w-full h-[calc(100vh-49px)]">
          <div className="w-full max-w-[300px]">
            <ChatList />
          </div>
          <div className="flex-1 py-9 px-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
