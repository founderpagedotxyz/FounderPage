import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Hero />
        {/* 
        <Pricing />
        */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
