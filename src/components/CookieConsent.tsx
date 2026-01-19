'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CookieConsentProps {
  privacyPolicyUrl?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = 'paksoft_cookie_consent';

export default function CookieConsent({
  privacyPolicyUrl = '/privacy-policy',
  onAccept,
  onDecline,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has been given
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(fullConsent);
    onAccept?.();
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    if (preferences.analytics || preferences.marketing) {
      onAccept?.();
    } else {
      onDecline?.();
    }
  };

  const handleDecline = () => {
    const minimalConsent: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(minimalConsent);
    onDecline?.();
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);

    // Dispatch event for analytics setup
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
        detail: prefs
      }));
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {!showPreferences ? (
              // Main banner
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-sm text-gray-600">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                      By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                      <Link href={privacyPolicyUrl} className="text-gray-900 underline hover:no-underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Customize
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Preferences panel
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary cookies */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Necessary Cookies</p>
                      <p className="text-sm text-gray-500">Required for the website to function properly</p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="sr-only"
                      />
                      <div className="w-10 h-6 bg-gray-300 rounded-full">
                        <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-5 translate-y-1" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium text-gray-900">Analytics Cookies</p>
                      <p className="text-sm text-gray-500">Help us understand how visitors use our site</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-gray-900' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                        preferences.analytics ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {/* Marketing cookies */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Cookies</p>
                      <p className="text-sm text-gray-500">Used to deliver relevant advertisements</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-gray-900' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-y-1 ${
                        preferences.marketing ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
