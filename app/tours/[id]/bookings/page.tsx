"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTours } from "@/hooks/useTour";
import { useParams } from "next/navigation";
import { formatDateTime } from "@/lib/formatDate";
import useBooking from "@/hooks/useBooking";

const BookingsPage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getBookingsByTour } = useTours();
  const { updateBooking } = useBooking();
  useEffect(() => {
    if (id) {
      try {
        getBookingsByTour(id).then((data) => {
          setBookings(data);
        });
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    }

    setLoading(false);
  }, [id]);

  const handleConfirmBooking = async (booking) => {
    try {
      await updateBooking({ ...booking, status: "CONFIRMED" });
      const updatedBookings = await getBookingsByTour(id);
      setBookings(updatedBookings);
    } catch (err) {}
  };
  const handleCancelBooking = async (booking) => {
    try {
      await updateBooking({ ...booking, status: "CANCEL" });
      const updatedBookings = await getBookingsByTour(id);
      setBookings(updatedBookings);
    } catch (err) {}
  };

  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>No bookings found.</p>;
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardDescription>
          Manage your
          <span className="text-bold text-lg text-black">
            {" "}
            {bookings[0]?.tour?.title}
          </span>{" "}
          bookings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 grid grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking?.id}
              className="flex border rounded p-12 items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>
                    {booking.user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">
                    {booking.user.username}
                  </div>
                  <div className="text-sm text-gray-600">
                    {booking.tour.description}
                  </div>
                  <div className="text-sm  text-bold text-gray-600">
                    Date: {formatDateTime(booking?.date)},{" "}
                    {booking.numberOfPeople} guests
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
  );
};

export default BookingsPage;
