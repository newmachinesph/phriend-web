"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { Download, Film, Loader2, Upload } from "lucide-react";
import type { CreatorCard } from "@/lib/creator-card";

const W = 1080;
const H = 1920;
// TikTok / Reels chrome: top tabs, right action rail, bottom caption area
const SAFE = { top: 170, right: 160, bottom: 500 };
const C = { navy: "#0d2251", orange: "#fe6138", mango: "#ffb627", body: "#33405e", verify: "#1b6fe6", white: "#fff" };
const CARD = { w: 380, photo: 352, tagH: 26, below: 204 };
const SAMPLE_FRAME = "/groups/repairs.jpg";

type Place = "tl" | "tr" | "ml";
type Settings = { card: CreatorCard | null; tag: string; size: number; guides: boolean };

// Lucide paths (badge-check, star, map-pin, heart), same icons the app uses on its profile cards
const PATHS = {
  badge: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
  check: "m16 9-5.5 5.5L8 12",
  star: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
  pin: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
  heart: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
};

const loadImg = (src: string) =>
  new Promise<HTMLImageElement>((ok, err) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = err;
    i.src = src;
  });

function icon(ctx: CanvasRenderingContext2D, d: string, x: number, y: number, size: number, o: { fill?: string; stroke?: string; width?: number }) {
  const p = new Path2D(d);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.lineWidth = o.width ?? 2;
  ctx.lineCap = ctx.lineJoin = "round";
  if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(p); }
  if (o.stroke) { ctx.strokeStyle = o.stroke; ctx.stroke(p); }
  ctx.restore();
}
/** Shrinks the font until the text fits maxW (down to 14px), then cuts it with an ellipsis; returns the text to draw. */
function fitText(ctx: CanvasRenderingContext2D, text: string, maxW: number, font: (px: number) => string, size: number) {
  const min = Math.min(14, size);
  do ctx.font = font(size);
  while (ctx.measureText(text).width > maxW && --size > min);
  if (ctx.measureText(text).width <= maxW) return text;
  const chars = [...text];
  while (chars.length > 1 && ctx.measureText(`${chars.join("").trimEnd()}…`).width > maxW) chars.pop();
  return `${chars.join("").trimEnd()}…`;
}
function cover(ctx: CanvasRenderingContext2D, img: HTMLImageElement | HTMLVideoElement, x: number, y: number, w: number, h: number) {
  const iw = img instanceof HTMLVideoElement ? img.videoWidth : img.naturalWidth;
  const ih = img instanceof HTMLVideoElement ? img.videoHeight : img.naturalHeight;
  if (!iw || !ih) return;
  const s = Math.max(w / iw, h / ih);
  ctx.drawImage(img, (iw - w / s) / 2, (ih - h / s) / 2, w / s, h / s, x, y, w, h);
}
const cardSize = ({ size, tag }: Settings) => {
  const t = tag.trim() ? CARD.tagH : 0;
  return { w: CARD.w * size, h: (t + 14 + (CARD.photo * 4) / 3 + CARD.below) * size, t };
};

