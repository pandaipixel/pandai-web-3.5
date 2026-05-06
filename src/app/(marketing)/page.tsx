import HeroSection from '@/components/sections/home/HeroSection'
import TaglineSection from '@/components/sections/home/TaglineSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TaglineSection />
    </div>
  )
}
