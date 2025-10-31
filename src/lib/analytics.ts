// src/lib/analytics.ts

// Event types for tracking
export type ConversionEvent = 
  | 'page_view'
  | 'contact_form_submit'
  | 'whatsapp_click'
  | 'phone_call'
  | 'chat_open'
  | 'quote_request'
  | 'service_inquiry'
  | 'email_click'
  | 'cta_click'
  | 'language_change'
  | 'navigation_click';

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  source?: string;
  button_location?: string;
  service_type?: string;
  language?: string;
  page_path?: string;
  [key: string]: any;
}

// Google Analytics 4 Event Tracking
export const trackEvent = (eventName: ConversionEvent, params?: EventParams) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  
  // Also send to dataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params);
  }
};

// Facebook Pixel Event Tracking
export const trackFacebookEvent = (eventName: string, params?: any) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
};

// Combined tracking for conversions
export const trackConversion = (
  eventName: ConversionEvent,
  params: EventParams
) => {
  // Track in GA4
  trackEvent(eventName, params);

  // Track in Facebook Pixel (map to standard events)
  const fbEventMap: Record<string, string> = {
    'contact_form_submit': 'Contact',
    'whatsapp_click': 'Contact',
    'phone_call': 'Contact',
    'quote_request': 'Lead',
    'service_inquiry': 'Lead',
    'chat_open': 'InitiateCheckout',
  };

  if (fbEventMap[eventName]) {
    trackFacebookEvent(fbEventMap[eventName], params);
  }
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (source: string, message?: string) => {
  trackConversionAllPlatforms('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'whatsapp_click',
    source: source,
    button_location: source,
    message_type: message ? 'preset' : 'custom'
  });
};

// Track phone calls
export const trackPhoneCall = (source: string) => {
  trackConversionAllPlatforms('phone_call', {
    event_category: 'engagement',
    event_label: 'phone_call',
    source: source,
    button_location: source,
    value: 1
  });
};

// Track chat opens
export const trackChatOpen = (source: string) => {
  trackConversionAllPlatforms('chat_open', {
    event_category: 'engagement',
    event_label: 'chat_open',
    source: source,
    button_location: source
  });
};

// Track quote requests
export const trackQuoteRequest = (source: string) => {
  trackConversionAllPlatforms('quote_request', {
    event_category: 'conversion',
    event_label: 'quote_request',
    source: source,
    button_location: source,
    value: 10
  });
};

// Track form submissions
export const trackFormSubmit = (formType: string, source: string) => {
  trackConversionAllPlatforms('contact_form_submit', {
    event_category: 'conversion',
    event_label: formType,
    source: source,
    form_type: formType,
    value: 15
  });
};

// Track CTA clicks
export const trackCTAClick = (ctaText: string, source: string, destination: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaText,
    source: source,
    destination: destination,
    button_location: source
  });
};

// Track email clicks
export const trackEmailClick = (source: string) => {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: 'email_click',
    source: source,
    button_location: source
  });
};

// Track language changes
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: 'language_switch',
    from_language: fromLang,
    to_language: toLang
  });
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  trackEvent('page_view', {
    page_path: url,
    page_title: title
  });
};


// LinkedIn Conversion Tracking
export const trackLinkedInConversion = (conversionId: string) => {
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: conversionId });
  }
};

// TikTok Event Tracking
export const trackTikTokEvent = (eventName: string, params?: any) => {
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track(eventName, params);
  }
};

// Enhanced conversion tracking for all platforms
export const trackConversionAllPlatforms = (
  eventName: ConversionEvent,
  params: EventParams
) => {
  // Track in GA4
  trackEvent(eventName, params);

  // Track in Facebook Pixel
  const fbEventMap: Record<string, string> = {
    'contact_form_submit': 'Contact',
    'whatsapp_click': 'Contact',
    'phone_call': 'Contact',
    'quote_request': 'Lead',
    'service_inquiry': 'Lead',
    'chat_open': 'InitiateCheckout',
  };

  if (fbEventMap[eventName]) {
    trackFacebookEvent(fbEventMap[eventName], params);
  }

  // Track in TikTok Pixel
  const tiktokEventMap: Record<string, string> = {
    'contact_form_submit': 'SubmitForm',
    'whatsapp_click': 'Contact',
    'phone_call': 'Contact',
    'quote_request': 'SubmitForm',
    'service_inquiry': 'ViewContent',
  };

  if (tiktokEventMap[eventName]) {
    trackTikTokEvent(tiktokEventMap[eventName], params);
  }

  // Track B2B conversions in LinkedIn for relevant events
  if (['quote_request', 'contact_form_submit', 'service_inquiry'].includes(eventName)) {
    // You'll need to set up conversion IDs in LinkedIn Campaign Manager
    // Example: trackLinkedInConversion('XXXXXXX');
  }
};
