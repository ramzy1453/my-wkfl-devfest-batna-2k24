import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import type { Session } from "next-auth";
import ClientSessionProvider from "./session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyWkfl",
  description: "MyWkfl helps you manage your workflows",
};

export default function RootLayout({
  children,
  params: { session },
}: Readonly<{
  children: React.ReactNode;
  params: { session?: Session | null };
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ClientSessionProvider>
      </body>
      {/* <Toaster /> */}
    </html>
  );
}
