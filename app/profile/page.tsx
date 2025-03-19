"use client";

import type React from "react";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  const { toast } = useToast();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated!",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated!",
      description: "Your password has been updated successfully.",
    });
  };

  // Show loading or redirect if not authenticated
  if (isLoading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Link
        href="/dashboard"
        className="flex items-center text-sm mb-6 text-gray-600 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
        <div className="w-full md:w-auto flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img
                src={user.avatar || "/placeholder.svg?height=128&width=128"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600">
            {user.role === "traveler" ? "Traveler" : "Tour Guide"}
          </p>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {user.address || "No address provided"}
            </span>
          </div>
          <div className="mt-6 w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {user.phone || "No phone provided"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex-1 w-full">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <form onSubmit={handleSaveProfile}>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-gray-700">
                          First name
                        </Label>
                        <Input
                          id="first-name"
                          defaultValue={user.firstName}
                          className="border-gray-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-gray-700">
                          Last name
                        </Label>
                        <Input
                          id="last-name"
                          defaultValue={user.lastName}
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        defaultValue={user.phone || ""}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700">
                        Address
                      </Label>
                      <Input
                        id="address"
                        defaultValue={user.address || ""}
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-700">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        className="min-h-[100px] border-gray-300"
                        defaultValue="I'm an avid traveler who loves exploring new cultures and natural landscapes. I'm particularly interested in sustainable tourism and supporting local communities."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <form onSubmit={handleSavePassword}>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="current-password"
                        className="text-gray-700"
                      >
                        Current Password
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-700">
                        New Password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="border-gray-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirm-password"
                        className="text-gray-700"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="border-gray-300"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Update Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
