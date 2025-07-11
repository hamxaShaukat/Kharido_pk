import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ProductListing } from "@/components/product-listing";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* <BackgroundBlobs /> */}
      <div className="relative z-10">
        <Navigation />
        <Suspense
          fallback={<div className="text-center py-8">Loading products…</div>}
        >
          <ProductListing />
        </Suspense>
        <Footer />
      </div>
      <NewsletterPopup />
    </div>
  );
}
