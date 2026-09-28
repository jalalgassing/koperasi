import ServiceCarousel from "./ServiceCarousel.jsx";
import Calculator from "../home/sections/Calculator.jsx";
import Collaboration from "../home/sections/Collaboration.jsx";
import Faq from "../home/sections/Faq.jsx";
import CtaBanner from "../home/sections/CtaBanner.jsx";
import "./LayananPage.css";

export default function LayananPage() {
  return (
    <>
      <section className="layanan-hero">
        <div className="container">
          <h1 className="layanan-hero__title">
            Solusi yang mendukung
            <br />
            pertumbuhan bisnis anda
          </h1>
          <p className="layanan-hero__desc">
            Berbagai layanan dan teknologi yang dirancang untuk membantu UMKM,
            koperasi, dan badan usaha kecil-menengah berkembang lebih mudah.
          </p>
        </div>
      </section>

      <ServiceCarousel />
      <Calculator />
      <Collaboration />
      <Faq />
      <CtaBanner />
    </>
  );
}