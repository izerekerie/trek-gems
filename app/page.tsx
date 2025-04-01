"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTours } from "@/hooks/useTour";

export default function Home() {
  const { topTours } = useTours();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hills.jpg?height=600&width=1200')",
          }}
        />
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Rwanda's Hidden Gems
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with authentic experiences in Rwanda's rural areas,
            supporting local communities while creating unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/tours">
                Explore Tours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Featured Hidden Gems
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore these carefully selected experiences that showcase
              Rwanda's natural beauty and cultural richness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden transition-all hover:shadow-lg border border-gray-200"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={tour.images[0] || "/placeholder.svg"}
                    alt={tour.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
                    ${tour.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-gray-900">{tour.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" /> {tour.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-gray-700">
                    {tour.description}
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">
                        {tour.rating}
                      </span>
                    </div>
                    <div className="flex items-center ml-4">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="ml-1 text-sm text-gray-500">
                        {tour._count.bookings}+ bookings
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/tours/${tour.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/80"
              asChild
            >
              <Link href="/tours">
                View All Tours <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Making a Positive Impact
              </h2>
              <p className="text-gray-600 mb-6">
                When you book with Trek-Gems, you're directly contributing to
                local communities and sustainable development.
              </p>
              <ul className="space-y-4">
                {impactPoints.map((point, index) => (
                  <li key={index} className="flex">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {point.title}
                      </h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-primary hover:bg-primary/90" asChild>
                <Link href="/impact">Learn About Our Impact</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/gicu.jpg?height=400&width=600"
                alt="Local community members benefiting from tourism"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              What Travelers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from travelers who have experienced Rwanda's hidden gems
              firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#f8f9fa] border border-gray-200">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-gray-700">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.from}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Rwanda's Hidden Gems?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join us in promoting responsible tourism that benefits local
            communities while creating unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary hover:bg-secondary/90"
              asChild
            >
              <Link href="/tours">Browse Tours</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-white/10"
              asChild
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Sample data

const impactPoints = [
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Community Employment",
    description:
      "We've created over 200 jobs for local community members across Rwanda.",
  },
  {
    icon: <MapPin className="h-5 w-5 text-primary" />,
    title: "Rural Development",
    description:
      "Tourism revenue has helped build schools and healthcare facilities in rural areas.",
  },
  {
    icon: <Star className="h-5 w-5 text-primary" />,
    title: "Cultural Preservation",
    description:
      "Our tours help preserve and celebrate Rwanda's rich cultural heritage.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    from: "United States",
    rating: 5,
    comment:
      "My experience with Trek-Gems was truly life-changing. The local guides were knowledgeable and passionate, and I felt like I was making a positive impact.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "David Chen",
    from: "Singapore",
    rating: 5,
    comment:
      "The authenticity of these experiences is unmatched. I've traveled to many places, but the connection with local communities here was something special.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Maria Gonzalez",
    from: "Spain",
    rating: 4,
    comment:
      "Beautiful landscapes, warm people, and the knowledge that my tourism dollars were directly helping local communities made this trip unforgettable.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
