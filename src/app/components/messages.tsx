import { ChatMessage } from "./chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { useEffect } from "react";

type Props = {
  messages: ChatMessage[];
};

export default function Messages({ messages }: Props) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto">
      <div className="space-y-2 flex flex-col items-end justify-end mb-6 pr-6">
        {messages.map((message, index) => (
          <div
            key={`${message.timestamp}-${index}`}
            className={`px-4 py-1 rounded-md ${
              message.sender === "AI" ? " self-start" : " self-end"
            }`}
          >
            <div
              className={`${
                message.sender === "AI" ? "text-left" : "text-right"
              }`}
            >
              <span className="text-xs">
                {message.timestamp
                  ? new Intl.DateTimeFormat("en-US", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(message.timestamp))
                  : ""}
              </span>
            </div>
            <div
              className={`px-4 py-1 rounded-md ${
                message.sender === "AI"
                  ? "bg-slate-500 text-white "
                  : "bg-slate-200"
              }`}
            >
              {message.sender === "AI" ? (
                <ReactMarkdown
                  className="space-y-2 markdown-llm"
                  remarkPlugins={[remarkGfm]}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <div className="py-4">{message.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      ></div>
    </div>
  );
}
