"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Gift, Mail, Sparkles } from "lucide-react"

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let hasShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        hasShown = true
        setIsVisible(true)
      }
    }

    const handleScroll = () => {
      // Show popup when user scrolls down 50% of the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && !hasShown) {
        hasShown = true
        setIsVisible(true)
      }
    }

    // Show popup after 30 seconds if not shown yet
    timeoutId = setTimeout(() => {
      if (!hasShown) {
        hasShown = true
        setIsVisible(true)
      }
    }, 30000)

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 2000)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-teal-200 to-emerald-300 rounded-full blur-2xl opacity-30 translate-y-12 -translate-x-12" />

            {/* Close button */}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button> */}

            <div className="relative z-10 p-8">
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    >
                      <Gift className="h-8 w-8 text-white" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-slate-800 mb-2"
                    >
                      Get 15% Off Your First Order!
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-600 leading-relaxed"
                    >
                      Join our eco-conscious community and get exclusive deals, sustainability tips, and early access to
                      new products.
                    </motion.p>
                  </div>

                  {/* Form */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-3 border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Claim My 15% Discount
                    </Button>
                  </motion.form>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 space-y-2"
                  >
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>Exclusive member-only deals</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>Early access to new eco-products</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>Sustainability tips & guides</span>
                    </div>
                  </motion.div>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    No spam, unsubscribe anytime. By signing up, you agree to our privacy policy.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      ✓
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to EcoStore!</h3>
                  <p className="text-slate-600">
                    Check your email for your 15% discount code. Happy sustainable shopping!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
