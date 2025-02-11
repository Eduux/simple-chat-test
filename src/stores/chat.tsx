"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserChats } from "../app/chat/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Chat } from "@/domain/chat/types";

interface ChatContextType {
  chats: Chat[] | null;
  isOpen: boolean;
  loading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  load: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      if (user?.email) {
        const userChats = await getUserChats(user?.email);
        if (userChats.length) {
          setChats(userChats);
          setIsOpen(true);
        } else {
          setIsOpen(false);
          setChats([]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user?.email]);

  return (
    <ChatContext.Provider
      value={{ chats, isOpen, loading, setIsOpen, load, setLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
