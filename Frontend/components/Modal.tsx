
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md max-h-[90vh] bg-white dark:bg-surface-dark rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-border-dark shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-border-dark flex justify-between items-center bg-slate-50 dark:bg-background-dark/50 shrink-0">
          <h3 className="font-black text-xs sm:text-sm uppercase tracking-widest dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
          </button>
        </div>
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
