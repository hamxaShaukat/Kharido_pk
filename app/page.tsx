'use client'
import { Navigation } from "@/components/navigation"
import { WelcomeSection } from "@/components/welcome-section"
import { BannerSection } from "@/components/banner-section"
import { ProductsSection } from "@/components/products-section"
import { BackgroundBlobs } from "@/components/background-blobs"
import { Footer } from "@/components/footer"
import { NewsletterPopup } from "@/components/newsletter-popup"

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
