"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/signin"); // ✅ Redirect to login page if no token
    }
  }, []);
  return <div>Dashboards</div>;
}
