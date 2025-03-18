import Link from "next/link"
import { ArrowRight, Calendar, Check, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the booking details from your database
  const booking = {
    id: "BK-" + Math.floor(100000 + Math.random() * 900000),
    tour: "Lake Burera Cultural Experience",
    date: "June 15, 2023",
    time: "10:00 AM",
    guests: 2,
    location: "Northern Province, Rwanda",
    amount: 178,
    bookingDate: new Date().toLocaleDateString(),
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your booking has been confirmed. We've sent a confirmation email to your registered email address.
        </p>
      </div>

      <Card className="border border-gray-200 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Booking Details</CardTitle>
          <CardDescription>Reference: {booking.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tour</h3>
              <p className="text-gray-900">{booking.tour}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Booking Date</h3>
              <p className="text-gray-900">{booking.bookingDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="text-gray-900">
                  {booking.date}, {booking.time}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                <p className="text-gray-900">
                  {booking.guests} {booking.guests === 1 ? "person" : "people"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Meeting Point</h3>
              <p className="text-gray-900">{booking.location}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between font-medium">
              <span className="text-gray-900">Total Paid</span>
              <span className="text-gray-900">${booking.amount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full bg-primary hover:bg-primary/90">Download Booking Confirmation</Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
            Add to Calendar
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">What's Next?</h2>
        <p className="text-gray-600">
          You'll receive a confirmation email with all the details. The tour operator will contact you before the tour
          with any additional information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
            <Link href="/dashboard">View My Bookings</Link>
          </Button>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/tours">
              Explore More Tours <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

