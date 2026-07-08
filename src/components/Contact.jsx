import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../lib/validation';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const Contact = ({ openPrivacyModal }) => {
  const ref = useRef(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const [permissionGranted, setPermissionGranted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const onSubmit = async (data) => {
    if (!permissionGranted) {
      toast.error("Please grant permission to contact you.", { icon: '⚠️' });
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast.success(result.message || 'Your message has been sent successfully.', {
          icon: '✅',
          style: { border: '1px solid #10b981', color: '#10b981' },
        });
        reset(); // Clear the form
        setPermissionGranted(false);
      } else {
        toast.error(result.message || 'Unable to send your message. Please try again.', {
          icon: '❌',
          style: { border: '1px solid #ef4444', color: '#ef4444' },
        });
      }
    } catch (error) {
      console.error("Submission transmission error:", error);
      toast.error('Network error. Unable to connect to server.', {
        icon: '🔌',
        style: { border: '1px solid #ef4444', color: '#ef4444' },
      });
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top flex items-center"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }} className="inline-block w-[12vw] h-[18vw] bg-emerald-500 ml-[2vw] align-text-bottom opacity-80" />
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between rounded-[2rem] shadow-2xl"
        >
          <div className="text-xs font-bold tracking-[0.2em] mb-12 md:mb-20 uppercase opacity-90 text-emerald-400">
            Reach Us
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12 md:gap-16 w-full group/form">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                
                {/* Name */}
                <div className="relative">
                  <input 
                    {...register('name')}
                    type="text" 
                    placeholder="Full Name" 
                    className={`w-full bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors placeholder-slate-500 font-medium rounded-none ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-500'}`}
                  />
                  {errors.name && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="relative">
                  <input 
                    {...register('email')}
                    type="email" 
                    placeholder="Email Address" 
                    className={`w-full bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors placeholder-slate-500 font-medium rounded-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-500'}`}
                  />
                  {errors.email && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
                </div>

                {/* Subject */}
                <div className="relative">
                  <input 
                    {...register('subject')}
                    type="text" 
                    placeholder="Subject" 
                    className={`w-full bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors placeholder-slate-500 font-medium rounded-none ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-500'}`}
                  />
                  {errors.subject && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{errors.subject.message}</span>}
                </div>

              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col">
                  <textarea 
                    {...register('message')}
                    placeholder="Type your message here (min 20 characters)" 
                    className={`w-full h-full min-h-[120px] bg-transparent border-b pb-3 text-lg focus:outline-none transition-colors placeholder-slate-500 font-medium resize-none rounded-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-white/20 focus:border-emerald-500'}`}
                  />
                  {errors.message && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">{errors.message.message}</span>}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-white/90">
                <input 
                  type="checkbox" 
                  id="permission" 
                  checked={permissionGranted}
                  onChange={(e) => setPermissionGranted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-white cursor-pointer" 
                  style={{ accentColor: "#10b981" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-white/70 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by reCAPTCHA and the Google <button type="button" onClick={(e) => { e.preventDefault(); openPrivacyModal(); }} className="underline hover:text-white transition-colors cursor-pointer text-emerald-500/70">Privacy Policy</button> and <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors text-emerald-500/70">Terms of Service</a> apply.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For information on how to unsubscribe, please review our <button type="button" onClick={(e) => { e.preventDefault(); openPrivacyModal(); }} className="underline hover:text-white transition-colors cursor-pointer text-emerald-500/70">privacy policy</button>.
                  </p>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full border border-emerald-500 text-emerald-400 font-bold flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-black transition-all duration-300 group whitespace-nowrap self-start sm:self-auto hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        Sending...
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;