// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(request: NextRequest) {
  try {
    // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY!
    );

    // Ininitalise a generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = "Does this look store-bought or homemade?";
    const image = {
      inlineData: {
        data: "base64EncodedImage" /* see JavaScript quickstart for details */,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());

    // Send the llm output as a server reponse object
    return NextResponse.json({ output: result });
  } catch (error) {
    console.error(error);
  }
}

// 1 - ecom hab ykhdm post pro with prompt
