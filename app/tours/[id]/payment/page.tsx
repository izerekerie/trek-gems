"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import PaymentForm from "@/components/payment-form"
import { useRouter } from "next/navigation"

export default function PaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // In a real app, you would fetch the tour data and booking details from your state management
  const tour = {
    id: Number.parseInt(params.id),
    title: "Lake Burera Cultural Experience",
    price: 89,
    guests: 2,
  }

  const totalAmount = tour.price * tour.guests

  const handleSuccess = () => {
    // Redirect to confirmation page
    router.push(`/tours/${params.id}/confirmation`)
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Link href={`/tours/${params.id}`} className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tour
      </Link>

      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
        <p className="text-gray-600">
          {tour.title} for {tour.guests} {tour.guests === 1 ? "guest" : "guests"}
        </p>
      </div>

      <PaymentForm amount={totalAmount} tourName={tour.title} onSuccess={handleSuccess} />

      <p className="text-center text-sm text-gray-600 mt-6">
        By completing this booking, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}