export function OverlayTool() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [card, setCard] = useState<CreatorCard | null>(null);
  const [tag, setTag] = useState("Win a free booking");
  const [size, setSize] = useState(0.9);
  const [guides, setGuides] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [recording, setRecording] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef<Settings>({ card: null, tag, size, guides });
  const pos = useRef({ x: 44, y: SAFE.top + 20 });
  const media = useRef<{ photo: HTMLImageElement | null; logo: HTMLImageElement | null; bg: HTMLImageElement | null; video: HTMLVideoElement | null; fonts: { display: string; sans: string } }>({
    photo: null, logo: null, bg: null, video: null, fonts: { display: "sans-serif", sans: "sans-serif" },
  });
  const isRecording = useRef(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    settings.current = { card, tag, size, guides };
  }, [card, tag, size, guides]);

  function drawCard(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const s = settings.current, c = s.card, m = media.current;
    if (!c) return;
    const { t } = cardSize(s);
    const display = (w: number) => (px: number) => `${w} ${px}px ${m.fonts.display}`;
    const sans = (w: number) => (px: number) => `${w} ${px}px ${m.fonts.sans}`;
    const pw = CARD.photo, ph = (pw * 4) / 3, w = CARD.w, h = t + 14 + ph + CARD.below;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s.size, s.size);

    ctx.save();
    ctx.shadowColor = "rgba(13,34,81,.35)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12;
    ctx.fillStyle = C.white; ctx.beginPath(); ctx.roundRect(0, t, w, h - t, 30); ctx.fill();
    ctx.restore();

    const py = t + 14;
    ctx.save(); ctx.beginPath(); ctx.roundRect(14, py, pw, ph, 22); ctx.clip();
    ctx.fillStyle = "#f4f6fb"; ctx.fillRect(14, py, pw, ph);
    if (m.photo) cover(ctx, m.photo, 14, py, pw, ph);
    ctx.restore();

    if (c.verified) {
      ctx.font = sans(800)(17); const tw = ctx.measureText("Verified").width;
      ctx.fillStyle = "rgba(255,255,255,.92)"; ctx.beginPath(); ctx.roundRect(26, py + 12, tw + 46, 34, 17); ctx.fill();
      icon(ctx, PATHS.badge, 33, py + 17, 24, { fill: C.verify, stroke: C.white });
      icon(ctx, PATHS.check, 33, py + 17, 24, { stroke: C.white, width: 2.4 });
      ctx.fillStyle = C.verify; ctx.textBaseline = "middle"; ctx.fillText("Verified", 62, py + 30);
    }
    ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.beginPath(); ctx.arc(w - 46, py + 32, 20, 0, Math.PI * 2); ctx.fill();
    icon(ctx, PATHS.heart, w - 57, py + 21, 22, { fill: C.mango, stroke: C.mango });

    ctx.textBaseline = "alphabetic";
    let ty = py + ph + 42;
    ctx.font = sans(800)(20);
    const rt = c.reviewCount > 0 && c.rating !== null ? c.rating.toFixed(1) : "New";
    const rw = ctx.measureText(rt).width;
    ctx.fillStyle = C.body; ctx.fillText(rt, w - 18 - rw, ty - 2);
    icon(ctx, PATHS.star, w - 18 - rw - 26, ty - 21, 22, { fill: C.mango, stroke: C.mango });
    const nameLine = c.service;
    ctx.fillStyle = C.navy; ctx.fillText(fitText(ctx, nameLine, w - 90 - rw, display(600), 32), 18, ty);

    ty += 34;
    const byLine = c.city ? `${c.name} · ${c.city}` : c.name;
    icon(ctx, PATHS.pin, 16, ty - 18, 20, { stroke: C.orange, width: 2.4 });
    ctx.beginPath(); ctx.arc(26, ty - 18 + (10 * 20) / 24, 2.4, 0, Math.PI * 2); ctx.fillStyle = C.orange; ctx.fill();
    ctx.fillStyle = C.body; ctx.fillText(fitText(ctx, byLine, w - 60, sans(700), 20), 42, ty);

    ty += 40;
    const price = c.price;
    const unit = c.unit;
    ctx.font = sans(800)(17); const uw = ctx.measureText(unit).width;
    // up to ₱1,000,000: the amount shrinks to fit beside its unit
    ctx.fillStyle = C.navy; const priceText = fitText(ctx, price, w - 39 - uw, sans(900), 30); ctx.fillText(priceText, 18, ty);
    const pwid = ctx.measureText(priceText).width;
    ctx.fillStyle = C.body; ctx.font = sans(800)(17); ctx.fillText(unit, 21 + pwid, ty);

    const by = ty + 20;
    ctx.fillStyle = C.orange; ctx.beginPath(); ctx.roundRect(14, by, w - 28, 54, 27); ctx.fill();
    ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(41, by + 27, 20, 0, Math.PI * 2); ctx.fill();
    if (m.logo) { const lh = 28, lw = (lh * 894) / 975; ctx.drawImage(m.logo, 41 - lw / 2, by + 27 - lh / 2, lw, lh); }
    const url = c.shareUrl.replace(/^https:\/\//, "");
    ctx.fillStyle = C.white; ctx.textBaseline = "middle"; ctx.fillText(fitText(ctx, url, w - 100, sans(900), 21), 72, by + 28);

    if (t) {
      const label = fitText(ctx, s.tag.trim(), w - 80, display(700), 22); const tw = ctx.measureText(label).width;
      ctx.fillStyle = C.mango; ctx.beginPath(); ctx.roundRect(24, 0, tw + 36, 42, 21); ctx.fill();
      ctx.fillStyle = C.navy; ctx.textBaseline = "middle"; ctx.fillText(label, 42, 22);
    }
    ctx.restore();
  }

  function drawFrame(ctx: CanvasRenderingContext2D, { bg = true, showGuides = false } = {}) {
    const m = media.current;
    ctx.clearRect(0, 0, W, H);
    if (bg) {
      ctx.fillStyle = "#111"; ctx.fillRect(0, 0, W, H);
      const src = m.video ?? m.bg;
      if (src) cover(ctx, src, 0, 0, W, H);
    }
    if (showGuides) {
      ctx.fillStyle = "rgba(254,97,56,.18)";
      ctx.fillRect(0, 0, W, SAFE.top);
      ctx.fillRect(W - SAFE.right, SAFE.top, SAFE.right, H - SAFE.top);
      ctx.fillRect(0, H - SAFE.bottom, W - SAFE.right, SAFE.bottom);
    }
    drawCard(ctx, pos.current.x, pos.current.y);
  }

  // fonts, logo and sample frame, then the preview loop
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    media.current.fonts = { display: css.getPropertyValue("--font-jakarta").trim() || "sans-serif", sans: css.getPropertyValue("--font-inter").trim() || "sans-serif" };
    const { display, sans } = media.current.fonts;
    Promise.all([`600 30px ${display}`, `700 22px ${display}`, `700 20px ${sans}`, `800 20px ${sans}`, `900 30px ${sans}`].map((f) => document.fonts.load(f))).catch(() => {});
    loadImg("/brand/logo-mark.svg").then((i) => (media.current.logo = i)).catch(() => {});

    // The tool sits below the fold: the 360 KB sample frame loads and the preview redraws only while the canvas is near
    // the screen, not from page load.
    let raf = 0;
    let loaded = false;
    const loop = () => {
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && !isRecording.current) drawFrame(ctx, { showGuides: settings.current.guides });
      raf = requestAnimationFrame(loop);
    };
    const seen = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (!entry.isIntersecting) return;
        if (!loaded) {
          loaded = true;
          loadImg(SAMPLE_FRAME).then((i) => (media.current.bg = i)).catch(() => {});
        }
        raf = requestAnimationFrame(loop);
      },
      { rootMargin: "300px" },
    );
    if (canvasRef.current) seen.observe(canvasRef.current);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the loop reads refs only
  }, []);

  function place(p: Place) {
    const { w, h } = cardSize(settings.current);
    pos.current = {
      x: p === "tr" ? W - SAFE.right - w - 12 : 44,
      y: p === "ml" ? Math.max(SAFE.top, (H - SAFE.bottom - h) / 2 + SAFE.top / 2) : SAFE.top + 20,
    };
  }

  async function lookUp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/creators/card?link=${encodeURIComponent(link)}`);
      const data = (await res.json()) as CreatorCard & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Try again.");
      media.current.photo = data.photo ? await loadImg(data.photo).catch(() => null) : null;
      setCard(data);
    } catch (err) {
      setCard(null);
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const toCanvas = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
  };
  function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
    const p = toCanvas(e), { w, h } = cardSize(settings.current);
    if (p.x < pos.current.x || p.x > pos.current.x + w || p.y < pos.current.y || p.y > pos.current.y + h) return;
    drag.current = { dx: p.x - pos.current.x, dy: p.y - pos.current.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!drag.current) return;
    const p = toCanvas(e), { w, h } = cardSize(settings.current);
    pos.current = { x: Math.min(Math.max(0, p.x - drag.current.dx), W - w), y: Math.min(Math.max(0, p.y - drag.current.dy), H - h) };
  }

  async function handleBackground(file: File | undefined) {
    if (!file) return;
    const m = media.current;
    m.video?.pause();
    if (file.type.startsWith("video/")) {
      const v = Object.assign(document.createElement("video"), { muted: true, loop: true, playsInline: true, src: URL.createObjectURL(file) });
      await v.play().catch(() => {});
      m.video = v;
      setHasVideo(true);
    } else {
      m.video = null;
      m.bg = await loadImg(URL.createObjectURL(file)).catch(() => null);
      setHasVideo(false);
    }
  }

  const fileBase = () => `phriend-overlay-${card?.key ?? "service"}`;
  function save(blob: Blob | null, name: string) {
    if (!blob) return;
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: name });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }
  function exportPng(kind: "overlay" | "card") {
    const c = document.createElement("canvas"), ctx = c.getContext("2d");
    if (!ctx) return;
    if (kind === "card") {
      const { w, h } = cardSize(settings.current), pad = 40;
      c.width = Math.ceil(w + pad * 2); c.height = Math.ceil(h + pad * 2);
      drawCard(ctx, pad, pad);
    } else {
      c.width = W; c.height = H;
      drawFrame(ctx, { bg: false });
    }
    c.toBlob((b) => save(b, `${fileBase()}${kind === "card" ? "-card" : ""}.png`), "image/png");
  }

  // Plays the clip once in real time and records it with the card burned in, keeping the original audio.
  async function exportVideo() {
    const v = media.current.video, canvas = canvasRef.current, ctx = canvas?.getContext("2d");
    if (!v || !canvas || !ctx) return;
    const type = ["video/mp4;codecs=avc1,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm"].find((t) => MediaRecorder.isTypeSupported(t));
    if (!type) return setRecording("This browser can't record video. Download the overlay PNG and use CapCut instead.");
    isRecording.current = true;
    v.pause(); v.loop = false; v.muted = false; v.currentTime = 0;
    const stream = canvas.captureStream(30);
    try {
      for (const t of (v as HTMLVideoElement & { captureStream(): MediaStream }).captureStream().getAudioTracks()) stream.addTrack(t);
    } catch {
      // clip without audio
    }
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 8_000_000 });
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const restore = () => { Object.assign(v, { loop: true, muted: true }); v.play().catch(() => {}); isRecording.current = false; };
    rec.onstop = () => {
      save(new Blob(chunks, { type }), `${fileBase()}.${type.startsWith("video/mp4") ? "mp4" : "webm"}`);
      restore();
      setRecording("Done. Check your downloads.");
    };
    rec.start(500);
    try {
      await v.play();
    } catch (err) {
      rec.onstop = null; rec.stop(); restore();
      return setRecording(`Couldn't play the video (${err instanceof Error ? err.message : "unknown error"}).`);
    }
    const tick = () => {
      if (!isRecording.current) return;
      drawFrame(ctx);
      if (v.ended) return rec.stop();
      setRecording(`Recording ${Math.round(v.currentTime)}s of ${Math.round(v.duration)}s. Keep this tab open in front.`);
      requestAnimationFrame(tick);
    };
    tick();
  }

  const label = "grid gap-1.5 text-sm font-bold text-ink";
  const input = "w-full rounded-xl border-2 border-line bg-white px-3.5 py-2.5 font-semibold text-ink outline-none focus-visible:border-brand";
  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  return (
    // one grid so phones get link box, preview, options, download; desktop keeps the preview in its own sticky column
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-x-8">
      <form onSubmit={lookUp} className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6 lg:col-start-1">
        <label htmlFor="profile-link" className="font-display text-h3 font-bold text-ink">
          1. Paste your Phriend link
        </label>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="profile-link"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="web.phriend.app/p/yourhandle"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={input}
            required
          />
          <button type="submit" disabled={loading || !link.trim()} className={`btn-primary ${btn} shrink-0`}>
            {loading && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
            Make my card
          </button>
        </div>
        <p role="alert" className="mt-2 min-h-5 text-sm font-bold text-danger">
          {error}
        </p>
        {card && !card.verified && (
          <p className="text-sm font-bold text-brand-text">Your profile isn&apos;t verified yet. Verify your ID in the Provider app before you post, so the card shows the Verified badge.</p>
        )}
      </form>

      <div className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
        <div className="lg:sticky lg:top-6">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={() => (drag.current = null)}
            aria-label="Preview of your video with the Phriend service card. Drag the card to move it."
            className="mx-auto block aspect-[9/16] w-full max-w-[420px] cursor-grab touch-none rounded-3xl bg-navy shadow-float active:cursor-grabbing max-lg:max-w-[300px]"
          />
          <p className="mt-2 text-center text-sm text-muted">{card ? "Drag the card so it doesn't cover your face." : "Your card shows up here."}</p>
        </div>
      </div>

      <fieldset disabled={!card} className="grid gap-4 rounded-3xl border border-line bg-white p-5 shadow-card disabled:opacity-60 sm:grid-cols-2 sm:p-6 lg:col-start-1">
        <legend className="sr-only">Card options</legend>
        <p className="font-display text-h3 font-bold text-ink sm:col-span-2">2. Place your card</p>
        <label className={`${label} sm:col-span-2`}>
          Card tag (leave empty to hide)
          <input type="text" maxLength={24} value={tag} onChange={(e) => setTag(e.target.value)} className={input} />
        </label>
        <label className={label}>
          Card size
          <input type="range" min={0.6} max={1.3} step={0.05} value={size} onChange={(e) => setSize(Number(e.target.value))} className="accent-brand" />
        </label>
        <label className={label}>
          Position
          <select defaultValue="tl" onChange={(e) => place(e.target.value as Place)} className={input}>
            <option value="tl">Top left</option>
            <option value="tr">Top right</option>
            <option value="ml">Middle left</option>
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          Preview on your video or a screenshot (optional, stays on your device)
          <span className={`${input} flex items-center gap-2 font-bold text-body`}>
            <Upload size={18} aria-hidden="true" />
            <input type="file" accept="video/*,image/*" onChange={(e) => handleBackground(e.target.files?.[0])} className="w-full text-sm" />
          </span>
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-ink sm:col-span-2">
          <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} className="size-4 accent-brand" />
          Show where TikTok and Reels buttons cover the screen
        </label>
      </fieldset>

      <div className="grid gap-3 self-start rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6 lg:col-start-1">
        <p className="font-display text-h3 font-bold text-ink">3. Download</p>
        <button type="button" disabled={!card} onClick={() => exportPng("overlay")} className={`btn-primary ${btn}`}>
          <Download size={18} aria-hidden="true" />
          Transparent overlay PNG (1080×1920)
        </button>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" disabled={!card} onClick={() => exportPng("card")} className={`btn-secondary ${btn}`}>
            <Download size={18} aria-hidden="true" />
            Card only PNG
          </button>
          <button type="button" disabled={!card || !hasVideo || recording.startsWith("Recording")} onClick={exportVideo} className={`btn-secondary ${btn}`}>
            <Film size={18} aria-hidden="true" />
            Video with the card
          </button>
        </div>
        <p role="status" className="min-h-5 text-sm font-bold text-brand-text">
          {recording}
        </p>
        <p className="text-sm text-muted">
          In CapCut: Overlay, then Add overlay, pick the PNG, stretch it to full screen and drag it across the whole clip. To get the video with
          the card, upload your clip in step 2 first.
        </p>
      </div>
    </div>
  );
}
