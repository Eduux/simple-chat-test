"use server";
import * as chatActions from "@/domain/chat";

export async function sendMessage({
  message,
  chatId,
  userEmail,
}: {
  message: string;
  chatId?: string;
  userEmail: string;
}) {
  if (chatId) {
    return chatActions.addMessage({ sender: "USER", chatId, content: message });
  }

  const chat = await chatActions.createChat({
    title: message,
    userEmail,
  });
  return chatActions.addMessage({
    sender: "USER",
    chatId: chat.id,
    content: message,
  });
}

export async function getUserChats({ userEmail }: { userEmail: string }) {
  return chatActions.getChatsByUser(userEmail);
}
