import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const api: AxiosInstance = axios.create({
  baseURL: "https://ui8.net/api",
  headers: {
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    const token = null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error("Response error:", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request error:", error.request);
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
  }
  throw error;
};

export default api;
