const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage on init
    this.token = localStorage.getItem('token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Auth endpoints
  async login(email: string, password: string, role?: string) {
    const response = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async register(email: string, password: string, name: string, role: string = 'tourist') {
    const response = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    return response;
  }

  async getMe() {
    return this.request<any>('/auth/me');
  }

  async updateProfile(data: { name?: string; avatar?: string; preferences?: any }) {
    return this.request<any>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  logout() {
    this.setToken(null);
  }

  // Admin endpoints
  async getAllUsers() {
    return this.request<any[]>('/auth/users');
  }

  async updateUserStatus(id: string, status: string) {
    return this.request<any>(`/auth/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Destinations
  async getDestinations(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any[]>(`/destinations${query}`);
  }

  async getDestination(id: string) {
    return this.request<any>(`/destinations/${id}`);
  }

  // Guides
  async getGuides() {
    return this.request<any[]>('/guides');
  }

  async getGuide(id: string) {
    return this.request<any>(`/guides/${id}`);
  }

  async getMyGuideProfile() {
    return this.request<any>('/guides/profile/me');
  }

  async updateGuideProfile(data: any) {
    return this.request<any>('/guides/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createTour(data: any) {
    return this.request<any>('/guides/tours', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTour(id: string, data: any) {
    return this.request<any>(`/guides/tours/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTour(id: string) {
    return this.request<void>(`/guides/tours/${id}`, {
      method: 'DELETE',
    });
  }

  async updateGuideBookingStatus(id: string, status: string) {
    return this.request<any>(`/guides/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Products
  async getProducts(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any[]>(`/products${query}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async getMyProducts() {
    return this.request<any[]>('/products/seller/my-products');
  }

  async getSellerStats() {
    return this.request<any>('/products/seller/stats');
  }

  async createProduct(data: any) {
    return this.request<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Bookings
  async getMyBookings() {
    return this.request<any[]>('/bookings/my');
  }

  async getBooking(id: string) {
    return this.request<any>(`/bookings/${id}`);
  }

  async createBooking(data: { type: string; title: string; date: string; amount: number }) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelBooking(id: string) {
    return this.request<any>(`/bookings/${id}/cancel`, {
      method: 'PATCH',
    });
  }

  async getAllBookings() {
    return this.request<any[]>('/bookings');
  }

  async updateBookingStatus(id: string, status: string) {
    return this.request<any>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Itineraries
  async getMyItineraries() {
    return this.request<any[]>('/itineraries/my');
  }

  async getItinerary(id: string) {
    return this.request<any>(`/itineraries/${id}`);
  }

  async createItinerary(data: any) {
    return this.request<any>('/itineraries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItinerary(id: string, data: any) {
    return this.request<any>(`/itineraries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteItinerary(id: string) {
    return this.request<void>(`/itineraries/${id}`, {
      method: 'DELETE',
    });
  }

  async generateAIItinerary(data: { preferences?: any; duration?: number; budget?: string }) {
    return this.request<any>('/itineraries/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Testimonials & Tips
  async getTestimonials() {
    return this.request<any[]>('/testimonials');
  }

  async getAITips() {
    return this.request<string[]>('/testimonials/tips');
  }

  async submitFeedback(data: { rating: number; comment: string; sentiment?: string }) {
    return this.request<any>('/testimonials/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;

