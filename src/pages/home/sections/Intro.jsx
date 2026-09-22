import { useEffect, useRef, useState } from "react";
import "./Intro.css";

export default function Intro() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Setiap kali elemen masuk/keluar area pandang, state diperbarui —
        // sehingga animasi blur muncul lagi tiap kali di-scroll ke posisi ini,
        // bukan hanya sekali saat pertama kali muncul.
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="intro">
      <div className="container">
        <p ref={ref} className={`intro__text ${isVisible ? "intro__text--visible" : ""}`}>
          Temukan berbagai manfaat dan peluang yang dapat membantu bisnis Anda
          berkembang bersama Parakarsa.
        </p>
      </div>
    </section>
  );
}
