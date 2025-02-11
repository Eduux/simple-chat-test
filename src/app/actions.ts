"use server";
import * as chatActions from "@/domain/chat";
import askAQuestion from "@/lib/open-ai";
import { ChatMessage } from "./components/chat";

export async function sendMessage({
  message,
  chatId,
  userEmail,
  messages = [],
}: {
  message: string;
  chatId: string;
  userEmail: string;
  messages?: ChatMessage[];
}) {
  if (messages.length) {
    const userMessage = await chatActions.addMessage({
      sender: "USER",
      chatId,
      content: message,
    });

    const answer = await askAQuestion(
      message,
      messages.map(({ content, sender }) => ({
        content,
        role: sender === "AI" ? "assistant" : "user",
      }))
    );

    const aiMessage = await chatActions.addMessage({
      sender: "AI",
      chatId,
      content: answer,
    });

    return {
      success: true,
      newChat: false,
      aiResponse: answer,
      aiTime: aiMessage.timestamp,
      userTime: userMessage.timestamp,
    };
  }

  const chat = await chatActions.createChat({
    id: chatId,
    title: message,
    userEmail,
  });

  const userMessage = await chatActions.addMessage({
    sender: "USER",
    chatId: chat.id,
    content: message,
  });

  const answer = await askAQuestion(message);

  const aiMessage = await chatActions.addMessage({
    sender: "AI",
    chatId,
    content: answer,
  });

  return {
    success: true,
    newChat: true,
    aiResponse: answer,
    aiTime: aiMessage.timestamp,
    userTime: userMessage.timestamp,
  };
}

export async function getUserChats(userEmail: string) {
  return chatActions.getChatsByUser(userEmail);
}

export async function deleteChat(chatId: string) {
  return chatActions.deleteChat(chatId);
}
