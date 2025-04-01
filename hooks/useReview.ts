"use client";
import reviewAPI from "@/services/reviewService";
import { useState, useEffect, useCallback } from "react";

export interface Review {
  id: string;
  userId: string;
  tourId: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO date string
}

export const useReviews = (initialFilters = {}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState(initialFilters);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await reviewAPI.getReviews(filters);
      setReviews(result.data);
      setMeta(result.meta);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const createReview = async (reviewData) => {
    setLoading(true);
    try {
      const newReview = await reviewAPI.createReview(reviewData);
      fetchReviews();
      return newReview;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create review");
      console.error("Error creating review:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const updateReview = async (id, reviewData) => {
    setLoading(true);
    try {
      const newReview = await reviewAPI.updateReview(id, reviewData);
      fetchReviews();
      return newReview;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update review");
      console.error("Error updating review:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getReviewsByUser = async (userId: string): Promise<Review[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const reviews = await reviewAPI.getReviewsByTour(userId);
      return reviews;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReviewsByTour = async (tourId: string): Promise<Review[] | null> => {
    setLoading(true);
    setError(null);

    try {
      const reviews = await reviewAPI.getReviewsByUser(tourId);
      return reviews;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch reviews");
      console.error("Error fetching reviews:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    meta,
    filters,
    updateReview,
    updateFilters,
    changePage,
    createReview,
    getReviewsByUser,
    getReviewsByTour,
    refreshReviews: fetchReviews,
  };
};
