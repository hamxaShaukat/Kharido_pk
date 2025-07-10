"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useCartItems,
  useCartTotalItems,
  useCartTotalPrice,
  useCartActions,
  useCartStore,
} from "@/store/use-cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartDropdown() {
  const items = useCartItems();
  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 group cursor-pointer"
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-96 bg-white/95 backdrop-blur-xl border border-emerald-200/30 shadow-xl shadow-emerald-500/10 p-0"
        align="end"
        sideOffset={8}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-slate-900 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-emerald-600" />
              Shopping Cart
            </h3>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-slate-500 hover:text-red-600 text-xs"
              >
                Clear All
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-600 mb-2">Your cart is empty</p>
              <p className="text-sm text-slate-500">
                Add some eco-friendly products!
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="max-h-80 overflow-y-auto space-y-3 mb-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">elect</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-semibold text-emerald-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-400">
                            Stock: 6
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border border-slate-200 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-slate-200"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-slate-200"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 9}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Separator className="my-4" />

              {/* Cart Summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-900">
                    Total ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-bold text-lg text-emerald-600">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleViewCart}
                    className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl bg-transparent"
                  >
                    View Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
