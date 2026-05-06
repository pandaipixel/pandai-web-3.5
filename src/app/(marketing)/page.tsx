import HeroSection from '@/components/sections/home/HeroSection'
import StatsSection from '@/components/sections/home/StatsSection'
import FeaturesSection from '@/components/sections/home/FeaturesSection'
import HowItWorksSection from '@/components/sections/home/HowItWorksSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'
import AppDownloadSection from '@/components/sections/home/AppDownloadSection'
import FAQSection from '@/components/sections/home/FAQSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <FAQSection />
    </div>
  )
}
