import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { ProductClient } from "@/components/store/ProductClient";
import { prisma } from "@/lib/prisma";
import { getActiveCategories } from "@/lib/data";
import { getDemoCategories, getDemoProducts } from "@/lib/demo-data";
import type { ProductItem } from "@/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  let categories = await getActiveCategories();
  if (categories.length === 0) categories = getDemoCategories();

  let product: ProductItem | null = null;

  // If the ID starts with 'demo-', we fetch from our local mock data
  if (id.startsWith("demo-")) {
    // getDemoProducts generates different IDs depending on the slug passed.
    // We fetch all variants so we can find the product regardless of where it was clicked.
    const all = getDemoProducts();
    const electronics = getDemoProducts("electronics");
    const cosmetics = getDemoProducts("cosmetics");
    const allDemoProducts = [...all, ...electronics, ...cosmetics];
    
    const found = allDemoProducts.find(p => p.id === id);
    if (found) product = found;
  } else {
    // Try to fetch from DB
    try {
      const dbProduct = await prisma.product.findUnique({
        where: { id, active: true },
      });
      if (dbProduct) {
        product = {
          ...dbProduct,
          price: Number(dbProduct.price),
          originalPrice: dbProduct.originalPrice ? Number(dbProduct.originalPrice) : null,
        };
      }
    } catch {
      // DB unavailable
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Header categories={categories} />
      
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:py-12">
        <ProductClient product={product} />
      </main>
      
      <Footer />
    </div>
  );
}
