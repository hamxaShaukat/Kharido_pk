
import categories from "@/constants/categories";
import { z } from "zod";

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
      .min(1, "Price must be greater than $0.00")
      .max(99999999, "Price must be less than $1,000,000"),
    originalPrice: z
      .number({ invalid_type_error: "Original price must be a valid number" })
      .min(1, "Original price must be greater than $0.00")
      .max(999999999, "Original price must be less than $1,000,000")
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

export { productSchema };
export type { ProductFormData };