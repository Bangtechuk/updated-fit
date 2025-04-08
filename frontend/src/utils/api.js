import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Trainer API services
export const trainerService = {
  // Get all trainers with optional filters
  getTrainers: async (filters = {}) => {
    const response = await api.get('/api/trainers', { params: filters });
    return response.data;
  },

  // Get trainer by ID
  getTrainerById: async (id) => {
    const response = await api.get(`/api/trainers/${id}`);
    return response.data;
  },

  // Get trainer profile (for logged in trainer)
  getTrainerProfile: async () => {
    const response = await api.get('/api/trainers/profile/me');
    return response.data;
  },

  // Update trainer profile
  updateTrainerProfile: async (profileData) => {
    const response = await api.put('/api/trainers/profile', profileData);
    return response.data;
  }
};

// Booking API services
export const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/api/bookings', bookingData);
    return response.data;
  },

  // Get all bookings for logged in user
  getMyBookings: async () => {
    const response = await api.get('/api/bookings');
    return response.data;
  },

  // Get booking by ID
  getBooking: async (id) => {
    const response = await api.get(`/api/bookings/${id}`);
    return response.data;
  },

  // Update booking status (trainer only)
  updateBookingStatus: async (id, status) => {
    const response = await api.put(`/api/bookings/${id}/status`, { status });
    return response.data;
  },

  // Cancel booking (client only)
  cancelBooking: async (id) => {
    const response = await api.put(`/api/bookings/${id}/cancel`);
    return response.data;
  }
};

// Payment API services
export const paymentService = {
  // Process booking payment
  processBookingPayment: async (bookingId, paymentData) => {
    const response = await api.post(`/api/payments/booking/${bookingId}`, paymentData);
    return response.data;
  },

  // Get user payments
  getUserPayments: async () => {
    const response = await api.get('/api/payments/user');
    return response.data;
  },

  // Get payment by ID
  getPayment: async (id) => {
    const response = await api.get(`/api/payments/${id}`);
    return response.data;
  },

  // Purchase credits
  purchaseCredits: async (creditData) => {
    const response = await api.post('/api/payments/credits', creditData);
    return response.data;
  }
};

// Review API services
export const reviewService = {
  // Create review
  createReview: async (reviewData) => {
    const response = await api.post('/api/reviews', reviewData);
    return response.data;
  },

  // Get reviews for a user
  getUserReviews: async (userId) => {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  },

  // Get my received reviews
  getMyReceivedReviews: async () => {
    const response = await api.get('/api/reviews/received');
    return response.data;
  },

  // Get my given reviews
  getMyGivenReviews: async () => {
    const response = await api.get('/api/reviews/given');
    return response.data;
  },

  // Update review
  updateReview: async (id, reviewData) => {
    const response = await api.put(`/api/reviews/${id}`, reviewData);
    return response.data;
  },

  // Delete review
  deleteReview: async (id) => {
    const response = await api.delete(`/api/reviews/${id}`);
    return response.data;
  }
};

// Notification API services
export const notificationService = {
  // Get user notifications
  getNotifications: async () => {
    const response = await api.get('/api/notifications');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/api/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/api/notifications/read-all');
    return response.data;
  },

  // Delete notification
  deleteNotification: async (id) => {
    const response = await api.delete(`/api/notifications/${id}`);
    return response.data;
  }
};

// Coupon API services
export const couponService = {
  // Validate coupon (client)
  validateCoupon: async (couponData) => {
    const response = await api.post('/api/coupons/validate', couponData);
    return response.data;
  },

  // Create coupon (admin/trainer)
  createCoupon: async (couponData) => {
    const response = await api.post('/api/coupons', couponData);
    return response.data;
  },

  // Get all coupons (admin/trainer)
  getCoupons: async () => {
    const response = await api.get('/api/coupons');
    return response.data;
  },

  // Get coupon by ID (admin/trainer)
  getCouponById: async (id) => {
    const response = await api.get(`/api/coupons/${id}`);
    return response.data;
  },

  // Update coupon (admin/trainer)
  updateCoupon: async (id, couponData) => {
    const response = await api.put(`/api/coupons/${id}`, couponData);
    return response.data;
  },

  // Delete coupon (admin/trainer)
  deleteCoupon: async (id) => {
    const response = await api.delete(`/api/coupons/${id}`);
    return response.data;
  }
};

export default api;
