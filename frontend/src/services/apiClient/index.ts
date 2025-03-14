import axios, { AxiosInstance, AxiosError } from 'axios';
export interface HttpClient {
  get<T>(url: string, config?: object): Promise<T>;
  post<T>(url: string, data?: object, config?: object): Promise<T>;
  put<T>(url: string, data?: object, config?: object): Promise<T>;
  delete<T>(url: string, config?: object): Promise<T>;
}

class AxiosHttpClient implements HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true, // Permite envio de cookies/sessões em CORS
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para capturar erros
    this.axiosInstance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 403 || status === 401) {
            console.warn('Erro de autenticação:', error.message);
          } else {
            console.error(`Erro ${status}:`, error.message);
          }
        } else {
          console.error('Erro de rede ou desconhecido:', error.message);
        }
        return Promise.reject(error);
      }
    );
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

// Usa a variável de ambiente ou um fallback
const apiClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001');

export default apiClient;
