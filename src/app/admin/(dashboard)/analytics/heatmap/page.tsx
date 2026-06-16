'use client';

// Click heatmap ("sıcak haritası") — shows where visitors click on each page.
// Renders the live page in a same-origin iframe and paints accumulated click
// density on a canvas overlay (blue → red intensity ramp).

import { useCallback, useEffect, useRef, useState } from 'react';
import { FireIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface PageRow { page: string; clicks: number }
interface Point { x: number; y: number; tag: string | null }

const DAYS = [7, 30, 90];
const DEVICES = ['all', 'Desktop', 'Mobile', 'Tablet'];

// Paint points onto the canvas as a classic heatmap.
function paintHeat(canvas: HTMLCanvasElement, points: Point[], radius = 26) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width: w, height: h } = canvas;
  ctx.clearRect(0, 0, w, h);
  if (!points.length) return;

  // 1) accumulate greyscale alpha blobs
  ctx.globalCompositeOperation = 'lighter';
  for (const p of points) {
    const x = p.x * w, y = p.y * h;
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, 'rgba(0,0,0,0.18)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // 2) recolor by accumulated alpha via a gradient ramp
  const ramp = (() => {
    const c = document.createElement('canvas'); c.width = 1; c.height = 256;
    const g = c.getContext('2d')!; const grad = g.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#0b1d52'); grad.addColorStop(0.35, '#1f7ae0');
    grad.addColorStop(0.55, '#22c1c3'); grad.addColorStop(0.7, '#7ed957');
    grad.addColorStop(0.85, '#f2c037'); grad.addColorStop(1.0, '#e0331c');
    g.fillStyle = grad; g.fillRect(0, 0, 1, 256);
    return g.getImageData(0, 0, 1, 256).data;
  })();

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3];
    if (a === 0) continue;
    const off = Math.min(255, a) * 4;
    d[i] = ramp[off]; d[i + 1] = ramp[off + 1]; d[i + 2] = ramp[off + 2];
    d[i + 3] = Math.min(210, a + 40);
  }
  ctx.putImageData(img, 0, 0);
}

export default function HeatmapPage() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [page, setPage] = useState<string>('');
  const [days, setDays] = useState(30);
  const [device, setDevice] = useState('all');
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);
  const [frameH, setFrameH] = useState(1400);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // load page list
  useEffect(() => {
    fetch(`/api/admin/analytics/heatmap?days=${days}`)
      .then(r => r.json())
      .then(d => {
        if (!d.success) return;
        setPages(d.data);
        setPage(prev => prev || (d.data[0]?.page ?? ''));
      })
      .catch(() => {});
  }, [days]);

  // load points for the selected page
  const loadPoints = useCallback(() => {
    if (!page) return;
    setLoading(true);
    fetch(`/api/admin/analytics/heatmap?page=${encodeURIComponent(page)}&days=${days}&device=${device}`)
      .then(r => r.json())
      .then(d => setPoints(d.success ? d.data.points : []))
      .catch(() => setPoints([]))
      .finally(() => setLoading(false));
  }, [page, days, device]);

  useEffect(() => { loadPoints(); }, [loadPoints]);

  // size the canvas to the wrapper and repaint
  const repaint = useCallback(() => {
    const cv = canvasRef.current, wrap = wrapRef.current;
    if (!cv || !wrap) return;
    cv.width = wrap.clientWidth;
    cv.height = frameH;
    paintHeat(cv, points);
  }, [points, frameH]);

  useEffect(() => { repaint(); }, [repaint]);
  useEffect(() => {
    const onResize = () => repaint();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [repaint]);

  // when the iframe loads, match its content height (same-origin)
  const onFrameLoad = () => {
    try {
      const doc = iframeRef.current?.contentDocument;
      const h = doc?.documentElement?.scrollHeight;
      if (h && h > 200) setFrameH(h);
    } catch { /* cross-origin / blocked — keep default height */ }
  };

  const iframeSrc = page ? `/en${page === '/' ? '' : page}` : 'about:blank';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <FireIcon className="w-7 h-7 text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-900">Click Heatmap</h1>
        <span className="text-sm text-gray-500">— sıcak haritası</span>
      </div>
      <p className="text-gray-500 text-sm mb-6">Where visitors actually click. Pick a page; warmer = more clicks.</p>

      {/* controls */}
      <div className="flex flex-wrap items-end gap-3 mb-5">
        <label className="flex flex-col text-xs font-medium text-gray-600">
          Page
          <select value={page} onChange={e => setPage(e.target.value)} className="mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm min-w-[280px]">
            {pages.length === 0 && <option value="">No click data yet</option>}
            {pages.map(p => <option key={p.page} value={p.page}>{p.page}  ({p.clicks})</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-gray-600">
          Range
          <select value={days} onChange={e => setDays(Number(e.target.value))} className="mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
            {DAYS.map(d => <option key={d} value={d}>Last {d} days</option>)}
          </select>
        </label>
        <label className="flex flex-col text-xs font-medium text-gray-600">
          Device
          <select value={device} onChange={e => setDevice(e.target.value)} className="mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm">
            {DEVICES.map(d => <option key={d} value={d}>{d === 'all' ? 'All devices' : d}</option>)}
          </select>
        </label>
        <button onClick={loadPoints} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
        <div className="ml-auto text-sm text-gray-500 self-center">
          {loading ? 'Loading…' : `${points.length.toLocaleString()} clicks`}
        </div>
      </div>

      {/* legend */}
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <span>Low</span>
        <span className="h-2 w-40 rounded-full" style={{ background: 'linear-gradient(90deg,#0b1d52,#1f7ae0,#22c1c3,#7ed957,#f2c037,#e0331c)' }} />
        <span>High</span>
      </div>

      {/* page + overlay */}
      {pages.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-16 text-center text-gray-400">
          No clicks recorded yet. Browse the public site, then come back — data appears within seconds.
        </div>
      ) : (
        <div ref={wrapRef} className="relative w-full border border-gray-200 rounded-xl overflow-hidden bg-white" style={{ height: frameH }}>
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            onLoad={onFrameLoad}
            title="Page preview"
            className="absolute inset-0 w-full"
            style={{ height: frameH, border: 0 }}
          />
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: frameH }} />
        </div>
      )}
    </div>
  );
}
