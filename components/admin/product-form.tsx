"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  X,
  ImageIcon,
  Save,
  RefreshCw,
  Package,
  AlertCircle,
  CheckCircle2,
  Star,
  ShoppingBag,
  Camera,
  DollarSign,
  Tag,
  Eye,
  Upload,
  BarChart3,
  Settings,
  Zap,
  TrendingUp,
  Info,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Fitness",
  "Books & Media",
  "Automotive",
  "Baby & Kids",
  "Food & Beverages",
  "Beauty & Personal Care",
  "Toys & Games",
  "Office Supplies",
  "Pet Supplies",
];

const productSchema = z
  .object({
    actualId: z
      .string()
      .min(1, "Product ID is required")
      .min(3, "Product ID must be at least 3 characters")
      .max(50, "Product ID must be less than 50 characters")
      .regex(
        /^[a-zA-Z0-9-_]+$/,
        "Product ID can only contain letters, numbers, hyphens, and underscores"
      )
      .transform((val) => val.toLowerCase()),
    name: z
      .string()
      .min(1, "Product name is required")
      .min(2, "Product name must be at least 2 characters")
      .max(100, "Product name must be less than 100 characters")
      .transform((val) => val.trim()),
    description: z
      .string()
      .min(1, "Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be less than 1000 characters")
      .transform((val) => val.trim()),
    price: z
      .number({ invalid_type_error: "Price must be a valid number" })
      .min(0.01, "Price must be greater than $0.00")
      .max(999999.99, "Price must be less than $1,000,000")
      .multipleOf(0.01, "Price must have at most 2 decimal places"),
    originalPrice: z
      .number({ invalid_type_error: "Original price must be a valid number" })
      .min(0.01, "Original price must be greater than $0.00")
      .max(999999.99, "Original price must be less than $1,000,000")
      .multipleOf(0.01, "Original price must have at most 2 decimal places")
      .optional(),
    thumbnail: z
      .string()
      .min(1, "Thumbnail image is required")
      .refine((val) => {
        return (
          val.startsWith("data:image/") ||
          z.string().url().safeParse(val).success
        );
      }, "Must be a valid image URL or uploaded file"),
    images: z
      .array(z.string())
      .max(10, "Maximum 10 additional images allowed")
      .refine((images) => {
        return images.every(
          (img) =>
            img.startsWith("data:image/") ||
            z.string().url().safeParse(img).success
        );
      }, "All images must be valid URLs or uploaded files"),
    category: z
      .string()
      .min(1, "Category is required")
      .refine(
        (val) => categories.includes(val),
        "Please select a valid category"
      ),
    stock: z
      .number({ invalid_type_error: "Stock must be a valid number" })
      .int("Stock must be a whole number")
      .min(0, "Stock cannot be negative")
      .max(999999, "Stock must be less than 1,000,000"),
  })
  .refine(
    (data) => {
      if (
        data.originalPrice !== undefined &&
        data.originalPrice <= data.price
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Original price must be greater than current price",
      path: ["originalPrice"],
    }
  );

type ProductFormData = z.infer<typeof productSchema>;

export function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      actualId: "",
      name: "",
      description: "",
      price: 0,
      originalPrice: undefined,
      thumbnail: "",
      images: [],
      category: "",
      stock: 0,
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues, trigger } = form;
  const watchedValues = watch();

  const addImage = async () => {
    if (newImageUrl.trim()) {
      const currentImages = getValues("images");
      if (currentImages.length >= 5) {
        form.setError("images", {
          message: "Maximum 5 additional images allowed",
        });
        return;
      }
      const urlValidation = z.string().url().safeParse(newImageUrl.trim());
      if (!urlValidation.success) {
        form.setError("images", { message: "Please enter a valid image URL" });
        return;
      }
      setValue("images", [...currentImages, newImageUrl.trim()]);
      setNewImageUrl("");
      await trigger("images");
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
  const extension = file.name.split(".").pop(); // jpg, png, etc.
  const fileName = `${crypto.randomUUID()}.${extension}`; // ✅ safe + valid
  const filePath = `products/${fileName}`; // optional foldering

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  const { data } = await supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data?.publicUrl ?? null;
};


  const removeImage = async (index: number) => {
    const currentImages = getValues("images");
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
    form.clearErrors("images");
    await trigger("images");
  };

  const setAsThumbnail = async (imageUrl: string) => {
    setValue("thumbnail", imageUrl);
    form.clearErrors("thumbnail");
    await trigger("thumbnail");
  };
  const handleFileUpload = async (
    files: FileList | null,
    field: "thumbnail" | "images"
  ) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        form.setError(field, { message: "Please select only image files" });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        form.setError(field, { message: "Image size must be less than 10MB" });
        return;
      }

      // ✅ Upload to Supabase Storage
      const publicUrl = await uploadImage(file);

      if (!publicUrl) {
        form.setError(field, { message: "Failed to upload image" });
        return;
      }

      if (field === "thumbnail") {
        setValue("thumbnail", publicUrl);
        form.clearErrors("thumbnail");
        trigger("thumbnail");
      } else {
        const currentImages = getValues("images");
        if (currentImages.length >= 5) {
          form.setError("images", {
            message: "Maximum 5 additional images allowed",
          });
          return;
        }

        setValue("images", [...currentImages, publicUrl]);
        trigger("images");
      }
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Product data:", data);
      form.reset();
      setNewImageUrl("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      form.setError("root", {
        message: "Failed to add product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setNewImageUrl("");
  };

  const discountPercentage =
    watchedValues.originalPrice && watchedValues.price
      ? Math.round(
          ((watchedValues.originalPrice - watchedValues.price) /
            watchedValues.originalPrice) *
            100
        )
      : 0;

  const completionPercentage = () => {
    const fields = [
      watchedValues.name,
      watchedValues.description,
      watchedValues.price > 0,
      watchedValues.thumbnail,
      watchedValues.category,
      watchedValues.stock >= 0,
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Product Creator
                </h1>
                <p className="text-sm text-slate-600">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-emerald-100 text-emerald-700">
                {completionPercentage()}% Complete
              </Badge>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Error Alert */}
        <AnimatePresence>
          {form.formState.errors.root && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">
                  {form.formState.errors.root.message}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Quick Stats */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Quick Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Form Progress</p>
                      <p className="text-xl font-bold text-slate-900">
                        {completionPercentage()}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Images Added</p>
                      <p className="text-xl font-bold text-slate-900">
                        {(watchedValues.thumbnail ? 1 : 0) +
                          watchedValues.images.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Price Set</p>
                      <p className="text-xl font-bold text-slate-900">
                        {watchedValues.price > 0
                          ? `$${watchedValues.price.toFixed(2)}`
                          : "$0.00"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent border-emerald-200 hover:bg-emerald-50"
                  onClick={() => setActiveTab("details")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent border-emerald-200 hover:bg-emerald-50"
                  onClick={() => setActiveTab("pricing")}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Set Pricing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent border-emerald-200 hover:bg-emerald-50"
                  onClick={() => setActiveTab("media")}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-6"
                >
                  <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl p-1">
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="pricing"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pricing
                    </TabsTrigger>
                    <TabsTrigger
                      value="media"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Media
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Tag className="w-5 h-5 text-emerald-600" />
                            Product Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="actualId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 font-medium">
                                    Product ID
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="unique-product-id"
                                      {...field}
                                      className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 font-medium">
                                    Category
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-lg">
                                      {categories.map((category) => (
                                        <SelectItem
                                          key={category}
                                          value={category}
                                        >
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">
                                  Product Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter an amazing product name..."
                                    {...field}
                                    className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                  />
                                </FormControl>
                                <FormDescription className="text-right text-xs">
                                  {field.value.length}/100 characters
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">
                                  Description
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Describe what makes your product special..."
                                    className="min-h-[120px] bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-right text-xs">
                                  {field.value.length}/1000 characters
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                            Pricing & Inventory
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 font-medium">
                                    Current Price
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      placeholder="0.00"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseFloat(e.target.value) || 0
                                        )
                                      }
                                      className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="originalPrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 font-medium">
                                    Original Price
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      Optional
                                    </Badge>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      placeholder="0.00"
                                      {...field}
                                      value={field.value || ""}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseFloat(e.target.value) ||
                                            undefined
                                        )
                                      }
                                      className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="stock"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 font-medium">
                                    Stock Quantity
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          Number.parseInt(e.target.value) || 0
                                        )
                                      }
                                      className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Price Preview */}
                          <AnimatePresence>
                            {(watchedValues.price > 0 ||
                              watchedValues.originalPrice) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <span className="text-3xl font-bold text-emerald-700">
                                      ${watchedValues.price.toFixed(2)}
                                    </span>
                                    {watchedValues.originalPrice &&
                                      watchedValues.originalPrice >
                                        watchedValues.price && (
                                        <>
                                          <span className="text-xl text-slate-500 line-through">
                                            $
                                            {watchedValues.originalPrice.toFixed(
                                              2
                                            )}
                                          </span>
                                          <Badge className="bg-red-500 text-white">
                                            {discountPercentage}% OFF
                                          </Badge>
                                        </>
                                      )}
                                  </div>
                                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-emerald-600" />
                            Product Images
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Main Image */}
                          <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium flex items-center gap-2">
                                  Main Product Image
                                  <Badge className="bg-emerald-100 text-emerald-700">
                                    Required
                                  </Badge>
                                </FormLabel>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="relative">
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleFileUpload(
                                          e.target.files,
                                          "thumbnail"
                                        )
                                      }
                                      className="h-11 bg-white/80 border-emerald-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                    />
                                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                  </div>
                                  <Input
                                    placeholder="Or enter image URL..."
                                    value={
                                      field.value.startsWith("data:")
                                        ? ""
                                        : field.value
                                    }
                                    onChange={(e) =>
                                      field.onChange(e.target.value)
                                    }
                                    className="h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                  />
                                </div>

                                {/* Thumbnail Preview */}
                                <AnimatePresence>
                                  {field.value && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.95 }}
                                      className="mt-4"
                                    >
                                      <div className="relative w-40 h-40 border-2 border-emerald-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                        <Image
                                          src={
                                            field.value || "/placeholder.svg"
                                          }
                                          alt="Main product image"
                                          fill
                                          className="object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                          <Badge className="bg-emerald-600 text-white text-xs">
                                            Main
                                          </Badge>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Additional Images */}
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 font-medium">
                                  Additional Images
                                </FormLabel>

                                <div className="flex gap-2">
                                  <Input
                                    placeholder="Add image URL..."
                                    value={newImageUrl}
                                    onChange={(e) =>
                                      setNewImageUrl(e.target.value)
                                    }
                                    className="flex-1 h-11 bg-white/80 border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                                  />
                                  <Button
                                    type="button"
                                    onClick={addImage}
                                    disabled={
                                      !newImageUrl.trim() ||
                                      field.value.length >= 10
                                    }
                                    className="h-11 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Drag Drop */}
                                <div
                                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                                    dragActive
                                      ? "border-emerald-400 bg-emerald-50"
                                      : "border-slate-300 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50"
                                  }`}
                                  onClick={() => fileInputRef.current?.click()} // ✅ open file picker on click
                                  onDrop={async (e) => {
                                    e.preventDefault();
                                    setDragActive(false);
                                    const files = Array.from(
                                      e.dataTransfer.files
                                    ).filter((file) =>
                                      file.type.startsWith("image/")
                                    );

                                    const currentImages = getValues("images");

                                    for (const file of files) {
                                      if (currentImages.length >= 10) {
                                        form.setError("images", {
                                          message:
                                            "Maximum 10 additional images allowed",
                                        });
                                        break;
                                      }

                                      const publicUrl = await uploadImage(file);
                                      if (publicUrl) {
                                        setValue("images", [
                                          ...getValues("images"),
                                          publicUrl,
                                        ]);
                                        await trigger("images");
                                      } else {
                                        form.setError("images", {
                                          message:
                                            "Failed to upload one or more images",
                                        });
                                      }
                                    }
                                  }}
                                  onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragActive(true);
                                  }}
                                  onDragLeave={() => setDragActive(false)}
                                >
                                  <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={async (e) => {
                                      const files = Array.from(
                                        e.target.files || []
                                      );
                                      const currentImages = getValues("images");

                                      for (const file of files) {
                                        if (currentImages.length >= 10) {
                                          form.setError("images", {
                                            message:
                                              "Maximum 10 additional images allowed",
                                          });
                                          break;
                                        }

                                        const publicUrl = await uploadImage(
                                          file
                                        );
                                        if (publicUrl) {
                                          setValue("images", [
                                            ...getValues("images"),
                                            publicUrl,
                                          ]);
                                          await trigger("images");
                                        } else {
                                          form.setError("images", {
                                            message:
                                              "Failed to upload one or more images",
                                          });
                                        }
                                      }

                                      e.target.value = ""; // reset input
                                    }}
                                  />

                                  <div className="flex flex-col items-center space-y-2">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                      <ImageIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                      <p className="text-slate-700 font-medium">
                                        Drop images here or click to browse
                                      </p>
                                      <p className="text-slate-500 text-sm">
                                        {10 - field.value.length} slots
                                        remaining
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Image Gallery */}
                                <AnimatePresence>
                                  {field.value.length > 0 && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="grid grid-cols-4 gap-3"
                                    >
                                      {field.value.map((imageUrl, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          className="relative group"
                                        >
                                          <div className="relative w-full h-20 border-2 border-slate-200 rounded-lg overflow-hidden bg-white">
                                            <Image
                                              src={
                                                imageUrl || "/placeholder.svg"
                                              }
                                              alt={`Product ${index + 1}`}
                                              fill
                                              className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                                              <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                  setAsThumbnail(imageUrl)
                                                }
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-2 py-1 h-6"
                                              >
                                                <Star className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                  removeImage(index)
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 h-6"
                                              >
                                                <X className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isValid}
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Creating Product...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Product
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    disabled={isLoading}
                    variant="outline"
                    className="h-12 px-8 border-emerald-200 text-slate-700 hover:bg-emerald-50 bg-transparent rounded-lg cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Right Sidebar - Live Preview */}
          <div className="col-span-12 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Product Preview */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    {/* Product Image */}
                    <div className="relative w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden mb-4">
                      {watchedValues.thumbnail ? (
                        <Image
                          src={watchedValues.thumbnail || "/placeholder.svg"}
                          alt="Product preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No image</p>
                          </div>
                        </div>
                      )}
                      {discountPercentage > 0 && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                          {discountPercentage}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">
                          {watchedValues.name || "Product Name"}
                        </h4>
                        {watchedValues.category && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            {watchedValues.category}
                          </Badge>
                        )}
                      </div>

                      <p className="text-slate-600 text-sm line-clamp-3">
                        {watchedValues.description ||
                          "Product description will appear here..."}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald-600">
                          ${watchedValues.price.toFixed(2)}
                        </span>
                        {watchedValues.originalPrice &&
                          watchedValues.originalPrice > watchedValues.price && (
                            <span className="text-sm text-slate-500 line-through">
                              ${watchedValues.originalPrice.toFixed(2)}
                            </span>
                          )}
                      </div>

                      {/* Stock */}
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                          {watchedValues.stock > 0
                            ? `${watchedValues.stock} in stock`
                            : "Out of stock"}
                        </span>
                      </div>

                      {/* Mock Button */}
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg mt-4">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Form Status */}
                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                    <h5 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Form Status
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            watchedValues.name
                              ? "text-green-500"
                              : "text-slate-300"
                          }`}
                        />
                        <span>Product Name</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            watchedValues.description
                              ? "text-green-500"
                              : "text-slate-300"
                          }`}
                        />
                        <span>Description</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            watchedValues.price > 0
                              ? "text-green-500"
                              : "text-slate-300"
                          }`}
                        />
                        <span>Price</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            watchedValues.thumbnail
                              ? "text-green-500"
                              : "text-slate-300"
                          }`}
                        />
                        <span>Main Image</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
