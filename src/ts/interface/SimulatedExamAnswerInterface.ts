import QuestionOptionsEnum from "../enum/QuestionOptionsEnum";

export default interface SimulatedExamAnswerInterface {
  questionId: number;
  selectedOption: QuestionOptionsEnum;
}
