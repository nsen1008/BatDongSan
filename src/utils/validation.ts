import type { LeadFieldErrors } from '../types/lead';

/** Accepts 0xxxxxxxxx, 84xxxxxxxxx and +84xxxxxxxxx with spaces, dots or dashes. */
export function isValidVietnamesePhone(raw: string): boolean {
  const digits = raw.replace(/[\s.\-()]/g, '');
  return /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/.test(digits);
}

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s.\-()]/g, '');
  if (digits.startsWith('+84')) return `0${digits.slice(3)}`;
  if (digits.startsWith('84')) return `0${digits.slice(2)}`;
  return digits;
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
}

export function validateLead(values: {
  fullName: string;
  phone: string;
  email: string;
  preferredTime: string;
}): LeadFieldErrors {
  const errors: LeadFieldErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Vui lòng nhập họ và tên.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại.';
  } else if (!isValidVietnamesePhone(values.phone)) {
    errors.phone = 'Số điện thoại chưa đúng định dạng Việt Nam.';
  }
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = 'Email chưa hợp lệ.';
  }
  if (!values.preferredTime.trim()) {
    errors.preferredTime = 'Vui lòng chọn thời gian mong muốn.';
  }

  return errors;
}