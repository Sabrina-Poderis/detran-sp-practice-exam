import QuestionOptionsEnum from "@/ts/enum/QuestionOptionsEnum";
import getQuizOptionTheme from "@/utils/style/getQuizOptionTheme";

interface QuizOptionProps {
  index: number;
  questionIndex: QuestionOptionsEnum;
  questionId: number;
  answerText: string;
  selectedAnswerIndex: number | null;
  onAnswerSelected: (answer: string, index: number) => void;
  isCorrect?: boolean | null;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  index,
  questionIndex,
  questionId,
  answerText,
  selectedAnswerIndex,
  onAnswerSelected,
  isCorrect = null,
}) => {
  const theme = getQuizOptionTheme({index, selectedAnswerIndex, isCorrect})

  return (
    <div className="relative mt-4 cursor-pointer">
      <input
        type="radio"
        id={`choice-${questionIndex}`}
        name="quiz"
        value={questionIndex}
        checked={selectedAnswerIndex === index}
        onChange={() => onAnswerSelected(questionIndex, questionId)}
        className="hidden"
      />
      <label
        htmlFor={`choice-${questionIndex}`}
        className="block cursor-pointer rounded-lg border px-4 py-3 text-md text-left text-white transition-colors duration-300 ease-in-out"
        style={{ borderColor: theme.borderColor, backgroundColor: theme.bgColor }}
      >
        {answerText}
      </label>
    </div>
  );
};

export default QuizOption;
