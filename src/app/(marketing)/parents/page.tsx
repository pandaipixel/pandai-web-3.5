import ParentsHeroSection from '@/components/sections/parents/HeroSection'
import ParentsFeaturesSection from '@/components/sections/parents/FeaturesSection'
import FindOutMoreSection from '@/components/sections/parents/FindOutMoreSection'

export default function ParentsPage() {
  return (
    <div className="flex flex-col">
      <ParentsHeroSection />
      <ParentsFeaturesSection />
      <FindOutMoreSection />
    </div>
  )
}
