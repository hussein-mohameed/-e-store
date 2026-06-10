import { notFound } from "next/navigation";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { prisma } from "@/lib/prisma";
import { getActiveCategories } from "@/lib/data";
import { getDemoCategories, getDemoProducts } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const isAr = locale === "ar";

  let categories = await getActiveCategories();
  if (categories.length === 0) categories = getDemoCategories();

  let category = null;
  let products: Awaited<ReturnType<typeof getCategoryProducts>> = [];

  try {
    category = await prisma.category.findUnique({ where: { slug } });
    if (category) {
      products = await getCategoryProducts(category.id);
    }
  } catch {
    // DB unavailable
  }

  // Fallback to demo data
  if (!category || products.length === 0) {
    const demoCat = categories.find((c) => c.slug === slug);
    if (!category && !demoCat) notFound();
    category = category || demoCat;
    
    // Use demo products if DB is empty/unavailable
    products = getDemoProducts(category!.slug);
  }

  const title = isAr && category!.nameAr ? category!.nameAr : category!.name;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header categories={categories} />
      
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        
        {/* Category Hero Banner */}
        <div className="mb-10 rounded-[2rem] bg-[#111111] px-8 py-16 text-center text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,white_2px,transparent_2px)] bg-[length:30px_30px]" />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h1>
            <p className="mt-4 text-gray-400 font-medium">
              {isAr ? `اكتشف أفضل المنتجات في قسم ${title}` : `Explore the best products in ${title}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Static for best practice layout) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="rounded-[2rem] bg-[#f5f5f7] p-8">
              <div className="mb-6 flex items-center gap-2 font-black text-xl text-gray-900 border-b border-gray-200 pb-4">
                <Filter className="h-5 w-5 text-black" />
                {isAr ? "تصفية المنتجات" : "Filters"}
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-sm font-bold text-gray-900">{isAr ? "الأقسام" : "Categories"}</h3>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    {categories.map(c => (
                      <li key={c.id}>
                        <Link 
                          href={`/${locale}/categories/${c.slug}`}
                          className={cn("transition-colors hover:text-black hover:font-bold", c.slug === slug && "font-black text-black underline underline-offset-4")}
                        >
                          {isAr && c.nameAr ? c.nameAr : c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="mb-3 text-sm font-bold text-gray-900">{isAr ? "السعر" : "Price"}</h3>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder={isAr ? "من" : "Min"} className="w-full rounded-xl bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black border-none shadow-sm" />
                    <span className="text-gray-400 font-bold">-</span>
                    <input type="number" placeholder={isAr ? "إلى" : "Max"} className="w-full rounded-xl bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black border-none shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              <h2 className="text-xl md:text-2xl font-black text-gray-900">
                {isAr ? "المنتجات" : "Products"} <span className="text-sm font-bold text-gray-400 ms-2">({products.length})</span>
              </h2>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-[#f5f5f7] text-black hover:bg-gray-200 transition-colors">
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
                <div className="relative flex-1 sm:w-64">
                  <select className="w-full appearance-none rounded-xl bg-[#f5f5f7] px-5 py-3.5 pe-10 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-black cursor-pointer border-none shadow-sm">
                    <option>{isAr ? "ترتيب حسب: الأحدث" : "Sort by: Newest"}</option>
                    <option>{isAr ? "السعر (من الأقل للأعلى)" : "Price (Low to High)"}</option>
                    <option>{isAr ? "السعر (من الأعلى للأقل)" : "Price (High to Low)"}</option>
                  </select>
                  <ChevronRight className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-900 rotate-90" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center shadow-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Filter className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{isAr ? "لم يتم العثور على منتجات" : "No products found"}</h3>
                <p className="text-sm text-gray-500 max-w-[250px]">{isAr ? "هذا القسم لا يحتوي على أي منتجات في الوقت الحالي." : "This category does not have any products at the moment."}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

async function getCategoryProducts(categoryId: string) {
  const products = await prisma.product.findMany({
    where: { categoryId, active: true },
    orderBy: { createdAt: "desc" },
  });

  return products.map((p) => ({
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
}
