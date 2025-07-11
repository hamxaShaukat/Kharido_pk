import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { NewsletterPopup } from "@/components/newsletter-popup"
import { ProductListing } from "@/components/product-listing"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* <BackgroundBlobs /> */}
      <div className="relative z-10">
        <Navigation />
        <ProductListing />
        <Footer />
      </div>
      <NewsletterPopup />
    </div>
  )
}
