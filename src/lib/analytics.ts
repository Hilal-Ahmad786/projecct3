export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    });
  }
};


export const trackEmailClick = (source: string) => {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'email_click',
    source: source,
    button_location: source
  });
};

export const trackEvent = (eventName: string, params?: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

export const trackWhatsAppClick = (source: string, message?: string) => {
  trackEvent('whatsapp_click', { source, message });
};

export const trackPhoneCall = (source: string) => {
  trackEvent('phone_call', { source });
};

export const trackChatOpen = (source: string) => {
  trackEvent('chat_open', { source });
};

export const trackQuoteRequest = (source: string) => {
  trackEvent('quote_request', { source });
};

export const trackFormSubmit = (formType: string, source: string) => {
  trackEvent('form_submit', { formType, source });
};

export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', { from: fromLang, to: toLang });
};
