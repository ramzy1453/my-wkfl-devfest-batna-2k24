"use client";

import { Mail, Send, User } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function EmailNode({ data }: { data: { label: string } }) {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSender(email);
    setIsValidEmail(validateEmail(email));
  };

  return (
    <NodeWrapper label={data.label} icon={Mail} inputs={1} outputs={1}>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <Input
            type="email"
            placeholder="Sender Email"
            value={sender}
            onChange={handleSenderChange}
            className={`flex-grow ${
              !isValidEmail && sender ? "border-red-500" : ""
            }`}
          />
        </div>
        {!isValidEmail && sender && (
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
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{message.length} characters</span>
          <Send
            className={`w-4 h-4 ${
              sender && subject && message ? "text-green-500" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    </NodeWrapper>
  );
}
