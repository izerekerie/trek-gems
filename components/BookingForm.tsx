import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useBooking from "@/hooks/useBooking";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";

const BookingForm = ({ tour }) => {
  const { createBooking } = useBooking();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    validate,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "", // Populate this dynamically if needed
      tourId: tour.id,
      numberOfPeople: 1,
      date: "",
      totalCost: tour.price * 1,
    },
  });

  const onSubmit = async (data) => {
    const totalCost = tour.price * (watch("numberOfPeople") || 0);
    await createBooking({
      ...data,
      date: new Date(data.date).toISOString(),
      userId: user?.id,
      tourId: tour.id,
      totalCost,
    });
    toast({
      title: "Booking initiated!",
      description: "You'll be redirected to complete your booking.",
    });
    router.push("/bookings");
  };
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">${tour.price}</CardTitle>
        <p>per person</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="hidden" {...register("tourId")} />
          <Input type="hidden" {...register("userId")} />

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Input
              {...register("date", {
                required: "Valid Date is required", // Ensure required validation still works
                validate: (value) => {
                  if (!value) return "Date is required"; // Handles empty input separately
                  const selectedDate = new Date(value);
                  const currentDate = new Date();
                  if (selectedDate < currentDate) {
                    console.log("data");
                    return "Selected date cannot be in the past"; // Custom past date message
                  }
                  return true; // If everything is valid
                },
              })}
              id="date"
              type="datetime-local" // Use datetime-local for date and time selection              {...register("date", { required: true })}
            />
            {errors.date && (
              <p className="text-red-500 text-xs">Date is required</p>
            )}
          </div>

          {/* Number of Guests Selection */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              {...register("numberOfPeople", {
                required: true,
                valueAsNumber: true,
              })}
            />
            {errors.numberOfPeople && (
              <p className="text-red-500 text-xs">
                {errors.numberOfPeople.message}
              </p>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Price</span>
              <span>${tour.price * watch("numberOfPeople") || tour.price}</span>
            </div>
          </div>

          {/* Submit Button */}
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Book now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You won't be charged yet. Payment will be collected after booking
              confirmation.
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
