"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Define user types
export type UserRole = "traveler" | "guide"

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  avatar?: string
  address?: string
  phone?: string
}

// Define context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: Omit<User, "id"> & { password: string }) => Promise<void>
  logout: () => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample users data
const DUMMY_USERS: (User & { password: string })[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "password123",
    role: "traveler",
    avatar: "/placeholder.svg?height=128&width=128",
    address: "123 Main St, Kigali, Rwanda",
    phone: "+250 123 456 789",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "password123",
    role: "guide",
    avatar: "/placeholder.svg?height=128&width=128",
    address: "456 Park Ave, Kigali, Rwanda",
    phone: "+250 987 654 321",
  },
]

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("trek-gems-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = DUMMY_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Remove password before storing user
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("trek-gems-user", JSON.stringify(userWithoutPassword))

      toast({
        title: "Login successful!",
        description: `Welcome back, ${foundUser.firstName}!`,
      })

      router.push("/dashboard")
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try again or use the demo accounts.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  // Signup function
  const signup = async (userData: Omit<User, "id"> & { password: string }) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    if (DUMMY_USERS.some((u) => u.email === userData.email)) {
      toast({
        title: "Signup failed",
        description: "Email already exists. Please use a different email or login.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Create new user with ID
    const newUser: User = {
      id: `${DUMMY_USERS.length + 1}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      address: userData.address,
      avatar: "/placeholder.svg?height=128&width=128", // Default avatar
    }

    // Add to dummy users (in a real app, this would be a database call)
    DUMMY_USERS.push({ ...newUser, password: userData.password })

    // Set as current user
    setUser(newUser)
    localStorage.setItem("trek-gems-user", JSON.stringify(newUser))

    toast({
      title: "Account created!",
      description: `Welcome to Trek-Gems, ${newUser.firstName}!`,
    })

    router.push("/dashboard")
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("trek-gems-user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

