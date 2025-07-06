"use client"

import { motion } from "framer-motion"

export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large blob - top right */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl"
      />

      {/* Medium blob - left side */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.08 }}
        transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
        className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full blur-3xl"
      />

      {/* Small blob - bottom center */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.06 }}
        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full blur-3xl"
      />

      {/* Floating blob - middle right */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 3, delay: 1.5, ease: "easeOut" }}
        className="absolute top-2/3 right-1/4 w-72 h-72 bg-gradient-to-br from-green-300 to-teal-400 rounded-full blur-3xl"
      />

      {/* Animated floating blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-2xl opacity-10"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-br from-teal-200 to-green-300 rounded-full blur-2xl opacity-8"
      />
    </div>
  )
}
