// React code example using usePollinationsImage hook
// For more details, visit: https://react-hooks.pollinations.ai/

"use client";
import React from "react";
import { usePollinationsImage } from "@pollinations/react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const GeneratedImageComponent = () => {
  const { data: session } = useSession();
  console.log({ session });
  console.log(
    "NEXT_PUBLIC_FACEBOOK_ID",
    process.env.NEXT_PUBLIC_FACEBOOK_ID,
    "NEXT_PUBLIC_FACEBOOK_SECRET",
    process.env.NEXT_PUBLIC_FACEBOOK_SECRET
  );

  return (
    <div>
      {session ? (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && <div>{session.user?.name}</div>}
    </div>
  );
};

export default GeneratedImageComponent;
