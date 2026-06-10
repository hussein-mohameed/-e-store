import { prisma } from "@/lib/prisma";
import type { CategoryItem, ProductItem } from "@/types";

function toNumber(value: { toNumber(): number } | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  return typeof value === "number" ? value : value.toNumber();
}

export async function getActiveCategories(): Promise<CategoryItem[]> {
  try {
    return await prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        nameAr: true,
        slug: true,
        icon: true,
        active: true,
        sortOrder: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 10): Promise<ProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true, featured: true },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr,
      slug: p.slug,
      description: p.description,
      price: toNumber(p.price) ?? 0,
      originalPrice: toNumber(p.originalPrice),
      image: p.image,
      discount: p.discount,
      featured: p.featured,
      active: p.active,
      categoryId: p.categoryId,
      category: p.category
        ? {
            id: p.category.id,
            name: p.category.name,
            nameAr: p.category.nameAr,
            slug: p.category.slug,
            icon: p.category.icon,
            active: p.category.active,
            sortOrder: p.category.sortOrder,
          }
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getAllProducts(includeInactive = false): Promise<ProductItem[]> {
  try {
    const products = await prisma.product.findMany({
      where: includeInactive ? undefined : { active: true },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return products.map((p) => ({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr,
      slug: p.slug,
      description: p.description,
      price: toNumber(p.price) ?? 0,
      originalPrice: toNumber(p.originalPrice),
      image: p.image,
      discount: p.discount,
      featured: p.featured,
      active: p.active,
      categoryId: p.categoryId,
    }));
  } catch {
    return [];
  }
}

export async function getAllCategories(): Promise<CategoryItem[]> {
  try {
    return await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        nameAr: true,
        slug: true,
        icon: true,
        active: true,
        sortOrder: true,
      },
    });
  } catch {
    return [];
  }
}
