import { PrismaClient, Sender } from "@prisma/client";
const prisma = new PrismaClient();

export async function createChat({
  title,
  userEmail,
}: {
  title: string;
  userEmail: string;
}) {
  return await prisma.chat.create({
    data: { title, userEmail },
  });
}

export async function getChatsByUser(userEmail: string) {
  return await prisma.chat.findMany({
    where: { userEmail },
    include: { messages: false },
  });
}

export async function getChatById(chatId: string) {
  return await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
}

export async function addMessage({
  chatId,
  content,
  sender,
}: {
  chatId: string;
  sender: Sender;
  content: string;
}) {
  return await prisma.message.create({
    data: { chatId, sender, content },
  });
}

export async function deleteChat(chatId: string) {
  return await prisma.chat.delete({
    where: { id: chatId },
  });
}
