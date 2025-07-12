"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Sparkles, TrendingUp, Package, Eye, ArrowRight, Zap, Plus, Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/store/use-cart"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import type { Product } from "@/types/product"

export function ProductsSection() {
  const router = useRouter()
  const addToCart = useCartStore((state) => state.addToCart)
  const getItemQuantity = useCartStore((state) => state.getItemQuantity)
  const supabase = createClient()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) {
        console.error("Error fetching products:", error)
        return
      }

      if (data) {
        setProducts(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const goToProduct = (id: string) => {
    router.push(`/product/${id}`)
  }

  const toggleWishlist = (productId: string) => {
    setWishlistedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.uu_id)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart({
      id: product.uu_id,
      name: product.title,
      price: product.price,
      originalPrice: product.original_price,
      thumbnail: product.thumbnail,
      stock: product.stock,
    })

    // Reset the adding state after a brief moment
    setTimeout(() => {
      setAddingToCart(null)
    }, 1000)
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/30" />
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700 text-sm sm:text-base">Featured Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent leading-tight">
            Discover Amazing
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Products
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Handpicked selection of premium, eco-conscious products that combine
            <span className="font-semibold text-emerald-600"> exceptional quality</span> with
            <span className="font-semibold text-teal-600"> sustainable design</span>
          </p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">{products.length}+</div>
              <div className="text-xs sm:text-sm text-slate-600">Products</div>
            </div>
            <div className="w-px h-6 sm:h-8 bg-slate-300" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-teal-600">4.9★</div>
              <div className="text-xs sm:text-sm text-slate-600">Rating</div>
            </div>
            <div className="w-px h-6 sm:h-8 bg-slate-300" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">1000+</div>
              <div className="text-xs sm:text-sm text-slate-600">Happy Customers</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 sm:py-20"
            >
              <div className="relative">
                <div className="w-16 sm:w-20 h-16 sm:h-20 border-4 border-emerald-200 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-4 border-transparent border-t-emerald-600 rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-600 animate-pulse" />
                </div>
              </div>
              <motion.p
                className="text-slate-600 mt-4 sm:mt-6 text-base sm:text-lg font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Loading amazing products...
              </motion.p>

              {/* Loading Skeleton Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 w-full">
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg"
                  >
                    <div className="animate-pulse">
                      <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-48 sm:h-64 rounded-xl mb-4"></div>
                      <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-4 rounded mb-2"></div>
                      <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-6 rounded mb-4 w-3/4"></div>
                      <div className="flex justify-between items-center">
                        <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-8 rounded w-20"></div>
                        <div className="bg-gradient-to-r from-slate-200 to-slate-300 h-8 rounded w-24"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {products.map((product, index) => {
                const quantity = getItemQuantity(product.uu_id)
                const isWishlisted = wishlistedItems.includes(product.uu_id)
                const isHovered = hoveredProduct === product.uu_id
                const isAddingToCart = addingToCart === product.uu_id

                return (
                  <motion.div
                    key={product.uu_id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onHoverStart={() => setHoveredProduct(product.uu_id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="group"
                  >
                    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-white to-slate-50/50 shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-2 sm:hover:-translate-y-3">
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Glowing Border Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700" />

                      {/* Floating Elements */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100"
                        animate={isHovered ? { scale: [1, 1.2, 1], rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />

                      <CardContent className="relative p-0 z-10">
                        <div className="relative overflow-hidden rounded-t-2xl">
                          <div className="relative w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-slate-100 via-white to-slate-50">
                            <Image
                              src={product.thumbnail || "/placeholder.svg?height=320&width=320"}
                              alt={product.title || "Product Image"}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Floating Discount Badge */}
                            {product.original_price && product.original_price > product.price && (
                              <motion.div
                                className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              >
                                <div className="relative">
                                  <Badge className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white border-0 shadow-2xl px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold">
                                    <TrendingUp className="w-2 sm:w-3 h-2 sm:h-3 mr-1" />
                                    {Math.round(
                                      ((product.original_price - product.price) / product.original_price) * 100,
                                    )}
                                    % OFF
                                  </Badge>
                                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-lg opacity-50 -z-10" />
                                </div>
                              </motion.div>
                            )}

                            {/* Floating Action Buttons - Hidden on mobile, shown on hover for desktop */}
                            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 sm:gap-3 opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-x-4 sm:group-hover:translate-x-0">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="icon"
                                  className="bg-white/95 hover:bg-white shadow-2xl backdrop-blur-sm border-0 text-slate-600 hover:text-red-500 transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleWishlist(product.uu_id)
                                  }}
                                >
                                  <Heart
                                    className={`h-3 sm:h-4 w-3 sm:w-4 transition-all duration-300 ${
                                      isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-slate-600"
                                    }`}
                                  />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="icon"
                                  className="bg-white/95 hover:bg-white shadow-2xl backdrop-blur-sm border-0 text-slate-600 hover:text-emerald-600 transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    goToProduct(product.uu_id)
                                  }}
                                >
                                  <Eye className="h-3 sm:h-4 w-3 sm:w-4" />
                                </Button>
                              </motion.div>
                            </div>

                            {/* Stock Status */}
                            {product.stock === 0 && (
                              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 flex items-center justify-center backdrop-blur-sm">
                                <div className="text-center">
                                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                                    <Package className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                                  </div>
                                  <span className="text-white font-bold text-sm sm:text-lg">Out of Stock</span>
                                </div>
                              </div>
                            )}

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                          </div>
                        </div>

                        {/* Enhanced Card Content */}
                        <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 lg:space-y-5">
                          {/* Category and Rating */}
                          <div className="flex items-center justify-between">
                            <Badge className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/50 px-2 sm:px-3 py-1 sm:py-1.5 font-medium text-xs sm:text-sm">
                              {product.category}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 sm:w-4 h-3 sm:h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                                />
                              ))}
                              <span className="text-xs sm:text-sm text-slate-600 ml-1">(4.8)</span>
                            </div>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-bold text-lg sm:text-xl text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 leading-tight">
                            {product.title}
                          </h3>

                          {/* Stock Indicator */}
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                            />
                            <span className="text-xs sm:text-sm text-slate-600">
                              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                            </span>
                          </div>

                          {/* Price and Action Section - Fixed Layout */}
                          <div className="pt-2 space-y-3 sm:space-y-4">
                            {/* Price Section */}
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                  Rs {product.price}
                                </span>
                                {product.original_price && product.original_price > product.price && (
                                  <span className="text-base sm:text-lg text-slate-500 line-through">
                                    Rs {product.original_price}
                                  </span>
                                )}
                              </div>
                              {product.original_price && product.original_price > product.price && (
                                <p className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Save Rs {(product.original_price - product.price).toFixed(2)}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons - Consistent Layout */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent h-9 sm:h-10"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    goToProduct(product.uu_id)
                                  }}
                                >
                                  <Eye className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                                  <span className="text-xs sm:text-sm">View</span>
                                </Button>
                              </motion.div>

                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                                <Button
                                  size="sm"
                                  disabled={product.stock === 0}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCart(product)
                                  }}
                                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 h-9 sm:h-10 relative overflow-hidden"
                                >
                                  <AnimatePresence mode="wait">
                                    {isAddingToCart ? (
                                      <motion.div
                                        key="adding"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center"
                                      >
                                        <motion.div
                                          animate={{ rotate: 360 }}
                                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                          className="w-3 sm:w-4 h-3 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                      </motion.div>
                                    ) : quantity > 0 ? (
                                      <motion.div
                                        key="added"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center"
                                      >
                                        <Check className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                                        <span className="text-xs sm:text-sm">Added ({quantity})</span>
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        key="add"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex items-center justify-center"
                                      >
                                        <Plus className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                                        <span className="text-xs sm:text-sm">Add to Cart</span>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced CTA Button */}
        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12 sm:mt-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 text-base sm:text-lg font-semibold"
                  onClick={() => router.push("/products")}
                >
                  <span className="flex items-center">
                    Explore All Products
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
              <p className="text-slate-600 mt-3 sm:mt-4 text-xs sm:text-sm">
                Discover over <span className="font-semibold text-emerald-600">1000+ premium products</span> in our
                collection
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
