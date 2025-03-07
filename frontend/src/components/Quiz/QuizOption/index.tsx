import getQuizOptionTheme from "@/utils/style/getQuizOptionTheme";

interface QuizOptionProps {
  index: number;
  answer: string;
  selectedAnswerIndex: number | null;
  onAnswerSelected: (answer: string, index: number) => void;
  isCorrect?: boolean | null;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  index,
  answer,
  selectedAnswerIndex,
  onAnswerSelected,
  isCorrect = null,
}) => {
  const theme = getQuizOptionTheme({index,selectedAnswerIndex, isCorrect})

  return (
    <div className="relative mt-4 cursor-pointer">
      <input
        type="radio"
        id={`choice-${index}`}
        name="quiz"
        value={answer}
        checked={selectedAnswerIndex === index}
        onChange={() => onAnswerSelected(answer, index)}
        className="hidden"
      />
      <label
        htmlFor={`choice-${index}`}
        className="block cursor-pointer rounded-lg border px-4 py-3 text-lg text-white transition-colors duration-300 ease-in-out"
        style={{ borderColor: theme.borderColor, backgroundColor: theme.bgColor }}
      >
        {answer}
      </label>
    </div>
  );
};

export default QuizOption;
