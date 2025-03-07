/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import apiClient from "../apiClient";

class SimulatedExamService {
  private readonly basePath = '/simulatedexam';

  // Método para criar um novo simulado
  async createSimulatedExam(user_id: string, question_limit: number, checked: boolean): Promise<ApiResponseInterface<any>> {
    try {
      const response = await apiClient.post<{
        user_id: string;
        questions: any[];
        time_limit: number;
      }>(this.basePath, { user_id, question_limit, checked });

      return {
        status: 201,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao criar simulado",
      };
    }
  }

  // Método para buscar o simulado de um usuário
  async getSimulatedExamByUserId(user_id: string): Promise<ApiResponseInterface<any>> {
    try {
      const response = await apiClient.get<{
        user_id: string;
        questions: any[];
        time_limit: number;
      }>(`${this.basePath}/${user_id}`);

      return {
        status: 200,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao buscar simulado",
      };
    }
  }
}

export default new SimulatedExamService();
