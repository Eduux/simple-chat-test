import UserInfoTop from "@/components/user-info-top";
import { ChatList } from "./components/chat-list";
import { ChatProvider } from "./stores/chat";

export default async function ChatLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <div>
      <header className="border-b border-gray-100 bg-gray-800 text-white shadow-md w-full py-3  px-6 flex items-center justify-between">
        <div></div>
        <div>
          <UserInfoTop />
        </div>
      </header>

      <div>
        <main className="flex w-full h-[calc(100vh-49px)]">
          <ChatProvider>
            <ChatList />
            <div className="flex-1 py-9 px-6 max-w-7xl mx-auto">{children}</div>
          </ChatProvider>
        </main>
      </div>
    </div>
  );
}
