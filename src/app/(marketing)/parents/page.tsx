import ParentsHeroSection from '@/components/sections/parents/HeroSection'
import ParentsFeaturesSection from '@/components/sections/parents/FeaturesSection'
import FindOutMoreSection from '@/components/sections/parents/FindOutMoreSection'
import TestimonialSection from '@/components/sections/parents/TestimonialSection'
import CTASection from '@/components/sections/parents/CTASection'

export default function ParentsPage() {
  return (
    <div className="flex flex-col">
      <ParentsHeroSection />
      <ParentsFeaturesSection />
      <FindOutMoreSection />
      <TestimonialSection />
      <CTASection />
    </div>
  )
}
