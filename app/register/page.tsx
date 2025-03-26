"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth-context";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

type UserRole = "TRAVELER" | "OPERATOR";
export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [FormError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "TRAVELER" as UserRole,
  });
  const { register, error, loading } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    await register(
      formData.username,
      formData.email,
      formData.password,
      formData.role
    );
    router.push("/login");
  };
  console.log("error", error);
  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Link
        href="/"
        className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
        <p className="text-gray-600">
          Sign up to discover Rwanda's hidden gems
        </p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700">
              Username
            </Label>
            <Input
              id="username"
              placeholder="John  Marie"
              required
              className="border-gray-300"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              required
              className="border-gray-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="border-gray-300"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "confirmPassword"}
                required
                className="border-gray-300"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {FormError && <div className="text-red-500 text-sm">{FormError}</div>}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="space-y-3">
            <Label className="text-gray-700">I am a:</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={handleRoleChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="TRAVELER" id="traveler" />
                <Label htmlFor="traveler" className="text-gray-700">
                  Traveler - I want to explore tours
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="OPERATOR" id="guide" />
                <Label htmlFor="guide" className="text-gray-700">
                  Tour Guide - I want to offer tours
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <Separator className="my-8" />

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Sign up with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Sign up with Apple
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
