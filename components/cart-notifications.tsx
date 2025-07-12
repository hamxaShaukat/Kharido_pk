"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useCartNotifications, useCartStore } from "@/store/use-cart"
import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CartNotifications() {
  const notifications = useCartNotifications()
  const removeNotification = useCartStore((state) => state.removeNotification)

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-blue-600" />
    }
  }

  const getStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
            className={`flex items-center space-x-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm max-w-sm ${getStyles(notification.type)}`}
          >
            {getIcon(notification.type)}
            <span className="flex-1 text-sm font-medium">{notification.message}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-black/10"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
