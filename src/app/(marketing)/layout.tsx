import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/context/LanguageContext'
import LangToggle from '@/components/ui/LangToggle'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <LangToggle />
    </LanguageProvider>
  )
}
