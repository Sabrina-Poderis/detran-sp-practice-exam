'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SimulatedExamService from '@/services/SimulatedExamService';
import Header from '@/components/Header';
import Quiz from '@/components/Quiz';
import { useToast } from '@/state/context/ToastContext';
import { Button } from '@/components/Button';
import ToastTypeEnum from '@/components/Toast/ToastTypeEnum';
import SimulatedExamAnswerInterface from '@/ts/interface/SimulatedExamAnswerInterface';
import QuestionOptionsEnum from '@/ts/enum/QuestionOptionsEnum';
import QuizInterface from '@/ts/interface/QuizInterface';
import QuestionDetranInterface from '@/ts/interface/QuestionDetranInterface';

const SimuladoPage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const simulatedExamService = new SimulatedExamService();

  const [quiz, setQuiz] = useState<QuizInterface | null>(null);
  const [answers, setAnswers] = useState<SimulatedExamAnswerInterface[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    if (!isQuizStarted) {
      handleStartQuiz();
    }
  }, [isQuizStarted]);

  const handleStartQuiz = async () => {
    const response = await simulatedExamService.startExam(40, true);
    if (response.status === 200 && response.data) {
      setIsQuizStarted(true);
      setQuiz({
        topic: 'SIMULADO',
        totalQuestions: 40,
        totalTime: 3600,
        questions: response.data as QuestionDetranInterface[],
      });
    } else {
      showToast(ToastTypeEnum.ERROR, 'Erro ao iniciar o simulado.');
    }
  };

  const handleAnswerQuestion = (
    questionId: number,
    answer: QuestionOptionsEnum,
  ) => {
    if (!quiz) return;

    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.questionId === questionId,
      );
      const updatedAnswers = [...prevAnswers];

      if (existingAnswerIndex !== -1) {
        updatedAnswers[existingAnswerIndex].selectedOption = answer;
      } else {
        updatedAnswers.push({ questionId, selectedOption: answer });
      }

      return updatedAnswers;
    });
  };

  const handleSubmitResults = async () => {
    if (answers.length === 0) {
      showToast(
        ToastTypeEnum.WARNING,
        'Você precisa responder pelo menos uma pergunta antes de enviar.',
      );
      return;
    }
  
    const response = await simulatedExamService.submitExam(answers);
  
    if (response.status === 200 && response.data) {
      // Redirecionar para a tela de resultado com score e total
      const { score } = response.data;
      router.push(`/resultado?score=${score}&total=${40}`);
    } else {
      showToast(ToastTypeEnum.ERROR, 'Erro ao enviar o resultado.');
    }
  };
  

  return (
    <div
      className="relative z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        p-8 shadow-lg flex flex-col items-center justify-center text-center
        min-h-screen w-full overflow-hidden"
    >
      {/* Container com altura de 80% da tela */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4 mx-auto min-h-[80vh]">
        <div className="flex w-full justify-between align-center my-4">
          <Header title="Simulado Detran SP" />
          <Button onClick={handleSubmitResults}>Enviar Resultado</Button>
        </div>
        <div className="w-full">
          {quiz && <Quiz quiz={quiz} onAnswer={handleAnswerQuestion} />}
        </div>
      </div>
    </div>
  );
};

export default SimuladoPage;
