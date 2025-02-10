"use client";
import { useEffect, useState } from "react";
import { getUserChats } from "../actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Chat } from "@/domain/chat/types";

export function ChatList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function getChats() {
      if (user?.email) {
        setLoading(true);
        try {
          const userChats = await getUserChats({ userEmail: user?.email });
          if (userChats.length) {
            setChats(userChats);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    }

    getChats();
  }, [user]);

  return (
    <div className="bg-gray-100 px-6 py-9 h-full">
      <h2 className="font-semibold mb-6">My Chats</h2>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="space-y-10">
          {chats.length ? (
            <div>
              {chats.map((chat) => (
                <div key={chat.id}>{chat.title}</div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
