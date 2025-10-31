// src/components/CallTracking.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface CallTrackingNumbers {
  default: string;
  google: string;
  facebook: string;
  linkedin: string;
  organic: string;
  direct: string;
}

// Dynamic phone numbers based on traffic source
const TRACKING_NUMBERS: CallTrackingNumbers = {
  default: '+90 552 567 71 64',
  google: '+90 552 567 71 65',    // For Google Ads traffic
  facebook: '+90 552 567 71 66',   // For Meta Ads traffic
  linkedin: '+90 552 567 71 67',   // For LinkedIn Ads traffic
  organic: '+90 552 567 71 68',    // For organic search
  direct: '+90 552 567 71 64',     // For direct traffic
};

export function useCallTracking(): string {
  const [phoneNumber, setPhoneNumber] = useState(TRACKING_NUMBERS.default);
  const pathname = usePathname();

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const gclid = urlParams.get('gclid'); // Google Ads
    const fbclid = urlParams.get('fbclid'); // Facebook Ads
    const referrer = document.referrer;

    // Determine phone number based on traffic source
    let selectedNumber = TRACKING_NUMBERS.default;

    if (gclid || utmSource === 'google' || utmMedium === 'cpc') {
      selectedNumber = TRACKING_NUMBERS.google;
    } else if (fbclid || utmSource === 'facebook' || utmSource === 'instagram') {
      selectedNumber = TRACKING_NUMBERS.facebook;
    } else if (utmSource === 'linkedin') {
      selectedNumber = TRACKING_NUMBERS.linkedin;
    } else if (referrer.includes('google.') && !gclid) {
      selectedNumber = TRACKING_NUMBERS.organic;
    } else if (!referrer || referrer === '') {
      selectedNumber = TRACKING_NUMBERS.direct;
    }

    setPhoneNumber(selectedNumber);

    // Store in session for consistency
    sessionStorage.setItem('tracking_number', selectedNumber);
  }, [pathname]);

  return phoneNumber;
}

export default function CallTracking() {
  return null; // This is just a hook provider
}