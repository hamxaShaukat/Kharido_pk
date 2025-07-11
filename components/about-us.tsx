"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Heart,
  Users,
  Globe,
  Award,
  Target,
  Lightbulb,
  Recycle,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Shield,
  Star,
} from "lucide-react"
import Link from "next/link"

export function AboutUs() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability First",
      description:
        "Every product we offer is carefully selected for its environmental impact and sustainable production methods.",
      color: "emerald",
    },
    {
      icon: Heart,
      title: "Quality & Care",
      description: "We believe in products that last, reducing waste and providing exceptional value to our customers.",
      color: "red",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a community of conscious consumers who care about the planet and future generations.",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Working with suppliers worldwide who share our commitment to ethical and sustainable practices.",
      color: "teal",
    },
  ]

  const achievements = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "10K+", label: "Products Sold", icon: Award },
    { number: "95%", label: "Customer Satisfaction", icon: Star },
    { number: "100%", label: "Carbon Neutral", icon: Leaf },
  ]

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded with a mission to make sustainable shopping accessible to everyone.",
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Reached 1,000 customers and launched our eco-friendly packaging initiative.",
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded our product range and partnered with 50+ sustainable brands worldwide.",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description: "Achieved carbon neutrality across all operations and shipping processes.",
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Built a thriving community of 50,000+ eco-conscious customers.",
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-6 py-3 mb-6">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-emerald-700">Our Story</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
            About EcoStore
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make sustainable living accessible, affordable, and beautiful. Every product we curate
            tells a story of environmental responsibility and exceptional quality.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <Target className="h-16 w-16 mx-auto mb-6 text-emerald-100" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-emerald-100 max-w-4xl mx-auto leading-relaxed">
                To revolutionize the way people shop by providing a curated marketplace of sustainable, high-quality
                products that don't compromise on style or functionality. We believe that conscious consumption can
                create a better world for future generations.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-2">{achievement.number}</div>
                    <div className="text-slate-600 font-medium">{achievement.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r from-${value.color}-500 to-${value.color}-600 rounded-2xl flex items-center justify-center mb-6`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-lg font-bold">
                    {item.year}
                  </Badge>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-8 relative">
                  {index < timeline.length - 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-emerald-300 to-teal-300" />
                  )}
                </div>
                <Card className="flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 mx-auto mb-6 text-emerald-600" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Commitment</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Quality Assurance</h3>
                  <p className="text-slate-600 text-sm">
                    Every product is thoroughly vetted for quality, durability, and environmental impact.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Recycle className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Circular Economy</h3>
                  <p className="text-slate-600 text-sm">
                    We promote products designed for longevity, repairability, and recyclability.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Continuous Improvement</h3>
                  <p className="text-slate-600 text-sm">
                    We constantly evolve our practices to reduce environmental impact and improve customer experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12">
              <Lightbulb className="h-16 w-16 mx-auto mb-6 text-emerald-100" />
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Ready to make a positive impact? Explore our curated collection of sustainable products and join
                thousands of customers creating a better future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-xl font-semibold"
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold bg-transparent"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
