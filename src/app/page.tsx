import dynamic from 'next/dynamic';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Importações estáticas (above the fold)
import Hero from "@/components/sections/Hero";
import Developer from "@/components/sections/Developer";
import Testimonials from "@/components/sections/Testimonials";

// Lazy load das seções que não são críticas para o "above the fold"
const Benefits = dynamic(() => import("@/components/sections/Benefits"), {
  loading: () => <div className="h-96" />,
});

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), {
  loading: () => <div className="h-96" />,
});

const Pricing = dynamic(() => import("@/components/sections/Pricing"), {
  loading: () => <div className="h-96" />,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: () => <div className="h-96" />,
});

const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal"), {
  loading: () => <div className="h-64" />,
});

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Hero />
        <HowItWorks />
        <Developer />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>

      <Footer />
    </>
  );
}
