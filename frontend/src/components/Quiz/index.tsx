import { useEffect, useState } from 'react';
import QuizOption from './QuizOption';
import { Clock } from 'react-feather';
import QuestionOptionsEnum from '@/ts/enum/QuestionOptionsEnum';
import QuizInterface from '@/ts/interface/QuizInterface';

interface QuizProps {
  quiz: QuizInterface;
  onAnswer: (questionId: number, answer: QuestionOptionsEnum) => void;
}

type ValidOptions = Exclude<QuestionOptionsEnum, QuestionOptionsEnum.UNKNOW>;

const optionIndexMap: Record<ValidOptions, number> = {
  [QuestionOptionsEnum.A]: 0,
  [QuestionOptionsEnum.B]: 1,
  [QuestionOptionsEnum.C]: 2,
  [QuestionOptionsEnum.D]: 3,
};

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const { questions } = quiz;
  const { question, options, answer: correctAnswer } = questions[0];

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState<QuestionOptionsEnum | null>(null);
  const [timer, setTimer] = useState(quiz.totalTime ?? 40 * 60); // Default to 40 minutes if no time is provided

  const onClickNext = () => {
    setSelectedAnswer(null);

    if (activeQuestionIndex !== questions.length - 1) {
      setActiveQuestionIndex((prev) => prev + 1);
    } else {
      setActiveQuestionIndex(0);
    }
  };

  const onAnswerSelected = (answer: string) => {
    setSelectedAnswer(answer as QuestionOptionsEnum);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`;

  return (
    <div className="mx-auto mt-[100px] max-w-3xl rounded-md border border-[#444444] bg-[#1e293b] px-[60px] py-[30px]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-4xl font-medium text-[#38bdf8]">
            {addLeadingZero(activeQuestionIndex + 1)}
          </span>
          <span className="text-[22px] font-medium text-[#817a8e]">
            /{addLeadingZero(questions.length)}
          </span>
        </div>
        {quiz.totalTime && (
          <div className="flex w-[100px] items-center gap-2">
            <Clock color="#38bdf8" width={28} height={28} />
            <span className="mt-1 block text-2xl font-medium text-[#38bdf8]">
              00:{addLeadingZero(Math.floor(timer / 60))}:
              {addLeadingZero(timer % 60)}
            </span>
          </div>
        )}
      </div>
      <h3 className="my-4 text-2xl font-medium">{question}</h3>
      <form>
        {(Object.keys(options) as Array<keyof typeof options>).map(
          (key, index) => {
            const option = options[key];
            const optionKey = key as QuestionOptionsEnum;
            const isCorrect = quiz.topic === 'SIMULADO' ? null : option === correctAnswer

            return (
              <QuizOption
                key={optionKey}
                index={index}
                answer={option}
                selectedAnswerIndex={
                  selectedAnswer &&
                  selectedAnswer !== QuestionOptionsEnum.UNKNOW
                    ? optionIndexMap[selectedAnswer as ValidOptions]
                    : null
                }
                onAnswerSelected={onAnswerSelected}
                isCorrect={isCorrect}
              />
            );
          },
        )}
      </form>
      <div className="flex justify-end">
        <button
          onClick={onClickNext}
          disabled={selectedAnswer === null}
          className="mt-12 min-w-[150px] transform cursor-pointer rounded-lg border border-[#38bdf8] bg-[#38bdf8] px-5 py-1.5 text-lg font-semibold text-white outline-none transition duration-300 ease-in-out hover:scale-105 hover:bg-[#1d4ed8] active:scale-95 active:bg-[#1e40af] disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:hover:scale-100"
        >
          {activeQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
