export interface Lead {
  fullName: string;
  phone: string;
  email?: string;
  preferredTime: string;
  note?: string;
  /** Where on the page the lead was captured — useful for CRM attribution. */
  source: string;
  submittedAt: string;
}

export type LeadFieldErrors = Partial<Record<'fullName' | 'phone' | 'email' | 'preferredTime', string>>;

export type LeadFormStatus = 'idle' | 'submitting' | 'success' | 'error';