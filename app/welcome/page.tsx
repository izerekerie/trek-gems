"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Welcome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return <h1>Welcome {status}</h1>;
}
