"use client";

import { useChat } from "../stores/chat";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";

export function ChatList() {
  const { chats, loading, isOpen } = useChat();

  return (
    <div className={`${isOpen ? `w-full max-w-[300px]` : `w-0`}`}>
      <motion.div
        className="bg-gray-100 px-6 py-9 h-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -50 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <h2 className="font-semibold mb-6">My Chats</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-10">
            {chats && chats.length ? (
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div className="border-b pb-2" key={chat.id}>
                    {chat.title}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </motion.div>
    </div>
  );
}
