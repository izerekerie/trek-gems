import { tourAPI } from "@/services/tourServices";
import { useState, useEffect, useCallback } from "react";

export const useTours = (initialFilters = {}) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState(initialFilters);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await tourAPI.getTours(filters);
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
      // First upload images if provided
      let images = [];
      if (imageFiles.length > 0) {
        const uploadResult = await tourAPI.uploadImages(imageFiles);
        images = uploadResult.imageUrls;
      }

      // Create tour with image URLs
      const newTour = await tourAPI.createTour({
        ...tourData,
        images,
      });

      // Refresh the tour list
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

  return {
    tours,
    loading,
    error,
    meta,
    filters,
    updateFilters,
    changePage,
    createTour,
    updateTour,
    deleteTour,
    refreshTours: fetchTours,
  };
};
