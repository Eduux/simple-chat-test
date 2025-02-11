export type Chat = {
  id: string;
  createdAt: Date;
  title: string;
  userEmail: string;
};

export type Sender = "USER" | "AI";

export type Message = {
  id: string;
  chatId: string;
  sender: Sender;
  content: string;
  timestamp: Date;
};
