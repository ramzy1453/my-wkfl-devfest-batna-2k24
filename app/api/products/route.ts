import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

type Body = Product;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();

  // list dir and console log

  if (!fs.existsSync("./public/data/products.csv")) {
    fs.writeFileSync(
      "./public/data/products.csv",
      "product,category,color,description,image_link\n"
    );
  }

  const generatedImage = await fetch(
    "https://image.pollinations.ai/prompt/" + body.description
  );

  const imageData = await generatedImage.arrayBuffer();

  // save image in the server
  const image_link = `images/${body.product}.png`;
  if (!fs.existsSync("./public/images")) {
    fs.mkdirSync("./public/images");
  }
  fs.writeFileSync(`./public/${image_link}`, Buffer.from(imageData));

  // create url from base64 encoded image data
  fs.appendFileSync(
    "./public/data/products.csv",
    `${body.product},${body.category},${body.color},${body.description},${image_link}\n`
  );

  return NextResponse.json({
    success: true,
    message: "Product added with success",
  });
}

export async function GET() {
  if (!fs.existsSync("./public/data/products.csv")) {
    return NextResponse.json([]);
  }
  const data = fs.readFileSync("./public/data/products.csv", "utf-8");

  const lines = data.split("\n");
  const headers = lines[0].split(",");
  const products = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {} as Product & { image_link: string });
  });

  return NextResponse.json(
    products.filter((product) => product.product !== "")
  );
}
