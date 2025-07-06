"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Leaf,
} from "lucide-react"

export function Footer() {
  const footerLinks = {
    shop: ["All Products", "Electronics", "Fashion", "Home & Garden", "Sports & Outdoors", "Books & Media"],
    support: ["Help Center", "Contact Us", "Shipping Info", "Returns", "Size Guide", "Track Order"],
    company: ["About Us", "Careers", "Press", "Sustainability", "Affiliate Program", "Wholesale"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Sitemap", "Legal Notice"],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Shield, title: "Secure Payment", desc: "100% protected" },
    { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable products" },
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Features Section */}
        <div className="border-b border-slate-700/50">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-slate-300 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                    EcoStore
                  </span>
                  <div className="text-xs text-emerald-400 font-medium -mt-1">Premium • Sustainable</div>
                </div>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Discover premium, eco-friendly products that make a difference. We're committed to sustainability
                without compromising on quality or style.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <span>Stay Updated</span>
                </h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500"
                  />
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-6">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-slate-400">
                  Get exclusive deals and sustainability tips. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-lg mb-6 capitalize text-emerald-200">
                  {category === "legal" ? "Legal" : category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="border-t border-slate-700/50">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">hello@ecostore.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">123 Green Street, Eco City</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-start"
              >
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 rounded-xl transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </motion.div>

              {/* Payment Methods */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex justify-center md:justify-end items-center space-x-4"
              >
                <span className="text-sm text-slate-400">We Accept:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                  <div className="w-8 h-6 bg-gradient-to-r from-red-600 to-red-700 rounded flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                  <div className="w-8 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded flex items-center justify-center">
                    <CreditCard className="h-3 w-3 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 bg-slate-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-slate-400 text-sm flex items-center space-x-2"
              >
                <span>© 2024 EcoStore. Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>for a sustainable future.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4 text-sm text-slate-400"
              >
                <span>🌱 Carbon Neutral Shipping</span>
                <Separator orientation="vertical" className="h-4 bg-slate-600" />
                <span>♻️ Eco-Friendly Packaging</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
