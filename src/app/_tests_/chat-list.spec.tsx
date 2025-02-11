import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, Mock } from "vitest";
import { ChatList } from "../components/chat-list";
import { useChat } from "../../stores/chat";
import { useRouter } from "next/navigation";

vi.mock("../../stores/chat", () => ({
  useChat: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("../actions", () => ({
  deleteChat: vi.fn(),
}));

describe("ChatList Component", () => {
  const mockRouter = { push: vi.fn() };
  const mockSetLoading = vi.fn();
  const mockLoad = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();

    (useRouter as unknown as Mock).mockReturnValue(mockRouter);
    (useChat as unknown as Mock).mockReturnValue({
      chats: [],
      loading: false,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });
  });

  it("renders the component correctly", () => {
    (useChat as unknown as Mock).mockReturnValue({
      chats: [{ id: "1", title: "Test Chat" }],
      loading: false,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });

    render(<ChatList />);
    expect(screen.getByText("My Chats")).toBeTruthy();
    expect(screen.getByText("Test Chat")).toBeTruthy();
  });

  it("shows a loading spinner when loading", () => {
    (useChat as unknown as Mock).mockReturnValue({
      chats: [],
      loading: true,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });

    render(<ChatList />);
    expect(screen.getByRole("status")).toBeTruthy();
  });

  it("displays a message when no chats are available", () => {
    (useChat as unknown as Mock).mockReturnValue({
      chats: [],
      loading: false,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });

    render(<ChatList />);
    expect(screen.getByText("No chats available")).toBeTruthy();
  });

  it("calls router.push when creating a new chat", async () => {
    render(<ChatList />);

    const newChatButton = await screen.findByTestId("new-chat");
    fireEvent.click(newChatButton);

    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith("/"));
  });

  it("calls router.push when clicking on a chat", async () => {
    (useChat as unknown as Mock).mockReturnValue({
      chats: [{ id: "1", title: "Test Chat" }],
      loading: false,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });

    render(<ChatList />);
    const chatItem = await screen.findByTestId("chat-1");
    fireEvent.click(chatItem);

    await waitFor(() =>
      expect(mockRouter.push).toHaveBeenCalledWith("/chat/1")
    );
  });

  it("disables the new chat button when the limit is reached", () => {
    (useChat as unknown as Mock).mockReturnValue({
      chats: [
        { id: "1", title: "Chat 1" },
        { id: "2", title: "Chat 2" },
        { id: "3", title: "Chat 3" },
      ],
      loading: false,
      isOpen: true,
      load: mockLoad,
      setLoading: mockSetLoading,
    });

    render(<ChatList />);
    expect(
      screen.getByTestId("new-chat").getAttribute("disabled")
    ).not.toBeNull();
  });
});
