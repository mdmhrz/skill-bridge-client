import ChromaGrid from "@/components/ChromaGrid";
import { Footer } from "@/components/layout/Footer";
import FAQSection from "@/components/layout/Home/FAQSection";
import FeaturedTutors from "@/components/layout/Home/FeaturedTutors";
import HowItWorks from "@/components/layout/Home/HowItWorks";
import TestimonialCarousel from "@/components/layout/Home/Testimonials";
import { SkillBridgeBanner } from "@/components/layout/Home/SkillBridgeBanner";
import tutorServices from "@/services/tutor.service";

export default async function Home() {

    const { data, error } = await tutorServices.getFeaturedTutors()
    console.log(data, 'data')

    return (
        <div>
            <SkillBridgeBanner></SkillBridgeBanner>
            {/* <ChromaGrid></ChromaGrid> */}
            <HowItWorks></HowItWorks>
            <FeaturedTutors tutors={data}></FeaturedTutors>
            <TestimonialCarousel></TestimonialCarousel>
            <FAQSection></FAQSection>
            <Footer></Footer>
        </div>
    );
}
