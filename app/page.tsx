import { SiteFooter } from "./_components/layout/site-footer";
import { SiteHeader } from "./_components/layout/site-header";
import { Categories } from "./_components/sections/categories";
import { Contact } from "./_components/sections/contact";
import { FeaturedCourse } from "./_components/sections/featured-course";
import { FinalCta } from "./_components/sections/final-cta";
import { Hero } from "./_components/sections/hero";
import { HowItWorks } from "./_components/sections/how-it-works";
import { People } from "./_components/sections/people";
import { Testimonial } from "./_components/sections/testimonial";

export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* tabIndex lets the skip link move focus here, not only scroll. */}
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Categories />
        <FeaturedCourse />
        <HowItWorks />
        <Testimonial />
        <People />
        <Contact />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
