// src/components/Analytics.tsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

// Only import if the file exists
let trackPageView: any;
try {
  const analytics = require('@/lib/analytics');
  trackPageView = analytics.trackPageView;
} catch {
  trackPageView = (url: string, title: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: url,
        page_title: title,
      });
    }
  };
}

// Only use env vars — no fallback placeholder values
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const GOOGLE_OPTIMIZE_ID = process.env.NEXT_PUBLIC_GOOGLE_OPTIMIZE_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;

// Must match CookieConsent.tsx
const COOKIE_CONSENT_KEY = 'paksoft_cookie_consent';

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

function readStoredConsent(): ConsentPreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.preferences ?? null;
  } catch {
    return null;
  }
}

// Google Consent Mode v2: keep gtag loaded (conversion modeling still works),
// but deny storage until the visitor consents.
function pushGoogleConsentUpdate(prefs: ConsentPreferences) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  function gtag(...args: any[]) { w.dataLayer.push(args); }
  gtag('consent', 'update', {
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
  });
}

function useCookieConsent(): ConsentPreferences | null {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      pushGoogleConsentUpdate(stored);
    }

    const onUpdate = (event: Event) => {
      const prefs = (event as CustomEvent<ConsentPreferences>).detail;
      if (prefs) {
        setConsent(prefs);
        pushGoogleConsentUpdate(prefs);
      }
    };
    window.addEventListener('cookieConsentUpdated', onUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', onUpdate);
  }, []);

  return consent;
}

// Separate component for page tracking
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url, document.title);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  const consent = useCookieConsent();
  const analyticsAllowed = consent?.analytics === true;
  const marketingAllowed = consent?.marketing === true;

  return (
    <>
      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      )}

      {/* Google Analytics 4 + Google Ads (Consent Mode v2: storage denied by default) */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Consent Mode v2 defaults — denied until the cookie banner grants them.
                gtag('consent', 'default', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  analytics_storage: 'denied',
                  wait_for_update: 500
                });

                gtag('js', new Date());

                // Google Analytics 4 Configuration
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });

                ${GOOGLE_ADS_ID ? `
                // Google Ads — conversion tracking + remarketing.
                // The config call auto-sends a page_view for remarketing audiences;
                // conversions are fired from lib/analytics.ts (gtag 'conversion').
                gtag('config', '${GOOGLE_ADS_ID}', {
                  allow_enhanced_conversions: true
                });
                ` : ''}
              `
            }}
          />
        </>
      )}

      {/* Google Optimize */}
      {GOOGLE_OPTIMIZE_ID && analyticsAllowed && (
        <Script
          src={`https://www.googleoptimize.com/optimize.js?id=${GOOGLE_OPTIMIZE_ID}`}
          strategy="lazyOnload"
        />
      )}

      {/* Facebook Pixel — only after marketing consent */}
      {FB_PIXEL_ID && marketingAllowed && (
        <Script
          id="fb-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `
          }}
        />
      )}

      {/* LinkedIn Insight Tag — only after marketing consent */}
      {LINKEDIN_PARTNER_ID && marketingAllowed && (
        <>
          <Script
            id="linkedin-insight"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              `
            }}
          />
          <Script
            id="linkedin-insight-script"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                (function(l) {
                  if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                  window.lintrk.q=[]}
                  var s = document.getElementsByTagName("script")[0];
                  var b = document.createElement("script");
                  b.type = "text/javascript";b.async = true;
                  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                  s.parentNode.insertBefore(b, s);
                })(window.lintrk);
              `
            }}
          />
        </>
      )}

      {/* TikTok Pixel — only after marketing consent */}
      {TIKTOK_PIXEL_ID && marketingAllowed && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('${TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `
          }}
        />
      )}

      {/* Microsoft Clarity — only after analytics consent */}
      {CLARITY_ID && analyticsAllowed && (
        <Script
          id="clarity-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `
          }}
        />
      )}

      {/* Hotjar — only after analytics consent */}
      {HOTJAR_ID && analyticsAllowed && (
        <Script
          id="hotjar"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:'${HOTJAR_ID}',hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }}
        />
      )}

      {/* GTM Noscript */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}

      {/* Page tracking wrapped in Suspense */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}
