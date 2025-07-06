"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Timer, Zap } from "lucide-react"
import Image from "next/image"

export function BannerSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Metallic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-4">
                  <Timer className="h-3 w-3 mr-1" />
                  Limited Time Offer
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Summer Sale
                  <br />
                  Up to 50% Off
                </h2>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  Don't miss out on our biggest sale of the year. Premium products at unbeatable prices, but only for a
                  limited time.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Zap className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Shop Sale
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-2xl p-8 backdrop-blur-sm border border-emerald-500/20">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Featured Products"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  50% OFF
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
