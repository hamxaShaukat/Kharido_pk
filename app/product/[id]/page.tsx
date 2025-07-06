import { ProductDetail } from "@/components/product-detail"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BackgroundBlobs } from "@/components/background-blobs"

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* <BackgroundBlobs /> */}
      <div className="relative z-10">
        <Navigation />
        <ProductDetail />
        <Footer />
      </div>
    </div>
  )
}
