import React from 'react'
import AboutSection from "../Components/aboutSection";
import SiteFooter from "../Components/footer";
import ChronoHero from "../Components/hero";
import MediaSection from "../Components/mediaSection";
import WatchStoreNavbar from "../Components/navbar";
import ServicesSection from "../Components/servicesSection";
import ShowcaseSection from "../Components/showcase";
import TestimonialsSection from "../Components/testominal";

const HomePage = () => {
    return (
        <div>
            <WatchStoreNavbar />
            <ChronoHero />
            <AboutSection />
            <ServicesSection />
            <ShowcaseSection />
            <TestimonialsSection />
            <MediaSection />
            <SiteFooter />
        </div>
    )
}

export default HomePage
