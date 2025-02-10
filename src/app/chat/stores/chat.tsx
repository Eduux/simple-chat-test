"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "@prisma/client";
import { getUserChats } from "../actions";

interface ChatContextType {
  chats: Chat[] | null;
  isOpen: boolean;
  loading: boolean;
  setIsOpen: (isOpen: boolean) => void;
  load: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const userChats = await getUserChats();
      if (userChats.length) {
        setChats(userChats);
        setIsOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ChatContext.Provider value={{ chats, isOpen, loading, setIsOpen, load }}>
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
