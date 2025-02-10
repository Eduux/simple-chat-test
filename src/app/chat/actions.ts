"use server";

import * as chatActions from "@/domain/chat";
import { getSession } from "@auth0/nextjs-auth0";

export async function sendMessage({
  message,
  chatId,
}: {
  message: string;
  chatId?: string;
}) {
  // Certifica-se de chamar getSession primeiro
  const session = await getSession();
  if (!session?.user?.email) {
    throw new Error("Usuário não autenticado.");
  }

  const userEmail = session.user.email;

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

export async function getUserChats() {
  const session = await getSession();

  if (!session?.user?.email) {
    throw new Error("Usuário não autenticado.");
  }

  return chatActions.getChatsByUser(session.user.email);
}
