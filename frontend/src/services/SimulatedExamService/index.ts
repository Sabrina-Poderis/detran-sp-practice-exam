/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import apiClient from "../apiClient";
import QuestionDetranInterface from "@/ts/interface/QuestionDetranInterface";

class SimulatedExamService {
  private readonly basePath = '/simulated-exam';

  // Método para criar um novo simulado
  async startSimulatedExam(question_limit: number, verified: boolean): Promise<ApiResponseInterface<any>> {
    try {
      const response = await apiClient.post<{
        questions: QuestionDetranInterface[];
        time_limit: number;
      }>(`${this.basePath}/start`, { question_limit, verified });

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
}

export default new SimulatedExamService();
