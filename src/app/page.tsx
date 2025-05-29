'use client';
'use client';
import images from '@/assets';
import { Button } from '@/components/Button';
import { FileText, /**Truck */ } from 'react-feather';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import packageJson from '@/../package.json';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  return (
    <main className="relative flex min-h-screen">
      <div className="absolute inset-0">
        <Image
          src={images.TransitImage.image}
          alt={images.TransitImage.altText}
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div
        className={`relative z-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        p-8 shadow-lg flex flex-col items-center justify-center text-center
        w-full h-screen
        md:w-3/5 md:h-screen md:rounded-r-3xl md:fixed md:left-0`}
      >
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex flex-col items-center justify-center flex-grow">
            <Header
              title="Simulado Detran SP"
              description="Prepare-se para a prova teórica do Detran com nosso simulado
              interativo."
            />

            <div className="flex flex-col gap-4 w-full max-w-sm">
              <Button
                variant="primary"
                icon={<FileText size={20} />}
                onClick={() => router.push('/simulado')}
              >
                Iniciar Simulado
              </Button>
              {/* <Button
                variant="primary"
                disabled
                icon={<Truck size={20} />}
                onClick={() => router.push('/pratica')}
              >
                Praticar por Categorias
              </Button> */}
            </div>
          </div>

          <footer className="w-full text-center text-gray-600 dark:text-gray-400 pb-4">
            <p>
              &copy; {new Date().getFullYear()} Simulado Detran SP | v
              {packageJson.version}
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
