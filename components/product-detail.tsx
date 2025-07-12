"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Plus,
  Minus,
  ChevronRight,
  Package,
  Calendar,
  Tag,
  Sparkles,
  ArrowLeft,
  Eye,
  Zap,
  CheckCircle,
  Clock,
  ChevronLeft,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useCartStore } from "@/store/use-cart"
import { createClient } from "@/utils/supabase/client"
import type { Product } from "@/types/product"

export function ProductDetail() {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const params: { [key: string]: string | string[] | undefined } = useParams()
  const id = params.id as string | undefined

  const addToCart = useCartStore((state) => state.addToCart)
  const getItemQuantity = useCartStore((state) => state.getItemQuantity)
  const supabase = createClient()

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.uu_id,
        name: product.title,
        price: product.price,
        originalPrice: product.original_price,
        thumbnail: product.thumbnail,
        stock: product.stock,
      })
    }
  }

  const currentQuantityInCart = product ? getItemQuantity(product.uu_id) : 0
  const discountPercentage = product?.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const { data, error } = await supabase.from("products").select("*").eq("uu_id", id).single()
        if (error) throw error
        setProduct(data)
        setSelectedImage(0)
        setQuantity(1)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id, supabase])

  const handleMainImageLoad = () => {
    setImageLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center p-4">
        <div className="container mx-auto">
          {/* Mobile Loading (320px-480px) */}
          <div className="block sm:hidden">
            <div className="space-y-4">
              <div className="h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse" />
              <div className="flex space-x-2 justify-center">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg animate-pulse"
                  />
                ))}
              </div>
              <div className="space-y-3 px-4">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                <div className="h-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>

          {/* Desktop Loading (>480px) */}
          <div className="hidden sm:block">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse shadow-lg" />
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="h-7 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-3/4" />
                  <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                  <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-1/2" />
                </div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                  ))}
                </div>
                <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center p-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/50 max-w-md mx-auto">
          <Package className="h-14 w-14 sm:h-16 sm:w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            The product you're looking for doesn't exist or an error occurred.
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl font-semibold shadow-lg text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.thumbnail]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-10 left-5 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-5 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* MOBILE DESIGN (320px - 480px) */}
      <div className="block sm:hidden relative z-10">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="h-10 w-10 rounded-full"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"
                  }`}
                />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                <Share2 className="h-5 w-5 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Image Gallery */}
        <div className="relative">
          <div className="relative h-80 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={productImages[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onLoad={handleMainImageLoad}
                  priority
                />
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobile Badges */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg px-3 py-1.5 text-sm font-bold">
                  <Zap className="w-3 h-3 mr-1" />
                  {discountPercentage}% OFF
                </Badge>
              </div>
            )}

            <div className="absolute bottom-4 left-4">
              <Badge
                className={`${
                  product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                } border-0 shadow-lg backdrop-blur-sm`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </Badge>
            </div>
          </div>

          {/* Mobile Thumbnail Dots */}
          <div className="flex justify-center space-x-2 py-4 bg-white">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImage(index)
                  setImageLoading(true)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImage === index ? "bg-emerald-500 scale-125" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-4 pt-6 pb-8 space-y-6">
          {/* Mobile Header Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
                {product.category}
              </Badge>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-slate-500 ml-1">(4.8)</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{product.title}</h1>

            {/* Mobile Price */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-emerald-600">Rs {product.price.toFixed(2)}</span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-lg text-slate-500 line-through">
                        Rs {product.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.original_price && product.original_price > product.price && (
                    <p className="text-green-600 font-semibold text-sm flex items-center mt-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      You save Rs {(product.original_price - product.price).toFixed(2)}
                    </p>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">{discountPercentage}%</div>
                    <div className="text-xs text-red-600">OFF</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Description */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Eye className="w-4 h-4 mr-2 text-emerald-600" />
              Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Mobile Quantity & Cart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">Quantity</span>
              {currentQuantityInCart > 0 && (
                <Badge className="bg-emerald-100 text-emerald-700 text-xs">{currentQuantityInCart} in cart</Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center bg-slate-100 rounded-xl">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-12 w-12 rounded-l-xl"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="h-12 w-12 rounded-r-xl"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-slate-600">Max: {product.stock}</span>
            </div>
          </div>

          {/* Mobile Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center space-y-2 text-center p-3 bg-emerald-50 rounded-xl">
              <Truck className="h-6 w-6 text-emerald-600" />
              <span className="text-xs font-medium text-slate-700">Free Ship</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center p-3 bg-teal-50 rounded-xl">
              <RotateCcw className="h-6 w-6 text-teal-600" />
              <span className="text-xs font-medium text-slate-700">Returns</span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center p-3 bg-cyan-50 rounded-xl">
              <Shield className="h-6 w-6 text-cyan-600" />
              <span className="text-xs font-medium text-slate-700">Secure</span>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || quantity === 0}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl disabled:opacity-50"
          >
            <ShoppingCart className="h-5 w-5 mr-3" />
            {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
          </Button>
        </div>
      </div>

      {/* DESKTOP DESIGN (>480px) */}
      <div className="hidden sm:block container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Desktop Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-600 mb-6 sm:mb-8 bg-white/60 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit shadow-md"
        >
          <button onClick={() => router.push("/")} className="hover:text-emerald-600 transition-colors">
            Home
          </button>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <button onClick={() => router.push("/products")} className="hover:text-emerald-600 transition-colors">
            Products
          </button>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <button
            onClick={() => router.push(`/products?category=${encodeURIComponent(product.category)}`)}
            className="hover:text-emerald-600 transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-slate-900 font-medium truncate max-w-[60px] xs:max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
            {product.title}
          </span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mb-12 sm:mb-16">
          {/* Desktop Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={productImages[selectedImage] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                      onLoad={handleMainImageLoad}
                      priority
                    />
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Desktop Floating Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0 rounded-full"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                          isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-slate-600"
                        }`}
                      />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 sm:h-9 sm:w-9 bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0 rounded-full"
                    >
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
                    </Button>
                  </motion.div>
                </div>

                {/* Desktop Discount Badge */}
                {discountPercentage > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-3 left-3"
                  >
                    <div className="relative">
                      <Badge className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white border-0 shadow-2xl px-2.5 py-1 text-sm font-bold sm:px-3 sm:py-1.5 sm:text-base">
                        <Zap className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
                        {discountPercentage}% OFF
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-lg opacity-50 -z-10" />
                    </div>
                  </motion.div>
                )}

                {/* Desktop Stock Status */}
                <div className="absolute bottom-3 left-3">
                  <Badge
                    className={`${
                      product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    } border-0 shadow-lg backdrop-blur-sm text-xs sm:text-sm`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-1.5 ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                    />
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Desktop Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2 justify-center sm:justify-start">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    setImageLoading(true)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 sm:border-3 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/25"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Desktop Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Desktop Header Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 font-semibold text-xs sm:text-sm">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="bg-white/60 backdrop-blur-sm px-2.5 py-1 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {product.created_at ? new Date(product.created_at).toLocaleDateString() : "N/A"}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Desktop Price Section */}
              <div className="bg-gradient-to-r from-white/80 to-emerald-50/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-md">
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                        Rs {product.price.toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-xl sm:text-2xl text-slate-500 line-through">
                          Rs {product.original_price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.original_price && product.original_price > product.price && (
                      <p className="text-green-600 font-semibold flex items-center text-xs sm:text-sm">
                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                        You save Rs {(product.original_price - product.price).toFixed(2)}
                      </p>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl sm:text-3xl font-bold text-red-600">{discountPercentage}%</div>
                      <div className="text-sm text-red-600">OFF</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50 shadow-md">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center text-base sm:text-lg">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                Product Description
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Desktop Quantity and Add to Cart */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50 shadow-md">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">Quantity</span>
                  {currentQuantityInCart > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs sm:text-sm">
                      {currentQuantityInCart} in cart
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col xs:flex-row items-start xs:items-center space-y-3 xs:space-y-0 xs:space-x-4">
                  <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm w-full xs:w-auto">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-l-xl"
                    >
                      <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <span className="px-3 py-2 sm:px-4 sm:py-2.5 font-semibold text-sm sm:text-base min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-r-xl"
                    >
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">Max: {product.stock} available</div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || quantity === 0}
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
                </Button>
              </motion.div>
            </div>

            {/* Desktop Trust Badges */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-1.5 sm:space-y-2 text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/50 shadow-sm"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Free Shipping</span>
                <span className="text-xs text-slate-500">On orders over Rs 5000</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-1.5 sm:space-y-2 text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/50 shadow-sm"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">7-Day Returns</span>
                <span className="text-xs text-slate-500">Hassle-free returns</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-1.5 sm:space-y-2 text-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-slate-200/50 shadow-sm"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Secure Payment</span>
                <span className="text-xs text-slate-500">256-bit SSL encryption</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-slate-200/50 shadow-xl"
        >
          <div className="flex items-center justify-center mb-5 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center">
              <Tag className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2 sm:mr-3 text-emerald-600" />
              Product Information
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <CheckCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                Details
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900 text-sm sm:text-base">Product ID</span>
                  <span className="text-slate-600 font-mono text-xs sm:text-sm">{product.uu_id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900 text-sm sm:text-base">Category</span>
                  <Badge className="bg-emerald-50 text-emerald-700 text-xs sm:text-sm">{product.category}</Badge>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900 text-sm sm:text-base">Stock Status</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-slate-600 text-sm sm:text-base">
                      {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-medium text-slate-900 text-sm sm:text-base">Added Date</span>
                  <span className="text-slate-600 text-sm sm:text-base">
                    {product.created_at ? new Date(product.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 flex items-center">
                <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5 mr-2 text-teal-600" />
                Pricing History
              </h3>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200/50 shadow-md">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 text-sm sm:text-base">Current Price</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-600">
                      Rs {product.price.toFixed(2)}
                    </span>
                  </div>
                  {product.original_price && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm sm:text-base">Original Price</span>
                        <span className="text-sm sm:text-base text-slate-500 line-through">
                          Rs {product.original_price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700 text-sm sm:text-base">You Save</span>
                        <span className="text-sm sm:text-base font-semibold text-green-600">
                          Rs {(product.original_price - product.price).toFixed(2)} ({discountPercentage}%)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
