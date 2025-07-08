"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Home, ShieldAlert, Leaf, AlertTriangle, Clock, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

interface UnauthorizedPageProps {
  type?: "401" | "403"
  message?: string
  customTitle?: string
}

export function UnauthorizedPage({ type = "401", message, customTitle }: UnauthorizedPageProps) {
  const [countdown, setCountdown] = useState(10)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const isUnauthenticated = type === "401"

  const defaultTitle = isUnauthenticated ? "Authentication Required" : "Access Forbidden"
  const title = customTitle || defaultTitle

  const defaultMessage = isUnauthenticated
    ? "You need to sign in to access this page. Please authenticate to continue your eco-friendly shopping journey."
    : "You don't have the necessary permissions to access this resource. This area is restricted to authorized users only."

  const displayMessage = message || defaultMessage

  const errorDetails = isUnauthenticated
    ? {
        icon: Lock,
        color: "from-amber-500 to-orange-600",
        bgColor: "from-amber-50 to-orange-50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        description: "This page requires user authentication",
        suggestion: "Please sign in to continue",
      }
    : {
        icon: ShieldAlert,
        color: "from-red-500 to-pink-600",
        bgColor: "from-red-50 to-pink-50",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        description: "You don't have permission to view this content",
        suggestion: "Contact support if you believe this is an error",
      }

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true)
          window.location.href = "/"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleGoHome = () => {
    setIsRedirecting(true)
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient blobs */}
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${errorDetails.bgColor} rounded-full blur-3xl opacity-30`}
        />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-slate-200 to-emerald-200 rounded-full blur-2xl opacity-15" />

        {/* Additional decorative elements */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full blur-2xl opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-teal-200 to-emerald-300 rounded-full blur-3xl opacity-12" />

        {/* Animated floating elements */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className={`absolute top-20 left-1/4 w-8 h-8 bg-gradient-to-br ${errorDetails.color} rounded-lg opacity-20`}
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-15"
        />
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 6 }}
          className="absolute top-2/3 left-1/3 w-10 h-10 bg-gradient-to-br from-slate-300 to-emerald-400 rounded-lg opacity-10"
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16,185,129,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl overflow-hidden relative">
            {/* Subtle border glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${errorDetails.color} opacity-5 rounded-lg`} />

            <CardContent className="p-0 relative">
              {/* Header Section */}
              <div className={`bg-gradient-to-r ${errorDetails.color} p-12 text-white relative overflow-hidden`}>
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-1/4 w-40 h-40 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white rounded-full blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-xl" />
                </div>

                {/* Animated geometric shapes */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-lg"
                />
                <motion.div
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/15 rounded-full"
                />

                <div className="relative z-10 text-center">
                  {/* Enhanced Error Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 150 }}
                    className="w-32 h-32 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative"
                  >
                    <div className="absolute inset-2 bg-white/10 rounded-full" />
                    <errorDetails.icon className="h-16 w-16 text-white relative z-10" />

                    {/* Pulsing ring effect */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 border-2 border-white rounded-full"
                    />
                  </motion.div>

                  {/* Error Code with enhanced styling */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="relative">
                      <span className="text-8xl font-bold text-white/90 tracking-wider">{type}</span>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 text-8xl font-bold text-white/20 tracking-wider blur-sm"
                      >
                        {type}
                      </motion.div>
                    </div>
                    <div className="text-xl font-semibold text-white/90 mt-4 tracking-wide">{title}</div>
                  </motion.div>

                  {/* Enhanced Error Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="space-y-3"
                  >
                    <p className="text-white/95 text-lg leading-relaxed max-w-lg mx-auto font-medium">
                      {displayMessage}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-white/80">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{errorDetails.description}</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-12">
                {/* Enhanced Logo */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex items-center justify-center space-x-4 mb-10"
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Leaf className="h-7 w-7 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl opacity-20"
                    />
                  </div>
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                      EcoStore
                    </span>
                    <div className="text-sm text-emerald-600 font-medium -mt-1">Premium • Sustainable • Secure</div>
                  </div>
                </motion.div>

                {/* Enhanced Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className={`bg-gradient-to-r ${errorDetails.bgColor} rounded-2xl p-8 mb-10 border border-slate-200 relative overflow-hidden`}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-xl" />
                  </div>

                  <div className="relative z-10 text-center">
                    <div
                      className={`w-16 h-16 ${errorDetails.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <Shield className={`h-8 w-8 ${errorDetails.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Security Notice</h3>
                    <p className="text-slate-700 leading-relaxed mb-4">{errorDetails.suggestion}</p>
                    <div className="flex items-center justify-center space-x-2 text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Your security is our priority</span>
                    </div>
                  </div>
                </motion.div>

                {/* Auto-redirect Notice */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200"
                >
                  <div className="flex items-center justify-center space-x-3 text-slate-600">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">
                      Auto-redirecting to homepage in{" "}
                      <span className="text-emerald-600 font-bold text-lg">{countdown}</span> seconds
                    </span>
                  </div>
                  <div className="mt-3 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                </motion.div>

                {/* Enhanced Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="text-center"
                >
                  <Button
                    onClick={handleGoHome}
                    disabled={isRedirecting}
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Button background animation */}
                    <motion.div
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />

                    <div className="relative z-10 flex items-center space-x-3">
                      {isRedirecting ? (
                        <>
                          <RefreshCw className="h-5 w-5 animate-spin" />
                          <span>Redirecting...</span>
                        </>
                      ) : (
                        <>
                          <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span>Go to Homepage</span>
                        </>
                      )}
                    </div>
                  </Button>

                  <p className="text-slate-500 text-sm mt-4 flex items-center justify-center space-x-2">
                    <span>Return to our eco-friendly marketplace</span>
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Footer Elements */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="flex items-center space-x-3 text-slate-400"
        >
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <div className="text-sm font-medium">Secure • Protected</div>
            <div className="text-xs">EcoStore Security</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex items-center space-x-3 text-slate-400"
        >
          <div>
            <div className="text-sm font-medium text-right">24/7 Support</div>
            <div className="text-xs text-right">Always here to help</div>
          </div>
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Leaf className="h-4 w-4 text-emerald-600" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
