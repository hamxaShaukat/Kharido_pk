'use client'
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { ProductsSection } from "@/components/products-section"
import { WelcomeSection } from "@/components/welcome-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* <BackgroundBlobs /> */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <WelcomeSection />
          {/* <BannerSection /> */}
          <ProductsSection />
          <Footer />
        </main>
      </div>
       <NewsletterPopup />
    </div>
  )
}
