'use client';
import React, { useEffect, useState } from 'react';
import SimulatedExamService from '@/services/SimulatedExamService';
import Header from '@/components/Header';
import QuestionOptionsEnum from '@/ts/enum/QuestionOptionsEnum';
import Quiz from '@/components/Quiz';
import QuizInterface from '@/ts/interface/QuizInterface';
import { useToast } from '@/state/context/ToastContext';
import ToastTypeEnum from '@/components/Toast/ToastTypeEnum';

const SimuladoPage: React.FC = () => {
  const { showToast } = useToast();

  const [quiz, setQuiz] = useState<QuizInterface | null>(null);
  const [/* score */, setScore] = useState<number>(0);
  // const [totalQuestions] = useState<number>(0);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!isQuizStarted) {
      handleStartQuiz();
    }
  }, [isQuizStarted]);

  // Handle the quiz start
  const handleStartQuiz = async () => {
    const response = await SimulatedExamService.startSimulatedExam(
      40,
      true,
    );
    if (response.status === 201) {
      setIsQuizStarted(true);
      setQuiz({
        topic: 'SIMULADO',
        totalQuestions: 40,
        totalTime: 3600,
        questions: response.data.questions
      })
    } else {
      showToast(ToastTypeEnum.ERROR, 'Erro ao iniciar o simulado.');
    }
  };

  // Handle the quiz finish and submit the results
  // const handleSubmitResults = async () => {
    // if (score !== undefined && totalQuestions) {
    //   const response = await ResultsService.createResult(
    //     score,
    //     totalQuestions,
    //   );
    //   if (response.status === 201) {
    //     showToast(ToastTypeEnum.ERROR, 'Resultado enviado com sucesso!');
    //   } else {
    //     showToast(ToastTypeEnum.ERROR, 'Erro ao enviar o resultado.');
    //   }
    // }
  // };

  // Update the score when a question is answered
  const handleAnswerQuestion = (
    questionId: number,
    answer: QuestionOptionsEnum,
  ) => {
    if (quiz) {
      const updatedQuiz = { ...quiz };
      const question = updatedQuiz.questions.find((q) => q.id === questionId);
      if (question) {
        question.checked = true;
        if (question.answer === answer) {
          setScore((prevScore) => prevScore + 1);
        }
      }
      setQuiz(updatedQuiz);
    }
  };

  return (
    <div
      className="relative z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        p-8 shadow-lg flex flex-col items-center justify-center text-center
        w-full h-screen"
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <Header
          title="Simulado Detran SP"
          description="Teste seus conhecimentos com este simulado."
        />

        <div>
          <Quiz quiz={quiz!} onAnswer={handleAnswerQuestion} />
        </div>
      </div>
    </div>
  );
};

export default SimuladoPage;
