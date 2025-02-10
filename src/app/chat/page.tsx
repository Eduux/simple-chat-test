import Chat from "./components/chat";
import { v4 as uuidv4 } from "uuid";

export default function ChatPage() {
  const chatId = uuidv4();

  return <Chat chatId={chatId} />;
}
