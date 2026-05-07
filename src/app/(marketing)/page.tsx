import HeroSection from '@/components/sections/home/HeroSection'
import TaglineSection from '@/components/sections/home/TaglineSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import FeatureCardsSection from '@/components/sections/home/FeatureCardsSection'
import AsFeaturedInSection from '@/components/sections/home/AsFeaturedInSection'
import CompetitionSection from '@/components/sections/home/CompetitionSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TaglineSection />
      <TestimonialsSection />
      <FeatureCardsSection />
      <AsFeaturedInSection />
      <CompetitionSection />
    </div>
  )
}
