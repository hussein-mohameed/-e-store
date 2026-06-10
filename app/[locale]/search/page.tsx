import { setRequestLocale } from "next-intl/server";
import { Search, SlidersHorizontal, Filter } from "lucide-react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { prisma } from "@/lib/prisma";
import { getActiveCategories } from "@/lib/data";
import { getDemoCategories, getDemoProducts } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);
  const isAr = locale === "ar";
  const query = q || "";

  let categories = await getActiveCategories();
  if (categories.length === 0) categories = getDemoCategories();

  let allProducts: any[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    
    allProducts = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr,
      slug: p.slug,
      description: p.description,
      price: Number(p.price),
      originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
      image: p.image,
      discount: p.discount,
      featured: p.featured,
      active: p.active,
      categoryId: p.categoryId,
    }));
  } catch {
    // DB unavailable
  }

  // Fallback to demo data
  if (allProducts.length === 0) {
    allProducts = getDemoProducts();
  }

  // Perform search filtering
  const searchLower = query.toLowerCase();
  const products = query
    ? allProducts.filter((p) => 
        p.name.toLowerCase().includes(searchLower) ||
        (p.nameAr && p.nameAr.toLowerCase().includes(searchLower)) ||
        (p.description && p.description.toLowerCase().includes(searchLower))
      )
    : [];

  const title = query ? (isAr ? `نتائج البحث عن "${query}"` : `Search Results for "${query}"`) : (isAr ? "البحث" : "Search");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header categories={categories} />
      
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        
        {/* Search Hero Banner */}
        <div className="mb-10 rounded-[2rem] bg-[#111111] px-8 py-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,white_2px,transparent_2px)] bg-[length:30px_30px]" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
            <p className="mt-4 text-gray-400 font-medium">
              {query 
                ? (isAr ? `وجدنا ${products.length} منتج يطابق بحثك` : `Found ${products.length} products matching your search`)
                : (isAr ? "اكتب ما تبحث عنه في شريط البحث بالأعلى" : "Type what you are looking for in the search bar above")}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                {isAr ? "المنتجات المطابقة" : "Matching Products"} <span className="text-sm font-bold text-gray-400 ms-2">({products.length})</span>
              </h2>
              
              {products.length > 0 && (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <select className="w-full appearance-none rounded-xl bg-[#f5f5f7] px-5 py-3.5 pe-10 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-black cursor-pointer border-none shadow-sm">
                      <option>{isAr ? "ترتيب حسب: الأقرب تطابقاً" : "Sort by: Best Match"}</option>
                      <option>{isAr ? "السعر (من الأقل للأعلى)" : "Price (Low to High)"}</option>
                      <option>{isAr ? "السعر (من الأعلى للأقل)" : "Price (High to Low)"}</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-white py-24 text-center shadow-sm">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {query ? (isAr ? "لم نجد ما تبحث عنه" : "We couldn't find what you're looking for") : (isAr ? "ابدأ البحث" : "Start Searching")}
                </h3>
                <p className="text-gray-500 font-medium max-w-[300px] mb-8">
                  {query 
                    ? (isAr ? "حاول البحث بكلمات مختلفة أو تصفح أقسامنا لاكتشاف منتجات رائعة." : "Try searching with different keywords or browse our categories to discover great products.")
                    : (isAr ? "استخدم شريط البحث بالأعلى للعثور على أفضل المنتجات." : "Use the search bar above to find the best products.")}
                </p>
                <Link 
                  href={`/${locale}`}
                  className="rounded-full bg-black px-8 py-3.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
                >
                  {isAr ? "العودة للرئيسية" : "Return Home"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
