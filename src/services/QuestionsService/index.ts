/* eslint-disable @typescript-eslint/no-unused-vars */
import QuestionDetranInterface from '@/ts/interface/QuestionDetranInterface';
import QuestionsDetranMock from '../../../database/QuestionsDetranMock';
import ErrorMessagesEnum from '@/ts/enum/ErrorMessagesEnum';
import QuestionTypeEnum from '@/ts/enum/QuestionTypeEnum';
import ApiResponseInterface from '@/ts/interface/ApiResponseInterface';
import QuestionResponse from '@/ts/type/QuestionResponse';

export default class QuestionsService {
  private readData(): QuestionDetranInterface[] {
    try {
      return QuestionsDetranMock;
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON:', error);
      return [];
    }
  }

  private filterVerified(
    q: QuestionDetranInterface,
    verified: boolean,
  ): boolean {
    if (verified === false) {
      // Se verified for false, inclui true, false ou undefined
      return (
        q.verified === true || q.verified === false || q.verified === undefined
      );
    } else {
      // Se verified for true, inclui apenas true
      return q.verified === true;
    }
  }

  async getAllQuestions(
    verified = false,
  ): Promise<ApiResponseInterface<QuestionDetranInterface[]>> {
    const questions = this.readData().filter((q) =>
      this.filterVerified(q, verified),
    );

    return questions
      ? { status: 200, data: questions }
      : { status: 404, message: ErrorMessagesEnum.INTERNAL_SERVER_ERROR };
  }

  async getQuestionById(
    id: number,
  ): Promise<ApiResponseInterface<QuestionDetranInterface>> {
    const question = this.readData().find((q) => q.id === id);

    return question
      ? { status: 200, data: question }
      : { status: 404, message: ErrorMessagesEnum.QUESTION_NOT_FOUND };
  }

  async getQuestionsByType(
    type: string,
    verified = false,
  ): Promise<ApiResponseInterface<QuestionDetranInterface[]>> {
    if (!Object.values(QuestionTypeEnum).includes(type as QuestionTypeEnum)) {
      return {
        status: 500,
        message: ErrorMessagesEnum.INVALID_TYPE_ERROR,
      };
    }

    const questions = this.readData().filter(
      (q) => q.type === type && this.filterVerified(q, verified),
    );
    return { status: 200, data: questions };
  }

  async getRandomQuestions(
    limit: number,
    verified = false,
  ): Promise<ApiResponseInterface<QuestionResponse[]>> {
    const questions = this.readData()
      .filter((q) => this.filterVerified(q, verified))
      .map(({ answer, ...rest }) => rest);

    const randomQuestions = questions
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);

    return randomQuestions.length === 0
      ? { status: 404, message: ErrorMessagesEnum.INTERNAL_SERVER_ERROR }
      : { status: 200, data: randomQuestions };
  }

  async getQuestionsByIds(
    ids: number[],
    verified = false,
  ): Promise<QuestionDetranInterface[]> {
    const questions = this.readData().filter(
      (q) => ids.includes(q.id) && this.filterVerified(q, verified),
    );

    return questions;
  }
}
