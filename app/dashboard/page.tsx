"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  DollarSign,
  MapPin,
  Package,
  Plus,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import TourModal from "@/components/tourForm";
import useBooking from "@/hooks/useBooking";
import { useTours } from "@/hooks/useTour";
import BookingForm from "@/components/BookingForm";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { getBookingsByOperator, getBookingByUser } = useBooking();
  const [tourForm, setIsTourFormOPen] = useState(false);
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  // Show loading or redirect if not authenticated
  if (loading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {user.role === "TRAVELER"
              ? "Traveler Dashboard"
              : "Tour Guide Dashboard"}
          </h1>
          <p className="text-gray-600">
            Welcome back, {user.username}!{" "}
            {user.role === "TRAVELER"
              ? "Manage your bookings and favorite tours"
              : "Manage your tours and bookings"}
          </p>
        </div>
        {user.role === "OPERATOR" && (
          <Button
            onClick={() => setIsTourFormOPen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Tour
          </Button>
        )}
      </div>

      {user.role === "TRAVELER" ? <TravelerDashboard /> : <GuideDashboard />}
      <TourModal
        isOpen={tourForm}
        onClose={() => {
          setIsTourFormOPen(false);
        }}
        tour={null}
      />
    </div>
  );
}

function TravelerDashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Upcoming Trips
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <p className="text-xs text-gray-500">Next trip in 15 days</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Spent
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$1,245</div>
            <p className="text-xs text-gray-500">Across 5 bookings</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Saved Tours
            </CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500">Tours on your wishlist</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Reviews Given
            </CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-gray-500">Average rating: 4.7</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
          <TabsTrigger value="saved">Saved Tours</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Upcoming Trips
              </CardTitle>
              <CardDescription>
                Your scheduled tours and experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        {/* <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.tour}
                          className="object-cover w-full h-full"
                        /> */}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {trip.tour}
                        </div>
                        <div className="text-sm text-gray-600">{trip.date}</div>
                        <div className="flex items-center mt-1">
                          <Badge
                            variant={
                              trip.status === "Confirmed"
                                ? "default"
                                : "outline"
                            }
                            className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                          >
                            {trip.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${trip.amount}
                      </div>
                      <div className="text-sm text-gray-600">
                        {trip.guests} guests
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                asChild
              >
                <Link href="/bookings">View All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Past Trips
              </CardTitle>
              <CardDescription>
                Your completed tours and experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pastTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        {/* <img
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.tour}
                          className="object-cover w-full h-full"
                        /> */}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {trip.tour}
                        </div>
                        <div className="text-sm text-gray-600">{trip.date}</div>
                        <div className="flex mt-1">
                          {trip.reviewed ? (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < trip?.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-xs text-gray-600">
                                Your rating
                              </span>
                            </div>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-primary hover:bg-primary/10 px-2 py-0"
                              asChild
                            >
                              <Link href={`/tours/${trip.id}/review`}>
                                Write a Review
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${trip.amount}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Saved Tours
              </CardTitle>
              <CardDescription>Tours you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedTours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center border border-gray-200 rounded-md p-3"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                      <img
                        src={tour.image[0] || "/placeholder.svg"}
                        alt={tour.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {tour.title}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {tour.location}
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">${tour.price}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      asChild
                    >
                      <Link href={`/tours/${tour.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                asChild
              >
                <Link href="/tours">Explore More Tours</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function GuideDashboard() {
  const { getToursByOwner } = useTours();
  const { getBookingsByOperator, updateBooking } = useBooking();
  const [editform, setEditForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      getBookingsByOperator(user.id).then((data) => {
        setBookings(data);
      });
      getToursByOwner(user.id).then((data) => {
        setTours(data);
      });
    }
  }, []);

  const handleConfirmBooking = async (booking) => {
    await updateBooking({ ...booking, status: "CONFIRMED" });
  };
  const handleupdate = () => {
    setEditForm(true);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$12,546</div>
            <p className="text-xs text-gray-500">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Total Bookings
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">243</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Active Tours
            </CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500">+2 new this month</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <p className="text-xs text-gray-500">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Recent Bookings
                </CardTitle>
                <CardDescription>
                  You have 12 bookings this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage
                            src={booking.avatar}
                            alt={booking.name}
                          />
                          <AvatarFallback>
                            {booking.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {booking.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {booking.tour}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-900">${booking.amount}</div>
                        <div className="text-sm text-gray-600">
                          {booking.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/bookings">View All Bookings</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Popular Tours
                </CardTitle>
                <CardDescription>
                  Your most booked tours this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularTours.map((tour) => (
                    <div key={tour.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img
                          src={tour.image[0] || "/placeholder.svg"}
                          alt={tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {tour.title}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {tour.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-gray-900">{tour.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {tour.bookings} bookings
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <Link href="/tours">View All Tours</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Upcoming Check-ins
              </CardTitle>
              <CardDescription>
                Guests arriving in the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCheckins.map((checkin) => (
                  <div
                    key={checkin.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        {/* <img
                          src={checkin.tourImage || "/placeholder.svg"}
                          alt={checkin.tour}
                          className="object-cover w-full h-full"
                        /> */}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {checkin.tour}
                        </div>
                        <div className="text-sm text-gray-600">
                          {checkin.date}, {checkin.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="font-medium text-gray-900">
                          {checkin.guestName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {checkin.guests} guests
                        </div>
                      </div>
                      <Badge
                        variant={
                          checkin.status === "Confirmed" ? "default" : "outline"
                        }
                        className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                      >
                        {checkin.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                asChild
              >
                <Link href="/checkins">View All Check-ins</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tours" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Your Tours
              </CardTitle>
              <CardDescription>Manage your tour listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex  bgd-300-re w-full items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img
                          src={tour.images[0] || "/placeholder.svg"}
                          alt={tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className=" ">
                        <div className="font-medium text-gray-900">
                          {tour.title}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {tour.location}
                        </div>
                        <div className=" text-gray-600">
                          <p>{tour.description}</p>
                        </div>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-800 font-bold">
                            ${tour.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() => handleupdate()}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Link href={`/tours/${tour.id}/bookings`}>
                          Bookings
                        </Link>
                      </Button>
                    </div>
                    <TourModal
                      tour={tour}
                      isOpen={editform}
                      onClose={() => setEditForm(false)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                //  onClick={() => setIsTourFormOPen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Tour
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardDescription>Manage your tour bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking?.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>
                          {booking.tour.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.tour.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.tour.description}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.date}, {booking.numberOfPeople} guests
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${booking.totalCost}
                      </div>
                      <Badge
                        variant={
                          booking.status === "CONFIRMED"
                            ? "default"
                            : booking.status === "PENDING"
                            ? "secondary"
                            : "destructive"
                        }
                        className={
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : ""
                        }
                      >
                        {booking.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Details
                        </Button>
                        {booking.status === "PENDING" && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmBooking(booking)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Confirm
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Recent Reviews
              </CardTitle>
              <CardDescription>
                What travelers are saying about your tours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {review.tour}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                        {!review.replied && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Reply
                          </Button>
                        )}
                        {review.replied && (
                          <div className="mt-3 pl-4 border-l-2 border-gray-200">
                            <div className="font-medium text-gray-900">
                              Your response:
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {review.reply}
                            </p>
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
    </>
  );
}

// Sample data for traveler dashboard
const upcomingTrips = [
  {
    id: 1,
    tour: "Lake Burera Cultural Experience",
    date: "June 15, 2023",
    status: "Confirmed",
    amount: 178,
    guests: 2,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    tour: "Nyungwe Forest Canopy Walk",
    date: "July 3, 2023",
    status: "Pending",
    amount: 240,
    guests: 2,
    image: "/placeholder.svg?height=64&width=64",
  },
];

const pastTrips = [
  {
    id: 1,
    tour: "Iby'Iwacu Cultural Village",
    date: "May 10, 2023",
    amount: 150,
    reviewed: true,
    rating: 5,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    tour: "Lake Kivu Fishing Experience",
    date: "April 22, 2023",
    amount: 130,
    reviewed: true,
    rating: 4,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    tour: "Traditional Pottery Workshop",
    date: "March 15, 2023",
    amount: 45,
    reviewed: false,
    image: "/placeholder.svg?height=64&width=64",
  },
];

const savedTours = [
  {
    id: 1,
    title: "Gishwati-Mukura National Park Trek",
    location: "Western Province",
    price: 95,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 2,
    title: "Traditional Pottery Workshop",
    location: "Eastern Province",
    price: 45,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 3,
    title: "Lake Kivu Fishing Experience",
    location: "Western Province",
    price: 65,
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: 4,
    title: "Akagera Wildlife Safari",
    location: "Eastern Province",
    price: 150,
    image: "/placeholder.svg?height=64&width=64",
  },
];

// Sample data for guide dashboard
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
];

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
];

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
];

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
];

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
];

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
];
