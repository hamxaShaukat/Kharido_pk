"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Star,
  Heart,
  ShoppingCart,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/use-cart";
import categories from "@/constants/categories";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  thumbnail: string;
  image: string;
  badge?: string;
  category: string;
  brand: string;
  inStock: boolean;
  featured: boolean;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Eco-Smart Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 324,
    thumbnail: "/placeholder.svg?height=300&width=300",
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    category: "Electronics",
    brand: "EcoAudio",
    inStock: true,
    featured: true,
  },
];


const brands = ["All", ...Array.from(new Set(allProducts.map((p) => p.brand)))];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "reviews", label: "Most Reviews" },
];

export function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);
  const itemsPerPage = 12;
  const addToCart = useCartStore((state) => state.addToCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All" || product.brand === selectedBrand;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      const matchesStock = !showInStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        case "reviews":
          return b.reviews - a.reviews;
        case "featured":
        default:
          return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    priceRange,
    minRating,
    showInStockOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleWishlist = (productId: number) => {
    setWishlistedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 300]);
    setMinRating(0);
    setShowInStockOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
          <span>Home</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">All Products</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              All Products
            </h1>
            <p className="text-slate-600">
              Showing {paginatedProducts.length} of{" "}
              {filteredAndSortedProducts.length} products
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-slate-50 border-slate-200 focus:border-emerald-500"
              />
            </div>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  Sort by:{" "}
                  {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Toggle */}
            <div className="flex border border-slate-200 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-emerald-600 text-white" : ""
                }
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-emerald-600 text-white" : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:block ${
              showFilters ? "block" : "hidden"
            } w-full lg:w-80 space-y-6`}
          >
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2 text-emerald-600" />
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-emerald-600"
                >
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-slate-900">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-slate-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-slate-900">Brand</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedBrand === brand}
                        onCheckedChange={() => setSelectedBrand(brand)}
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <span className="text-sm text-slate-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-slate-900">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-slate-900">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={minRating === rating}
                        onCheckedChange={() => setMinRating(rating)}
                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-slate-700 ml-1">
                          {rating === 0 ? "All" : `${rating}+ Stars`}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={showInStockOnly}
                    onCheckedChange={(checked) =>
                      setShowInStockOnly(checked === true)
                    }
                    className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                  />
                  <span className="text-sm text-slate-700">In Stock Only</span>
                </label>
              </div>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {viewMode === "grid" ? (
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm group">
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={300}
                                height={300}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {product.badge && (
                                <div className="absolute top-3 left-3">
                                  <Badge
                                    className={`${
                                      product.badge === "Best Seller"
                                        ? "bg-emerald-500"
                                        : product.badge === "New"
                                        ? "bg-blue-500"
                                        : product.badge === "Sale"
                                        ? "bg-red-500"
                                        : "bg-slate-500"
                                    } text-white border-0`}
                                  >
                                    {product.badge}
                                  </Badge>
                                </div>
                              )}
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="bg-white/90 hover:bg-white shadow-lg"
                                  onClick={() => toggleWishlist(product.id)}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${
                                      wishlistedItems.includes(product.id)
                                        ? "fill-red-500 text-red-500"
                                        : "text-slate-600"
                                    }`}
                                  />
                                </Button>
                              </div>
                              {!product.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <span className="text-white font-semibold">
                                    Out of Stock
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-slate-500 font-medium">
                                  {product.category}
                                </span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">
                                    {product.rating}
                                  </span>
                                  <span className="text-xs text-slate-500">
                                    ({product.reviews})
                                  </span>
                                </div>
                              </div>

                              <h3 className="font-semibold text-sm mb-2 text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                <a
                                  href={`/product/${product.id}`}
                                  className="hover:underline"
                                >
                                  {product.name}
                                </a>
                              </h3>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg font-bold text-slate-800">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice > product.price && (
                                    <span className="text-xs text-slate-500 line-through">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  disabled={!product.inStock}
                                  onClick={() =>
                                    addToCart({
                                      id: product.id,
                                      name: product.name,
                                      price: product.price,
                                      originalPrice: product.originalPrice,
                                      thumbnail: product.thumbnail,
                                    })
                                  }
                                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="relative w-48 h-32 flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                                {product.badge && (
                                  <div className="absolute top-2 left-2">
                                    <Badge
                                      className={`${
                                        product.badge === "Best Seller"
                                          ? "bg-emerald-500"
                                          : product.badge === "New"
                                          ? "bg-blue-500"
                                          : product.badge === "Sale"
                                          ? "bg-red-500"
                                          : "bg-slate-500"
                                      } text-white border-0 text-xs`}
                                    >
                                      {product.badge}
                                    </Badge>
                                  </div>
                                )}
                                {!product.inStock && (
                                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                      Out of Stock
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-500 font-medium">
                                      {product.category}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium">
                                        {product.rating}
                                      </span>
                                      <span className="text-sm text-slate-500">
                                        ({product.reviews})
                                      </span>
                                    </div>
                                  </div>

                                  <h3 className="font-semibold text-lg mb-2 text-slate-800 hover:text-emerald-700 transition-colors">
                                    <a
                                      href={`/product/${product.id}`}
                                      className="hover:underline"
                                    >
                                      {product.name}
                                    </a>
                                  </h3>

                                  <p className="text-sm text-slate-600 mb-3">
                                    Brand: {product.brand}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold text-slate-800">
                                      ${product.price}
                                    </span>
                                    {product.originalPrice > product.price && (
                                      <span className="text-sm text-slate-500 line-through">
                                        ${product.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      onClick={() => toggleWishlist(product.id)}
                                      className="bg-transparent"
                                    >
                                      <Heart
                                        className={`h-4 w-4 ${
                                          wishlistedItems.includes(product.id)
                                            ? "fill-red-500 text-red-500"
                                            : "text-slate-600"
                                        }`}
                                      />
                                    </Button>
                                    <Button
                                      disabled={!product.inStock}
                                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                                    >
                                      <ShoppingCart className="h-4 w-4 mr-2" />
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="bg-transparent"
                    >
                      Previous
                    </Button>

                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-emerald-600 text-white"
                                : "bg-transparent"
                            }
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="bg-transparent"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
