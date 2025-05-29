import QuestionDetranInterface from "./QuestionDetranInterface";

export default interface QuizInterface {
  topic: string;
  totalQuestions: number;
  totalTime?: number; // in seconds, optional
  questions: QuestionDetranInterface[];
}
