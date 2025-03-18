"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function CreateTour() {
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=200&width=300"])
  const [highlights, setHighlights] = useState<string[]>([""])
  const [included, setIncluded] = useState<string[]>([""])
  const [notIncluded, setNotIncluded] = useState<string[]>([""])
  const [itinerary, setItinerary] = useState<{ time: string; activity: string }[]>([{ time: "", activity: "" }])
  const { toast } = useToast()

  const handleAddImage = () => {
    setImages([...images, "/placeholder.svg?height=200&width=300"])
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleAddHighlight = () => {
    setHighlights([...highlights, ""])
  }

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlights]
    newHighlights[index] = value
    setHighlights(newHighlights)
  }

  const handleRemoveHighlight = (index: number) => {
    const newHighlights = [...highlights]
    newHighlights.splice(index, 1)
    setHighlights(newHighlights)
  }

  const handleAddIncluded = () => {
    setIncluded([...included, ""])
  }

  const handleIncludedChange = (index: number, value: string) => {
    const newIncluded = [...included]
    newIncluded[index] = value
    setIncluded(newIncluded)
  }

  const handleRemoveIncluded = (index: number) => {
    const newIncluded = [...included]
    newIncluded.splice(index, 1)
    setIncluded(newIncluded)
  }

  const handleAddNotIncluded = () => {
    setNotIncluded([...notIncluded, ""])
  }

  const handleNotIncludedChange = (index: number, value: string) => {
    const newNotIncluded = [...notIncluded]
    newNotIncluded[index] = value
    setNotIncluded(newNotIncluded)
  }

  const handleRemoveNotIncluded = (index: number) => {
    const newNotIncluded = [...notIncluded]
    newNotIncluded.splice(index, 1)
    setNotIncluded(newNotIncluded)
  }

  const handleAddItineraryItem = () => {
    setItinerary([...itinerary, { time: "", activity: "" }])
  }

  const handleItineraryChange = (index: number, field: "time" | "activity", value: string) => {
    const newItinerary = [...itinerary]
    newItinerary[index][field] = value
    setItinerary(newItinerary)
  }

  const handleRemoveItineraryItem = (index: number) => {
    const newItinerary = [...itinerary]
    newItinerary.splice(index, 1)
    setItinerary(newItinerary)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would save the tour data
    toast({
      title: "Tour created!",
      description: "Your tour has been created successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/operators/dashboard"
        className="flex items-center text-sm mb-6 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Tour</h1>
          <p className="text-muted-foreground">Add a new tour experience to your offerings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tour Title</Label>
                  <Input id="title" placeholder="e.g. Lake Burera Cultural Experience" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. Northern Province, Rwanda" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your tour experience in detail..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input id="price" type="number" min="0" step="0.01" placeholder="e.g. 89.99" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="half-day">Half Day (1-4 hours)</SelectItem>
                      <SelectItem value="full-day">Full Day (5-8 hours)</SelectItem>
                      <SelectItem value="multi-day-2">2 Days</SelectItem>
                      <SelectItem value="multi-day-3">3 Days</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="group-size">Group Size</Label>
                  <Input id="group-size" placeholder="e.g. 2-12 people" required />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Tour Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Tour image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImage}
                className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md hover:border-muted-foreground/50"
              >
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Add Image</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Tour Highlights</h2>
            <div className="space-y-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    placeholder="e.g. Learn traditional fishing techniques from local fishermen"
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveHighlight(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddHighlight} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Highlight
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <div className="space-y-3">
                {included.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleIncludedChange(index, e.target.value)}
                      placeholder="e.g. Professional local guide"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveIncluded(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddIncluded} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Not Included</h2>
              <div className="space-y-3">
                {notIncluded.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleNotIncludedChange(index, e.target.value)}
                      placeholder="e.g. Personal expenses"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveNotIncluded(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddNotIncluded} className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Input
                      value={item.time}
                      onChange={(e) => handleItineraryChange(index, "time", e.target.value)}
                      placeholder="e.g. 10:00 AM"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Input
                      value={item.activity}
                      onChange={(e) => handleItineraryChange(index, "activity", e.target.value)}
                      placeholder="e.g. Arrive at Lake Burera, welcome ceremony"
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveItineraryItem(index)}
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddItineraryItem} className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Itinerary Item
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Community Impact</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="economic-impact">Economic Impact</Label>
                <Input id="economic-impact" placeholder="e.g. 30% of tour fees go directly to community members" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cultural-impact">Cultural Impact</Label>
                <Input
                  id="cultural-impact"
                  placeholder="e.g. Helps preserve traditional fishing and cultural practices"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="environmental-impact">Environmental Impact</Label>
                <Input
                  id="environmental-impact"
                  placeholder="e.g. Promotes sustainable fishing and environmental awareness"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/operators/dashboard">Cancel</Link>
          </Button>
          <Button type="submit">Create Tour</Button>
        </div>
      </form>
    </div>
  )
}

