/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";
import QuestionDetranInterface from "@/ts/interface/QuestionDetranInterface";
import apiClient from "../apiClient";

class QuestionsService {
  private readonly basePath = '/questions';

  async getAllQuestions(checked?: boolean): Promise<ApiResponseInterface<QuestionDetranInterface[]>> {
    try {
      const query = checked !== undefined ? `?checked=${checked}` : '';
      const response = await apiClient.get<{ data: QuestionDetranInterface[] }>(`${this.basePath}/${query}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao obter perguntas",
      };
    }
  }

  async getQuestionById(id: number): Promise<ApiResponseInterface<QuestionDetranInterface>> {
    try {
      const response = await apiClient.get<{ data: QuestionDetranInterface }>(`${this.basePath}/${id}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao obter a pergunta",
      };
    }
  }

  async getQuestionsByType(type: string, checked?: boolean): Promise<ApiResponseInterface<QuestionDetranInterface[]>> {
    try {
      const query = checked !== undefined ? `?checked=${checked}` : '';
      const response = await apiClient.get<{ data: QuestionDetranInterface[] }>(`${this.basePath}/type/${type}${query}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error: any) {
      return {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "Erro ao obter perguntas por tipo",
      };
    }
  }
}

export default new QuestionsService();
