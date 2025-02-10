import { PrismaClient, Sender } from "@prisma/client";
const prisma = new PrismaClient();

export async function createChat({
  id,
  title,
  userEmail,
}: {
  id: string;
  title: string;
  userEmail: string;
}) {
  return await prisma.chat.create({
    data: { title, userEmail, id },
  });
}

export async function getChatsByUser(userEmail: string) {
  return await prisma.chat.findMany({
    where: { userEmail },
    include: { messages: false },
  });
}

export async function getChatById(
  chatId: string,
  includeMessages: boolean = true
) {
  return await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: includeMessages },
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
  await prisma.message.deleteMany({
    where: { chatId },
  });

  return await prisma.chat.delete({
    where: { id: chatId },
  });
}
