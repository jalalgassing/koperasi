import Hero from "./sections/Hero.jsx";
import Intro from "./sections/Intro.jsx";
import WhatChanges from "./sections/WhatChanges.jsx";
import Calculator from "./sections/Calculator.jsx";
import Collaboration from "./sections/Collaboration.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import Faq from "./sections/Faq.jsx";
import CtaBanner from "./sections/CtaBanner.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhatChanges />
      <Calculator />
      <Collaboration />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
