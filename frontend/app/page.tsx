import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Workflow from "@/components/sections/Workflow";
import DashboardPreview from "@/components/sections/DashboardPreview";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";


export default function Home(){

  return (

    <>
      <Navbar />

      <Hero />

      <Features />

      <Workflow />

      <DashboardPreview />

      <Pricing />

      <CTA />

      <Footer />

    </>

  );
}