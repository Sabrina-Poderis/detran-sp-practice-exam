"use client";

import { useState } from "react";
import { AlertTriangle, X } from "react-feather";

export function AlertLegalNotice() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-all"
        aria-label="Aviso legal"
      >
        <AlertTriangle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-600"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#004076] dark:text-[#3191D1] mb-4">Detran SP Practice Exam</h2>
            <p className="text-gray-700  dark:text-white ">
              A aplicação tem como objetivo simular a prova teórica do Detran, permitindo que usuários pratiquem questões
              oficiais e testem seus conhecimentos sobre legislação de trânsito, direção defensiva, primeiros socorros e
              mecânica básica. O sistema oferecerá uma experiência similar à prova oficial, ajudando candidatos a se
              prepararem de maneira eficaz.
            </p>

            <h3 className="text-lg font-semibold text-[#034EA1] dark:text-[#3191D1] mt-4">Aviso Legal</h3>
            <p className="text-gray-700 dark:text-white">
              Este projeto é uma iniciativa particular e não possui qualquer vínculo oficial com o <strong>Detran</strong> ou
              qualquer outro órgão governamental. As questões utilizadas foram obtidas a partir de fontes de domínio público
              disponíveis no site oficial do Detran-SP.
            </p>

            <p className="text-gray-700 dark:text-white mt-2">
              ⚠️ <strong>Importante:</strong> Embora as perguntas e respostas tenham sido extraídas de fontes oficiais,{" "}
              <strong>não garantimos a precisão, atualização ou correção das respostas</strong>. O objetivo deste sistema é{" "}
              <strong>auxiliar</strong> nos estudos, mas ele não substitui materiais oficiais, cursos ou simulados diretamente
              aplicados pelo Detran.
            </p>

            <p className="text-gray-700 dark:text-white mt-2">
              Os usuários são encorajados a consultar fontes oficiais para garantir que possuem as informações mais
              atualizadas e corretas antes de realizar o exame teórico.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
