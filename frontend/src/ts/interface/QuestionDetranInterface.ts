import QuestionOptionsEnum from "../enum/QuestionOptionsEnum";
import QuestionTypeEnum from "../enum/QuestionTypeEnum";

export default interface QuestionDetranInterface {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: QuestionOptionsEnum;
  type: QuestionTypeEnum;
  checked?: boolean;
}
