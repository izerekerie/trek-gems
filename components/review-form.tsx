"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  tourId: number
  tourName: string
  onSuccess?: () => void
}

export default function ReviewForm({ tourId, tourName, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    if (comment.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please write a more detailed review (at least 10 characters).",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, you would submit to your API here
    // await fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ tourId, rating, comment }) })

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience.",
      })
      setRating(0)
      setComment("")
      setIsSubmitting(false)
      if (onSuccess) onSuccess()
    }, 1000)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Write a Review</h3>
      <p className="text-gray-600 mb-6">Share your experience about {tourName}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Your Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-8 w-8 ${
                    (hoverRating ? star <= hoverRating : star <= rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2 text-gray-700">
            Your Review
          </label>
          <Textarea
            id="comment"
            placeholder="Tell us about your experience..."
            className="min-h-[120px] border-gray-300"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}

