import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function askAQuestion(
  message: string,
  context: { role: "user" | "assistant"; content: string }[] = []
) {
  const data = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful assistant. Always respond in Markdown format, and in the shortest and simplest way possible",
    messages: [...context, { role: "user", content: message }],
  });

  return data.text;
}
