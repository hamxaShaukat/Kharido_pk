"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  User,
  Bell,
  Gift,
  LogOut,
  Settings,
  Package,
  Heart,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

// Mock session - replace with your actual auth logic
const mockSession = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  // Replace this with your actual session logic
  const [session, setSession] = useState<typeof mockSession | null>(null) // Change to mockSession to test logged in state
  const isLoggedIn = !!session

  const handleLogin = () => {
    router.push("/auth")
  }

  const handleLogout = () => {
    // Implement your logout logic here
    setSession(null)
    console.log("Logging out...")
  }

  const userMenuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Package, label: "My Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: CreditCard, label: "Payment Methods", href: "/payment" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

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
            onClick={() => router.push("/")}
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
            {/* Enhanced Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-emerald-500 transition-colors" />
                <Input
                  placeholder="Search for amazing products..."
                  className="pl-12 pr-4 py-3 bg-gradient-to-r from-slate-50 to-emerald-50/30 border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl font-medium placeholder:text-slate-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Notifications - only show when logged in */}
            {isLoggedIn && (
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
            )}

            {/* User Account - Desktop */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="hidden lg:block">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300 px-3 py-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.avatar || "/placeholder.svg"} alt={session.user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                          {session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{session.user.name.split(" ")[0]}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-white/95 backdrop-blur-xl border border-emerald-200/30 shadow-xl shadow-emerald-500/10"
                    align="end"
                  >
                    <div className="px-3 py-2 border-b border-slate-200">
                      <p className="font-medium text-slate-900">{session.user.name}</p>
                      <p className="text-sm text-slate-500">{session.user.email}</p>
                    </div>
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem
                        key={item.label}
                        className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 cursor-pointer transition-all duration-200"
                        onClick={() => router.push(item.href)}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:bg-red-50 hover:text-red-700 cursor-pointer transition-all duration-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
                  onClick={handleLogin}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
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

              {/* Mobile User Section */}
              {isLoggedIn ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={session.user.avatar || "/placeholder.svg"} alt={session.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        {session.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{session.user.name}</p>
                      <p className="text-sm text-slate-600">{session.user.email}</p>
                    </div>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="space-y-2">
                    {userMenuItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="w-full justify-start text-slate-700 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl transition-all duration-300"
                        onClick={() => {
                          router.push(item.href)
                          setIsMenuOpen(false)
                        }}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.label}
                      </Button>
                    ))}
                  </div>

                  {/* Mobile Logout */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                /* Mobile Login Button */
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl"
                  onClick={() => {
                    handleLogin()
                    setIsMenuOpen(false)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
