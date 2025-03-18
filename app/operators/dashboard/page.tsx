"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, DollarSign, MapPin, Package, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tour Operator Dashboard</h1>
          <p className="text-muted-foreground">Manage your tours and bookings</p>
        </div>
        <Button asChild>
          <Link href="/operators/tours/create">
            <Plus className="mr-2 h-4 w-4" /> Create New Tour
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">243</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>You have 12 bookings this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={booking.avatar} alt={booking.name} />
                          <AvatarFallback>{booking.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.name}</div>
                          <div className="text-sm text-muted-foreground">{booking.tour}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div>${booking.amount}</div>
                        <div className="text-sm text-muted-foreground">{booking.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/operators/bookings">View All Bookings</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Tours</CardTitle>
                <CardDescription>Your most booked tours this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularTours.map((tour) => (
                    <div key={tour.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{tour.title}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {tour.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{tour.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{tour.bookings} bookings</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/operators/tours">View All Tours</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Check-ins</CardTitle>
              <CardDescription>Guests arriving in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCheckins.map((checkin) => (
                  <div key={checkin.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img
                          src={checkin.tourImage || "/placeholder.svg"}
                          alt={checkin.tour}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{checkin.tour}</div>
                        <div className="text-sm text-muted-foreground">
                          {checkin.date}, {checkin.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium">{checkin.guestName}</div>
                        <div className="text-sm text-muted-foreground">{checkin.guests} guests</div>
                      </div>
                      <Badge variant={checkin.status === "Confirmed" ? "default" : "outline"}>{checkin.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/operators/checkins">View All Check-ins</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tours</CardTitle>
              <CardDescription>Manage your tour listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operatorTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{tour.title}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {tour.location}
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant={tour.status === "Active" ? "default" : "secondary"} className="text-xs">
                            {tour.status}
                          </Badge>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">${tour.price}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/operators/tours/${tour.id}/edit`}>Edit</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/operators/tours/${tour.id}/bookings`}>Bookings</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/operators/tours/create">
                  <Plus className="mr-2 h-4 w-4" /> Create New Tour
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Manage your tour bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={booking.avatar} alt={booking.name} />
                        <AvatarFallback>{booking.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{booking.name}</div>
                        <div className="text-sm text-muted-foreground">{booking.tour}</div>
                        <div className="text-sm text-muted-foreground">
                          {booking.date}, {booking.guests} guests
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">${booking.amount}</div>
                      <Badge
                        variant={
                          booking.status === "Confirmed"
                            ? "default"
                            : booking.status === "Pending"
                              ? "outline"
                              : "destructive"
                        }
                        className="mt-1"
                      >
                        {booking.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        {booking.status === "Pending" && <Button size="sm">Confirm</Button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>What travelers are saying about your tours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.tour}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2">{review.comment}</p>
                        {!review.replied && (
                          <Button variant="outline" size="sm" className="mt-2">
                            Reply
                          </Button>
                        )}
                        {review.replied && (
                          <div className="mt-3 pl-4 border-l-2">
                            <div className="font-medium">Your response:</div>
                            <p className="text-sm text-muted-foreground mt-1">{review.reply}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const recentBookings = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=36&width=36",
    tour: "Lake Burera Cultural Experience",
    amount: 178,
    date: "Today, 2:30 PM",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=36&width=36",
    tour: "Nyungwe Forest Canopy Walk",
    amount: 240,
    date: "Yesterday, 10:15 AM",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=36&width=36",
    tour: "Iby'Iwacu Cultural Village",
    amount: 150,
    date: "May 15, 9:45 AM",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=36&width=36",
    tour: "Lake Burera Cultural Experience",
    amount: 178,
    date: "May 14, 3:20 PM",
  },
]

const popularTours = [
  {
    id: 1,
    title: "Lake Burera Cultural Experience",
    location: "Northern Province",
    rating: 4.8,
    bookings: 124,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    title: "Nyungwe Forest Canopy Walk",
    location: "Western Province",
    rating: 4.9,
    bookings: 98,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    title: "Iby'Iwacu Cultural Village",
    location: "Northern Province",
    rating: 4.7,
    bookings: 86,
    image: "/placeholder.svg?height=48&width=48",
  },
]

const upcomingCheckins = [
  {
    id: 1,
    tour: "Lake Burera Cultural Experience",
    tourImage: "/placeholder.svg?height=48&width=48",
    date: "Today",
    time: "10:00 AM",
    guestName: "Sarah Johnson",
    guests: 2,
    status: "Confirmed",
  },
  {
    id: 2,
    tour: "Nyungwe Forest Canopy Walk",
    tourImage: "/placeholder.svg?height=48&width=48",
    date: "Tomorrow",
    time: "9:30 AM",
    guestName: "Michael Chen",
    guests: 4,
    status: "Confirmed",
  },
  {
    id: 3,
    tour: "Iby'Iwacu Cultural Village",
    tourImage: "/placeholder.svg?height=48&width=48",
    date: "May 18",
    time: "11:00 AM",
    guestName: "Emma Wilson",
    guests: 3,
    status: "Pending",
  },
]

const operatorTours = [
  {
    id: 1,
    title: "Lake Burera Cultural Experience",
    location: "Northern Province",
    price: 89,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    title: "Nyungwe Forest Canopy Walk",
    location: "Western Province",
    price: 120,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    title: "Iby'Iwacu Cultural Village",
    location: "Northern Province",
    price: 75,
    status: "Active",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    title: "Gishwati-Mukura National Park Trek",
    location: "Western Province",
    price: 95,
    status: "Draft",
    image: "/placeholder.svg?height=64&width=64",
  },
]

const allBookings = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Lake Burera Cultural Experience",
    date: "Today, 10:00 AM",
    guests: 2,
    amount: 178,
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Nyungwe Forest Canopy Walk",
    date: "Tomorrow, 9:30 AM",
    guests: 4,
    amount: 480,
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Iby'Iwacu Cultural Village",
    date: "May 18, 11:00 AM",
    guests: 3,
    amount: 225,
    status: "Pending",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Lake Burera Cultural Experience",
    date: "May 20, 10:00 AM",
    guests: 2,
    amount: 178,
    status: "Cancelled",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Lake Burera Cultural Experience",
    date: "May 15, 2023",
    rating: 5,
    comment:
      "This was the highlight of our Rwanda trip! The community was so welcoming, and we learned so much about traditional fishing techniques. The lunch was delicious, and the cultural performances were amazing. Highly recommend!",
    replied: true,
    reply:
      "Thank you so much for your kind words, Sarah! We're thrilled that you enjoyed the experience and had a chance to connect with our community. We hope to welcome you back to Rwanda soon!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Nyungwe Forest Canopy Walk",
    date: "May 10, 2023",
    rating: 4,
    comment:
      "The canopy walk was breathtaking and our guide was very knowledgeable about the forest ecosystem. The only reason I'm giving 4 stars instead of 5 is because the trek to get there was more strenuous than advertised. Still highly recommend, just be prepared for a workout!",
    replied: false,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    tour: "Iby'Iwacu Cultural Village",
    date: "May 5, 2023",
    rating: 5,
    comment:
      "What an incredible cultural experience! The demonstrations were fascinating and the people were so warm and welcoming. I especially loved learning about traditional medicine and trying my hand at archery. This is a must-do when visiting Rwanda.",
    replied: true,
    reply:
      "Thank you for your wonderful review, Emma! We're so glad you enjoyed the cultural demonstrations and activities. The community members always love sharing their traditions with visitors. We hope the rest of your time in Rwanda was just as memorable!",
  },
]

