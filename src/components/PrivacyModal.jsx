import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={onClose} 
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col font-sans"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="relative w-full p-8 md:p-12 shrink-0 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-4 mb-4">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                <h2 className="text-3xl font-black text-white tracking-tight">Privacy Policy</h2>
              </div>
              <p className="text-slate-400 text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12 text-slate-300 space-y-8 leading-relaxed">
              <section>
                <h3 className="text-xl font-bold text-white mb-3">1. Information We Collect</h3>
                <p>
                  When you use the contact form on this portfolio website, we collect the personal information you provide, including your Name, Email Address, and the content of your Message. We do not collect any highly sensitive data.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">2. How We Use Your Information</h3>
                <p>
                  The information collected is used solely for the purpose of responding to your inquiries, providing requested information, or establishing professional communication. Your data will never be sold, rented, or shared with unauthorized third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">3. Data Protection and Security</h3>
                <p>
                  We implement industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. Transmission of data over the internet is never 100% secure, but we prioritize safeguarding your communications.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">4. Third-Party Services & reCAPTCHA</h3>
                <p>
                  This site is protected by Google reCAPTCHA to prevent spam and abuse. By using the contact form, you acknowledge that the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Terms of Service</a> apply. Hardware and software information (such as device and application data) may be collected by Google to provide this security service.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">5. User Rights (GDPR & CCPA Compliance)</h3>
                <p>
                  In accordance with modern data protection regulations, you have the right to request access to the data you have submitted, request corrections, or request deletion of your data from our systems. If you have subscribed to any communications, you may request to be unsubscribed at any time.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-3">6. Contact Us</h3>
                <p>
                  If you have any questions or concerns about this Privacy Policy or the handling of your data, please use the contact form provided on this website.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
