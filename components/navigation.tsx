"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ShoppingCart, Menu, ChevronDown, User, Bell, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books", "Beauty"]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-emerald-200/30 shadow-lg shadow-emerald-500/5"
    >
      {/* Top promotional bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-2 px-4 text-center text-sm font-medium relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        <div className="relative z-10 flex items-center justify-center space-x-2">
          <Gift className="h-4 w-4" />
          <span>Free shipping on orders over $50 • Summer Sale: Up to 50% OFF</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <span className="text-white font-bold text-xl relative z-10">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-slate-800 bg-clip-text text-transparent">
                EcoStore
              </span>
              <div className="text-xs text-emerald-600 font-medium -mt-1">Premium • Sustainable</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 max-w-3xl mx-8">
            {/* Enhanced Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 font-medium px-4 py-2 rounded-xl"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    <span>Categories</span>
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-xl border border-emerald-200/30 shadow-xl shadow-emerald-500/10">
                {categories.map((category, index) => (
                  <DropdownMenuItem
                    key={category}
                    className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 cursor-pointer transition-all duration-200 font-medium"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
                      <span>{category}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-emerald-500 transition-colors" />
                <Input
                  placeholder="Search for amazing products..."
                  className="pl-12 pr-4 py-3 bg-gradient-to-r from-slate-50 to-emerald-50/30 border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl font-medium placeholder:text-slate-400 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs text-slate-500 bg-slate-100 rounded border">⌘K</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0 border-2 border-white">
                  2
                </Badge>
              </Button>
            </motion.div>

            {/* User Account */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Enhanced Shopping Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 group"
              >
                <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
                <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs h-6 w-6 flex items-center justify-center p-0 border-2 border-white shadow-lg">
                  3
                </Badge>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-6 pb-6 border-t border-emerald-200/30"
          >
            <div className="pt-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search products..."
                  className="pl-12 bg-gradient-to-r from-slate-50 to-emerald-50/30 border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
                />
              </div>

              {/* Mobile Categories */}
              <div className="space-y-3">
                <p className="font-semibold text-slate-800 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                  <span>Categories</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="justify-start text-slate-600 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex space-x-4 pt-4 border-t border-emerald-200/30">
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl bg-transparent"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Alerts
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
