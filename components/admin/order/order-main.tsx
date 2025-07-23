"use client"
import { useState } from "react"
import { OrdersPage } from "./order-page"
import { OrderDetails } from "./order-details"

export function OrdersMain() {
  const [currentView, setCurrentView] = useState<"list" | "details">("list")
  const [selectedOrderId, setSelectedOrderId] = useState<string>("")

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId)
    setCurrentView("details")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedOrderId("")
  }

  return (
    <>
      {currentView === "list" && <OrdersPage onOrderClick={handleOrderClick} />}
      {currentView === "details" && <OrderDetails orderId={selectedOrderId} onBack={handleBackToList} />}
    </>
  )
}
