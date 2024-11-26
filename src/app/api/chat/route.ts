import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message, content } = await request.json();

  try {
    // Basic chatbot logic (Replace with AI/LLM logic later)
    const response = content.find((item: string) =>
      item.toLowerCase().includes(message.toLowerCase())
    );

    return NextResponse.json({
      response: response || "Sorry, I couldn't find a relevant answer.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process the chatbot query" },
      { status: 500 }
    );
  }
}
