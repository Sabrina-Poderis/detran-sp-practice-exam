import SimulatedExamAnswerInterface from "@/ts/interface/SimulatedExamAnswerInterface";
import QuestionsService from "../QuestionsService";
import ErrorMessagesEnum from "@/ts/enum/ErrorMessagesEnum";
import SimulatedExamResponse from "@/ts/type/SimulatedExamResponse";
import QuestionResponse from "@/ts/type/QuestionResponse";
import ApiResponseInterface from "@/ts/interface/ApiResponseInterface";

export default class SimulatedExamService {
  private questionService: QuestionsService;

  constructor() {
    this.questionService = new QuestionsService();
  }

  async startExam(qtdQuestions: number = 10, verified = false): Promise<ApiResponseInterface<QuestionResponse[]>> {
    const questions = await this.questionService.getRandomQuestions(qtdQuestions, verified); 
    return questions
  }

  async submitExam(answers: SimulatedExamAnswerInterface[]): Promise<ApiResponseInterface<SimulatedExamResponse>> {
    try {
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
      
      return {
        status: 200,
        data: {
          score,
          total_questions: questions.length,
          created_at: new Date(),
        }
      }
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        message: ErrorMessagesEnum.INTERNAL_SERVER_ERROR
      }
    }
  }
}

