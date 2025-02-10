"use client";

import { Chat as ChatType } from "@/domain/chat/types";
import { sendMessage } from "../actions";
import SendMessage from "./send-message";
import { useRouter } from "next/navigation";

type Props = {
  chat?: ChatType;
};

export default function Chat({ chat }: Props) {
  const router = useRouter();

  const send = async (message: string) => {
    try {
      const data = await sendMessage({
        chatId: chat?.id,
        message,
      });

      if (!chat) {
        router.push(`/chat/${data.chatId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SendMessage onSend={send} />
    </div>
  );
}
