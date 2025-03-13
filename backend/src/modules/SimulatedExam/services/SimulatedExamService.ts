import QuestionDetranService from '@modules/QuestionDetran/services/QuestionDetranService';
import SimulatedExamAnswerInterface from '@modules/SimulatedExam/ts/interfaces/SimulatedExamAnswerInterface';
import QuestionDetranMessagesEnum from '@modules/QuestionDetran/ts/enums/QuestionDetranMessagesEnum';

class SimulatedExamService {
  private questionService: QuestionDetranService;

  constructor() {
    this.questionService = new QuestionDetranService();
  }

  async startExam(userId: string, qtdQuestions: number = 10) {
    const questions = await this.questionService.getRandomQuestions(qtdQuestions); 

    if(questions){
      return { userId, questions, startTime: new Date() };
    }
    throw new Error(QuestionDetranMessagesEnum.INTERNAL_SERVER_ERROR); 
  }

  async submitExam(userId: string, answers: SimulatedExamAnswerInterface[]) {
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
      user_id: userId,
      score,
      total_questions: questions.length,
      created_at: new Date(),
    };

    return result;
  }
}

export default new SimulatedExamService();
