/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import apiClient from "../apiClient";

class ResultsService {
  private readonly basePath = '/results';

  // Método para criar um novo resultado
  async createResult(user_id: string, score: number, total_questions: number): Promise<ApiResponseInterface<any>> {
    try {
      const response = await apiClient.post<{
        user_id: string;
        score: number;
        total_questions: number;
        created_at: string;
      }>(this.basePath, { user_id, score, total_questions });

      return {
        status: 201,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao criar resultado",
      };
    }
  }

  // Método para buscar os resultados de um usuário
  async getResultsByUserId(user_id: string): Promise<ApiResponseInterface<any[]>> {
    try {
      const response = await apiClient.get<{
        user_id: string;
        score: number;
        total_questions: number;
        created_at: string;
      }[]>(`${this.basePath}/${user_id}`);

      return {
        status: 200,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao buscar resultados",
      };
    }
  }
}

export default new ResultsService();
