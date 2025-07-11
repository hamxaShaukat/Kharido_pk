"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/use-cart";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/types/product";

export function ProductDetail() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>();
  const [loading, setLoading] = useState<Boolean>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoading, setImageLoading] = useState(true);
  const params: { [key: string]: string | string[] | undefined } = useParams();
  const id = params.id as string | undefined;
  const addToCart = useCartStore((state) => state.addToCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const supabase = createClient();
  console.log(id, "Product ID from params");

 
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.uu_id,
        name: product.title,
        price: product.price,
        originalPrice: product.original_price,
        thumbnail: product.thumbnail,
      });
    }
  };

  const currentQuantityInCart = product ? getItemQuantity(product.uu_id) : 0;
  const discountPercentage = product?.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

 useEffect(() => {
  const fetchProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("uu_id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl animate-pulse" />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-3/4" />
                <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse" />
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse w-1/2" />
              </div>
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-gradient-to-r from-emerald-600 to-teal-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-slate-600 mb-8 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 w-fit"
        >
          <button
            onClick={() => router.push("/")}
            className="hover:text-emerald-600 transition-colors"
          >
            Home
          </button>
          <ChevronRight className="h-4 w-4" />
          <button
            onClick={() => router.push("/products")}
            className="hover:text-emerald-600 transition-colors"
          >
            Products
          </button>
          <ChevronRight className="h-4 w-4" />
          <button
            onClick={() =>
              router.push(`/products?category=${product.category}`)
            }
            className="hover:text-emerald-600 transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 rounded-3xl overflow-hidden shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={
                        product.images[selectedImage] ||
                        product.thumbnail ||
                        "/placeholder.svg"
                      }
                      alt={product.title}
                      fill
                      className="object-cover"
                      onLoad={() => setImageLoading(false)}
                    />
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-300 ${
                          isWishlisted
                            ? "fill-red-500 text-red-500 scale-110"
                            : "text-slate-600"
                        }`}
                      />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl border-0"
                    >
                      <Share2 className="h-5 w-5 text-slate-600" />
                    </Button>
                  </motion.div>
                </div>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-6 left-6"
                  >
                    <div className="relative">
                      <Badge className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white border-0 shadow-2xl px-4 py-2 text-lg font-bold">
                        <Zap className="w-4 h-4 mr-1" />
                        {discountPercentage}% OFF
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-lg opacity-50 -z-10" />
                    </div>
                  </motion.div>
                )}

                {/* Stock Status */}
                <div className="absolute bottom-6 left-6">
                  <Badge
                    className={`${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } border-0 shadow-lg backdrop-blur-sm`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {(product.images.length > 0
                ? product.images
                : [product.thumbnail]
              ).map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-emerald-500 shadow-lg shadow-emerald-500/25"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200/50 px-4 py-2 font-semibold">
                  {product.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-white/60 backdrop-blur-sm"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {product.created_at
                    ? new Date(product.created_at).toLocaleDateString()
                    : "N/A"}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Enhanced Price Section */}
              <div className="bg-gradient-to-r from-white/80 to-emerald-50/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.original_price &&
                        product.original_price > product.price && (
                          <span className="text-2xl text-slate-500 line-through">
                            ${product.original_price.toFixed(2)}
                          </span>
                        )}
                    </div>
                    {product.original_price &&
                      product.original_price > product.price && (
                        <p className="text-green-600 font-semibold flex items-center">
                          <Sparkles className="w-4 h-4 mr-1" />
                          You save $
                          {(product.original_price - product.price).toFixed(2)}
                        </p>
                      )}
                  </div>
                  {discountPercentage > 0 && (
                    <div className="text-right">
                      <div className="text-3xl font-bold text-red-600">
                        {discountPercentage}%
                      </div>
                      <div className="text-sm text-red-600">OFF</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-emerald-600" />
                Product Description
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-slate-900">Quantity</span>
                  {currentQuantityInCart > 0 && (
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {currentQuantityInCart} in cart
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-12 w-12 rounded-l-xl"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      disabled={quantity >= product.stock}
                      className="h-12 w-12 rounded-r-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-slate-600">
                    Max: {product.stock} available
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  <ShoppingCart className="h-6 w-6 mr-3" />
                  {product.stock === 0
                    ? "Out of Stock"
                    : `Add ${quantity} to Cart`}
                </Button>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Free Shipping
                </span>
                <span className="text-xs text-slate-500">
                  On orders over $50
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  30-Day Returns
                </span>
                <span className="text-xs text-slate-500">
                  Hassle-free returns
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-2 text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50"
              >
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Secure Payment
                </span>
                <span className="text-xs text-slate-500">
                  256-bit SSL encryption
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-xl"
        >
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center">
              <Tag className="w-8 h-8 mr-3 text-emerald-600" />
              Product Information
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Product ID</span>
                  <span className="text-slate-600 font-mono text-sm">
                    {product.uu_id.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Category</span>
                  <Badge className="bg-emerald-50 text-emerald-700">
                    {product.category}
                  </Badge>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-900">
                    Stock Status
                  </span>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-slate-600">
                      {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-900">Added Date</span>
                  <span className="text-slate-600">
                    {product.created_at
                      ? new Date(product.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-600" />
                Pricing History
              </h3>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Current Price</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  {product.original_price && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Original Price</span>
                        <span className="text-lg text-slate-500 line-through">
                          ${product.original_price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">You Save</span>
                        <span className="text-lg font-semibold text-green-600">
                          ${(product.original_price - product.price).toFixed(2)}{" "}
                          ({discountPercentage}%)
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
  );
}
