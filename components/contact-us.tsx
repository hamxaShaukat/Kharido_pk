"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Globe,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM EST"],
      color: "emerald",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@ecostore.com", "We reply within 24 hours"],
      color: "teal",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Green Street", "Eco City, EC 12345"],
      color: "cyan",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      color: "emerald",
    },
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "emerald",
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      color: "teal",
    },
    {
      icon: Globe,
      title: "Help Center",
      description: "Browse our comprehensive FAQ",
      action: "Visit Help Center",
      color: "cyan",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-slate-600 hover:text-emerald-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about our products or need support? We're here to help you every step of the way.
          </p>
        </motion.div>

        {/* Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {supportOptions.map((option, index) => (
            <Card
              key={option.title}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r from-${option.color}-500 to-${option.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{option.title}</h3>
                <p className="text-slate-600 mb-4">{option.description}</p>
                <Button
                  variant="outline"
                  className={`border-${option.color}-500 text-${option.color}-600 hover:bg-${option.color}-50`}
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                  <Send className="h-6 w-6 mr-3 text-emerald-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-xl"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r from-${info.color}-500 to-${info.color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">How long does shipping take?</h4>
                  <p className="text-sm text-slate-600">
                    Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">What's your return policy?</h4>
                  <p className="text-sm text-slate-600">
                    We offer a 30-day return policy for all unused items in original packaging.
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Do you offer international shipping?</h4>
                  <p className="text-sm text-slate-600">
                    Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
