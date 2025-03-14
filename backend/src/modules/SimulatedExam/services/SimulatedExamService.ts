import QuestionDetranService from '@modules/QuestionDetran/services/QuestionDetranService';
import SimulatedExamAnswerInterface from '@modules/SimulatedExam/ts/interfaces/SimulatedExamAnswerInterface';
import QuestionDetranMessagesEnum from '@modules/QuestionDetran/ts/enums/QuestionDetranMessagesEnum';
import SimulatedExamInterfaceResponse from '../ts/interfaces/SimulatedExamInterface';
import QuestionDetranInterface from '@modules/QuestionDetran/ts/interfaces/QuestionDetranInterface';

class SimulatedExamService {
  private questionService: QuestionDetranService;

  constructor() {
    this.questionService = new QuestionDetranService();
  }

  async startExam(qtdQuestions: number = 10): Promise<Omit<QuestionDetranInterface, 'answer'>[]> {
    const questions = await this.questionService.getRandomQuestions(qtdQuestions); 

    if(questions){
      return questions;
    }
    throw new Error(QuestionDetranMessagesEnum.INTERNAL_SERVER_ERROR); 
  }

  async submitExam(answers: SimulatedExamAnswerInterface[]): Promise<SimulatedExamInterfaceResponse> {
    const questions = await this.questionService.getQuestionsByIds(
      answers.map((answer) => answer.questionId)
    );
    let score = 0;

    answers.forEach((answer) => {
      const question = questions.find((question) => question.id === answer.questionId);
      if (question && question.answer === answer.selectedOption) {
        score++;
      }
    });

    const result = {
      score,
      total_questions: questions.length,
      created_at: new Date(),
    };

    return result;
  }
}

export default new SimulatedExamService();
