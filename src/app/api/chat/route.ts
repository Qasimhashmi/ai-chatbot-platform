import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message, content } = await request.json();

  try {
    // Search for relevant content based on the message
    const response = content.find((item: string) =>
      item.toLowerCase().includes(message.toLowerCase())
    );

    // If OpenAI integration is needed, you could call it here to generate a response
    // For example: 
    // const openAiResponse = await openAiAPI.generateResponse(message, content);

    return NextResponse.json({
      response: response || "Sorry, I couldn't find a relevant answer.",
    });
  } catch (error) {
    console.error("Error processing query:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process the chatbot query" },
      { status: 500 }
    );
  }
}
