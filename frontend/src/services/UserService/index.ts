/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import UserInterface from "@/ts/interface/UserInterface";
import apiClient from "../apiClient";

class UserService {
  private readonly basePath = '/users';

  async createUser(name: string): Promise<ApiResponseInterface<UserInterface>> {
    try {
      const response = await apiClient.post<{ user_id: string; name: string }>(this.basePath, { name });
      return {
        status: 201,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao criar usuário",
      };
    }
  }

  async getUserById(userId: string): Promise<ApiResponseInterface<UserInterface>> {
    try {
      const response = await apiClient.get<{ user_id: string; name: string }>(`${this.basePath}/${userId}`);
      return {
        status: 200,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao buscar usuário",
      };
    }
  }
}

export default new UserService();
