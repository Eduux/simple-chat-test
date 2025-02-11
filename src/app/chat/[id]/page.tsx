import { getChatById } from "@/domain/chat";
import Chat, { ChatMessage } from "../components/chat";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const chat = await getChatById(id);

  const chatMessages: ChatMessage[] =
    chat?.messages.map(({ content, sender, timestamp }) => ({
      content,
      sender,
      timestamp,
    })) || [];

  return <Chat messages={chatMessages} chatId={id} />;
}
