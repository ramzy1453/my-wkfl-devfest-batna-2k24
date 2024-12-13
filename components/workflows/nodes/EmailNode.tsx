"use client";

import { Mail, Send, User } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFlow } from "@/store/flow";
import { Product } from "@/types/product";
import { toast } from "sonner";

export function EmailNode({ data }: { data: { label: string } }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const nodeValues = useFlow((state) => state.nodeValues);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setTo(email);
    setIsValidEmail(validateEmail(email));
  };

  const onSendEmail = async () => {
    const json = nodeValues["Generated Description"] as Product;
    const response = await fetch("http://localhost:3000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "MyWkfl",
        to,
        message: `
          <div class="flex flex-col py-4 h-96 overflow-y-scroll">
                  <div class="flex space-x-4">
                    <img
                      src="${json.base64EncodedImage}"
                      alt="${json.product}"
                      class="w-32 h-32 rounded-md"
                    />
                    <div
                      class="w-16 h-16 rounded-md"
                      style="background-color: ${json.color};"
                      
                    ></div>
        
                    <div className="flex flex-col">
                      <h1 className="font-bold text-lg">Color</h1>
                      <p className="text-muted-foreground"> ${json.color}</p>
                    </div>
                  </div>
                </div>
        `,
        subject,
      }),
    });

    const data = await response.json();
    if (data.accepted.length > 0) {
      toast.success("Email sent successfully to " + to);
    } else {
      toast.error("Failed to send email to " + to);
    }

    console.log({ data });
  };

  return (
    <NodeWrapper label={data.label} icon={Mail} inputs={1} outputs={1}>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <Input
            type="email"
            placeholder="To"
            value={to}
            onChange={handleSenderChange}
            className={`flex-grow ${
              !isValidEmail && to ? "border-red-500" : ""
            }`}
          />
        </div>
        {!isValidEmail && to && (
          <p className="text-red-500 text-xs">
            Please enter a valid email address.
          </p>
        )}
        <Input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <Send
            onClick={onSendEmail}
            className={`w-4 h-4 ${
              to && subject ? "text-green-500" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
