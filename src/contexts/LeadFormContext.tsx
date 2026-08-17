import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface LeadFormState {
  isOpen: boolean;
  source: string;
  open: (source: string) => void;
  close: () => void;
}

const LeadFormContext = createContext<LeadFormState | null>(null);

export function LeadFormProvider({ children }: {children: React.ReactNode;}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('unknown');

  const open = useCallback((nextSource: string) => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, source, open, close }), [isOpen, source, open, close]);

  return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm(): LeadFormState {
  const context = useContext(LeadFormContext);
  if (!context) throw new Error('useLeadForm must be used inside <LeadFormProvider>');
  return context;
}