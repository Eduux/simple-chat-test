"use client";

import { useChat } from "../../stores/chat";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";
import { deleteChat } from "../actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const limit = useMemo(() => !!(chats && chats.length >= 3), [chats]);

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button onClick={createNewChat} disabled={limit} size="sm">
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </TooltipTrigger>
              {limit ? (
                <TooltipContent>
                  <p>You have reached the limit of 3 chats</p>
                </TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
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

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => deleteFromList(chat.id)}
                          className="text-red-500 flex items-center justify-between"
                        >
                          Delete <Trash2 className="w-4 h-4 text-red-500" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
