// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(request: NextRequest) {
  try {
    // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
    );

    // Ininitalise a generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Retrieve the data we recieve as part of the request body
    const { prompt } = await request.json();

    // Pass the prompt to the model and retrieve the output
    const result = await model.generateContent(prompt);
    const output = await result.response.text();
    // Send the llm output as a server reponse object
    return NextResponse.json({ output });
  } catch (error) {
    console.error(error);
  }
}
