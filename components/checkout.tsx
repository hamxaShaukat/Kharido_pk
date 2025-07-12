"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCartItems, useCartTotalPrice, useCartTotalItems, useCartStore } from "@/store/use-cart"
import { useAddressStore } from "@/store/use-address"
import {
  Truck,
  Shield,
  CheckCircle,
  Package,
  Banknote,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Sparkles,
  Gift,
  Clock,
  Heart,
  Plus,
  Edit,
  Trash2,
  Save,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Checkout() {
  const router = useRouter()
  const items = useCartItems()
  const totalPrice = useCartTotalPrice()
  const totalItems = useCartTotalItems()
  const clearCart = useCartStore((state) => state.clearCart)

  // Address store
  const addresses = useAddressStore((state) => state.addresses)
  const selectedAddressId = useAddressStore((state) => state.selectedAddressId)
  const saveAddress = useAddressStore((state) => state.saveAddress)
  const selectAddress = useAddressStore((state) => state.selectAddress)
  const deleteAddress = useAddressStore((state) => state.deleteAddress)
  const getSelectedAddress = useAddressStore((state) => state.getSelectedAddress)

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    orderNotes: "",
    addressName: "", // For saving address
  })

  useEffect(() => {
    const selectedAddr = getSelectedAddress()
    if (selectedAddr) {
      setFormData({
        firstName: selectedAddr.firstName,
        lastName: selectedAddr.lastName,
        email: selectedAddr.email,
        phone: selectedAddr.phone,
        address: selectedAddr.address,
        city: selectedAddr.city,
        state: selectedAddr.state,
        zipCode: selectedAddr.zipCode,
        country: selectedAddr.country,
        orderNotes: "",
        addressName: selectedAddr.name,
      })
    }
  }, [selectedAddressId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSaveAddress = () => {
    if (!formData.addressName.trim()) {
      alert("Please enter a name for this address")
      return
    }

    saveAddress({
      name: formData.addressName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      isDefault: addresses.length === 0,
    })

    setShowAddressForm(false)
    alert("Address saved successfully!")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setOrderComplete(true)
    setIsProcessing(false)
    clearCart()
  }

  const shippingCost = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shippingCost + tax

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
          <p className="text-slate-600 mb-8">Add some amazing products to proceed with checkout.</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-8 py-3 rounded-xl font-semibold shadow-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center max-w-lg mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <CheckCircle className="h-16 w-16 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              🎉 Thank you for your purchase! Your order has been confirmed and will be delivered soon.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-emerald-200/50 shadow-xl">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Gift className="h-6 w-6 text-emerald-600" />
                <p className="text-lg font-semibold text-slate-900">Order Details</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Order Number:</span>
                  <span className="font-mono text-lg font-bold text-emerald-600">
                    #ECO-{Date.now().toString().slice(-6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Amount:</span>
                  <span className="text-xl font-bold text-slate-900">Rs {finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method:</span>
                  <Badge className="bg-amber-100 text-amber-800">Cash on Delivery</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Estimated Delivery:</span>
                  <span className="font-medium text-slate-900">3-5 Business Days</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => router.push("/products")}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-4 rounded-xl text-lg font-semibold shadow-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-4 rounded-xl font-semibold bg-white/80 backdrop-blur-sm"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700">Secure Checkout</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            You're just one step away from getting your amazing eco-friendly products!
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Secure & Protected</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Heart className="h-4 w-4 text-emerald-600" />
              <span>Eco-Friendly</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Saved Addresses */}
              {addresses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Saved Addresses
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {addresses.map((address) => (
                          <motion.div
                            key={address.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedAddressId === address.id
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200 bg-white hover:border-emerald-300"
                            }`}
                            onClick={() => selectAddress(address.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-slate-900">{address.name}</h4>
                                  {address.isDefault && (
                                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">Default</Badge>
                                  )}
                                </div>
                                <p className="text-slate-700 font-medium">
                                  {address.firstName} {address.lastName}
                                </p>
                                <p className="text-slate-600 text-sm">
                                  {address.address}, {address.city}, {address.state} {address.zipCode}
                                </p>
                                <p className="text-slate-600 text-sm">{address.phone}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-slate-500 hover:text-emerald-600"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingAddress(address.id)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 text-slate-500 hover:text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteAddress(address.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-4 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                        onClick={() => setShowAddressForm(!showAddressForm)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Address Form */}
              <AnimatePresence>
                {(showAddressForm || addresses.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          {addresses.length === 0 ? "Delivery Information" : "New Address"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                        {/* Address Name for Saving */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Address Name (for saving) *
                          </label>
                          <Input
                            name="addressName"
                            value={formData.addressName}
                            onChange={handleInputChange}
                            placeholder="e.g., Home, Office, etc."
                            required
                            className="h-12 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">First Name *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                              <Input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="h-12 pl-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                                placeholder="John"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Last Name *</label>
                            <Input
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="h-12 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Email *</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                              <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="h-12 pl-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Phone *</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                              <Input
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="h-12 pl-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                                placeholder="+92 300 1234567"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3">Street Address *</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-4 h-5 w-5 text-slate-400" />
                            <Textarea
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required
                              className="pl-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl resize-none text-lg"
                              rows={3}
                              placeholder="123 Main Street, Apartment 4B"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">City *</label>
                            <Input
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="h-12 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                              placeholder="Karachi"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">State/Province *</label>
                            <Input
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              className="h-12 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                              placeholder="Sindh"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">ZIP Code *</label>
                            <Input
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="h-12 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-lg"
                              placeholder="75500"
                            />
                          </div>
                        </div>

                        {/* Save Address Button */}
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            onClick={handleSaveAddress}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg"
                          >
                            <Save className="h-5 w-5 mr-2" />
                            Save This Address
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payment Method - Cash on Delivery */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <CardTitle className="flex items-center">
                      <Banknote className="h-5 w-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Banknote className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-slate-900 mb-2">Cash on Delivery</h3>
                          <p className="text-slate-600 leading-relaxed">
                            Pay when your order arrives at your doorstep. Safe, secure, and convenient!
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold">
                            Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Order Notes */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <CardTitle>Special Instructions (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Textarea
                      name="orderNotes"
                      placeholder="Any special instructions for delivery or packaging..."
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      className="bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl resize-none text-lg"
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-4 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Summary
                  </span>
                  <Badge className="bg-white/20 text-white">{totalItems} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Order Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl border border-emerald-100"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-xl shadow-sm"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">{item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 line-clamp-2 leading-tight text-sm">{item.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">Qty: {item.quantity}</span>
                          <span className="font-bold text-emerald-600">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-slate-700">Subtotal</span>
                      <span className="font-semibold">Rs {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Shipping</span>
                      <span className={`font-medium ${shippingCost === 0 ? "text-green-600" : "text-slate-700"}`}>
                        {shippingCost === 0 ? "FREE" : `Rs ${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Tax</span>
                      <span className="font-medium">Rs {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-900">Total</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Rs {finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-100">
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Secure Order</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-600">
                    <Truck className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Fast Delivery</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing || !getSelectedAddress()}
                    className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Banknote className="h-6 w-6 mr-3" />
                        Place Order - Rs {finalTotal.toFixed(2)}
                      </>
                    )}
                  </Button>
                </motion.div>

                {shippingCost > 0 && (
                  <p className="text-xs text-center text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-2">
                    💡 Add Rs {(50 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
