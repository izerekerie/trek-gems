"use client";
import { tourAPI } from "@/services/tourServices";
import { useState, useEffect, useCallback } from "react";
export interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[]; // Array of image URLs
  userId: string;
  createdAt: string; // ISO date string

  // Optional relation
}

export const useTours = (initialFilters = {}) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [topTours, setTopTours] = useState<Tour[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await tourAPI.getTours(filters);
      const sortedTours = [...result.data]
        .filter((tour) => tour.avgRating > 0)
        .sort((a, b) => b.avgRating - a.avgRating);
      setTopTours(sortedTours.slice(0, 3));
      setTopTours(sortedTours.slice(0, 3));
      setTours(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tours");
      console.error("Error fetching tours:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load tours on component mount and when filters change
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTours(tours);
    } else {
      setFilteredTours(
        tours.filter(
          (tour) =>
            tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            tour.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, tours]);

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  // Handle pagination
  const changePage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // Create a new tour
  const createTour = async (tourData, imageFiles = []) => {
    setLoading(true);
    try {
      let images = [];
      if (imageFiles.length > 0) {
        // Upload images to Cloudinary
        const uploadResult = await tourAPI.uploadImages(imageFiles);
        console.log("uploadResult", uploadResult);
        images = uploadResult.imageUrls; // Ensure the response contains the image URLs
      }

      // Send tour data with image URLs to the backend
      const newTour = await tourAPI.createTour({
        ...tourData,
        images, // Only send URLs, not files
      });

      fetchTours();
      return newTour;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create tour");
      console.error("Error creating tour:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a tour
  const updateTour = async (id, tourData, imageFiles = []) => {
    setLoading(true);
    try {
      // Upload new images if provided
      let newImages = [];
      if (imageFiles.length > 0) {
        const uploadResult = await tourAPI.uploadImages(imageFiles);
        newImages = uploadResult.imageUrls;
      }

      // Combine existing and new images
      const updatedImages = [...(tourData.images || []), ...newImages];

      // Update tour with combined image URLs
      const updatedTour = await tourAPI.updateTour(id, {
        ...tourData,
        images: updatedImages,
      });

      // Refresh the tour list
      fetchTours();
      return updatedTour;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update tour");
      console.error("Error updating tour:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a tour
  const deleteTour = async (id) => {
    setLoading(true);
    try {
      await tourAPI.deleteTour(id);

      // Refresh the tour list
      fetchTours();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete tour");
      console.error("Error deleting tour:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  //fetch tour by id

  const getTour = async (id: string): Promise<Tour | null> => {
    setLoading(true);
    setError(null);

    try {
      const tour = await tourAPI.getTour(id);
      return tour; // Return the fetched tour data
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tour");
      console.error("Error fetching tour:", err);
      return null; // Return null if there's an error
    } finally {
      setLoading(false);
    }
  };

  const getToursByOwner = async (id: string): Promise<Tour | null> => {
    setLoading(true);
    setError(null);

    try {
      const tour = await tourAPI.getToursByOwner(id);
      return tour; // Return the fetched tour data
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tour");
      console.error("Error fetching tour:", err);
      return null; // Return null if there's an error
    } finally {
      setLoading(false);
    }
  };
  const getBookingsByTour = async (id: string): Promise<Tour | null> => {
    setLoading(true);
    setError(null);
    try {
      const bookings = await tourAPI.getBookingsByTour(id);

      return bookings; // Return the fetched tour data
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tour");
      console.error("Error fetching tour:", err);
      return null; // Return null if there's an error
    } finally {
      setLoading(false);
    }
  };

  return {
    tours: paginatedTours,
    loading,
    error,
    meta,
    filters,
    updateFilters,
    changePage,
    setSearchQuery,
    searchQuery,
    currentPage,
    topTours,
    totalPages,
    setCurrentPage,
    createTour,
    getBookingsByTour,
    updateTour,
    getTour,
    getToursByOwner,
    deleteTour,
    refreshTours: fetchTours,
  };
};
