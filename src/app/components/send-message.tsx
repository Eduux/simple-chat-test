"use client";

import { useState, useRef } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "../../components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useChat } from "@/stores/chat";

type Props = {
  onSend(message: string): void;
  loading: boolean;
};

export default function SendMessage({ onSend, loading }: Props) {
  const { loading: loadingAsideChat } = useChat();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const send = async () => {
    if (message.trim() === "") return;
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    onSend(message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex items-end gap-2 pr-6">
      <Textarea
        ref={textareaRef}
        id="chat-textarea"
        className="resize-none w-full bg-gray-50 min-h-[36px] max-h-40 overflow-y-auto"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={1}
        autoFocus
        placeholder="Send a message..."
      />
      <Button onClick={send} disabled={!message || loading || loadingAsideChat}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Send className="w-5 h-5 cursor-pointer" />
        )}
      </Button>
    </div>
  );
}
