"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  User,
  Mail,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  PrinterIcon as Print,
  Share,
  Star,
  Gift,
  CreditCard,
} from "lucide-react"
import Image from "next/image"
import { type OrderData, type OrderItem, ORDERSTATUS } from "@/types/order"
import { GetSpecificOrderItems } from "@/hooks/order/useReadOrderItem"
import { FetchSpecificOrder } from "@/hooks/order/useFetchSpecificOrder"
import { GetSpecificAddress } from "@/hooks/address/useFetchSpecificAddress"
import type { Address } from "@/types/address"

interface OrderDetailsProps {
  orderId: string
  onBack: () => void
}

interface LoadingState {
  order: boolean
  items: boolean
  address: boolean
}

export function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  const [order, setOrder] = useState<OrderData>()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [address, setAddress] = useState<Address>()
  const [loading, setLoading] = useState<LoadingState>({
    order: true,
    items: true,
    address: true,
  })
  const [error, setError] = useState<string>("")

  // Sequential data loading
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        // Step 1: Load order details first
        setLoading((prev) => ({ ...prev, order: true }))
        const orderData = await FetchSpecificOrder(orderId)
        if (!orderData) {
          throw new Error("Order not found")
        }
        setOrder(orderData)
        setLoading((prev) => ({ ...prev, order: false }))

        // Step 2: Load order items
        setLoading((prev) => ({ ...prev, items: true }))
        const orderItems = await GetSpecificOrderItems(orderId)
        setOrderItems(orderItems || [])
        setLoading((prev) => ({ ...prev, items: false }))

        // Step 3: Load address (only after we have order data)
        if (orderData?.address_id) {
          setLoading((prev) => ({ ...prev, address: true }))
          const addressData = await GetSpecificAddress(orderData.address_id)
          setAddress(addressData)
          setLoading((prev) => ({ ...prev, address: false }))
        } else {
          setLoading((prev) => ({ ...prev, address: false }))
        }
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : "Failed to load order details")
        setLoading({ order: false, items: false, address: false })
      }
    }

    if (orderId) {
      loadOrderData()
    }
  }, [orderId])

  const getStatusIcon = (status: ORDERSTATUS) => {
    switch (status) {
      case ORDERSTATUS.PENDING:
        return <Clock className="h-5 w-5" />
      case ORDERSTATUS.PROCESSING:
        return <Package className="h-5 w-5" />
      case ORDERSTATUS.SHIPPED:
        return <Truck className="h-5 w-5" />
      case ORDERSTATUS.DELIVERED:
        return <CheckCircle className="h-5 w-5" />
      case ORDERSTATUS.CANCELLED:
        return <XCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: ORDERSTATUS) => {
    switch (status) {
      case ORDERSTATUS.PENDING:
        return "bg-amber-100 text-amber-800 border-amber-200"
      case ORDERSTATUS.PROCESSING:
        return "bg-purple-100 text-purple-800 border-purple-200"
      case ORDERSTATUS.SHIPPED:
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case ORDERSTATUS.DELIVERED:
        return "bg-green-100 text-green-800 border-green-200"
      case ORDERSTATUS.CANCELLED:
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate totals safely
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
  const originalTotal = orderItems.reduce((sum, item) => sum + (item.original_price || 0) * (item.quantity || 0), 0)
  const savings = originalTotal - subtotal
  const tax = subtotal * 0.08
  const shipping = subtotal > 5000 ? 0 : 150

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 max-w-md">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading Order</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={onBack} className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Main loading state (when order is still loading)
  if (loading.order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading order details...</p>
          </div>
          <OrderDetailsSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
              <Gift className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-700">Order Receipt</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
              Order Details
            </h1>
            <p className="text-xl text-slate-600">Thank you for your purchase!</p>
          </div>
        </motion.div>

        {/* Receipt Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            {/* Receipt Header */}
            <CardHeader className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold mb-2">EcoStore</CardTitle>
                  <p className="text-emerald-100">Your Eco-Friendly Shopping Destination</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-100 text-sm">Order Number</p>
                  <p className="text-2xl font-mono font-bold">{order?.order_num || "Loading..."}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Order Status and Date */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    {order?.status ? getStatusIcon(order.status) : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Order Status</p>
                    {order?.status ? (
                      <Badge className={`${getStatusColor(order.status)} border font-semibold text-base px-3 py-1`}>
                        {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                      </Badge>
                    ) : (
                      <Skeleton className="h-6 w-24" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Order Date
                  </p>
                  {order?.created_at ? (
                    <p className="font-semibold text-slate-900">{formatDate(order.created_at)}</p>
                  ) : (
                    <Skeleton className="h-5 w-32" />
                  )}
                </div>
              </div>

              {/* Customer Information */}
              <div className="flex justify-between p-5">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-emerald-600" />
                    Customer Information
                  </h3>
                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-slate-500" />
                      {order?.user_name ? (
                        <span className="font-medium text-slate-900">{order.user_name}</span>
                      ) : (
                        <Skeleton className="h-4 w-32" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-slate-500" />
                      {order?.user_email ? (
                        <span className="text-slate-600">{order.user_email}</span>
                      ) : (
                        <Skeleton className="h-4 w-48" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                    Delivery Address
                  </h3>
                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                    {loading.address ? (
                      <AddressSkeleton />
                    ) : address ? (
                      <>
                        <p className="font-medium text-slate-900">
                          {address.first_name} {address.last_name}
                        </p>
                        <p className="text-slate-600">{address.address}</p>
                        <p className="text-slate-600">
                          {address.city}, {address.state} {address.zip_code}
                        </p>
                        <p className="text-slate-600">{address.country}</p>
                      </>
                    ) : (
                      <p className="text-slate-500">Address not available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-emerald-600" />
                  Order Items ({loading.items ? "..." : orderItems.length})
                </h3>
                <div className="space-y-4">
                  {loading.items ? (
                    <OrderItemsSkeleton />
                  ) : orderItems.length > 0 ? (
                    orderItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.product_name || "Product"}
                            fill
                            className="object-cover rounded-xl shadow-sm"
                          />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">{item.quantity || 0}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 text-lg leading-tight mb-2">
                            {item.product_name || "Product Name"}
                          </h4>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-slate-500">Qty: {item.quantity || 0}</span>
                            <span className="text-sm text-slate-500">×</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-emerald-600 text-lg">
                                Rs {(item.price || 0).toFixed(2)}
                              </span>
                              {(item.original_price || 0) > (item.price || 0) && (
                                <span className="text-sm text-slate-500 line-through">
                                  Rs {(item.original_price || 0).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-slate-900">
                            Rs {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                          </p>
                          {(item.original_price || 0) > (item.price || 0) && (
                            <p className="text-sm text-green-600 font-medium">
                              Save Rs{" "}
                              {(((item.original_price || 0) - (item.price || 0)) * (item.quantity || 0)).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-8">No items found</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-emerald-600" />
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-slate-700">Subtotal</span>
                    <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-green-600 flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        You Saved
                      </span>
                      <span className="font-semibold text-green-600">-Rs {savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-700">Shipping</span>
                    <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-slate-700"}`}>
                      {shipping === 0 ? "FREE" : `Rs ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Tax</span>
                    <span className="font-medium">Rs {tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-slate-900">Total</span>
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Rs {(order?.total_amount || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-emerald-100">
                <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold bg-transparent"
                >
                  <Print className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-3 rounded-xl font-semibold bg-transparent"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-200"
        >
          <p className="text-slate-600 mb-2">Thank you for choosing EcoStore!</p>
          <p className="text-sm text-slate-500">For any questions about your order, please contact our support team.</p>
        </motion.div>
      </div>
    </div>
  )
}

// Skeleton Components
function OrderDetailsSkeleton() {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white p-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <Skeleton className="h-8 w-32 bg-white/20" />
            <Skeleton className="h-4 w-48 bg-white/20 mt-2" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-24 bg-white/20" />
            <Skeleton className="h-8 w-32 bg-white/20 mt-2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-44" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AddressSkeleton() {
  return (
    <>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-44" />
      <Skeleton className="h-4 w-32" />
    </>
  )
}

function OrderItemsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-2xl border border-emerald-100"
        >
          <Skeleton className="w-20 h-20 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </>
  )
}
