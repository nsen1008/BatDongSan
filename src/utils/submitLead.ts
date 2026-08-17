import { project } from '../data/project';
import type { Lead } from '../types/lead';

/**
 * A lead adapter is the only integration point with the outside world.
 * Swap in a CRM, webhook, Google Sheets, email service or backend by
 * calling `setLeadAdapter(myAdapter)` once at app start — no UI changes needed.
 */
export type LeadAdapter = (lead: Lead) => Promise<void>;

const isPlaceholder = (value: string) => !value || value.trim().startsWith('[');

/** Default adapter: POSTs to `project.formEndpoint` when a real endpoint is configured. */
const httpAdapter: LeadAdapter = async (lead) => {
  const response = await fetch(project.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead)
  });
  if (!response.ok) {
    throw new Error(`Lead endpoint responded with ${response.status}`);
  }
};

/** Fallback adapter used until a real endpoint is configured. */
const consoleAdapter: LeadAdapter = async (lead) => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  // eslint-disable-next-line no-console
  console.info('[lead] captured (no endpoint configured yet):', lead);
};

let adapter: LeadAdapter = isPlaceholder(project.formEndpoint) ? consoleAdapter : httpAdapter;

export function setLeadAdapter(next: LeadAdapter): void {
  adapter = next;
}

export function submitLead(lead: Lead): Promise<void> {
  return adapter(lead);
}