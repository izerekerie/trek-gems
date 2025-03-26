"use client";
import Link from "next/link";
import { Filter, MapPin, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTours } from "@/hooks/useTour";

export default function ToursPage() {
  const { tours, loading, error } = useTours();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Tours</h1>
          <p className="text-muted-foreground">
            Explore Rwanda's hidden gems and authentic experiences
          </p>
        </div>

        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-[300px]">
            <Input placeholder="Search tours..." className="pr-10" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                className="lucide lucide-search"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your search results
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <MobileFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block">
          <DesktopFilters />
        </div>

        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">Showing 12 of 36 tours</p>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  <img
                    src={tour.images[0] || "/placeholder.svg"}
                    alt={tour.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium">
                    ${tour.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{tour.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {tour.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
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
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="ml-1 text-sm text-muted-foreground">
                        {tour.bookings}+ bookings
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/tours/${tour.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mr-2">
              Previous
            </Button>
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="ml-2">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 500]} min={0} max={1000} step={10} />
          <div className="flex items-center justify-between">
            <div className="border rounded-md px-3 py-1">$0</div>
            <div className="border rounded-md px-3 py-1">$500</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Region</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox id={`region-${region}`} />
              <label
                htmlFor={`region-${region}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {region}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Duration</h3>
        <div className="space-y-2">
          {durations.map((duration) => (
            <div key={duration.value} className="flex items-center space-x-2">
              <Checkbox id={`duration-${duration.value}`} />
              <label
                htmlFor={`duration-${duration.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {duration.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Experience Type</h3>
        <div className="space-y-2">
          {experienceTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <label
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
}

function MobileFilters() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider defaultValue={[0, 500]} min={0} max={1000} step={10} />
          <div className="flex items-center justify-between">
            <div className="border rounded-md px-3 py-1">$0</div>
            <div className="border rounded-md px-3 py-1">$500</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Region</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox id={`mobile-region-${region}`} />
              <label
                htmlFor={`mobile-region-${region}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {region}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Duration</h3>
        <div className="space-y-2">
          {durations.map((duration) => (
            <div key={duration.value} className="flex items-center space-x-2">
              <Checkbox id={`mobile-duration-${duration.value}`} />
              <label
                htmlFor={`mobile-duration-${duration.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {duration.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Experience Type</h3>
        <div className="space-y-2">
          {experienceTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`mobile-type-${type}`} />
              <label
                htmlFor={`mobile-type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
}

// Sample data

const regions = [
  "Northern Province",
  "Southern Province",
  "Eastern Province",
  "Western Province",
  "Kigali",
];

const durations = [
  { value: "half-day", label: "Half Day (1-4 hours)" },
  { value: "full-day", label: "Full Day (5-8 hours)" },
  { value: "multi-day", label: "Multi-Day (2+ days)" },
];

const experienceTypes = [
  "Cultural",
  "Adventure",
  "Nature",
  "Food & Culinary",
  "Crafts & Artisans",
  "Community Service",
];
