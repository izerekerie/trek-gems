import apiClient from "./api";

export const reviewAPI = {
  // Create a new booking
  createReview: async (review: any) => {
    const response = await apiClient.post("/reviews", review);
    return response.data;
  },

  getReview: async (bookingId: string) => {
    const response = await apiClient.get(`/reviews/${bookingId}`);
    return response.data;
  },
  getReviewsByUser: async (userId: string) => {
    const response = await apiClient.get(`/reviews/user/${userId}`);
    return response.data;
  },

  getReviewsByTour: async (tourId: string) => {
    const response = await apiClient.get(`/reviews/tour/${tourId}`);
    return response.data;
  },
  // Get all bookings (optional filtering)
  getReviews: async (params = {}) => {
    const response = await apiClient.get("/reviews", { params });
    return response.data;
  },
};

export default reviewAPI;
