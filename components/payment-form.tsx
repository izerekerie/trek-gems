"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Calendar, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  amount: number
  tourName: string
  onSuccess?: () => void
}

export default function PaymentForm({ amount, tourName, onSuccess }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment successful!",
        description: "Your booking has been confirmed.",
      })
      if (onSuccess) onSuccess()
    }, 2000)
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Payment Details</CardTitle>
        <CardDescription>Complete your booking for {tourName}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number" className="text-gray-700">
              Card Number
            </Label>
            <div className="relative">
              <Input id="card-number" placeholder="1234 5678 9012 3456" className="pl-10 border-gray-300" required />
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-gray-700">
                Expiry Date
              </Label>
              <div className="relative">
                <Input id="expiry" placeholder="MM/YY" className="pl-10 border-gray-300" required />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc" className="text-gray-700">
                CVC
              </Label>
              <div className="relative">
                <Input id="cvc" placeholder="123" className="pl-10 border-gray-300" required />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Name on Card
            </Label>
            <Input id="name" placeholder="John Doe" className="border-gray-300" required />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Tour Price</span>
              <span className="text-gray-900">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Booking Fee</span>
              <span className="text-gray-900">$10.00</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${(amount + 10).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-4">
            <Lock className="h-4 w-4 mr-2 text-gray-500" />
            Your payment information is secure and encrypted
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

