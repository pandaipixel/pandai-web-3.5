import HeroSection from '@/components/sections/home/HeroSection'
import TaglineSection from '@/components/sections/home/TaglineSection'
import TestimonialsSection from '@/components/sections/home/TestimonialsSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TaglineSection />
      <TestimonialsSection />
    </div>
  )
}
