"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  ShoppingCart,
  Search,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  Package,
  TrendingUp,
  Sparkles,
  Eye,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
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
import { createClient } from "@/utils/supabase/client";
import type { Product } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name", label: "Name A-Z" },
];

export function ProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const itemsPerPage = 12;
  const addToCart = useCartStore((state) => state.addToCart);
  const supabase = createClient();

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return (
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
          );
        case "name":
          return a.title.localeCompare(b.title);
        case "featured":
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    showInStockOnly,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleWishlist = (productId: string) => {
    setWishlistedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange([0, 1000]);
    setShowInStockOnly(false);
    setCurrentPage(1);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    const goToProduct = (id: string) => {
    router.push(`/product/${id}`)
  }


  useEffect(() => {
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL]);

  const maxPrice = Math.max(...products.map((p) => p.price), 1000);

  // Filter Component for reuse
  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3
          className={`font-bold text-slate-900 flex items-center ${
            isMobile ? "text-lg" : "text-xl"
          }`}
        >
          <SlidersHorizontal
            className={`mr-2 text-emerald-600 ${
              isMobile ? "h-4 w-4" : "h-5 w-5"
            }`}
          />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-emerald-600 hover:text-emerald-700"
        >
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900 flex items-center text-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
          Category
        </h4>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <motion.label
              key={category}
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
                className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
              />
              <span className="text-sm text-slate-700 group-hover:text-emerald-600 transition-colors flex-1">
                {category}
              </span>
              <span className="text-xs text-slate-400">
                {category === "All"
                  ? products.length
                  : products.filter((p) => p.category === category).length}
              </span>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900 flex items-center text-sm">
          <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
          Price Range
        </h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={maxPrice}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-600 mt-3">
            <span className="bg-emerald-50 px-2 py-1 rounded-lg font-medium">
              Rs {priceRange[0]}
            </span>
            <span className="bg-emerald-50 px-2 py-1 rounded-lg font-medium">
              Rs {priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900 flex items-center text-sm">
          <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
          Availability
        </h4>
        <motion.label
          className="flex items-center space-x-3 cursor-pointer group"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <Checkbox
            checked={showInStockOnly}
            onCheckedChange={(checked) => setShowInStockOnly(checked === true)}
            className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
          />
          <span className="text-sm text-slate-700 group-hover:text-emerald-600 transition-colors flex-1">
            In Stock Only
          </span>
          <span className="text-xs text-slate-400">
            {products.filter((p) => p.stock > 0).length}
          </span>
        </motion.label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-2 mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium text-sm md:text-base">
                Discover Amazing Products
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Product
              </span>
            </h1>
            <p className="text-sm md:text-xl text-emerald-100 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Explore our curated collection of premium products designed to
              enhance your lifestyle
            </p>
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-slate-900 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Search for products, categories, or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 md:pl-14 pr-4 md:pr-6 h-12 md:h-16 text-base md:text-lg bg-white/95 backdrop-blur-sm text-slate-800 border-0 rounded-xl md:rounded-2xl shadow-2xl focus:ring-4 focus:ring-white/30 transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-900">
                {products.length}
              </p>
              <p className="text-xs md:text-sm text-slate-600">
                Total Products
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-900">
                {filteredAndSortedProducts.length}
              </p>
              <p className="text-xs md:text-sm text-slate-600">
                Filtered Results
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 md:w-6 md:h-6 text-cyan-600" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-900">
                {wishlistedItems.length}
              </p>
              <p className="text-xs md:text-sm text-slate-600">
                Wishlist Items
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-3 md:p-4 text-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-slate-900">
                {categories.length - 1}
              </p>
              <p className="text-xs md:text-sm text-slate-600">Categories</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Products
            </h2>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs md:text-sm"
            >
              {filteredAndSortedProducts.length} items
            </Badge>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white text-sm"
                >
                  Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className="rounded-lg"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Filter Sheet */}
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm border-slate-200"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full p-0">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-full p-4">
                    <FilterContent isMobile={true} />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block w-80 space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-4">
              <CardContent className="p-6">
                <FilterContent />
              </CardContent>
            </Card>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 sm:py-20">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mt-8 sm:mt-12 w-full">
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
              </div>
            ) : paginatedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 md:h-16 md:w-16 text-emerald-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm md:text-base px-4">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
                  <AnimatePresence>
                    {paginatedProducts.map((product, index) => {
                      const isWishlisted = wishlistedItems.includes(
                        product.uu_id
                      );
                      const isHovered = hoveredProduct === product.uu_id;

                      return (
                        <motion.div
                          key={product.uu_id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: index * 0.05 }}
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
                              animate={
                                isHovered
                                  ? { scale: [1, 1.2, 1], rotate: 360 }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />

                            <CardContent className="relative p-0 z-10">
                              <div className="relative overflow-hidden rounded-t-2xl">
                                <div className="relative w-full h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-slate-100 via-white to-slate-50">
                                  <Image
                                    src={
                                      product.thumbnail ||
                                      "/placeholder.svg?height=320&width=320"
                                    }
                                    alt={product.title || "Product Image"}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                  {/* Floating Discount Badge */}
                                  {product.original_price &&
                                    product.original_price > product.price && (
                                      <motion.div
                                        className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                          duration: 0.5,
                                          delay: index * 0.1,
                                        }}
                                      >
                                        <div className="relative">
                                          <Badge className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white border-0 shadow-2xl px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold">
                                            <TrendingUp className="w-2 sm:w-3 h-2 sm:h-3 mr-1" />
                                            {Math.round(
                                              ((product.original_price -
                                                product.price) /
                                                product.original_price) *
                                                100
                                            )}
                                            % OFF
                                          </Badge>
                                          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-lg opacity-50 -z-10" />
                                        </div>
                                      </motion.div>
                                    )}
                                  {/* Floating Action Buttons */}
                                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2 sm:gap-3 opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-x-4 sm:group-hover:translate-x-0">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button
                                        size="icon"
                                        className="bg-white/95 hover:bg-white shadow-2xl backdrop-blur-sm border-0 text-slate-600 hover:text-red-500 transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleWishlist(product.uu_id);
                                        }}
                                      >
                                        <Heart
                                          className={`h-3 sm:h-4 w-3 sm:w-4 transition-all duration-300 ${
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
                                        size="icon"
                                        className="bg-white/95 hover:bg-white shadow-2xl backdrop-blur-sm border-0 text-slate-600 hover:text-emerald-600 transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10"
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
                                        <span className="text-white font-bold text-sm sm:text-lg">
                                          Out of Stock
                                        </span>
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
                                        className={`w-3 sm:w-4 h-3 sm:h-4 ${
                                          i < 4
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-slate-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs sm:text-sm text-slate-600 ml-1">
                                      (4.8)
                                    </span>
                                  </div>
                                </div>
                                {/* Product Title */}
                                <h3 className="font-bold text-lg sm:text-xl text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 leading-tight">
                                  {product.title}
                                </h3>
                                {/* Stock Indicator */}
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      product.stock > 0
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    }`}
                                  />
                                  <span className="text-xs sm:text-sm text-slate-600">
                                    {product.stock > 0
                                      ? `${product.stock} in stock`
                                      : "Out of stock"}
                                  </span>
                                </div>
                                {/* Price and Action Section */}
                                <div className="pt-2 space-y-3 sm:space-y-4">
                                  {/* Price Section */}
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                        Rs {product.price}
                                      </span>
                                      {product.original_price &&
                                        product.original_price >
                                          product.price && (
                                          <span className="text-base sm:text-lg text-slate-500 line-through">
                                            Rs {product.original_price}
                                          </span>
                                        )}
                                    </div>
                                    {product.original_price &&
                                      product.original_price >
                                        product.price && (
                                        <p className="text-xs sm:text-sm text-green-600 font-medium flex items-center">
                                          <Zap className="w-3 h-3 mr-1" />
                                          Save Rs{" "}
                                          {(
                                            product.original_price -
                                            product.price
                                          ).toFixed(2)}
                                        </p>
                                      )}
                                  </div>
                                  {/* Action Buttons */}
                                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex-1"
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent h-9 sm:h-10"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          goToProduct(product.uu_id);
                                        }}
                                      >
                                        <Eye className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                                        <span className="text-xs sm:text-sm">
                                          View
                                        </span>
                                      </Button>
                                    </motion.div>
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex-1"
                                    >
                                      <Button
                                        size="sm"
                                        disabled={product.stock === 0}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addToCart({
                                            id: product.uu_id,
                                            name: product.title,
                                            price: product.price,
                                            originalPrice:
                                              product.original_price,
                                            thumbnail: product.thumbnail,
                                            stock: product.stock,
                                          });
                                        }}
                                        className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 h-9 sm:h-10"
                                      >
                                        <ShoppingCart className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                                        <span className="text-xs sm:text-sm">
                                          Add to Cart
                                        </span>
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-2 mt-8 md:mt-12"
                  >
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Previous</span>
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
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
                                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                                  : "bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white"
                              }
                              size="sm"
                            >
                              {page}
                            </Button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span
                              key={page}
                              className="text-slate-400 px-2 py-1"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
