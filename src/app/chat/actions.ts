"use server";

import * as chatActions from "@/domain/chat";

export async function sendMessage({
  message,
  chatId,
  userEmail,
}: {
  message: string;
  chatId: string;
  userEmail: string;
}) {
  const chatExists = await chatActions.getChatById(chatId, false);

  if (chatExists) {
    await chatActions.addMessage({ sender: "USER", chatId, content: message });

    return { success: true, newChat: false };
  }

  const chat = await chatActions.createChat({
    id: chatId,
    title: message,
    userEmail,
  });

  await chatActions.addMessage({
    sender: "USER",
    chatId: chat.id,
    content: message,
  });

  return { success: true, newChat: true };
}

export async function getUserChats(userEmail: string) {
  return chatActions.getChatsByUser(userEmail);
}

export async function deleteChat(chatId: string) {
  return chatActions.deleteChat(chatId);
}
