"use client";

import { sendMessage } from "../actions";
import SendMessage from "./send-message";
import { useChat } from "../../../stores/chat";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { Message, Sender } from "@/domain/chat/types";
import Messages from "./messages";
import { ArrowDown } from "lucide-react";

export type ChatMessage = {
  sender: Sender;
  content: string;
  timestamp?: Date;
};

type Props = {
  chatId: string;
  messages?: Message[];
};

export default function Chat({ chatId, messages }: Props) {
  const { user } = useUser();
  const { load } = useChat();
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    messages || []
  );

  const addMessage = (chat: ChatMessage) => {
    setChatMessages((prev) => [...prev, chat]);
  };

  const send = async (message: string) => {
    setLoading(true);
    window.history.replaceState({}, "", `/chat/${chatId}`);

    if (user?.email) {
      addMessage({ sender: "USER", content: message });

      const response = await sendMessage({
        chatId,
        message,
        userEmail: user.email,
        messages: chatMessages,
      });

      if (response.newChat) {
        load();
      }

      setChatMessages((prev) => {
        const updatedMessages = [...prev];
        const userMessageIndex = updatedMessages.findIndex(
          (msg) => msg.sender === "USER" && msg.content === message
        );

        if (userMessageIndex !== -1) {
          updatedMessages[userMessageIndex] = {
            ...updatedMessages[userMessageIndex],
            timestamp: response.userTime,
          };
        }

        return updatedMessages;
      });

      addMessage({
        sender: "AI",
        content: response.aiResponse,
        timestamp: response.aiTime,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    setChatMessages(messages || []);
  }, [chatId]);

  return (
    <div className="flex flex-col h-full max-w-full">
      {!chatMessages?.length ? (
        <div className="flex-1 h-full flex-col flex items-center justify-center space-y-6 text-2xl">
          <div className="flex items-center space-x-4">
            <h2>Ask a question...</h2>
          </div>
          <ArrowDown className="w-14 h-14 animate-bounce" />
        </div>
      ) : null}
      <Messages messages={chatMessages} />
      <SendMessage onSend={send} loading={loading} />
    </div>
  );
}
