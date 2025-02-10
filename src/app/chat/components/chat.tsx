"use client";

import { Chat as ChatType } from "@/domain/chat/types";
import { sendMessage } from "../actions";
import SendMessage from "./send-message";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

type Props = {
  chat?: ChatType;
};

export default function Chat({ chat }: Props) {
  const router = useRouter();
  const { user } = useUser();

  const send = async (message: string) => {
    try {
      if (user?.email) {
        const data = await sendMessage({
          chatId: chat?.id,
          message,
          userEmail: user?.email,
        });

        if (!chat) {
          router.push(`/chat/${data.chatId}`);
        }
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
