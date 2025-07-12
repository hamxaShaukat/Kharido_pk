"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Eye,
  Users,
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Globe,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function PrivacyPolicy() {
  const router = useRouter()

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name, email address, and phone number",
            "Billing and shipping addresses",
            "Payment information (processed securely)",
            "Account preferences and settings",
          ],
        },
        {
          subtitle: "Usage Information",
          items: [
            "Pages visited and time spent on our site",
            "Products viewed and purchased",
            "Search queries and browsing patterns",
            "Device information and IP address",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Primary Uses",
          items: [
            "Process and fulfill your orders",
            "Provide customer support and assistance",
            "Send order confirmations and updates",
            "Improve our products and services",
          ],
        },
        {
          subtitle: "Marketing Communications",
          items: [
            "Send promotional emails (with your consent)",
            "Notify you about new products and offers",
            "Provide personalized recommendations",
            "Conduct surveys and gather feedback",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        {
          subtitle: "We Share Information With",
          items: [
            "Payment processors for secure transactions",
            "Shipping partners for order delivery",
            "Service providers who assist our operations",
            "Legal authorities when required by law",
          ],
        },
        {
          subtitle: "We Never Share",
          items: [
            "Your personal information for marketing by third parties",
            "Your payment details with unauthorized parties",
            "Your browsing history with advertisers",
            "Your account information without your consent",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "SSL encryption for all data transmission",
            "Secure servers with regular security updates",
            "Limited access to personal information",
            "Regular security audits and monitoring",
          ],
        },
        {
          subtitle: "Your Responsibilities",
          items: [
            "Keep your account password secure",
            "Log out from shared devices",
            "Report suspicious activities immediately",
            "Update your contact information when needed",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Data Rights",
          items: [
            "Access your personal information",
            "Correct inaccurate information",
            "Delete your account and data",
            "Export your data in a portable format",
          ],
        },
        {
          subtitle: "Communication Preferences",
          items: [
            "Opt-out of marketing emails",
            "Choose notification preferences",
            "Update communication channels",
            "Control cookie settings",
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: Globe,
      content: [
        {
          subtitle: "Types of Cookies",
          items: [
            "Essential cookies for site functionality",
            "Analytics cookies to improve user experience",
            "Preference cookies to remember your settings",
            "Marketing cookies for personalized content",
          ],
        },
        {
          subtitle: "Managing Cookies",
          items: [
            "Browser settings to control cookies",
            "Opt-out options for tracking",
            "Clear cookies and browsing data",
            "Third-party cookie policies",
          ],
        },
      ],
    },
  ]

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
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2 mb-4">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700 text-sm">Privacy Policy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
              Your Privacy Matters
            </h1>
            <p className="text-base text-slate-600 px-4 mb-6">
              We're committed to protecting your personal information and being transparent about how we use it.
            </p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </motion.div>

          {/* Mobile Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-slate-700">Last Updated</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">January 15, 2024</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mobile Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                    <CardTitle className="flex items-center text-lg">
                      <section.icon className="h-5 w-5 mr-2" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-slate-900 mb-3 text-sm">{subsection.subtitle}</h4>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-emerald-600 mt-1 flex-shrink-0" />
                              <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {subIndex < section.content.length - 1 && <Separator className="mt-4 bg-slate-200" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Mobile Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                <CardTitle className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700 text-sm">privacy@ecostore.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700 text-sm">+92 300 1234567</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <span className="text-slate-700 text-sm">123 Eco Street, Green City, Pakistan</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP DESIGN (>768px) */}
      <div className="hidden lg:block container mx-auto px-4 py-8 relative z-10">
        {/* Desktop Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700">Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Your Privacy Matters to Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            We're committed to protecting your personal information and being transparent about how we collect, use, and
            safeguard your data.
          </p>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-xl px-6 py-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Previous Page
          </Button>
        </motion.div>

        {/* Desktop Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700">Last Updated</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">January 15, 2024</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Desktop Sections Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={index === sections.length - 1 && sections.length % 2 !== 0 ? "lg:col-span-2" : ""}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <CardTitle className="flex items-center text-xl">
                    <section.icon className="h-6 w-6 mr-3" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h4 className="font-semibold text-slate-900 mb-4 text-lg">{subsection.subtitle}</h4>
                      <ul className="space-y-3">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-4 w-4 text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-slate-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {subIndex < section.content.length - 1 && (
                        <Separator className="mt-6 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <CardTitle className="flex items-center text-xl justify-center">
                <Mail className="h-6 w-6 mr-3" />
                Contact Us About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-slate-700 text-lg leading-relaxed max-w-2xl mx-auto">
                  If you have any questions about this Privacy Policy, how we handle your data, or want to exercise your
                  privacy rights, please don't hesitate to contact us.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <Mail className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Email Us</h4>
                  <p className="text-slate-700">privacy@ecostore.com</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <Phone className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Call Us</h4>
                  <p className="text-slate-700">+92 300 1234567</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                  <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Visit Us</h4>
                  <p className="text-slate-700">123 Eco Street, Green City, Pakistan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
