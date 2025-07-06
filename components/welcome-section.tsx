"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function WelcomeSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-700 font-medium">Welcome to EcoStore</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-emerald-700 bg-clip-text text-transparent leading-tight"
          >
            Discover Premium
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Eco-Friendly
            </span>{" "}
            Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated collection of sustainable, high-quality products that make a difference. From
            cutting-edge electronics to stylish fashion, we bring you the best while caring for our planet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
