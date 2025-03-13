import QuestionDetranInterface from '@modules/QuestionDetran/ts/interfaces/QuestionDetranInterface';
import QuestionTypeEnum from '@modules/QuestionDetran/ts/enums/QuestionTypeEnum';
import QuestionDetranMessagesEnum from '@modules/QuestionDetran/ts/enums/QuestionDetranMessagesEnum';
import QuestionsDetranMock from '@shared/QuestionsDetranMock';

export default class QuestionDetranService {
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
    verified: boolean
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
    verified = false
  ): Promise<{ data: QuestionDetranInterface[] }> {
    const questions = this.readData().filter((q) =>
      this.filterVerified(q, verified)
    );
    return { data: questions };
  }

  async getQuestionById(
    id: number
  ): Promise<{ data: QuestionDetranInterface | null; message?: string }> {
    const question = this.readData().find((q) => q.id === id);
    return question
      ? { data: question }
      : { data: null, message: QuestionDetranMessagesEnum.QUESTION_NOT_FOUND };
  }

  async getQuestionsByType(
    type: string,
    verified = false
  ): Promise<{ data: QuestionDetranInterface[]; message?: string }> {
    if (!Object.values(QuestionTypeEnum).includes(type as QuestionTypeEnum)) {
      return {
        data: [],
        message: QuestionDetranMessagesEnum.INVALID_TYPE_ERROR,
      };
    }

    const questions = this.readData().filter(
      (q) => q.type === type && this.filterVerified(q, verified)
    );
    return { data: questions };
  }

  async getRandomQuestions(
    limit: number,
    verified = false
  ): Promise<QuestionDetranInterface[]> {
    const questions = this.readData().filter((q) =>
      this.filterVerified(q, verified)
    );
    return questions.sort(() => 0.5 - Math.random()).slice(0, limit);
  }

  async getQuestionsByIds(
    ids: number[],
    verified = false
  ): Promise<QuestionDetranInterface[]> {
    const questions = this.readData().filter(
      (q) => ids.includes(q.id) && this.filterVerified(q, verified)
    );
    if (questions.length === 0)
      throw new Error(QuestionDetranMessagesEnum.QUESTIONS_NOT_FOUND);
    return questions;
  }
}
