import StudentsHeroSection from '@/components/sections/students/HeroSection'
import AcademicContentsSection from '@/components/sections/students/AcademicContentsSection'
import LearnSection from '@/components/sections/students/LearnSection'

// /students — Pandai for Students landing
// Sections live in src/components/sections/students/
// Copy lives in src/content/translations/students.ts (EN + BM)
// Static data (image paths, hrefs) lives in src/content/students.ts
export default function StudentsPage() {
  return (
    <div className="flex flex-col">
      <StudentsHeroSection />
      <AcademicContentsSection />
      <LearnSection />
    </div>
  )
}
