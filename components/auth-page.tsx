"use client";

import type React from "react";

import { signInWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Leaf,
  Lock,
  Mail,
  Phone,
  Shield,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function AuthComponent() {
  const supabase = createClient();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  async function handleGoogleSignIn() {
    const { url } = await signInWithGoogle("/");
    if (url) {
      window.location.href = url;
    } else {
      console.error("Failed to initiate Google sign-in");
    }
  }

 const handleLoginWithPassword = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
  setIsLoading(true);

  if (isLogin) {
    // Login flow
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrors({ email: error.message });

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
        confirmButtonColor: "#ef4444",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "/";
      });
    }
  } else {
    // Registration flow
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
      
        },
      },
    });

    if (error) {
      setErrors({ email: error.message });

      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
        confirmButtonColor: "#ef4444",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
        text: "Check your email to confirm your account.",
        confirmButtonColor: "#10b981",
      }).then(() => {
        window.location.href = "/";
      });
    }
  }

  setIsLoading(false); // ✅ Reset loading state
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-200 to-emerald-300 rounded-full blur-2xl opacity-10" />

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-1/4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg opacity-20"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-15"
        />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding & Testimonials */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-md">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-3 mb-8"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">EcoStore</span>
                <div className="text-xs text-emerald-400 font-medium -mt-1">
                  Premium • Sustainable
                </div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Join the
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Sustainable
                </span>
                <br />
                Revolution
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Discover premium eco-friendly products that make a difference
                for you and our planet.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-12"
            >
              {[
                { icon: Shield, text: "100% Secure & Protected" },
                { icon: Heart, text: "Eco-Friendly Products" },
                { icon: Star, text: "Premium Quality Guaranteed" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-slate-300"
                >
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
              <CardContent className="p-8">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
                    EcoStore
                  </span>
                </div>

                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {isLogin ? "Welcome Back!" : "Create Account"}
                  </h2>
                  <p className="text-slate-600">
                    {isLogin
                      ? "Sign in to your account to continue shopping"
                      : "Join our eco-conscious community today"}
                  </p>
                </div>

                {/* Social Login */}
                <form action={handleGoogleSignIn}>
                  <div className="space-y-3 mb-6">
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full bg-transparent border-slate-200 hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                    >
                      <FcGoogle />
                      Continue with Google
                    </Button>
                  </div>
                </form>

                <div className="relative mb-6">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500">
                      or
                    </span>
                  </div>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleLoginWithPassword} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                              placeholder="First name"
                              value={formData.firstName}
                              onChange={(e) =>
                                handleInputChange("firstName", e.target.value)
                              }
                              className={`pl-10 ${
                                errors.firstName ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                              placeholder="Last name"
                              value={formData.lastName}
                              onChange={(e) =>
                                handleInputChange("lastName", e.target.value)
                              }
                              className={`pl-10 ${
                                errors.lastName ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          type="tel"
                          placeholder="Phone number (optional)"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="pl-10"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pl-10 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className={`pl-10 pr-10 ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group  cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>
                          {isLogin ? "Signing in..." : "Creating account..."}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>{isLogin ? "Sign In" : "Create Account"}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Toggle Auth Mode */}
                <div className="text-center mt-6">
                  <p className="text-slate-600">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          password: "",
                          confirmPassword: ""
                        });
                      }}
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
