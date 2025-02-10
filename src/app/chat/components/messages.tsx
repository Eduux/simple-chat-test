import { ChatMessage } from "./chat";

type Props = {
  messages: ChatMessage[];
};

export default function Messages({ messages }: Props) {
  return (
    <div className="flex-1 space-y-2 flex flex-col items-end justify-end mb-6">
      {messages.map((message, index) => (
        <div key={`${message.content}-${index}`}>
          {message.sender === "AI" ? (
            <div>aiii</div>
          ) : (
            <div className="bg-slate-200 px-4 py-1 rounded-md">
              {message.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
