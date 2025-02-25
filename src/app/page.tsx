import "./pagestyle.css"
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import IntroSection from "@/components/IntroSection";
import FooterSection from "@/components/FooterSection";
import HeaderSection from "@/components/HeaderSection";
import SocialsSection from "@/components/SocialsSection";
import ShowcaseProjectsSection from "@/components/ShowcaseProjectsSection";

export default function Home() {
  return (
    <>
      <HeaderSection />
      <main className="min-h-screen max-w-xl mx-auto w-full flex flex-col justify-start gap-12 items-center py-8 md:py-16 px-6 sm:px-0 font-[family-name:var(--font-geist-sans)]">
          <IntroSection />
          <AboutSection />
          <ShowcaseProjectsSection />
          <QuoteSection />
          <SocialsSection />
        <FooterSection />
      </main>
    </>
  );
}
