import QuestionDetranInterface from "../interface/QuestionDetranInterface";

type QuestionResponse = Omit<QuestionDetranInterface, 'answer' | '_id'>

export default QuestionResponse