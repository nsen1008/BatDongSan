import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, User, Phone, Mail, Building } from 'lucide-react';
import { EstateItem } from '../data/estateData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: EstateItem | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    note: selectedItem ? `Tôi quan tâm đến hạng mục: ${selectedItem.title}` : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // simulate submission
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-lg bg-[#0e0e0e] border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl text-white"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-[0.2em] mb-2">
                <Building className="w-3.5 h-3.5" />
                <span>PRMPT ESTATES VIP DESK</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                Đăng Ký Tham Quan Riêng
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Trải nghiệm thực tế kiến trúc độc bản cùng chuyên gia quản lý dinh thự riêng. Thông tin của quý khách được bảo mật tuyệt đối theo chuẩn quốc tế.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                    Họ và tên Quý Khách
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="090 123 4567"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                      Email bảo mật
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vip@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                    Ngày dự kiến tham quan
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1">
                    Yêu cầu đặc biệt & Ghi chú
                  </label>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Gửi hồ sơ mặt bằng chi tiết, phương án thanh toán..."
                    className="w-full p-3 bg-white/[0.05] border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-semibold text-sm rounded-lg hover:bg-neutral-200 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Xác Nhận Đăng Ký VIP</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white">Yêu Cầu Đã Được Tiếp Nhận</h3>
              <p className="text-sm text-neutral-300 max-w-sm mx-auto">
                Cảm ơn Quý Khách <strong>{formData.fullName}</strong>. Giám đốc quan hệ khách hàng VIP của PRMPT ESTATES sẽ liên hệ trong vòng 15 phút.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
