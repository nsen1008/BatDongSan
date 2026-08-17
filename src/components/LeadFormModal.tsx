import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useLeadForm } from '../contexts/LeadFormContext';
import { project } from '../data/project';
import { submitLead } from '../utils/submitLead';
import { normalizePhone, validateLead } from '../utils/validation';
import type { LeadFieldErrors, LeadFormStatus } from '../types/lead';

const TIME_OPTIONS = [
'Trong tuần này',
'Cuối tuần này',
'Buổi sáng',
'Buổi chiều',
'Buổi tối',
'Linh hoạt — chuyên viên tư vấn sắp xếp'];


const emptyValues = { fullName: '', phone: '', email: '', preferredTime: '', note: '' };

const fieldClass =
'w-full border-b border-white/20 bg-transparent px-0 py-3 text-[15px] text-bone placeholder-white/30 transition-colors duration-200 ease-out focus:border-champagne focus:outline-none';

export function LeadFormModal() {
  const { isOpen, close, source } = useLeadForm();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>('idle');
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, input, select, textarea, a[href]'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) return;
    const timer = window.setTimeout(() => {
      setValues(emptyValues);
      setErrors({});
      setStatus('idle');
    }, 250);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const setField = useCallback((key: keyof typeof emptyValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitLead({
        fullName: values.fullName.trim(),
        phone: normalizePhone(values.phone),
        email: values.email.trim() || undefined,
        preferredTime: values.preferredTime,
        note: values.note.trim() || undefined,
        source,
        submittedAt: new Date().toISOString()
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen &&
      <motion.div
        className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
        
          <button
          type="button"
          aria-label="Đóng biểu mẫu"
          onClick={close}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm" />
        

          <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-form-title"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className="safe-bottom relative max-h-[92vh] w-full max-w-[620px] overflow-y-auto border border-white/10 bg-charcoal px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
          
            <button
            type="button"
            onClick={close}
            aria-label="Đóng"
            className="absolute right-5 top-5 text-white/50 transition-colors duration-200 ease-out hover:text-bone">
            
              <XIcon className="h-5 w-5" strokeWidth={1.25} />
            </button>

            {status === 'success' ?
          <div className="py-8 text-center">
                <p className="eyebrow text-champagne">Private viewing</p>
                <h2 id="lead-form-title" className="display mt-5 text-[clamp(30px,5vw,52px)]">
                  CẢM ƠN BẠN.
                </h2>
                <p className="mx-auto mt-5 max-w-[38ch] text-[15px] leading-relaxed text-white/60">
                  Chuyên viên tư vấn sẽ liên hệ để xác nhận lịch tham quan không gian thực tế.
                </p>
                <button
              type="button"
              onClick={close}
              className="mt-9 bg-bone px-10 py-4 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-200 ease-out hover:bg-champagne">
              
                  Đóng
                </button>
              </div> :

          <form onSubmit={handleSubmit} noValidate>
                <p className="eyebrow text-champagne">{project.name}</p>
                <h2 id="lead-form-title" className="display mt-4 text-[clamp(26px,4.2vw,40px)]">
                  ĐẶT LỊCH THAM QUAN RIÊNG
                </h2>
                <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-white/50">
                  Chỉ cần số điện thoại — chuyên viên sẽ liên hệ trong thời gian sớm nhất để sắp xếp buổi
                  tham quan.
                </p>

                <div className="mt-9 space-y-7">
                  <div>
                    <label htmlFor="lead-name" className="eyebrow text-white/40">
                      Họ và tên
                    </label>
                    <input
                  id="lead-name"
                  ref={firstFieldRef}
                  value={values.fullName}
                  onChange={(event) => setField('fullName', event.target.value)}
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'lead-name-error' : undefined}
                  className={fieldClass}
                  placeholder="Nguyễn Văn A" />
                
                    {errors.fullName &&
                <p id="lead-name-error" role="alert" className="mt-2 text-[12px] text-champagne">
                        {errors.fullName}
                      </p>
                }
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="eyebrow text-white/40">
                      Số điện thoại *
                    </label>
                    <input
                  id="lead-phone"
                  value={values.phone}
                  onChange={(event) => setField('phone', event.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
                  className={fieldClass}
                  placeholder="09xx xxx xxx" />
                
                    {errors.phone &&
                <p id="lead-phone-error" role="alert" className="mt-2 text-[12px] text-champagne">
                        {errors.phone}
                      </p>
                }
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label htmlFor="lead-email" className="eyebrow text-white/40">
                        Email (tuỳ chọn)
                      </label>
                      <input
                    id="lead-email"
                    value={values.email}
                    onChange={(event) => setField('email', event.target.value)}
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'lead-email-error' : undefined}
                    className={fieldClass}
                    placeholder="ten@email.com" />
                  
                      {errors.email &&
                  <p id="lead-email-error" role="alert" className="mt-2 text-[12px] text-champagne">
                          {errors.email}
                        </p>
                  }
                    </div>

                    <div>
                      <label htmlFor="lead-time" className="eyebrow text-white/40">
                        Thời gian mong muốn
                      </label>
                      <select
                    id="lead-time"
                    value={values.preferredTime}
                    onChange={(event) => setField('preferredTime', event.target.value)}
                    aria-invalid={Boolean(errors.preferredTime)}
                    aria-describedby={errors.preferredTime ? 'lead-time-error' : undefined}
                    className={`${fieldClass} appearance-none`}>
                    
                        <option value="" className="bg-charcoal">
                          Chọn thời gian
                        </option>
                        {TIME_OPTIONS.map((option) =>
                    <option key={option} value={option} className="bg-charcoal">
                            {option}
                          </option>
                    )}
                      </select>
                      {errors.preferredTime &&
                  <p id="lead-time-error" role="alert" className="mt-2 text-[12px] text-champagne">
                          {errors.preferredTime}
                        </p>
                  }
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-note" className="eyebrow text-white/40">
                      Ghi chú (tuỳ chọn)
                    </label>
                    <textarea
                  id="lead-note"
                  value={values.note}
                  onChange={(event) => setField('note', event.target.value)}
                  rows={2}
                  className={`${fieldClass} resize-none`}
                  placeholder="Loại căn quan tâm, thời điểm liên hệ..." />
                
                  </div>
                </div>

                {status === 'error' &&
            <p role="alert" className="mt-7 border border-champagne/40 px-4 py-3 text-[13px] text-champagne">
                    Không thể gửi thông tin lúc này. Vui lòng thử lại hoặc liên hệ {project.hotline}.
                  </p>
            }

                <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-9 w-full bg-bone px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-ink transition-colors duration-200 ease-out hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-60">
              
                  {status === 'submitting' ? 'Đang gửi…' : 'Đặt lịch xem nhà'}
                </button>

                <p className="mt-4 text-[11px] leading-relaxed text-white/30">
                  Thông tin của bạn được bảo mật và chỉ sử dụng để sắp xếp buổi tham quan.
                </p>
              </form>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}