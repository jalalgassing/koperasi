import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSettings from "../../hooks/useSettings.js";

const INTERVAL = 6000;

/**
 * Banner geser horizontal (scroll-snap native -> ikut gesture swipe HP).
 * - Otomatis geser ke kiri tiap 6 detik; setelah slide terakhir lanjut mulus
 *   ke slide pertama (slide pertama di-clone di ujung, lalu lompat diam-diam).
 * - User boleh swipe sendiri kapan saja; hitung mundur 6 detik mulai ulang
 *   dari sentuhan terakhir, jadi banner tidak "merebut" scroll user.
 */
export default function BannerCarousel({ slides }) {
  const navigate = useNavigate();
  const [settings] = useSettings();
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0); // slide logis 0..n-1
  const [tick, setTick] = useState(0); // naik tiap interaksi user -> timer mulai ulang
  const touching = useRef(false);
  const settle = useRef(null);
  const n = slides.length;
  const items = [...slides, slides[0]]; // + clone untuk loop

  const scrollToIndex = useCallback((i, smooth = true) => {
    const el = trackRef.current;
    const target = el?.children[i];
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Timer auto-slide
  useEffect(() => {
    if (!settings.autoSlide) return undefined; // dimatikan di Settings
    const id = setTimeout(() => {
      if (touching.current) return setTick((t) => t + 1);
      const next = index + 1;
      scrollToIndex(next, true);
      if (next >= n) {
        // sampai clone: setelah animasi selesai, lompat ke slide asli pertama
        setTimeout(() => {
          scrollToIndex(0, false);
          setIndex(0);
        }, 650);
      } else {
        setIndex(next);
      }
    }, INTERVAL);
    return () => clearTimeout(id);
  }, [index, tick, n, scrollToIndex, settings.autoSlide]);

  // Deteksi slide aktif setelah scroll berhenti (swipe user ataupun otomatis)
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = trackRef.current;
      if (!el) return;
      let nearest = 0;
      let best = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const d = Math.abs(el.children[i].offsetLeft - el.scrollLeft);
        if (d < best) { best = d; nearest = i; }
      }
      if (nearest >= n) { // user swipe sampai clone -> kembali ke awal tanpa terlihat
        scrollToIndex(0, false);
        nearest = 0;
      }
      setIndex(nearest);
    }, 120);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  // Jaga posisi saat layar diputar / di-resize
  useEffect(() => {
    const onResize = () => scrollToIndex(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, scrollToIndex]);

  const userStart = () => { touching.current = true; setTick((t) => t + 1); };
  const userEnd = () => { touching.current = false; setTick((t) => t + 1); };

  return (
    <div className="m-banner" role="region" aria-roledescription="carousel" aria-label="Highlights">
      <div
        className="m-banner__track"
        ref={trackRef}
        onScroll={onScroll}
        onTouchStart={userStart}
        onTouchEnd={userEnd}
        onTouchCancel={userEnd}
        onWheel={userStart}
      >
        {items.map((s, i) => (
          <div role="button" className="m-banner__slide" key={i} aria-hidden={i >= n} tabIndex={i >= n ? -1 : 0} onClick={() => s.to && navigate(s.to)} onKeyDown={(e) => e.key === "Enter" && s.to && navigate(s.to)}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
