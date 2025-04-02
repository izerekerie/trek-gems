"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Star,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tour, useTours } from "@/hooks/useTour";
import { useParams, useRouter } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function TourDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  // In a real application, you would fetch the tour data based on the ID
  const { id } = useParams();
  const { getTour, loading, error } = useTours(); // Use the tour fetching hook

  const [tour, setTour] = useState<Tour | null>(null);
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (id) {
      getTour(id as string).then((fetchedTour) => {
        if (fetchedTour) setTour(fetchedTour);
      });
    }
  }, [id]);

  if (loading) return <p>Loading tour...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tour) return <p>No tour found.</p>;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? tour?.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === tour.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/tours"
        className="flex items-center text-sm mb-6 text-muted-foreground hover:text-primary"
      >
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
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tour.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-md overflow-hidden ${
                  index === currentImageIndex ? "ring-2 ring-primary" : ""
                }`}
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
              {/* <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{tour.duration}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{tour.groupSize}</span>
              </div> */}
              {/* <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{tour.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({tour.reviewCount} reviews)
                </span> */}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Heart className="h-4 w-4" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Tour</h2>
              <p className="text-muted-foreground mb-6">{tour.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Economic Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tour.impact.economic}</p>
                  </CardContent>
                </Card> */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cultural Impact</CardTitle>
                </CardHeader>
                <CardContent>{/* <p>{tour.impact.cultural}</p> */}</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <p>{tour.impact.environmental}</p> */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-6">
              {tour?.reviews.map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6 bg-gray-200 rounded-full px-2 ">
                      <AvatarFallback>
                        {review.user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{review.user.username}</h3>
                        <span className="mx-2 text-muted-foreground">•</span>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {user && isAuthenticated ? (
        <div className="lg:col-span-1">
          <BookingForm tour={tour} />
        </div>
      ) : (
        <Button onClick={() => router.push("/login")}>Login to Book</Button>
      )}
    </div>
  );
}
