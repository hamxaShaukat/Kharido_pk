"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  useCartItems,
  useCartTotalItems,
  useCartStore,
} from "@/store/use-cart";
import { useAddressStore } from "@/store/use-address";
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
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readCart } from "@/hooks/cart/use-read-cart";
import type { CartItem } from "@/types/cart";
import { insertAddress } from "@/hooks/address/useInsertAddress";
import { fetchAddresses } from "@/hooks/address/useFetchAddresses";
import { Address } from "@/types/address";
import { toast } from "sonner";
import { deleteAddress } from "@/hooks/address/useDeleteAddress";
import { createClient } from "@/utils/supabase/client";
import { ConfirmOrder } from "@/hooks/order/useInsertOrder";

export function Checkout() {
  const router = useRouter();
  // const items = useCartItems();
  // const totalItems = useCartTotalItems();
  const supabase = createClient();
  const [addresses, setAddress] = useState<Address[]>([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [orderNum, setOrderNum] = useState("");

  const getSelectedAddress = () => {
    return addresses.find((addr) => addr.id === selectedAddressId) || null;
  };

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
    addressName: "",
  });

  // Update form data when address is selected
  useEffect(() => {
    const selectedAddr = getSelectedAddress();

    if (selectedAddr) {
      setFormData({
        firstName: selectedAddr.first_name,
        lastName: selectedAddr.last_name,
        email: selectedAddr.email ?? "",
        phone: selectedAddr.phone ?? "",
        address: selectedAddr.address,
        city: selectedAddr.city,
        state: selectedAddr.state,
        zipCode: selectedAddr.zip_code,
        country: selectedAddr.country,
        addressName: selectedAddr.address_name ?? "",
      });
    }
  }, [selectedAddressId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSelection = (addressId: number) => {
    setSelectedAddressId(addressId);
    setShowAddressForm(false);
  };

  const handleSaveAddress = async () => {
    if (!formData.addressName.trim()) {
      alert("Please enter a name for this address");
      return;
    }
    await insertAddress({
      address_name: formData.addressName,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      country: formData.country,
      is_default: addresses.length === 0,
    });
    setShowAddressForm(false);
    toast.success("Address saved successfully 🎉🎈");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!getSelectedAddress() && addresses.length > 0) {
      toast.error("Please select a delivery address");
      return;
    }

    const addresID = getSelectedAddress();

    setIsProcessing(true);
    await ConfirmOrder(addresID?.id ?? 0, orderNum);
    setOrderComplete(true);
    setIsProcessing(false);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const shippingCost = totalPrice > 5000 ? 0 : 150;
  const finalTotal = totalPrice + shippingCost;

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error("Error deleting address, please try again later");
    }
  };
  function generateEcoId() {
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    const hex = Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `#ECO-${hex.slice(0, 8).toUpperCase()}`;
  }

  async function fetchCart() {
    try {
      const items = await readCart();
      setCartItems(items);
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    async function fetchAddress() {
      const adresses = await fetchAddresses();
      setAddress(adresses);
    }
    fetchAddress();
  }, []);

  useEffect(() => {
    const num = generateEcoId();
    setOrderNum(num);
  }, []);

  useEffect(() => {
    const channel = supabase.channel("address-channel");
    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "address_book",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setAddress((prevItems) => [...prevItems, payload.new as Address]);
              break;
            case "DELETE":
              setAddress((prevItems) =>
                prevItems.filter((item) => item.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-slate-600 mb-8 text-sm sm:text-base">
            Add some amazing products to proceed with checkout.
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 flex items-center justify-center relative overflow-hidden p-4">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
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
            transition={{
              delay: 0.3,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl"
          >
            <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-6 sm:mb-8 leading-relaxed px-4">
              🎉 Thank you for your purchase! Your order has been confirmed and
              will be delivered soon. You will be notified by your email address
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-emerald-200/50 shadow-xl mx-4">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  Order Details
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-slate-600">Order Number:</span>
                  <span className="font-mono text-base sm:text-lg font-bold text-emerald-600">
                    {orderNum}
                    
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-slate-600">Total Amount:</span>
                  <span className="text-lg sm:text-xl font-bold text-slate-900">
                    Rs {finalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-600">Payment Method:</span>
                  <Badge className="bg-amber-100 text-amber-800 text-xs sm:text-sm">
                    Cash on Delivery
                  </Badge>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-slate-600">Estimated Delivery:</span>
                  <span className="font-medium text-slate-900">
                    3-5 Business Days
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4 px-4">
              <Button
                onClick={() => router.push("/products")}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Continue Shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-3 sm:py-4 rounded-xl font-semibold bg-white/80 backdrop-blur-sm"
              >
                <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* MOBILE DESIGN (320px-768px) */}
      <div className="block lg:hidden relative z-10">
        <div className="container mx-auto px-4 py-6">
          {/* Mobile Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2 mb-4">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700 text-sm">
                Secure Checkout
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
              Complete Your Order
            </h1>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              You're just one step away from getting your amazing products!
            </p>
          </motion.div>
          {/* Mobile Order Summary Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => setShowOrderSummary(!showOrderSummary)}
              className="w-full bg-white/80 backdrop-blur-sm border border-emerald-200 text-slate-900 hover:bg-emerald-50 py-4 rounded-xl font-semibold shadow-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-emerald-600" />
                <span>Order Summary ({cartItems.length} items)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-emerald-600">
                  Rs {finalTotal.toFixed(2)}
                </span>
                {showOrderSummary ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </Button>
          </motion.div>
          {/* Mobile Order Summary Expandable */}
          <AnimatePresence>
            {showOrderSummary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
                  <CardContent className="p-4">
                    <ScrollArea className="max-h-64">
                      <div className="space-y-3">
                        {cartItems.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-3 p-3 bg-emerald-50/50 rounded-xl"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={item.thumbnail || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {item.quantity}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">
                                {item.name}
                              </h4>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-slate-500">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-bold text-emerald-600 text-sm">
                                  Rs {(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Rs {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span
                          className={shippingCost === 0 ? "text-green-600" : ""}
                        >
                          {shippingCost === 0
                            ? "FREE"
                            : `Rs ${shippingCost.toFixed(2)}`}
                        </span>
                      </div>

                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-emerald-600">
                          Rs {finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Mobile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Saved Addresses with Radio Selection */}
            {addresses.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 p-0 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2" />
                    Select Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <RadioGroup
                    value={selectedAddressId}
                    onValueChange={handleAddressSelection}
                    className="space-y-3"
                  >
                    {addresses.map((address) => (
                      <div key={address.id} className="relative">
                        <Label
                          htmlFor={`address-${address.id}`}
                          className={`flex items-start space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddressId === address.id
                              ? "border-emerald-500 bg-emerald-50 shadow-md"
                              : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
                          }`}
                        >
                          <RadioGroupItem
                            value={address.id}
                            id={`address-${address.id}`}
                            className="mt-1 border-emerald-500 text-emerald-600"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-semibold text-slate-900 text-sm">
                                {address.address_name}
                              </h4>
                              {address.is_default && (
                                <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                  Default
                                </Badge>
                              )}
                              {selectedAddressId === address.id && (
                                <Badge className="bg-green-100 text-green-700 text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Selected
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-700 font-medium text-sm">
                              {address.first_name} {address.last_name}
                            </p>
                            <p className="text-slate-600 text-xs line-clamp-2">
                              {address.address}, {address.city}, {address.state}
                            </p>
                            <p className="text-slate-600 text-xs">
                              {address.phone}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-500"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
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
            )}

            {/* Mobile Address Form */}
            <AnimatePresence>
              {(showAddressForm || addresses.length === 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm p-0 border-0 shadow-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                      <CardTitle className="flex items-center text-lg">
                        <User className="h-5 w-5 mr-2" />
                        {addresses.length === 0
                          ? "Delivery Information"
                          : "New Address"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Address Name *
                        </label>
                        <Input
                          name="addressName"
                          value={formData.addressName}
                          onChange={handleInputChange}
                          placeholder="e.g., Home, Office"
                          required
                          className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            First Name *
                          </label>
                          <Input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Last Name *
                          </label>
                          <Input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone *
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Address *
                        </label>
                        <Textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl resize-none"
                          rows={2}
                          placeholder="123 Main Street, Apartment 4B"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            City *
                          </label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                            placeholder="Karachi"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            State *
                          </label>
                          <Input
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                            placeholder="Sindh"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            ZIP *
                          </label>
                          <Input
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 rounded-xl"
                            placeholder="75500"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={handleSaveAddress}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save This Address
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Payment Method */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 p-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                <CardTitle className="flex items-center text-lg">
                  <Banknote className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Banknote className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Pay when your order arrives!
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      Available
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
          {/* Mobile Sticky Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
            <Button
              onClick={handleSubmit}
              disabled={
                isProcessing || (!getSelectedAddress() && addresses.length > 0)
              }
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Banknote className="h-5 w-5 mr-2" />
                  Place Order - Rs {finalTotal.toFixed(2)}
                </>
              )}
            </Button>
          </div>
          <div className="h-20" /> {/* Spacer for sticky button */}
        </div>
      </div>

      {/* DESKTOP DESIGN (>768px) */}
      <div className="hidden lg:block container mx-auto px-4 py-8 relative z-10">
        {/* Desktop Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Complete Your Order
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            You're just one step away from getting your amazing eco-friendly
            products!
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
          {/* Desktop Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Desktop Saved Addresses with Radio Selection */}
              {addresses.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-0 p-0 shadow-xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Select Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <RadioGroup
                        value={selectedAddressId}
                        onValueChange={handleAddressSelection}
                        className="space-y-4"
                      >
                        {addresses.map((address) => (
                          <div key={address.id} className="relative">
                            <Label
                              htmlFor={`desktop-address-${address.id}`}
                              className={`flex items-start space-x-4 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                                selectedAddressId === address.id
                                  ? "border-emerald-500 bg-emerald-50 shadow-lg"
                                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
                              }`}
                            >
                              <RadioGroupItem
                                value={address.id}
                                id={`desktop-address-${address.id}`}
                                className="mt-1 border-emerald-500 text-emerald-600"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-slate-900 text-lg">
                                    {address.address_name}
                                  </h4>
                                  {address.is_default && (
                                    <Badge className="bg-emerald-100 text-emerald-700 text-sm">
                                      Default
                                    </Badge>
                                  )}
                                  {selectedAddressId === address.id && (
                                    <Badge className="bg-green-100 text-green-700 text-sm">
                                      <Check className="h-4 w-4 mr-1" />
                                      Selected for Delivery
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-slate-700 font-medium text-base mb-1">
                                  {address.first_name} {address.last_name}
                                </p>
                                <p className="text-slate-600 text-sm mb-1">
                                  {address.address}, {address.city},{" "}
                                  {address.state} {address.zip_code}
                                </p>
                                <p className="text-slate-600 text-sm">
                                  {address.phone}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  className="h-10 w-10 text-slate-500 hover:text-red-600"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeleteAddress(address.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-6 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent py-3"
                        onClick={() => setShowAddressForm(!showAddressForm)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Desktop Address Form */}
              <AnimatePresence>
                {(showAddressForm || addresses.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden p-0">
                      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4">
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          {addresses.length === 0
                            ? "Delivery Information"
                            : "New Address"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              First Name *
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Last Name *
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Email *
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              Phone *
                            </label>
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
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Street Address *
                          </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              City *
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              State/Province *
                            </label>
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
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                              ZIP Code *
                            </label>
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
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
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

              {/* Desktop Payment Method */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden py-0">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4">
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
                          <h3 className="font-bold text-xl text-slate-900 mb-2">
                            Cash on Delivery
                          </h3>
                          <p className="text-slate-600 leading-relaxed">
                            Pay when your order arrives at your doorstep. Safe,
                            secure, and convenient!
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
            </form>
          </div>

          {/* Desktop Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-4 p-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Summary
                  </span>
                  <Badge className="bg-white/20 text-white">
                    {cartItems.length} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item, index) => (
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
                          <span className="text-white text-xs font-bold">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 line-clamp-2 leading-tight text-sm">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-bold text-emerald-600">
                            Rs {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-slate-700">Subtotal</span>
                      <span className="font-semibold">
                        Rs {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Shipping</span>
                      <span
                        className={`font-medium ${
                          shippingCost === 0
                            ? "text-green-600"
                            : "text-slate-700"
                        }`}
                      >
                        {shippingCost === 0
                          ? "FREE"
                          : `Rs ${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                  <Separator className="bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-900">
                        Total
                      </span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Rs {finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isProcessing ||
                      (!getSelectedAddress() && addresses.length > 0)
                    }
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
                    💡 Add Rs {(5000 - totalPrice).toFixed(2)} more for free
                    shipping!
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
