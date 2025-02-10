"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserInfoTop() {
  const { user } = useUser();

  return (
    <div>
      Welcome! <strong>{user?.nickname || user?.name || user?.email}</strong>
    </div>
  );
}
