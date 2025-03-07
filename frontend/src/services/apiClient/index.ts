// frontend/src/services/api/axiosInstance.ts

import axios, { AxiosInstance } from 'axios';

export interface HttpClient {
  get<T>(url: string, config?: object): Promise<T>;
  post<T>(url: string, data?: object, config?: object): Promise<T>;
  put<T>(url: string, data?: object, config?: object): Promise<T>;
  delete<T>(url: string, config?: object): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async get<T>(url: string, config?: object): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: object, config?: object): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: object, config?: object): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: object): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

const apiClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_API_BASE_URL || '');

export default apiClient;
