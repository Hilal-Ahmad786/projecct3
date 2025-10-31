// src/components/FloatingButtons.tsx
'use client';

import { useState } from 'react';
import { PhoneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { trackWhatsAppClick, trackPhoneCall, trackChatOpen } from '@/lib/analytics';

export default function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  
  const { locale, dir } = useTranslations();
  const t = useSectionTranslations('floatingButtons');

  const phoneNumber = '+905525677164';
  const whatsappNumber = '905525677164';

  const quickQuestions = [
    {
      id: 1,
      question: t('questions.webDev'),
      message: t('messages.webDev')
    },
    {
      id: 2,
      question: t('questions.mobileApp'),
      message: t('messages.mobileApp')
    },
    {
      id: 3,
      question: t('questions.aiSolutions'),
      message: t('messages.aiSolutions')
    },
    {
      id: 4,
      question: t('questions.automation'),
      message: t('messages.automation')
    },
    {
      id: 5,
      question: t('questions.pricing'),
      message: t('messages.pricing')
    },
    {
      id: 6,
      question: t('questions.support'),
      message: t('messages.support')
    }
  ];

const handleWhatsApp = (message?: string) => {
  const finalMessage = message || t('defaultMessage');
  trackWhatsAppClick('floating_button', finalMessage);
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
  setShowChatDialog(false);
  setIsOpen(false);
};

const handleCall = () => {
  trackPhoneCall('floating_button');
  window.location.href = `tel:${phoneNumber}`;
  setIsOpen(false);
};

const handleChatClick = () => {
  trackChatOpen('floating_button');
  setShowChatDialog(true);
  setIsOpen(false);
};

  return (
    <>
      {/* Backdrop */}
      {(isOpen || showChatDialog) && (
        <div 
          className="fixed inset-0 bg-gray-900/20 z-40 transition-opacity"
          onClick={() => {
            setIsOpen(false);
            setShowChatDialog(false);
          }}
        />
      )}

      {/* Chat Dialog */}
      {showChatDialog && (
        <div 
          className={`fixed bottom-24 ${dir === 'rtl' ? 'left-6' : 'right-6'} w-80 bg-white rounded-lg shadow-lg z-50 
                     border border-gray-200 animate-scale-in`}
          dir={dir}
        >
          {/* Dialog Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{t('dialogTitle')}</h3>
                <p className="text-xs text-gray-500">{t('dialogSubtitle')}</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatDialog(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Quick Questions */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              {t('selectQuestion')}
            </p>
            <div className="space-y-2">
              {quickQuestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleWhatsApp(item.message)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 bg-gray-50 
                           hover:bg-gray-100 rounded-md transition-colors border border-gray-200 
                           hover:border-gray-300 group"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {item.question}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-transform 
                                 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Message Option */}
            <button
              onClick={() => handleWhatsApp()}
              className="w-full mt-3 px-4 py-3 text-sm font-medium text-white bg-gray-900 
                       hover:bg-gray-700 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4" />
              {t('customMessage')}
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Container */}
      <div className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 flex flex-col items-end gap-3`}>
        
        {/* Action Buttons */}
        <div className={`
          flex flex-col gap-3 transition-all duration-300 origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}>
          
          {/* WhatsApp Button */}
          <button
            onClick={() => handleWhatsApp()}
            className="group flex items-center gap-0 bg-white rounded-full shadow-soft hover:shadow-medium 
                       transition-all duration-250 overflow-hidden"
            aria-label="Contact via WhatsApp"
          >
            <span className={`px-4 py-2 text-sm font-medium text-gray-700 max-w-0 group-hover:max-w-xs 
                           transition-all duration-250 whitespace-nowrap overflow-hidden ${dir === 'rtl' ? 'order-2' : ''}`}>
              WhatsApp
            </span>
            <div className={`w-12 h-12 flex items-center justify-center bg-[#25D366] rounded-full 
                          group-hover:scale-110 transition-transform duration-250 flex-shrink-0 ${dir === 'rtl' ? 'order-1' : ''}`}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </button>

          {/* Call Button */}
          <button
            onClick={handleCall}
            className="group flex items-center gap-0 bg-white rounded-full shadow-soft hover:shadow-medium 
                       transition-all duration-250 overflow-hidden border border-gray-200 hover:border-gray-900"
            aria-label="Call us"
          >
            <span className={`px-4 py-2 text-sm font-medium text-gray-700 max-w-0 group-hover:max-w-xs 
                           transition-all duration-250 whitespace-nowrap overflow-hidden ${dir === 'rtl' ? 'order-2' : ''}`}>
              {t('call')}
            </span>
            <div className={`w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full 
                          group-hover:scale-110 transition-transform duration-250 flex-shrink-0 ${dir === 'rtl' ? 'order-1' : ''}`}>
              <PhoneIcon className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Chat Button */}
          <button
            onClick={handleChatClick}
            className="group flex items-center gap-0 bg-white rounded-full shadow-soft hover:shadow-medium 
                       transition-all duration-250 overflow-hidden border border-gray-200 hover:border-gray-300"
            aria-label="Start chat"
          >
            <span className={`px-4 py-2 text-sm font-medium text-gray-700 max-w-0 group-hover:max-w-xs 
                           transition-all duration-250 whitespace-nowrap overflow-hidden ${dir === 'rtl' ? 'order-2' : ''}`}>
              {t('chat')}
            </span>
            <div className={`w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full 
                          group-hover:scale-110 transition-transform duration-250 flex-shrink-0 ${dir === 'rtl' ? 'order-1' : ''}`}>
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-medium hover:shadow-lg
            flex items-center justify-center relative
            transition-all duration-300
            ${isOpen 
              ? 'bg-gray-900 rotate-45' 
              : 'bg-gray-900 hover:bg-gray-700 hover:scale-110'
            }
          `}
          aria-label={isOpen ? t('close') : t('open')}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <>
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
              {/* Notification Badge */}
              <div className={`absolute -top-1 ${dir === 'rtl' ? '-left-1' : '-right-1'} w-5 h-5 bg-red-500 rounded-full 
                            flex items-center justify-center animate-pulse`}>
                <span className="text-xs text-white font-bold">1</span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}