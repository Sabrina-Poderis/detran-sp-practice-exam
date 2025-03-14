/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import apiClient from "../apiClient";
import QuestionDetranInterface from "@/ts/interface/QuestionDetranInterface";
import SimulatedExamAnswerInterface from "@/ts/interface/SimulatedExamAnswerInterface";

class SimulatedExamService {
  private readonly basePath = '/simulated-exam';

  async startSimulatedExam(qtdQuestions: number, verified: boolean): Promise<ApiResponseInterface<any>> {
    try {
      const query = verified !== undefined ? `?verified=${verified}` : '';
      
      const response = await apiClient.post<{
        questions: QuestionDetranInterface[];
        time_limit: number;
      }>(`${this.basePath}/start${query}`, { qtdQuestions });

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

  async submitSimulatedExam(answers: SimulatedExamAnswerInterface[]): Promise<ApiResponseInterface<any>> {
    try {
      const response = await apiClient.post<{
        questions: QuestionDetranInterface[];
        time_limit: number;
      }>(`${this.basePath}/submit`, { answers });

      return {
        status: 201,
        data: response,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao buscar respostas do simulado",
      };
    }
  }
}

export default new SimulatedExamService();
