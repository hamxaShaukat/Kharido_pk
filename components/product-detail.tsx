"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Plus,
  Minus,
  ChevronRight,
  User,
  ThumbsUp,
  ThumbsDown,
  Filter,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Review {
  id: number
  userName: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  helpful: number
  images?: string[]
}

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  images: string[]
  description: string
  features: string[]
  specifications: { [key: string]: string }
  inStock: boolean
  category: string
  brand: string
}

const mockProduct: Product = {
  id: 1,
  name: "Eco-Smart Wireless Headphones",
  price: 199.99,
  originalPrice: 249.99,
  rating: 4.6,
  reviewCount: 324,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  description:
    "Experience premium sound quality with our eco-friendly wireless headphones. Made from sustainable materials without compromising on performance. Features active noise cancellation, 30-hour battery life, and crystal-clear audio.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Quick charge: 5 min = 3 hours",
    "Sustainable bamboo construction",
    "Premium leather-free padding",
    "Bluetooth 5.2 connectivity",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Battery Life": "30 hours",
    "Charging Time": "2 hours",
    Weight: "250g",
    Connectivity: "Bluetooth 5.2, USB-C",
  },
  inStock: true,
  category: "Electronics",
  brand: "EcoAudio",
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing sound quality and eco-friendly!",
    comment:
      "These headphones exceeded my expectations. The sound quality is incredible, and I love that they're made from sustainable materials. The battery life is exactly as advertised.",
    verified: true,
    helpful: 23,
    images: ["/placeholder.svg?height=100&width=100"],
  },
  {
    id: 2,
    userName: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Great headphones, minor comfort issue",
    comment:
      "Sound quality is excellent and the noise cancellation works well. Only issue is they can feel a bit tight after long listening sessions, but overall very satisfied.",
    verified: true,
    helpful: 15,
  },
  {
    id: 3,
    userName: "Emma Davis",
    rating: 5,
    date: "2024-01-08",
    title: "Perfect for work from home",
    comment:
      "The noise cancellation is a game-changer for my home office. Crystal clear calls and amazing music quality. Worth every penny!",
    verified: false,
    helpful: 8,
  },
  {
    id: 4,
    userName: "Alex Rodriguez",
    rating: 4,
    date: "2024-01-05",
    title: "Solid choice for eco-conscious buyers",
    comment:
      "Good build quality and I appreciate the sustainable materials. Sound is great, though not quite as bass-heavy as I prefer.",
    verified: true,
    helpful: 12,
  },
]

export function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFilter, setReviewFilter] = useState("all")
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    userName: "",
  })

  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.title && newReview.comment && newReview.userName) {
      const review: Review = {
        id: reviews.length + 1,
        userName: newReview.userName,
        rating: newReview.rating,
        date: new Date().toISOString().split("T")[0],
        title: newReview.title,
        comment: newReview.comment,
        verified: false,
        helpful: 0,
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, title: "", comment: "", userName: "" })
      setShowReviewForm(false)
    }
  }

  const filteredReviews = reviews.filter((review) => {
    if (reviewFilter === "all") return true
    if (reviewFilter === "5") return review.rating === 5
    if (reviewFilter === "4") return review.rating === 4
    if (reviewFilter === "3") return review.rating === 3
    if (reviewFilter === "2") return review.rating === 2
    if (reviewFilter === "1") return review.rating === 1
    if (reviewFilter === "verified") return review.verified
    return true
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span>{mockProduct.category}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">{mockProduct.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl overflow-hidden"
            >
              <Image
                src={mockProduct.images[selectedImage] || "/placeholder.svg"}
                alt={mockProduct.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
              </Button>
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-emerald-500" : "border-slate-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="bg-emerald-100 text-emerald-700 mb-2">{mockProduct.brand}</Badge>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{mockProduct.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-slate-600 ml-2">{mockProduct.rating}</span>
                </div>
                <span className="text-slate-500">({mockProduct.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-slate-900">${mockProduct.price}</span>
              <span className="text-xl text-slate-500 line-through">${mockProduct.originalPrice}</span>
              <Badge className="bg-red-100 text-red-700">
                {Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">{mockProduct.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-slate-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-slate-900">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="px-6 py-3 rounded-xl bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Truck className="h-4 w-4 text-emerald-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <RotateCcw className="h-4 w-4 text-emerald-600" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-slate-200 mb-8">
            <nav className="flex space-x-8">
              <button className="py-4 px-2 border-b-2 border-emerald-500 text-emerald-600 font-medium">
                Specifications
              </button>
            </nav>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(mockProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-slate-100">
                <span className="font-medium text-slate-900">{key}</span>
                <span className="text-slate-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
            <Button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            >
              Write a Review
            </Button>
          </div>

          {/* Review Summary */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">{mockProduct.rating}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(mockProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-600">Based on {mockProduct.reviewCount} reviews</p>
            </div>

            <div className="md:col-span-2 space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-4">
                  <span className="text-sm text-slate-600 w-8">{rating}★</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-gradient-to-br from-slate-50 to-emerald-50 border-emerald-200">
                  <CardContent className="space-y-4 p-0">
                    <h3 className="text-lg font-semibold text-slate-900">Write Your Review</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your name"
                        value={newReview.userName}
                        onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                        className="bg-white"
                      />
                      <Input
                        placeholder="Review title"
                        value={newReview.title}
                        onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        className="bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <Textarea
                      placeholder="Share your experience with this product..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="min-h-[100px] bg-white"
                    />

                    <div className="flex space-x-4">
                      <Button
                        onClick={handleAddReview}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      >
                        Submit Review
                      </Button>
                      <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review Filters */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-700">Filter by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  {reviewFilter === "all" ? "All Reviews" : reviewFilter}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setReviewFilter("all")}>All Reviews</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("5")}>5 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("4")}>4 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("3")}>3 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("2")}>2 Stars</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("1")}>1 Star</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setReviewFilter("verified")}>Verified Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-900">{review.userName}</span>
                            {review.verified && (
                              <Badge className="bg-emerald-100 text-emerald-700 text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-slate-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
                    <p className="text-slate-600 mb-4 leading-relaxed">{review.comment}</p>

                    {review.images && (
                      <div className="flex space-x-2 mb-4">
                        {review.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-slate-500 hover:text-emerald-600 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors">
                        <ThumbsDown className="h-4 w-4" />
                        <span>Not helpful</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
