import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AlertLegalNotice } from '@/components/AlertLegalNotice';
import { ToastProvider } from '@/state/provider/ToastProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Simulado Detran SP',
  description: `A aplicação tem como objetivo simular a prova teórica do Detran, 
  permitindo que usuários pratiquem questões oficiais e testem seus conhecimentos
  sobre legislação de trânsito, direção defensiva, primeiros socorros e mecânica 
  básica. O sistema oferecerá uma experiência similar à prova oficial, ajudando 
  candidatos a se prepararem de maneira eficaz.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
        <AlertLegalNotice />
      </body>
    </html>
  );
}
