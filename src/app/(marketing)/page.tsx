import HeroSection from '@/components/sections/home/HeroSection'
import TaglineSection from '@/components/sections/home/TaglineSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import FeatureCardsSection from '@/components/sections/home/FeatureCardsSection'
import AsFeaturedInSection from '@/components/sections/home/AsFeaturedInSection'
import CompetitionSection from '@/components/sections/home/CompetitionSection'
import StudentFeaturesSection from '@/components/sections/home/StudentFeaturesSection'
import LiveTuitionSection from '@/components/sections/home/LiveTuitionSection'
import DownloadSection from '@/components/sections/home/DownloadSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TaglineSection />
      <TestimonialsSection />
      <FeatureCardsSection />
      <AsFeaturedInSection />
      <CompetitionSection />
      <StudentFeaturesSection />
      <LiveTuitionSection />
      <DownloadSection />
    </div>
  )
}
