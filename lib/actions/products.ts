"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function createProduct(data: {
  name: string;
  nameAr?: string;
  slug: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  featured?: boolean;
  active?: boolean;
  categoryId: string;
}) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    const product = await prisma.product.create({
      data: {
        ...data,
        price: data.price,
        originalPrice: data.originalPrice,
      },
    });
    revalidatePath("/", "layout");
    return { success: true, product };
  } catch {
    return { error: "Failed to create product" };
  }
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    nameAr?: string;
    slug?: string;
    description?: string;
    price?: number;
    originalPrice?: number | null;
    image?: string;
    discount?: number;
    featured?: boolean;
    active?: boolean;
    categoryId?: string;
  }
) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    const product = await prisma.product.update({ where: { id }, data });
    revalidatePath("/", "layout");
    return { success: true, product };
  } catch {
    return { error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Failed to delete product" };
  }
}
