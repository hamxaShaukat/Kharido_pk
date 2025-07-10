import { AdminHeader } from "@/components/admin/admin-header"
import { ProductForm } from "@/components/admin/product-form"
// import { BackgroundBlobs } from "@/components/background-blobs"

export default function AdminProductListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="relative z-10">
        <AdminHeader />
        <main className="container">
          <ProductForm />
        </main>
      </div>
    </div>
  )
}
