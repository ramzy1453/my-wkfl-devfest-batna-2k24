// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import Replicate from "replicate";
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

// Create an asynchronous function POST to handle POST
// request with parameters request and response.
export async function POST(request: NextRequest) {
  console.log({
    auth: process.env.REPLICATE_API_KEY,
  });
  const { base64EncodedImage, prompt } = await request.json();
  try {
    const output = await replicate.run(
      "yorickvp/llava-13b:80537f9eead1a5bfa72d5ac6ea6414379be41d4d4f6679fd776e9535d1eb58bb",
      {
        input: {
          image:
            "https://media.discordapp.net/attachments/1313309005745098842/1317076522716368896/image.png?ex=675d5e99&is=675c0d19&hm=1ca007d5582a861144454dabb1aa95c4d429e7c5cf2956de694d6dbbf767a48c&=&format=webp&quality=lossless&width=2635&height=1482",
          top_p: 1,
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.2,
        },
      }
    );
    console.log(output);
    return NextResponse.json({ output: "output" });

    // Send the llm output as a server reponse object
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

// 1 - ecom hab ykhdm post pro with prompt
