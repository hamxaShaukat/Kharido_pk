"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Scale,
  ShoppingCart,
  Truck,
  RotateCcw,
  CreditCard,
  Shield,
  AlertTriangle,
  Users,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { useRouter } from "next/navigation"

export function TermsConditions() {
  const router = useRouter()

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: Scale,
      color:'from-emerald-500 to-emerald-600',
      check_color:'text-emerald-600',
      content: [
        {
          subtitle: "Agreement to Terms",
          items: [
            "By accessing and using our website, you accept and agree to be bound by these Terms and Conditions",
            "If you do not agree to these terms, please do not use our services",
            "We reserve the right to modify these terms at any time with notice",
            "Continued use of our services constitutes acceptance of any changes",
          ],
        },
        {
          subtitle: "Eligibility",
          items: [
            "You must be at least 18 years old to make purchases",
            "You must provide accurate and complete information",
            "You are responsible for maintaining account security",
            "One account per person is permitted",
          ],
        },
      ],
    },
    {
      id: "products-orders",
      title: "Products and Orders",
      icon: ShoppingCart,
      color:'from-red-500 to-red-600',
      check_color:'text-red-600',
      content: [
        {
          subtitle: "Product Information",
          items: [
            "We strive to display accurate product descriptions and images",
            "Colors may vary slightly due to monitor settings",
            "Product availability is subject to change without notice",
            "We reserve the right to limit quantities on any product",
          ],
        },
        {
          subtitle: "Order Processing",
          items: [
            "Orders are processed within 1-2 business days",
            "We reserve the right to refuse or cancel any order",
            "Order confirmation does not guarantee product availability",
            "Prices are subject to change without prior notice",
          ],
        },
      ],
    },
    {
      id: "payment-pricing",
      title: "Payment and Pricing",
      color:'from-yellow-500 to-yellow-600',
      check_color:'text-yellow-600',
      icon: CreditCard,
      content: [
        {
          subtitle: "Payment Methods",
          items: [
            "We currently accept Cash on Delivery (COD)",
            "Payment is due upon delivery of your order",
            "All prices are listed in Pakistani Rupees (PKR)",
            "Additional payment methods may be added in the future",
          ],
        },
        {
          subtitle: "Pricing Policy",
          items: [
            "All prices include applicable taxes unless stated otherwise",
            "Shipping charges are calculated at checkout",
            "Promotional prices are valid for limited time periods",
            "We reserve the right to correct pricing errors",
          ],
        },
      ],
    },
    {
      id: "shipping-delivery",
      title: "Shipping and Delivery",
      color:'from-fuchsia-500 to-fuchsia-600',
      check_color:'text-fuchsia-600',
      icon: Truck,
      content: [
        {
          subtitle: "Shipping Information",
          items: [
            "We ship to addresses within Pakistan only",
            "Delivery time is typically 3-5 business days",
            "Free shipping on orders over Rs 5,000",
            "Shipping costs are calculated based on location and weight",
          ],
        },
        {
          subtitle: "Delivery Terms",
          items: [
            "Someone must be available to receive the delivery",
            "We are not responsible for delays due to weather or unforeseen circumstances",
            "Delivery address changes may incur additional charges",
            "Failed delivery attempts may result in return to sender",
          ],
        },
      ],
    },
    {
      id: "returns-refunds",
      title: "Returns and Refunds",
      color:'from-cyan-500 to-cyan-600',
      check_color:'text-cyan-600',
      icon: RotateCcw,
      content: [
        {
          subtitle: "Return Policy",
          items: [
            "Items can be returned within 7 days of delivery",
            "Products must be in original condition with tags attached",
            "Return shipping costs are the responsibility of the customer",
            "Some items may not be eligible for return due to hygiene reasons",
          ],
        },
        {
          subtitle: "Refund Process",
          items: [
            "Refunds are processed within 5-7 business days after return approval",
            "Original shipping charges are non-refundable",
            "Refunds are issued to the original payment method when applicable",
            "Damaged or defective items are eligible for full refund including shipping",
          ],
        },
      ],
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      color:'from-rose-500 to-rose-600',
      check_color:'text-rose-600',
      icon: Users,
      content: [
        {
          subtitle: "Acceptable Use",
          items: [
            "Use our website only for lawful purposes",
            "Do not attempt to gain unauthorized access to our systems",
            "Respect intellectual property rights",
            "Provide accurate information in all communications",
          ],
        },
        {
          subtitle: "Prohibited Activities",
          items: [
            "Posting false, misleading, or defamatory content",
            "Attempting to disrupt or damage our website",
            "Using automated systems to access our services",
            "Violating any applicable laws or regulations",
          ],
        },
      ],
    },
    {
      id: "liability-disclaimers",
      title: "Liability and Disclaimers",
      color:'from-lime-500 to-lime-600',
      check_color:'text-lime-600',
      icon: Shield,
      content: [
        {
          subtitle: "Limitation of Liability",
          items: [
            "Our liability is limited to the purchase price of the product",
            "We are not liable for indirect, incidental, or consequential damages",
            "Force majeure events are beyond our control and responsibility",
            "Our total liability shall not exceed the amount paid for the specific product",
          ],
        },
        {
          subtitle: "Disclaimers",
          items: [
            "Products are provided 'as is' without warranties beyond those required by law",
            "We do not guarantee uninterrupted or error-free service",
            "Third-party links are provided for convenience only",
            "We are not responsible for content on external websites",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      color:'from-sky-500 to-sky-600',
      check_color:'text-sky-600',
      icon: FileText,
      content: [
        {
          subtitle: "Our Rights",
          items: [
            "All website content, including text, images, and logos, is our property",
            "Trademarks and brand names are protected by intellectual property laws",
            "You may not reproduce, distribute, or modify our content without permission",
            "Product images and descriptions are for our exclusive use",
          ],
        },
        {
          subtitle: "User Content",
          items: [
            "You retain ownership of content you submit (reviews, comments, etc.)",
            "You grant us a license to use your content for business purposes",
            "You are responsible for ensuring your content doesn't infringe on others' rights",
            "We reserve the right to remove any inappropriate content",
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
              <FileText className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-700 text-sm">Terms & Conditions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
              Terms & Conditions
            </h1>
            <p className="text-base text-slate-600 px-4 mb-6">
              Please read these terms carefully before using our services.
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
                    <span className="text-sm font-medium text-slate-700">Effective Date</span>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">January 15, 2024</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mobile Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card className="bg-amber-50 border border-amber-200 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Important Notice</h3>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      By using our website and services, you agree to these terms. Please read them carefully.
                    </p>
                  </div>
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
                <Card className="bg-white/80 backdrop-blur-sm py-0 border-0 shadow-lg overflow-hidden">
                  <CardHeader className={`bg-gradient-to-r ${section.color} text-white p-4`}>
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
                              <CheckCircle className={`h-3 w-3 ${section.check_color} mt-1 flex-shrink-0`} />
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 py-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-600 text-white p-4">
                <CardTitle className="flex items-center text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Questions About Terms?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-700 text-sm">legal@ecostore.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-indigo-600" />
                    <span className="text-slate-700 text-sm">+92 300 1234567</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-indigo-600 mt-0.5" />
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
            <FileText className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700">Terms & Conditions</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            These terms govern your use of our website and services. Please read them carefully before making any
            purchases.
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

        {/* Desktop Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-amber-50 border border-amber-200 shadow-xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-800 text-xl mb-3">Important Legal Notice</h3>
                  <p className="text-amber-700 text-lg leading-relaxed">
                    By accessing and using our website, purchasing our products, or using our services, you acknowledge
                    that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not
                    agree with any part of these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Desktop Effective Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-slate-700">Effective Date</span>
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
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl p-0 overflow-hidden h-full">
                <CardHeader className={`bg-gradient-to-r ${section.color} text-white py-4`}>
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
                            <CheckCircle className={`h-4 w-4 ${section.check_color} mt-1 flex-shrink-0`} />
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
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl py-0 overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-600 py-4 text-white">
              <CardTitle className="flex items-center text-xl justify-center">
                <Mail className="h-6 w-6 mr-3" />
                Questions About These Terms?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-slate-700 text-lg leading-relaxed max-w-2xl mx-auto">
                  If you have any questions about these Terms and Conditions or need clarification on any point, please
                  don't hesitate to contact our legal team.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                  <Mail className="h-8 w-8 text-red-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Email Legal Team</h4>
                  <p className="text-slate-700">legal@ecostore.com</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-50 rounded-2xl border border-yellow-200">
                  <Phone className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Call Us</h4>
                  <p className="text-slate-700">+92 300 1234567</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-sky-50 to-sky-50 rounded-2xl border border-sky-200">
                  <MapPin className="h-8 w-8 text-sky-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-slate-900 mb-2">Visit Our Office</h4>
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
