import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import UserInfoTop from "@/components/user-info-top";
import { ChatProvider } from "@/stores/chat";
import { ChatList } from "./components/chat-list";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
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
                  <div className="flex-1 py-9 pl-6">{children}</div>
                </ChatProvider>
              </main>
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
