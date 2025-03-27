import apiClient from "./api";

export const bookingAPI = {
  // Create a new booking
  createBooking: async (bookingData: any) => {
    const response = await apiClient.post("/bookings", bookingData);
    return response.data;
  },

  // Confirm a booking
  updateBooking: async (bookingData: { id: string; [key: string]: any }) => {
    const response = await apiClient.patch(`/bookings/${bookingData.id}`, {
      date: bookingData.date,
      status: bookingData.status,
      numberOfPeople: bookingData.numberOfPeople,
      totalCost: bookingData.totalCost,
      userId: bookingData.userId,
      tourId: bookingData.tourId,
    });
    return response.data;
  },

  // Cancel a booking

  // Get booking details by ID
  getBooking: async (bookingId: string) => {
    const response = await apiClient.get(`/bookings/${bookingId}`);
    return response.data;
  },
  getBookingByUser: async (userId: string) => {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data;
  },

  getBookingByTourOwnder: async (userId: string) => {
    const response = await apiClient.get(`/bookings/owner/${userId}`);
    return response.data;
  },
  // Get all bookings (optional filtering)
  getBookings: async (params = {}) => {
    const response = await apiClient.get("/bookings", { params });
    return response.data;
  },
};

export default bookingAPI;
