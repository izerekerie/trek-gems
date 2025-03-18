"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import ReviewForm from "@/components/review-form"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()

  // In a real app, you would fetch the tour data based on the ID
  const tour = {
    id: Number.parseInt(params.id),
    title: "Lake Burera Cultural Experience",
  }

  const handleSuccess = () => {
    toast({
      title: "Review submitted!",
      description: "Thank you for sharing your experience.",
    })

    // Redirect back to the tour page
    setTimeout(() => {
      router.push(`/tours/${params.id}`)
    }, 1500)
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <Link href={`/tours/${params.id}`} className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tour
      </Link>

      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Write a Review</h1>
        <p className="text-gray-600">Share your experience with {tour.title}</p>
      </div>

      <ReviewForm tourId={tour.id} tourName={tour.title} onSuccess={handleSuccess} />
    </div>
  )
}

