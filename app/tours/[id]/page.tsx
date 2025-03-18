"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Star, Users, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function TourDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()

  // In a real application, you would fetch the tour data based on the ID
  const tour = {
    id: Number.parseInt(params.id),
    title: "Lake Burera Cultural Experience",
    location: "Northern Province, Rwanda",
    description:
      "Immerse yourself in the rich cultural heritage of communities surrounding Lake Burera. Learn traditional fishing techniques, participate in cultural dances, and enjoy authentic local cuisine prepared by community members. This tour directly supports local families and helps preserve traditional practices.",
    price: 89,
    rating: 4.8,
    reviewCount: 124,
    duration: "Full Day (8 hours)",
    groupSize: "2-12 people",
    languages: ["English", "French", "Kinyarwanda"],
    included: [
      "Professional local guide",
      "Traditional lunch and refreshments",
      "Cultural activities and demonstrations",
      "Transportation from Kigali",
      "Community contribution fee",
    ],
    notIncluded: ["Personal expenses", "Optional gratuities for guides", "Travel insurance"],
    images: [
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
      "/placeholder.svg?height=500&width=800",
    ],
    highlights: [
      "Learn traditional fishing techniques from local fishermen",
      "Participate in cultural dances and music performances",
      "Enjoy authentic Rwandan cuisine prepared by community members",
      "Take a boat ride on the scenic Lake Burera",
      "Support sustainable tourism that directly benefits local communities",
    ],
    itinerary: [
      {
        time: "8:00 AM",
        activity: "Pickup from your accommodation in Kigali",
      },
      {
        time: "10:30 AM",
        activity: "Arrive at Lake Burera, welcome ceremony and introduction",
      },
      {
        time: "11:00 AM",
        activity: "Traditional fishing demonstration and participation",
      },
      {
        time: "1:00 PM",
        activity: "Authentic Rwandan lunch with the community",
      },
      {
        time: "2:30 PM",
        activity: "Cultural performances and interactive dance lessons",
      },
      {
        time: "4:00 PM",
        activity: "Boat ride on Lake Burera",
      },
      {
        time: "5:00 PM",
        activity: "Departure for Kigali",
      },
      {
        time: "7:30 PM",
        activity: "Arrival in Kigali",
      },
    ],
    impact: {
      economic: "30% of tour fees go directly to community members",
      cultural: "Helps preserve traditional fishing and cultural practices",
      environmental: "Promotes sustainable fishing and environmental awareness",
    },
    reviews: [
      {
        name: "Sarah Johnson",
        country: "United States",
        rating: 5,
        date: "March 15, 2023",
        comment:
          "This was the highlight of our Rwanda trip! The community was so welcoming, and we learned so much about traditional fishing techniques. The lunch was delicious, and the cultural performances were amazing. Highly recommend!",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "David Chen",
        country: "Singapore",
        rating: 5,
        date: "February 2, 2023",
        comment:
          "An authentic and immersive experience that gave us a real insight into rural Rwandan life. Our guide was knowledgeable and friendly, and the community members were wonderful hosts. The boat ride on Lake Burera was breathtaking.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Maria Gonzalez",
        country: "Spain",
        rating: 4,
        date: "January 10, 2023",
        comment:
          "Beautiful experience with the local community. The only reason I'm giving 4 stars instead of 5 is because the drive from Kigali was longer than expected. But the experience itself was wonderful and well worth it!",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? tour.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === tour.images.length - 1 ? 0 : prev + 1))
  }

  const handleBookNow = () => {
    toast({
      title: "Booking initiated!",
      description: "You'll be redirected to complete your booking.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/tours" className="flex items-center text-sm mb-6 text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tours
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden h-[400px] mb-4">
            <img
              src={tour.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tour.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-md overflow-hidden ${index === currentImageIndex ? "ring-2 ring-primary" : ""}`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${tour.title} - Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{tour.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{tour.groupSize}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{tour.rating}</span>
                <span className="ml-1 text-muted-foreground">({tour.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About This Tour</h2>
                <p className="text-muted-foreground mb-6">{tour.description}</p>

                <h3 className="text-lg font-semibold mb-3">Highlights</h3>
                <ul className="space-y-2 mb-6">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 bg-primary/10 p-1 rounded-full">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {tour.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-check"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Not Included</h3>
                    <ul className="space-y-2">
                      {tour.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 text-red-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-x"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tour.languages.map((language, index) => (
                    <span key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Tour Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      {index < tour.itinerary.length - 1 && (
                        <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-border h-full" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-medium">{item.time}</h3>
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Economic Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.impact.economic}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Cultural Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.impact.cultural}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.impact.environmental}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {tour.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{review.name}</h3>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{review.country}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="mt-3">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">${tour.price}</CardTitle>
              <CardDescription>per person</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <div className="relative">
                  <Input id="date" type="text" placeholder="Select a date" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select defaultValue="2">
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5 Guests</SelectItem>
                    <SelectItem value="6">6+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Price (2 guests)</span>
                  <span>${tour.price * 2}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Booking fee</span>
                  <span>$10</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>${tour.price * 2 + 10}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                You won't be charged yet. Payment will be collected after booking confirmation.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

