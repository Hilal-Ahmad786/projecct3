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
  // WhatsApp click = a lead/contact conversion for a services business.
  trackEvent('whatsapp_click', { event_category: 'conversion', event_label: 'whatsapp_contact', source, message });
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'Contact');
  trackToServer('whatsapp_click', source, message);
};

export const trackPhoneCall = (source: string) => {
  trackEvent('phone_call', { event_category: 'conversion', event_label: 'phone_call', source });
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'Contact');
  trackToServer('phone_call', source);
};

export const trackChatOpen = (source: string) => {
  trackEvent('chat_open', { source });
  trackToServer('chat_open', source);
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

// ==========================================
// Google Ads Conversion Tracking Functions
// ==========================================

// No placeholder fallbacks: firing conversions at a fake "AW-XXXXXXXXXX" tag
// silently discards every conversion signal. When the env vars are unset we
// skip the Ads ping entirely (GA4 events below still fire).
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
const GOOGLE_ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || '';

/**
 * Track a Google Ads conversion
 * @param conversionLabel - The conversion label from Google Ads
 * @param value - Optional monetary value of the conversion
 * @param currency - Currency code (default: USD)
 */
export const trackGoogleAdsConversion = (
  conversionLabel: string,
  value?: number,
  currency: string = 'USD'
) => {
  if (!GOOGLE_ADS_ID || !conversionLabel) return;
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      value: value,
      currency: currency,
    });
  }
};

/**
 * Track contact form submission as Google Ads conversion
 */
export const trackContactFormConversion = (source: string = 'contact_page') => {
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  trackEvent('generate_lead', {
    event_category: 'conversion',
    event_label: 'contact_form_submission',
    source: source,
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead');
  }
  // LinkedIn
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: 'contact_form' });
  }
};

/**
 * Track quote request as Google Ads conversion
 */
export const trackQuoteConversion = (service: string, value?: number) => {
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID, value);
  trackEvent('request_quote', {
    event_category: 'conversion',
    event_label: 'quote_request',
    service: service,
    value: value,
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', { content_name: service, value: value });
  }
};

/**
 * Track phone call click as Google Ads conversion
 */
export const trackPhoneCallConversion = (source: string = 'website') => {
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  trackEvent('phone_call_click', {
    event_category: 'conversion',
    event_label: 'phone_call',
    source: source,
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact');
  }
};

/**
 * Track WhatsApp click as conversion
 */
export const trackWhatsAppConversion = (source: string = 'website', message?: string) => {
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: 'whatsapp_contact',
    source: source,
    message: message,
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact');
  }
};

/**
 * Track newsletter signup as conversion
 */
export const trackNewsletterSignup = (source: string = 'footer') => {
  trackGoogleAdsConversion(GOOGLE_ADS_CONVERSION_ID);
  trackEvent('newsletter_signup', {
    event_category: 'conversion',
    event_label: 'newsletter',
    source: source,
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Subscribe');
  }
};

/**
 * Track service page view (for remarketing)
 */
export const trackServiceView = (serviceName: string, serviceSlug: string) => {
  trackEvent('view_item', {
    event_category: 'engagement',
    items: [{
      item_id: serviceSlug,
      item_name: serviceName,
      item_category: 'service',
    }],
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: serviceName,
      content_category: 'service',
      content_ids: [serviceSlug],
    });
  }
};

/**
 * Track project/portfolio view (for remarketing)
 */
export const trackProjectView = (projectName: string, category: string) => {
  trackEvent('view_item', {
    event_category: 'engagement',
    items: [{
      item_name: projectName,
      item_category: category,
    }],
  });
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: projectName,
      content_category: category,
    });
  }
};

/**
 * Track scroll depth for engagement measurement
 */
export const trackScrollDepth = (depth: number, pagePath: string) => {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    page_path: pagePath,
    percent_scrolled: depth,
  });
};

/**
 * Track time on page for engagement measurement
 */
export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  trackEvent('timing_complete', {
    event_category: 'engagement',
    event_label: 'time_on_page',
    page_path: pagePath,
    value: seconds,
  });
};

// ==========================================
// Server-side tracking (fire-and-forget)
// ==========================================

const trackToServer = (eventType: string, source: string, message?: string) => {
  if (typeof window === 'undefined') return;
  try {
    const payload: Record<string, string> = {
      eventType,
      source,
      page: window.location.pathname,
      sessionId: getOrCreateSessionId(),
    };
    if (message) payload.message = message;

    // navigator.sendBeacon is preferred — it survives page navigations
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/tracking', blob);
    } else {
      fetch('/api/tracking', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Tracking should never break the app
  }
};

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  const key = 'pk_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}
