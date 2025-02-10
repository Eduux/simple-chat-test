import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  return session?.user ? (
    <div>
      <img src={session.user.picture} alt={session.user.name} />
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
    </div>
  ) : (
    redirect("/api/auth/login")
  );
}
