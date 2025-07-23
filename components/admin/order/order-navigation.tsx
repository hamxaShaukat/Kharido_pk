"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrdersPage } from "./order-page";
import { OrderDetails } from "./order-details";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Package,
  Sparkles,
  BarChart3,
  Eye,
  Users,
  Activity,
  Zap,
  ArrowLeft,
  PackagePlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ViewType = "orders" | "details";

export function OrdersNavigation() {
  const [currentView, setCurrentView] = useState<ViewType>("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const router = useRouter();
  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentView("details");
  };

  const handleBackToOrders = () => {
    setCurrentView("orders");
    setSelectedOrderId("");
  };

  const handleBackToAnalytics = () => {
    router.push("/admin/listing");
  };

  const handleViewChange = (view: ViewType) => {
    if (view !== "details") {
      setSelectedOrderId("");
    }
    if (view !== "orders") {
      router.push("/admin/listing");
      return;
    }
    setCurrentView(view);
  };

  const navigationItems = [
    {
      id: "analytics",
      label: "Analytics",
      icon: PackagePlus,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "orders",
      label: "Orders",
      icon: Package,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      color: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/15 to-emerald-200/15 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Floating Elements */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb Navigation */}

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-0 left-6 z-40"
      >
        <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-sm">
              <motion.button
                onClick={handleBackToAnalytics}
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Admin</span>
              </motion.button>
              {currentView === "orders" && (
                <>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-700 font-semibold flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </span>
                </>
              )}
              {currentView === "details" && (
                <>
                  <span className="text-slate-400">/</span>
                  <motion.button
                    onClick={handleBackToOrders}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </motion.button>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-700 font-semibold flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Order Details</span>
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          {currentView === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <OrdersPage onOrderClick={handleOrderClick} />
            </motion.div>
          )}
          {currentView === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <OrderDetails
                orderId={selectedOrderId}
                onBack={handleBackToOrders}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Magic UI Dock Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Dock direction="middle">
          {/* Back Button for Details View */}
          {currentView === "details" && (
            <DockIcon>
              <motion.button
                onClick={handleBackToOrders}
                className="flex items-center justify-center w-full h-full text-slate-600 hover:text-slate-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <ArrowLeft className="size-6" />
              </motion.button>
            </DockIcon>
          )}

          {/* Navigation Items */}
          {navigationItems.map((item, index) => {
            const isActive = currentView === item.id;
            const isDisabled =
              currentView === "details" && item.id !== "orders";

            return (
              <DockIcon key={item.id}>
                {/* Icon */}
                <div
                  className="relative z-10"
                  onClick={() =>
                    !isDisabled && handleViewChange(item.id as ViewType)
                  }
                >
                  <item.icon className="size-6" />
                </div>
              </DockIcon>
            );
          })}
        </Dock>
      </div>
    </div>
  );
}
