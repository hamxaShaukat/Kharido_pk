"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/utils/getSession";
import { UserMetadata } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  BarChart3,
  Home,
  Leaf,
  LogOut,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AdminHeader() {
  const [userSession, setUserSession] = useState<
    UserMetadata | undefined | null
  >(null);
  useEffect(() => {
    async function fetchSession() {
      const userEmail = await getSession();
      setUserSession(userEmail);
    }

    fetchSession();
  }, []);
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-500/5 border-b border-emerald-100/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                EcoStore
              </span>
              <Badge className="ml-2 bg-emerald-100 text-emerald-700 text-xs">
                Admin
              </Badge>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/list"
              className="flex items-center space-x-2 text-emerald-600 font-medium"
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center space-x-2 text-slate-700 hover:text-emerald-600 font-medium transition-colors duration-200"
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                3
              </Badge>
            </Button> */}

            {/* Back to Store */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              asChild
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Store
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-emerald-50 rounded-xl px-3"
                >
                  <Avatar className="h-8 w-8">
                    {userSession?.picture ? (
                      <AvatarImage src={userSession?.picture} alt="account" />
                    ) : (
                      <AvatarImage src="/images/profile.png" alt="default" />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                      {userSession?.name ||
                        userSession?.firstName + " " + userSession?.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {userSession?.name ||
                        userSession?.firstName + " " + userSession?.lastName}
                    </div>
                    <div className="text-xs text-slate-500">Administrator</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-slate-900 capitalize">
                    {userSession?.name ||
                      userSession?.firstName + " " + userSession?.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{userSession?.email}</p>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
