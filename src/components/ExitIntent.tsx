'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitIntentProps {
  title?: string;
  subtitle?: string;
  offerText?: string;
  ctaText?: string;
  ctaUrl?: string;
  onSubmit?: (email: string) => void;
  showEmailCapture?: boolean;
  delay?: number;
  cooldownDays?: number;
}

const EXIT_INTENT_KEY = 'paksoft_exit_intent_shown';

export default function ExitIntent({
  title = "Wait! Don't leave yet",
  subtitle = "Get a free consultation for your project",
  offerText = "Schedule a 30-minute call with our experts and receive a detailed project roadmap - absolutely free!",
  ctaText = "Get My Free Consultation",
  ctaUrl = "/contact",
  onSubmit,
  showEmailCapture = true,
  delay = 0,
  cooldownDays = 7,
}: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showPopup = useCallback(() => {
    // Check cooldown
    const lastShown = localStorage.getItem(EXIT_INTENT_KEY);
    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < cooldownDays) return;
    }

    setIsVisible(true);
    localStorage.setItem(EXIT_INTENT_KEY, Date.now().toString());
  }, [cooldownDays]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 0) {
        if (delay > 0) {
          timeout = setTimeout(showPopup, delay);
        } else {
          showPopup();
        }
      }
    };

    // Add listener after a short delay to prevent immediate trigger
    const initTimeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(timeout);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay, showPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default: send to contact API
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: 'Exit Intent Lead',
            subject: 'Free Consultation Request',
            message: 'User requested free consultation via exit intent popup.',
          }),
        });
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-10 text-white text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-300">{subtitle}</p>
                  </div>

                  {/* Content */}
                  <div className="px-8 py-6">
                    <p className="text-gray-600 text-center mb-6">{offerText}</p>

                    {showEmailCapture ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : ctaText}
                        </button>
                      </form>
                    ) : (
                      <a
                        href={ctaUrl}
                        className="block w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-center"
                      >
                        {ctaText}
                      </a>
                    )}

                    <p className="text-xs text-gray-500 text-center mt-4">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </div>
                </>
              ) : (
                /* Success state */
                <div className="px-8 py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re all set!</h3>
                  <p className="text-gray-600 mb-6">
                    We&apos;ll be in touch within 24 hours to schedule your free consultation.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
