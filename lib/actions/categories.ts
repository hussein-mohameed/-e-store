"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function createCategory(data: {
  name: string;
  nameAr?: string;
  slug: string;
  icon?: string;
  active?: boolean;
  sortOrder?: number;
}) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    const category = await prisma.category.create({ data });
    revalidatePath("/", "layout");
    return { success: true, category };
  } catch {
    return { error: "Failed to create category" };
  }
}

export async function updateCategory(
  id: string,
  data: {
    name?: string;
    nameAr?: string;
    slug?: string;
    icon?: string;
    active?: boolean;
    sortOrder?: number;
  }
) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    const category = await prisma.category.update({ where: { id }, data });
    revalidatePath("/", "layout");
    return { success: true, category };
  } catch {
    return { error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  if (!(await isAdminAuthenticated())) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Failed to delete category" };
  }
}
