"use client";

import { sendMessage } from "../actions";
import SendMessage from "./send-message";
import { useChat } from "../stores/chat";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { Sender } from "@prisma/client";
import Messages from "./messages";

export type ChatMessage = {
  sender: Sender;
  content: string;
  timestamp?: Date;
};

type Props = {
  chatId: string;
  messages?: ChatMessage[];
};

export default function Chat({ chatId, messages }: Props) {
  const { user } = useUser();
  const { load } = useChat();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    messages || []
  );

  const addMessage = (chat: ChatMessage) => {
    setChatMessages((prev) => [...prev, chat]);
  };

  const send = async (message: string) => {
    window.history.replaceState({}, "", `/chat/${chatId}`);

    if (user?.email) {
      addMessage({ sender: "USER", content: message });

      sendMessage({
        chatId,
        message,
        userEmail: user.email,
      }).then((response) => {
        if (response.newChat) {
          load();
        }
      });
    }
  };

  useEffect(() => {
    setChatMessages(messages || []);
  }, [chatId]);

  return (
    <div className="flex flex-col h-full max-w-full">
      <Messages messages={chatMessages} />
      <SendMessage onSend={send} />
    </div>
  );
}
