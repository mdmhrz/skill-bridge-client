import ChromaGrid from "@/components/ChromaGrid";
import { Footer } from "@/components/layout/Footer";
import FAQSection from "@/components/layout/Home/FAQSection";
import HowItWorks from "@/components/layout/Home/HowItWorks";
import TestimonialCarousel from "@/components/layout/Home/Testimonials";
import { SkillBridgeBanner } from "@/components/layout/SkillBridgeBanner";

export default function Home() {


    return (
        <div>
            <SkillBridgeBanner></SkillBridgeBanner>
            <ChromaGrid></ChromaGrid>
            <HowItWorks></HowItWorks>
            <TestimonialCarousel></TestimonialCarousel>
            <FAQSection></FAQSection>
            <Footer></Footer>
        </div>
    );
}
