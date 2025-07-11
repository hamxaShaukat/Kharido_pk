"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  Leaf,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import categories from "@/constants/categories";

export function Footer() {
  const quickLinks = [
    { name: "Contact Us", href: "/contact-us" },
    { name: "About Us", href: "/about-us" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over Rs 5000" },
    { icon: RotateCcw, title: "Easy Returns", desc: "7-day return policy" },
    { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                    Kharido-pk
                  </span>
                  <div className="text-xs text-emerald-400 font-medium -mt-1">
                    Premium • Sustainable
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Discover premium, eco-friendly products that make a difference.
                We're committed to sustainability without compromising on
                quality or style.
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
              </div>
            </motion.div>

            {/* Product Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6 text-emerald-200">
                Shop by Category
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    All Products
                  </Link>
                </li>
                {categories.slice(0, 5).map((category) => (
                  <li key={category}>
                    <Link
                      href={`/products?category=${encodeURIComponent(
                        category
                      )}`}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6 text-emerald-200">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-lg mb-6 text-emerald-200">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">+92 (327) 456-2696</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">kharido-pk@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm">Lahore, Pakistan</span>
                </div>
              </div>
            </motion.div>
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
                <span>© 2025 Kharido-pk. Made with</span>
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
                <Separator
                  orientation="vertical"
                  className="h-4 bg-slate-600"
                />
                <span>♻️ Eco-Friendly Packaging</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
