import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { tokenService } from '@utils/services/token.service';

// Create an axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Powered-By': 'leqnam',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${tokenService.getToken()}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No Response:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Request Error:', error.message);
    }
    // Return a rejected promise to handle errors in the calling code
    return Promise.reject(error);
  },
);

export const httpGet = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const httpPost = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const httpPut = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const httpDelete = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const handleError = (error: any): Error => {
  if (axios.isAxiosError(error)) {
    return new Error(error.response?.data?.message || 'An error occurred');
  }
  return new Error('An unexpected error occurred');
};
