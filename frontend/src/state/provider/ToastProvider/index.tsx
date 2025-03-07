"use client"

import { ReactNode, useCallback, useState } from 'react';
import Toast from '@/components/Toast';
import ToastPropsInterface from '@/components/Toast/ToastPropsInterface';
import ToastTypeEnum from '@/components/Toast/ToastTypeEnum';
import { ToastContext } from '../../context/ToastContext';
import { v4 as uuidv4 } from "uuid";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastPropsInterface[]>([]);

  const showToast = useCallback((type: ToastTypeEnum, message: string) => {
    const id = uuidv4();
    setToasts((prev) => [
      ...prev,
      { id, type, message }
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.map(toast =>
        toast.id === id ? { ...toast, fading: true } : toast
      ));
   
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300); 
    }, 3000);
  }, []);

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );

}
