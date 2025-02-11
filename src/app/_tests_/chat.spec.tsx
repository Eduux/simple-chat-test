import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, Mock } from "vitest";
import Chat from "../components/chat";
import { useChat } from "../../stores/chat";
import { useUser } from "@auth0/nextjs-auth0/client";
import { sendMessage } from "../actions";
import userEvent from "@testing-library/user-event";

vi.mock("../../stores/chat", () => ({
  useChat: vi.fn(),
}));

vi.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: vi.fn(),
}));

vi.mock("../actions", () => ({
  sendMessage: vi.fn(),
}));

describe("Chat Component", () => {
  const mockLoad = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    (useChat as unknown as Mock).mockReturnValue({ load: mockLoad });
    (useUser as unknown as Mock).mockReturnValue({
      user: { email: "test@example.com" },
    });

    (sendMessage as unknown as Mock).mockResolvedValue({
      newChat: false,
      aiResponse: "AI response",
      aiTime: new Date("2024-02-11T12:02:00Z"),
      userTime: new Date("2024-02-11T12:01:00Z"),
    });
  });

  it("renders without crashing", () => {
    render(<Chat chatId="123" messages={[]} />);

    expect(screen.getByText("Ask a question...")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("displays messages when provided", () => {
    render(
      <Chat
        chatId="123"
        messages={[
          {
            sender: "USER",
            content: "Hello!",
            timestamp: new Date("2024-02-11T12:00:00Z"),
            chatId: "123",
            id: "1",
          },
          {
            sender: "AI",
            content: "Hi!",
            timestamp: new Date("2024-02-11T12:01:00Z"),
            chatId: "123",
            id: "1",
          },
        ]}
      />
    );

    expect(screen.getByText("Hello!")).toBeTruthy();
    expect(screen.getByText("Hi!")).toBeTruthy();
  });

  it("sends a message when the send button is clicked", async () => {
    render(<Chat chatId="123" messages={[]} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const sendButton = screen.getByRole("button");

    await userEvent.type(textarea, "Hello, AI!");
    fireEvent.click(sendButton);

    expect(sendButton.getAttribute("disabled")).not.toBeNull();

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith({
        chatId: "123",
        message: "Hello, AI!",
        userEmail: "test@example.com",
        messages: [],
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Hello, AI!")).toBeTruthy();
      expect(screen.getByText("AI response")).toBeTruthy();
    });
  });

  it("sends a message when Enter is pressed", async () => {
    render(<Chat chatId="123" messages={[]} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;

    await userEvent.type(textarea, "Hello, AI!{enter}");

    await waitFor(() =>
      expect(sendMessage).toHaveBeenCalledWith({
        chatId: "123",
        message: "Hello, AI!",
        userEmail: "test@example.com",
        messages: [],
      })
    );

    await waitFor(() => {
      expect(screen.getByText("Hello, AI!")).toBeTruthy();
      expect(screen.getByText("AI response")).toBeTruthy();
    });
  });

  it("disables the send button when loading", async () => {
    render(<Chat chatId="123" messages={[]} />);

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const sendButton = screen.getByRole("button");

    await userEvent.type(textarea, "Hello, AI!");
    fireEvent.click(sendButton);

    await waitFor(() =>
      expect(sendButton.getAttribute("disabled")).not.toBeNull()
    );
  });

  it("loads new messages when `messages` prop changes", async () => {
    const { rerender } = render(<Chat chatId="123" messages={[]} />);

    expect(screen.getByText("Ask a question...")).toBeTruthy();

    rerender(
      <Chat
        chatId="124"
        messages={[
          {
            sender: "USER",
            content: "New message",
            timestamp: new Date(),
            chatId: "124",
            id: "1",
          },
        ]}
      />
    );

    expect(screen.getByText("New message")).toBeTruthy();
  });
});
