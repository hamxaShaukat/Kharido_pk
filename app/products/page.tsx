import { ProductListing } from "@/components/product-listing"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BackgroundBlobs } from "@/components/background-blobs"
import { NewsletterPopup } from "@/components/newsletter-popup"

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
