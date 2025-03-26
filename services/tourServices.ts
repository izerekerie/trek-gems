import apiClient from "./api";

export const tourAPI = {
  // Get all tours with optional filtering
  getTours: async (params = {}) => {
    const response = await apiClient.get("/tours", { params });
    return response.data;
  },

  // Get a single tour by ID
  getTour: async (id) => {
    const response = await apiClient.get(`/tours/${id}`);
    return response.data;
  },

  // Create a new tour
  createTour: async (tourData) => {
    const response = await apiClient.post("/tours", tourData);
    return response.data;
  },

  // Update a tour
  updateTour: async (id, tourData) => {
    const response = await apiClient.patch(`/tours/${id}`, tourData);
    return response.data;
  },

  // Delete a tour
  deleteTour: async (id) => {
    const response = await apiClient.delete(`/tours/${id}`);
    return response.data;
  },

  // Upload tour images
  uploadImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    console.log("files", files);
    const response = await apiClient.post("/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
