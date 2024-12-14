"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Check } from "lucide-react";

export default function UserBillingDashboard() {
  const [isPremium, setIsPremium] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Social Media API Access",
        "Gemini Text Generation",
        "Basic Analytics",
        "1 Workflow",
      ],
    },
    {
      name: "Premium",
      price: "$49",
      features: [
        "All Free Features",
        "Unlimited Workflows",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
  ];

  const usage = {
    apiCalls: 8500,
    apiLimit: isPremium ? 100000 : 10000,
    workflows: isPremium ? 5 : 1,
    workflowLimit: isPremium ? -1 : 1,
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Plan</CardTitle>
          <CardDescription>
            {isPremium
              ? "You're on the Premium plan"
              : "You're on the Free plan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`w-[48%] p-4 rounded-lg ${
                  plan.name === "Premium" ? "bg-primary/10" : "bg-muted"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-2xl font-bold mb-4">
                  {plan.price}
                  <span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {!isPremium && (
            <Button onClick={() => setIsPremium(true)} className="w-full">
              Upgrade to Premium <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Usage</CardTitle>
          <CardDescription>
            Track your API calls and workflow usage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">API Calls</span>
              <span className="text-sm font-medium">
                {usage.apiCalls} / {usage.apiLimit}
              </span>
            </div>
            <Progress
              value={(usage.apiCalls / usage.apiLimit) * 100}
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Workflows</span>
              <span className="text-sm font-medium">
                {usage.workflows} / {usage.workflowLimit}
              </span>
            </div>
            <Progress
              value={
                isPremium ? 50 : (usage.workflows / usage.workflowLimit) * 100
              }
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-renew subscription</p>
              <p className="text-sm text-muted-foreground">
                Automatically renew your plan
              </p>
            </div>
            <Switch checked={isPremium} onCheckedChange={setIsPremium} />
          </div>
          <div>
            <p className="font-medium">Payment Method</p>
            <p className="text-sm text-muted-foreground">Visa ending in 4242</p>
          </div>
          <div>
            <p className="font-medium">Billing Cycle</p>
            <p className="text-sm text-muted-foreground">
              Next billing date: {isPremium ? "February 15, 2024" : "N/A"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Update Payment Method
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
