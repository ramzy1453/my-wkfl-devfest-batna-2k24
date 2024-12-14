"use client";

import { Mail, User } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMail } from "@/store/mail";

export function EmailNode({ data }: { data: { label: string } }) {
  const to = useMail((state) => state.to);
  const subject = useMail((state) => state.subject);
  const setTo = useMail((state) => state.setTo);
  const setSubject = useMail((state) => state.setSubject);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setTo(email);
    setIsValidEmail(validateEmail(email));
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
      </div>
    </NodeWrapper>
  );
}
