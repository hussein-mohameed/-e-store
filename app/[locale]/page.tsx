import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { HeroSlider } from "@/components/store/HeroSlider";
import { FeaturesBar } from "@/components/store/FeaturesBar";
import { PromoBanners } from "@/components/store/PromoBanners";
import { ProductSection } from "@/components/store/ProductSection";
import { TopCategories } from "@/components/store/TopCategories";
import { BrandSection } from "@/components/store/BrandSection";
import { DailyEssentials } from "@/components/store/DailyEssentials";
import { AppBanner } from "@/components/store/AppBanner";
import { getActiveCategories, getFeaturedProducts } from "@/lib/data";
import { getDemoCategories, getDemoProducts } from "@/lib/demo-data";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  let categories = await getActiveCategories();
  let products = await getFeaturedProducts(10);

  if (categories.length === 0) categories = getDemoCategories();
  if (products.length === 0) products = getDemoProducts();

  const essentials = categories.slice(0, 6).map((cat, i) => ({
    name: locale === "ar" && cat.nameAr ? cat.nameAr : cat.name,
    image:
      cat.icon ||
      `https://images.unsplash.com/photo-${1615485920000 + i}?w=200&h=200&fit=crop`,
    discount: `${t("common.upTo")} 50% ${t("common.off")}`,
  }));

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Premium Grid Pattern Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center h-[120vh]">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent_80%)]",
            "opacity-50"
          )}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Header categories={categories} />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 md:space-y-16 px-4 py-8">
        
        {/* Top Fold Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-8 flex flex-col">
            <HeroSlider />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
            <PromoBanners />
          </div>
        </div>

        {/* Trust Anchor - Now wrapped in a solid container to utilize space */}
        <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl px-4 md:px-8 border border-gray-100">
          <FeaturesBar />
        </div>

        {/* Main Sections */}
        <div className="flex flex-col gap-12 md:gap-16">
          <TopCategories
            categories={categories}
            title={t("home.topCategoriesTitle")}
            viewAllLabel={t("common.viewAll")}
            locale={locale}
          />

          <ProductSection
            title={t("home.smartphonesTitle")}
            viewAllLabel={t("common.viewAll")}
            products={products}
          />

          <BrandSection />

          <DailyEssentials
            title={t("home.essentialsTitle")}
            viewAllLabel={t("common.viewAll")}
            categories={essentials}
          />
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 pb-8">
          <AppBanner />
        </div>

        </main>
      <Footer />
      </div>
    </div>
  );
}
