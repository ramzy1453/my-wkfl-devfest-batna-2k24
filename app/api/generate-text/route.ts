// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const prompt =body.prompt
      
    
    const result = await model.generateContent([
   productPromptTemplate,
      prompt,
     
    ]);

    return NextResponse.json({ output: result.response.text() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

const productPromptTemplate = `

Analyze the provided text and extract the following details in JSON format:

- "product": What is the product?
- "category": The general category it belongs to (e.g., electronics, clothing, furniture, etc.).
- "color": The primary color of the product (one string valide for CSS like red, blue ext..).
- "description": A brief description of the product, including its key features or characteristics.
Format the output as a JSON object using the following structure:
{
  "product": "string",
  "category": "string",
  "color": "string",
  "description": "string"
}
  or she maybe can change but you can somtimes add somthing neew in json format  soo tour only job is to extract the data from the text and return it in json format
`;
