"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("password123")
    await login(demoEmail, "password123")
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Link href="/" className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">Log in to your account</p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <button
          className="w-full text-center text-sm text-primary hover:underline mt-4"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
        >
          {showDemoAccounts ? "Hide demo accounts" : "Show demo accounts"}
        </button>

        {showDemoAccounts && (
          <Alert className="mt-4">
            <AlertTitle>Demo Accounts</AlertTitle>
            <AlertDescription>
              <div className="space-y-2 mt-2">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">Traveler Account:</span>
                    <span>john@example.com</span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => handleDemoLogin("john@example.com")}
                  >
                    Login as Traveler
                  </Button>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">Guide Account:</span>
                    <span>jane@example.com</span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary"
                    onClick={() => handleDemoLogin("jane@example.com")}
                  >
                    Login as Guide
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-2">Password for both accounts: password123</div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Separator className="my-8" />

        <div className="space-y-4">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Continue with Facebook
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Continue with Apple
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

