import { sendMail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  name: string;
  message: string;
  subject: string;
  to: string;
};

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const { name, to, message, subject } = body;
  const mail = await sendMail({
    name,
    to,
    subject,
    text: message,
    from: process.env.EMAIL_USER!,
  });

  console.log({ mail });
  return NextResponse.json({ mail });
}
