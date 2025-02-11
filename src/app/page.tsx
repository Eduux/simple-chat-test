import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import Chat from "./components/chat";

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    return redirect("/api/auth/login");
  }

  const chatId = uuidv4();

  return <Chat chatId={chatId} />;
}
