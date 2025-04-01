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
import ReviewModal from "@/components/UseReviewModal";
import { toast } from "@/hooks/use-toast";
import { formatDate } from "date-fns";
import { formatDateTime } from "@/lib/formatDate";

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
  const { getToursByOwner } = useTours();
  const { getBookingByUser, updateBooking } = useBooking();
  const [reviewModal, setReviewModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      getBookingByUser(user.id).then((data) => {
        setBookings(data);
      });
      getToursByOwner(user.id).then((data) => {
        setTours(data);
      });
    }
  }, []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = bookings.filter((trip) => new Date(trip.date) >= today);
  const pastTrips = bookings.filter((trip) => new Date(trip.date) < today);
  // Calculate total cost
  const totalCost = bookings.reduce(
    (sum, trip) => sum + (trip.totalCost || 0),
    0
  );
  const handleCancel = async (booking) => {
    try {
      const updatedBookings = bookings.filter(
        (trip) => trip?.id !== booking.id
      );
      setBookings(updatedBookings);
      await updateBooking({ ...booking, status: "CANCELED" });
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to cancel booking.",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
  };
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
            <div className="text-2xl font-bold text-gray-900">
              {bookings.length}
            </div>
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
            <div className="text-2xl font-bold text-gray-900">${totalCost}</div>
            <p className="text-xs text-gray-500">Across 5 bookings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
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
                        <img
                          src={trip.tour.images[0] || "/placeholder.svg"}
                          alt={trip.tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {trip.tour.title}
                        </div>
                        <div className="text-sm text-gray-600">{trip.date}</div>
                        <div className="flex items-center mt-1">
                          <Badge
                            // variant={
                            //   trip.status === "CONFIRMED"
                            //     ? "default"
                            //     : "outline"
                            // }

                            className={
                              trip.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                                : trip.status === "CANCELED"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                            }
                          >
                            {trip.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${trip.totalCost}
                      </div>
                      <div className="text-sm text-gray-600">
                        {trip.numberOfPeople} guests
                      </div>
                      {trip.status === "CONFIRMED" && (
                        <Button
                          onClick={() => handleCancel(trip)}
                          variant="outline"
                          size="sm"
                          className="mt-2 border-gray-300  bg-yellow-300 text-gray-700 hover:bg-primary/50"
                        >
                          Cancel Booking{" "}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
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
                        <img
                          src={trip.tour.images[0] || "/placeholder.svg"}
                          alt={trip.tour.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {trip?.tour.title}
                        </div>
                        <div className="text-sm text-gray-600">{trip.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${trip.totalCost}
                      </div>
                      <Button
                        onClick={() => setReviewModal(true)}
                        variant="outline"
                        size="sm"
                        className="mt-2 border-gray-300  bg-primary text-white hover:bg-gray-50"
                      >
                        Make Review{" "}
                      </Button>
                      <ReviewModal
                        isOpen={reviewModal}
                        selectedTour={trip.tour}
                        userId={trip.userId}
                        closeModal={() => setReviewModal(false)}
                      />
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

function GuideDashboard() {
  const { getToursByOwner } = useTours();
  const { getBookingsByOperator, updateBooking } = useBooking();
  const [editform, setEditForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const totalRevenue = tours.reduce(
    (acc, tour) => acc + tour.price * tour._count.bookings,
    0
  );
  // Calculate total bookings
  const totalBookings = bookings.length;
  // Calculate active tours
  const activeTours = tours.filter((tour) => tour._count.bookings > 0).length;
  // Calculate average rating
  const avgRating =
    tours.reduce((acc, tour) => acc + tour.avgRating, 0) / tours.length || 0;
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
    try {
      await updateBooking({ ...booking, status: "CONFIRMED" });
      toast({
        title: "Booking Confirmed",
        description: "Your booking has been confirmed successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to confirm booking.",
        description: `${error.message}`,
        variant: "destructive",
      });
    }
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
            <div className="text-2xl font-bold text-gray-900">
              ${totalRevenue.toFixed(2)}
            </div>
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
            <div className="text-2xl font-bold text-gray-900">
              {totalBookings}
            </div>
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
            <div className="text-2xl font-bold text-gray-900">
              {activeTours}
            </div>
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
            <div className="text-2xl font-bold text-gray-900">
              {avgRating.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

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
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          Price:
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
                        className="border-gray-300 text-gray-700 hover:bg-primary"
                        onClick={() => handleupdate()}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-primary hover-text-primary"
                      >
                        <Link href={`/tours/${tour.id}/bookings`}>
                          {tour?._count?.bookings || 0} Bookings
                        </Link>
                      </Button>
                    </div>
                    {tour?.reviews?.map((review, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex items-start gap-2">
                          <Avatar className="h-6 w-6 bg-gray-200 rounded-full px-2 ">
                            <AvatarFallback>
                              {review.user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">
                                {review.user.username}
                              </h3>
                              <span className="mx-2 text-muted-foreground">
                                •
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {review.country}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                            <p className="mt-3">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <TourModal
                      tour={tour}
                      isOpen={editform}
                      onClose={() => setEditForm(false)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
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
                          {booking?.tour.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking?.tour.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking?.tour.description}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDateTime(booking.date)},{" "}
                          {booking?.numberOfPeople} guests
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium text-gray-900">
                        ${booking.totalCost}
                      </div>
                      <Badge
                        // variant={
                        //   booking.status === "CONFIRMED"
                        //     ? "default"
                        //     : booking.status === "PENDING"
                        //     ? "secondary"
                        //     : "destructive"
                        // }
                        className={
                          booking?.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : booking?.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300"
                            : booking?.status === "CANCELED"
                            ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-300"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                        }
                      >
                        {booking.status}
                      </Badge>
                      <div className="flex gap-2 mt-2">
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
                <div className="space-y-6">
                  {/* {reviews?.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-0">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-6 w-6 bg-gray-200 rounded-full px-2 ">
                          <AvatarFallback>
                            {review.user.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">
                              {review.user.username}
                            </h3>
                            <span className="mx-2 text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {review.country}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <p className="mt-3">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
