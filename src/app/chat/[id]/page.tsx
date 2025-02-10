import { getChatById } from "@/domain/chat";
import Chat from "../components/chat";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const chat = await getChatById(id);

  if (chat) {
    return <Chat chat={chat} />;
  }

  return <div>Chat not found.</div>;
}
