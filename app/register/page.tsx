"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"
import type { UserRole } from "@/lib/auth-context"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "traveler" as UserRole,
  })
  const { signup, isLoading } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signup(formData)
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <Link href="/" className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
        <p className="text-gray-600">Sign up to discover Rwanda's hidden gems</p>
      </div>

      <div className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                required
                className="border-gray-300"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                className="border-gray-300"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
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
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Password must be at least 8 characters long</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">
              Address
            </Label>
            <Input
              id="address"
              placeholder="123 Main St, City, Country"
              required
              className="border-gray-300"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700">I am a:</Label>
            <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="traveler" id="traveler" />
                <Label htmlFor="traveler" className="text-gray-700">
                  Traveler - I want to explore tours
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="guide" id="guide" />
                <Label htmlFor="guide" className="text-gray-700">
                  Tour Guide - I want to offer tours
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <Separator className="my-8" />

        <div className="space-y-4">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign up with Facebook
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
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
  )
}

