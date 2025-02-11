"use client";

import { useChat } from "../../stores/chat";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";
import { deleteChat } from "../actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export function ChatList() {
  const router = useRouter();
  const { chats, loading, isOpen, load, setLoading } = useChat();

  const createNewChat = () => {
    router.push(`/`);
  };

  const goToChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const deleteFromList = async (chatId: string) => {
    setLoading(true);
    await deleteChat(chatId);
    await load();
    router.push("/");
  };

  return (
    <div className={`${isOpen ? `w-full max-w-[300px]` : `w-0`}`}>
      <motion.div
        className="bg-gray-100 px-6 py-9 h-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -50 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold">My Chats</h2>
          <Button onClick={createNewChat}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-10">
            {chats && chats.length ? (
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    className="flex items-center justify-between border-b pb-2 cursor-pointer hover:border-black transition-all"
                    key={chat.id}
                    onClick={() => goToChat(chat.id)}
                  >
                    <span className="text-sm truncate whitespace-nowrap overflow-hidden max-w-[200px]">
                      {chat.title}
                    </span>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFromList(chat.id);
                      }}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No chats available</p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
