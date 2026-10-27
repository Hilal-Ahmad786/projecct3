// Routine visitor tracking written to Postgres (AnalyticsEvent rows for every
// pageview and heatmap click batch) is OFF unless ANALYTICS_DB_TRACKING=1.
//
// Why: those writes arrived every few minutes around the clock (bots render
// the tracker too), so the Neon compute never scaled to zero and burned the
// Free plan's monthly compute allowance (Oct 2026: 110 CU-hrs, ~90% awake).
// GA4 / Clarity still cover traffic analytics. Lead-intent events (WhatsApp,
// phone, chat via /api/tracking), contact forms and notifications are NOT
// affected. Existing AnalyticsEvent rows are kept; the admin traffic and
// heatmap views simply receive no new rows while this is off.
//
// To restore: set ANALYTICS_DB_TRACKING=1 in the Vercel env and redeploy (the
// [locale] layout reads it at build/render time to mount HeatmapTracker).
export function isDbTrackingEnabled(): boolean {
  return process.env.ANALYTICS_DB_TRACKING === '1';
}
