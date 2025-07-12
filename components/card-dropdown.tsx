"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCartItems, useCartTotalItems, useCartTotalPrice, useCartStore } from "@/store/use-cart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Package2,
  CreditCard,
  Eye,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"

export function CartDropdown() {
  const items = useCartItems()
  const totalItems = useCartTotalItems()
  const totalPrice = useCartTotalPrice()
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownHeight, setDropdownHeight] = useState("auto")

  // Calculate optimal dropdown height based on viewport
  useEffect(() => {
    const calculateDropdownHeight = () => {
      const viewportHeight = window.innerHeight
      const headerHeight = 80 // Approximate header height
      const footerSpace = 20 // Space from bottom
      const maxHeight = viewportHeight - headerHeight - footerSpace

      // Set different max heights based on content
      if (items.length === 0) {
        setDropdownHeight(`${Math.min(600, maxHeight)}px`)
      } else if (items.length <= 2) {
        setDropdownHeight(`${Math.min(650, maxHeight)}px`)
      } else {
        setDropdownHeight(`${Math.min(650, maxHeight)}px`)
      }
    }

    calculateDropdownHeight()
    window.addEventListener("resize", calculateDropdownHeight)
    return () => window.removeEventListener("resize", calculateDropdownHeight)
  }, [items.length])

  const handleCheckout = () => {
    setIsOpen(false)
    router.push("/checkout")
  }

  const handleViewCart = () => {
    setIsOpen(false)
    router.push("/cart")
  }

  console.log(isOpen, "Cart Dropdown Open State")

  const CartTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ ...props }, ref) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        className="relative text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 group cursor-pointer"
        ref={ref}
        {...props}
      >
        <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs h-6 w-6 flex items-center justify-center p-0 border-2 border-white shadow-lg">
                {totalItems}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  ))

  // Mobile Cart Content (320px-480px)
  const MobileCartContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-white">
      {/* Mobile Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-xl">My Cart</h2>
                <p className="text-emerald-100 text-sm">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-white/80 hover:text-white hover:bg-white/20 border border-white/30 text-xs rounded-xl backdrop-blur-sm px-3 py-1.5"
              >
                Clear
              </Button>
            )}
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm font-medium">Total Amount</span>
              <span className="text-white font-bold text-2xl">Rs {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package2 className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Cart is Empty</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs">
              Add some amazing products to get started with your shopping!
            </p>
            <Button
              onClick={() => {
                setIsOpen(false)
                router.push("/products")
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Mobile Cart Items */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-4 py-4">
              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
                    >
                      <div className="flex items-start space-x-3">
                        {/* Mobile Product Image */}
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-xl"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">{item.quantity}</span>
                          </div>
                        </div>
                        {/* Mobile Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-2 pr-2">
                              {item.name}
                            </h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {/* Mobile Price */}
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-emerald-600 text-lg">Rs {item.price.toFixed(2)}</span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-xs text-slate-500 line-through">
                                  Rs {item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {/* Mobile Stock Status */}
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-2 h-2 rounded-full ${item.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
                              />
                              <span className="text-xs text-slate-600">
                                {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                              </span>
                            </div>
                            {/* Mobile Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center bg-slate-100 rounded-xl">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 hover:bg-slate-200 rounded-l-xl"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9 hover:bg-slate-200 rounded-r-xl"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              {/* Mobile Stock Warning */}
                              {item.quantity >= item.stock && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center space-x-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1"
                                >
                                  <AlertTriangle className="h-3 w-3 text-amber-600" />
                                  <span className="text-xs text-amber-700 font-medium">Max</span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
          {/* Mobile Bottom Actions */}
          <div className="p-4 bg-white border-t border-slate-200 space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl group"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Checkout Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <Button
              variant="outline"
              onClick={handleViewCart}
              className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-2xl bg-transparent font-semibold py-3"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Cart
            </Button>
          </div>
        </>
      )}
    </div>
  )

  // Desktop Cart Content (>480px) - Optimized for viewport constraints
  const DesktopCartContent = () => {
    const maxItemsHeight = items.length === 0 ? 0 : Math.min(items.length * 120, 300) // Limit items scroll area

    return (
      <div className="flex flex-col" style={{ maxHeight: dropdownHeight }}>
        {/* Desktop Header with Gradient */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-4 sm:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Shopping Cart</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">
                  {totalItems} {totalItems === 1 ? "item" : "items"} • Rs {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-white/80 hover:text-white hover:bg-white/20 border border-white/20 text-xs rounded-lg backdrop-blur-sm px-2 py-1"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Your cart is empty</h4>
                <p className="text-slate-500 text-xs sm:text-sm mb-4">Discover our amazing eco-friendly products!</p>
                <Button
                  onClick={() => router.push("/products")}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg text-sm"
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  Start Shopping
                </Button>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Desktop Cart Items with constrained height */}
              <div className="px-4 sm:px-6 pt-4 flex-1 overflow-hidden">
                <ScrollArea style={{ height: `200px` }} className="pr-2">
                  <div className="space-y-3">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group"
                        >
                          <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 p-3 rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start space-x-3">
                              {/* Desktop Product Image */}
                              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                                <Image
                                  src={item.thumbnail || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-lg shadow-sm"
                                />
                                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">{item.quantity}</span>
                                </div>
                              </div>
                              {/* Desktop Product Info */}
                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-semibold text-slate-900 line-clamp-2 leading-tight text-sm pr-2">
                                    {item.name}
                                  </h4>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-emerald-600 text-sm sm:text-base">
                                        Rs {item.price.toFixed(2)}
                                      </span>
                                      {item.originalPrice && item.originalPrice > item.price && (
                                        <span className="text-xs text-slate-500 line-through">
                                          Rs {item.originalPrice.toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          item.stock > 0 ? "bg-green-500" : "bg-red-500"
                                        }`}
                                      />
                                      <span className="text-xs text-slate-600">
                                        {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Desktop Quantity Controls */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-slate-100 rounded-l-lg"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    </Button>
                                    <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold min-w-[2rem] sm:min-w-[2.5rem] text-center">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-slate-100 rounded-r-lg"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      disabled={item.quantity >= item.stock}
                                    >
                                      <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                    </Button>
                                  </div>
                                  {/* Desktop Stock Warning */}
                                  {item.quantity >= item.stock && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="flex items-center space-x-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1"
                                    >
                                      <AlertTriangle className="h-2.5 w-2.5 text-amber-600" />
                                      <span className="text-xs text-amber-700 font-medium">Max</span>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </div>

              {/* Desktop Cart Summary - Fixed at bottom */}
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 flex-shrink-0 border-t border-slate-200/50 bg-white">
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-3 rounded-xl border border-emerald-200/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-900 text-sm">
                        Total ({totalItems} {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Rs {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Shipping calculated at checkout</p>
                  </div>
                  <div className="space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm"
                      >
                        <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                    <Button
                      variant="outline"
                      onClick={handleViewCart}
                      className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl bg-transparent backdrop-blur-sm font-medium py-2 text-sm"
                    >
                      View Full Cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Version (320px-480px) - Sheet */}
      <div className="block sm:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <CartTrigger />
          </SheetTrigger>
          <SheetContent side="right" className="w-full p-0 border-0">
            <SheetHeader>
              <SheetTitle className="hidden">Shopping cart</SheetTitle>
            </SheetHeader>
            <MobileCartContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Version (>480px) - Dropdown with viewport constraints */}
      <div className="hidden sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CartTrigger />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[380px] sm:w-[420px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl shadow-emerald-500/20 p-0 rounded-2xl overflow-hidden"
            align="end"
            side="bottom"
            sideOffset={8}
            alignOffset={-10}
            avoidCollisions={true}
            collisionPadding={20}
          >
            <DesktopCartContent />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
