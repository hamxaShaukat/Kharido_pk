"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/use-cart";

const products = [
  {
    id: 1,
    name: "Eco-Smart Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 124,
    thumbnail: "/placeholder.svg?height=300&width=300",
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    category: "Electronics",
  }
];

export function ProductsSection() {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const goToProduct = (id: number) => {
    router.push(`/product/${id}`);
  };
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium, eco-conscious products
            that combine quality with sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const quantity = getItemQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${
                            product.badge === "Best Seller"
                              ? "bg-emerald-500"
                              : product.badge === "New"
                              ? "bg-blue-500"
                              : product.badge === "Sale"
                              ? "bg-red-500"
                              : "bg-slate-500"
                          } text-white border-0`}
                        >
                          {product.badge}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white shadow-lg"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-500 font-medium">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {product.rating}
                          </span>
                          <span className="text-sm text-slate-500">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors cursor-pointer">
                        <a
                          href={`/product/${product.id}`}
                          className="hover:underline"
                        >
                          {product.name}
                        </a>
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-slate-800">
                            ${product.price}
                          </span>
                          <span className="text-sm text-slate-500 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-xs px-2 bg-transparent cursor-pointer"
                            onClick={() => goToProduct(product.id)}
                          >
                            View
                          </Button>
                          <Button
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                originalPrice: product.originalPrice,
                                thumbnail: product.thumbnail,
                              })
                            }
                            size="sm"
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add
                            
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-full transition-all duration-300 bg-transparent cursor-pointer"
            onClick={() => router.push("/products")}
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
