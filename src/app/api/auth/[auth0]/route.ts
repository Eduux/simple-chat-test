import { handleAuth, handleCallback, Session } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

async function afterCallback(req: NextRequest, session: Session) {
  return session;
}

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
