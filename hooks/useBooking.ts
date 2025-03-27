// useBook.js

import bookingAPI from "@/services/bookingService";
import { get } from "http";
import { useState } from "react";

const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a new booking
  const createBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingAPI.createBooking(bookingData);
      return booking; // return the created booking
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Confirm a booking
  const updateBooking = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingAPI.updateBooking(bookingData);
      return booking; // return the updated booking
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBooking = async (bookingId) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingAPI.getBooking(bookingId);
      return booking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookingByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingAPI.getBookingByUser(userId);
      return booking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookingsByOperator = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const booking = await bookingAPI.getBookingByTourOwnder(userId);
      return booking;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const bookings = await bookingAPI.getBookings(params);
      return bookings;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    updateBooking,
    getBooking,
    getBookings,
    getBookingByUser,
    getBookingsByOperator,
    loading,
    error,
  };
};

export default useBooking;
