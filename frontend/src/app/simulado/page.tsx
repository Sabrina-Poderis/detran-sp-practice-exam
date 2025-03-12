'use client';
import React, { useEffect, useState } from 'react';
import ResultsService from '@/services/ResultsService';
import SimulatedExamService from '@/services/SimulatedExamService';
import { Button } from '@/components/Button';
import Header from '@/components/Header';
import QuestionOptionsEnum from '@/ts/enum/QuestionOptionsEnum';
import Quiz from '@/components/Quiz';
import QuizInterface from '@/ts/interface/QuizInterface';
import { useToast } from '@/state/context/ToastContext';
import ToastTypeEnum from '@/components/Toast/ToastTypeEnum';

const SimuladoPage: React.FC = () => {
  const { showToast } = useToast();

  const [quiz, setQuiz] = useState<QuizInterface | null>(null);
  const [userId] = useState<string | null>('123');
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, ] = useState<number>(0);
  // const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      handleStartQuiz()
      // SimulatedExamService.getSimulatedExamByUserId(userId)
      //   .then((response) => {
      //     if (response.status === 200) {
      //       setQuiz(response.data);
      //       setTotalQuestions(response.data.questions.length);
      //     } else {
      //       showToast(ToastTypeEnum.ERROR, 'Erro ao carregar o simulado.');
      //     }
      //   })
      //   .catch(() => {
      //     showToast(ToastTypeEnum.ERROR, 'Erro ao carregar o simulado.');
      //   });
    }
  }, [userId]);

  // Handle the quiz start
  const handleStartQuiz = async () => {
    if (userId && quiz) {
      const response = await SimulatedExamService.createSimulatedExam(
        userId,
        quiz.questions.length,
        false,
      );
      if (response.status === 201) {
        // setIsQuizStarted(true);
      } else {
        showToast(ToastTypeEnum.ERROR, 'Erro ao iniciar o simulado.');
      }
    }
  };

  // Handle the quiz finish and submit the results
  const handleSubmitResults = async () => {
    if (userId && score !== undefined && totalQuestions) {
      const response = await ResultsService.createResult(
        userId,
        score,
        totalQuestions,
      );
      if (response.status === 201) {
        showToast(ToastTypeEnum.ERROR, 'Resultado enviado com sucesso!');
      } else {
        showToast(ToastTypeEnum.ERROR, 'Erro ao enviar o resultado.');
      }
    }
  };

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
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmitResults} variant="secondary" size="md">
              Enviar Resultado
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladoPage;
