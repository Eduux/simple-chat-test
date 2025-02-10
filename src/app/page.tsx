import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  return session?.user ? redirect("/chat") : redirect("/api/auth/login");
}
