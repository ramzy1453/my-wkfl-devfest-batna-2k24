"use client";

import { Card } from "@/components/ui/card";
import { services } from "@/data/services";
import { signIn } from "next-auth/react";

export default function CredentialCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <button
            onClick={function () {
              if (service.name === "Google") {
                signIn();
              } else {
                window.location.href = service.link;
              }
            }}
            key={service.name}
          >
            <Card
              className={`
                p-6 cursor-pointer
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:scale-105
                group relative overflow-hidden
                bg-gradient-to-br from-background to-muted
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className={`${service.color} mb-4`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your {service.name} credentials
                </p>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
