import axios from 'axios';

export class BaseService {
  constructor() {
    this.baseURL = 'http://127.0.0.1:8000/';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for logging/debugging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Build headers for the request
   * @param {Object} customHeaders - Custom headers to merge with default headers
   * @returns {Object} - Complete headers object
   */
  buildHeaders(customHeaders = {}) {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    return { ...defaultHeaders, ...customHeaders };
  }

  /**
   * Build query string from params object
   * @param {Object} params - Query parameters
   * @returns {string} - Query string
   */
  buildQueryString(params = {}) {
    if (!params || Object.keys(params).length === 0) {
      return '';
    }

    const queryString = Object.keys(params)
      .filter(key => params[key] !== null && params[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return queryString ? `?${queryString}` : '';
  }

  /**
   * Main request method
   * @param {string} endpoint - API endpoint
   * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param {Object} data - Request body data (for POST, PUT, PATCH)
   * @param {Object} params - Query parameters (for GET, DELETE)
   * @param {Object} headers - Custom headers
   * @returns {Promise} - Axios response
   */
  async makeRequest(endpoint, method = 'GET', data = null, params = null, headers = {}) {
    try {
      const config = {
        method: method.toUpperCase(),
        url: endpoint,
        headers: this.buildHeaders(headers),
      };

      // Handle query parameters for GET and DELETE
      if (['GET', 'DELETE'].includes(config.method) && params) {
        config.params = params;
      }

      // Handle body data for POST, PUT, PATCH
      if (['POST', 'PUT', 'PATCH'].includes(config.method) && data) {
        config.data = data;
      }

      const response = await this.axiosInstance.request(config);
      return this.handleSuccess(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} headers - Custom headers
   * @returns {Promise}
   */
  async get(endpoint, params = null, headers = {}) {
    return this.makeRequest(endpoint, 'GET', null, params, headers);
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} headers - Custom headers
   * @returns {Promise}
   */
  async post(endpoint, data = null, headers = {}) {
    return this.makeRequest(endpoint, 'POST', data, null, headers);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} headers - Custom headers
   * @returns {Promise}
   */
  async put(endpoint, data = null, headers = {}) {
    return this.makeRequest(endpoint, 'PUT', data, null, headers);
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body
   * @param {Object} headers - Custom headers
   * @returns {Promise}
   */
  async patch(endpoint, data = null, headers = {}) {
    return this.makeRequest(endpoint, 'PATCH', data, null, headers);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} headers - Custom headers
   * @returns {Promise}
   */
  async delete(endpoint, params = null, headers = {}) {
    return this.makeRequest(endpoint, 'DELETE', null, params, headers);
  }

  /**
   * Handle successful response
   * @param {Object} response - Axios response
   * @returns {Object} - Response data
   */
  handleSuccess(response) {
    return {
      success: true,
      data: response.data,
      status: response.status,
      message: response.data?.message || 'Request successful',
    };
  }

  /**
   * Handle error response
   * @param {Object} error - Axios error
   * @returns {Object} - Error object
   */
  handleError(error) {
    const errorResponse = {
      success: false,
      message: 'An error occurred',
      status: null,
      data: null,
    };

    if (error.response) {
      // Server responded with error status
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
      errorResponse.message = error.response.data?.message || error.response.data?.error || 'Server error';

      // Handle specific status codes
      switch (error.response.status) {
        case 400:
          errorResponse.message = error.response.data?.message || 'Bad request';
          break;
        case 401:
          errorResponse.message = 'Unauthorized. Please login again.';
          break;
        case 403:
          errorResponse.message = 'Access forbidden';
          break;
        case 404:
          errorResponse.message = 'Resource not found';
          break;
        case 422:
          errorResponse.message = error.response.data?.message || 'Validation error';
          errorResponse.errors = error.response.data?.errors || {};
          break;
        case 500:
          errorResponse.message = 'Internal server error';
          break;
        default:
          errorResponse.message = error.response.data?.message || 'An error occurred';
      }
    } else if (error.request) {
      // Request made but no response received
      errorResponse.message = 'No response from server. Please check your connection.';
    } else {
      // Error in request setup
      errorResponse.message = error.message || 'Request failed';
    }

    console.error('API Error:', errorResponse);
    return errorResponse;
  }
}