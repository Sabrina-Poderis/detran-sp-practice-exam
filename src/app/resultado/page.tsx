'use client';

import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

const ResultadoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = Number(searchParams.get('score'));
  const total = Number(searchParams.get('total'));

  const percentage = Math.round((score / total) * 100);

  const getStatusMessage = () => {
    if (percentage >= 85) return 'Excelente!';
    if (percentage >= 70) return 'Muito bom!';
    if (percentage >= 50) return 'Você pode melhorar.';
    return 'Estude mais e tente novamente.';
  };

  return (
    <div
      className="relative z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        p-8 shadow-lg flex flex-col items-center justify-center text-center
        min-h-screen w-full overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-4 mx-auto min-h-[80vh]">
        <Header title="Resultado do Simulado" />

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md mt-8 w-full">
          <p className="text-lg mb-4">
            Você acertou <strong>{score}</strong> de <strong>{total}</strong> perguntas.
          </p>

          <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Aproveitamento: {percentage}%
          </div>
          <div className="mt-2 text-md text-gray-700 dark:text-gray-300 italic">
            {getStatusMessage()}
          </div>
        </div>

        <Button className="mt-8" onClick={() => router.push('/simulado')}>
          Refazer Simulado
        </Button>
      </div>
    </div>
  );
};

export default ResultadoPage;
