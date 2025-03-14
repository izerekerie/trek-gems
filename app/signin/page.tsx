"use client";

import { useState } from "react";
import signIn from "../firebase/auth/signin";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      console.log("error", error.message);
    } else {
      setUser(result?.user);
      const token = await result?.user.getIdToken();

      setToken(token || "");
      console.log("user", result?.user);
      router.push("/dashboard");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Google Login Button */}
        <button
          //   onClick={() => signIn("google")}
          className="flex items-center justify-center w-full mt-4 p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Login with Google
        </button>

        <div className="text-center my-4 text-gray-500">
          or login with email
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          {error && <div className="text-red-400 text-bold">{error}</div>}

          <a href="#" className="text-blue-600 text-sm">
            Forgot password?
          </a>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
