"use client";
import ImageCarousel from "@/components/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMapMarkerAlt, FaStar, FaUsers } from "react-icons/fa";

export default function HomePage() {
  const [destination, setDestination] = useState("Gakenke, Ruli");
  const [startDate, setStartDate] = useState("2025-04-15");
  const [endDate, setEndDate] = useState("2025-04-15");
  const [people, setPeople] = useState(2);

  const places = [
    {
      id: 1,
      name: "Mount Buzinganjwili",
      location: "Gakenke, Ruli",
      rating: 5,
      price: "8000 RFW",
      imageUrl: "/hills.jpg",
    },
    {
      id: 2,
      name: "Mount Buzinganjwili",
      location: "Gakenke, Ruli",
      rating: 5,
      price: "8000 RFW",
      imageUrl: "/hills.jpg",
    },
    {
      id: 3,
      name: "Mount Buzinganjwili",
      location: "Gakenke, Ruli",
      rating: 5,
      price: "8000 RFW",
      imageUrl: "/hills.jpg",
    },
    {
      id: 4,
      name: "Mount Buzinganjwili",
      location: "Gakenke, Ruli",
      rating: 5,
      price: "8000 RFW",
      imageUrl: "/hills.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-bold text-green-600 italic">
          Trek <span className="font-semibold">Gems</span>
        </h1>
        <div className="space-x-6">
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/explore" className="font-medium">
            Explore
          </Link>
          <Link href="/tours" className="font-medium">
            Tours
          </Link>
          <Link href="/signin" className="font-medium">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      {/* Hero Image */}
      <div className="relative w-full ">
        <div className=" w-full h-72">
          <Image
            src="/hills.jpg"
            alt="Scenic View"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className=" absolute bottom-[-20px]  w-full flex justify-center mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex space-x-4">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-green-500" />
              <span>{destination}</span>
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <div className="flex items-center space-x-2">
              <FaUsers className="text-green-500" />
              <span>{people} people</span>
            </div>
          </div>
        </div>
      </div>
      {/* Search/Filter Section */}
      <div className="p-8">
        <ImageCarousel />
      </div>
      {/* Popular Gem Places */}
      <div>
        <div className="container mx-auto px-4 my-12">
          <h2 className="text-3xl font-bold text-green-600 py-14">
            Popular Gem Places
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {places.map((place) => (
              <div key={place.id} className="bg-white shadow-md rounded-xl p-4">
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={place.imageUrl}
                    alt={place.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-gray-500 flex items-center justify-center gap-1">
                    <FaMapMarkerAlt className="text-green-500" />
                    {place.location}
                  </p>
                  <div className="flex justify-center mt-2 text-yellow-400">
                    {Array.from({ length: place.rating }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Explore More */}

      <div className="container mx-auto px-4 py-10 my-12">
        {/* Title */}
        <h2 className="text-3xl font-bold text-green-600  mb-6">
          Explore more
        </h2>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-60">
                <Image
                  src={place.imageUrl}
                  alt={place.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaMapMarkerAlt className="text-green-500 mr-2" />
                  <span>{place.location}</span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-900 font-bold">{place.price}</span>
                  {/* Rating */}
                  <div className="flex text-yellow-500">
                    {Array.from({ length: place.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
