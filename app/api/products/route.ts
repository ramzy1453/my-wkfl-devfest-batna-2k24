import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

type Body = Product;
export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  if (!fs.existsSync("products.csv")) {
    fs.writeFileSync("products.csv", "product,category,color,description\n");
  }
  fs.appendFileSync(
    "products.csv",
    `${body.product},${body.category},${body.color},${body.description}\n`
  );

  return NextResponse.json({
    success: true,
    message: "Product added with success",
  });
}

export async function GET() {
  if (!fs.existsSync("products.csv")) {
    return NextResponse.json([]);
  }
  const data = fs.readFileSync("products.csv", "utf-8");

  const lines = data.split("\n");
  const headers = lines[0].split(",");
  const products = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {} as Product);
  });

  return NextResponse.json(products);
}
