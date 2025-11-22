import { BaseService } from './BaseService';
import { useAuthStore } from '~/stores/auth';
import { AUTH_KEYS } from '~/keys/store-keys';

export class AuthService extends BaseService {
  constructor() {
    super();
    this.authEndpoint = 'api/auth/';
  }

  /**
   * Get auth headers with token
   * @returns {Object} - Headers with authorization token
   */
  getAuthHeaders() {
    const token = this.getStoredToken();
    if (token) {
      return {
        [AUTH_KEYS.TOKEN]: token,
      };
    }
    return {};
  }

  /**
   * Store authentication tokens
   * @param {string} token - Access token
   * @param {string} refreshToken - Refresh token
   * @param {number} expiresIn - Token expiration time in seconds
   */
  storeTokens(token, refreshToken = null, expiresIn = null) {
    if (process.client) {
      localStorage.setItem(AUTH_KEYS.TOKEN, token);
      
      if (refreshToken) {
        localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, refreshToken);
      }
      
      if (expiresIn) {
        const expiryTime = Date.now() + expiresIn * 1000;
        localStorage.setItem(AUTH_KEYS.TIMESTAMP, expiryTime.toString());
      }
    }
  }

  /**
   * Get stored token
   * @returns {string|null} - Stored token
   */
  getStoredToken() {
    if (process.client) {
      return localStorage.getItem(AUTH_KEYS.TOKEN);
    }
    return null;
  }

  /**
   * Get stored refresh token
   * @returns {string|null} - Stored refresh token
   */
  getStoredRefreshToken() {
    if (process.client) {
      return localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN);
    }
    return null;
  }

  /**
   * Check if token is expired
   * @returns {boolean} - True if token is expired
   */
  isTokenExpired() {
    if (process.client) {
      const expiryTime = localStorage.getItem(AUTH_KEYS.TIMESTAMP);
      if (!expiryTime) return true;
      return Date.now() > parseInt(expiryTime);
    }
    return true;
  }

  /**
   * Clear all stored tokens
   */
  clearTokens() {
    if (process.client) {
      localStorage.removeItem(AUTH_KEYS.TOKEN);
      localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(AUTH_KEYS.TIMESTAMP);
    }
  }

  /**
   * Update Pinia auth store
   * @param {boolean} isAuthenticated - Authentication status
   * @param {string|null} userId - User ID
   */
  updateAuthStore(isAuthenticated, userId = null) {
    const authStore = useAuthStore();
    if (isAuthenticated && userId) {
      authStore.login(userId);
    } else {
      authStore.logout();
    }
  }

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise}
   */
  async login(credentials) {
    try {
      const response = await this.post(`${this.authEndpoint}login`, credentials);
      
      if (response.success && response.data) {
        const { token, refresh_token, expires_in, user } = response.data;
        
        // Store tokens
        this.storeTokens(token, refresh_token, expires_in);
        
        // Update auth store
        this.updateAuthStore(true, user?.id || user?.email);
        
        return response;
      }
      
      return response;
    } catch (error) {
      this.updateAuthStore(false);
      throw error;
    }
  }

  /**
   * Register new user
   * @param {Object} userData - { email, password, name, etc. }
   * @returns {Promise}
   */
  async signup(userData) {
    try {
      const response = await this.post(`${this.authEndpoint}signup`, userData);
      
      if (response.success && response.data) {
        const { token, refresh_token, expires_in, user } = response.data;
        
        // Store tokens if auto-login after signup
        if (token) {
          this.storeTokens(token, refresh_token, expires_in);
          this.updateAuthStore(true, user?.id || user?.email);
        }
        
        return response;
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout user
   * @returns {Promise}
   */
  async logout() {
    try {
      const headers = this.getAuthHeaders();
      const response = await this.post(`${this.authEndpoint}logout`, null, headers);
      
      // Clear tokens and update store regardless of API response
      this.clearTokens();
      this.updateAuthStore(false);
      
      return response;
    } catch (error) {
      // Clear tokens even if API call fails
      this.clearTokens();
      this.updateAuthStore(false);
      throw error;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise}
   */
  async getCurrentUser() {
    try {
      const headers = this.getAuthHeaders();
      return await this.get(`${this.authEndpoint}me`, null, headers);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh access token
   * @returns {Promise}
   */
  async refreshToken() {
    try {
      const refreshToken = this.getStoredRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      
      const response = await this.post(`${this.authEndpoint}refresh`, {
        refresh_token: refreshToken,
      });
      
      if (response.success && response.data) {
        const { token, refresh_token, expires_in } = response.data;
        this.storeTokens(token, refresh_token, expires_in);
        return response;
      }
      
      return response;
    } catch (error) {
      this.clearTokens();
      this.updateAuthStore(false);
      throw error;
    }
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise}
   */
  async forgotPassword(email) {
    try {
      return await this.post(`${this.authEndpoint}forgot-password`, { email });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reset password with token
   * @param {Object} data - { reset_token, password, confirm_password }
   * @returns {Promise}
   */
  async resetPassword(data) {
    try {
      return await this.post(`${this.authEndpoint}reset-password`, data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise}
   */
  async verifyEmail(token) {
    try {
      return await this.post(`${this.authEndpoint}verify-email`, { token });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change password (authenticated)
   * @param {Object} data - { current_password, new_password, confirm_password }
   * @returns {Promise}
   */
  async changePassword(data) {
    try {
      const headers = this.getAuthHeaders();
      return await this.post(`${this.authEndpoint}change-password`, data, headers);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getStoredToken();
    return token !== null && !this.isTokenExpired();
  }
}

// Export singleton instance
export const authService = new AuthService();