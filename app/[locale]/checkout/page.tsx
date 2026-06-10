import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CheckoutClient } from "@/components/store/CheckoutClient";
import { getActiveCategories } from "@/lib/data";
import { getDemoCategories } from "@/lib/demo-data";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let categories = await getActiveCategories();
  if (categories.length === 0) categories = getDemoCategories();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Header categories={categories} />
      
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:py-12">
        <h1 className="mb-8 text-3xl font-black text-gray-900 text-center">
          {locale === "ar" ? "إتمام الطلب والدفع" : "Secure Checkout"}
        </h1>
        <CheckoutClient />
      </main>
      
      <Footer />
    </div>
  );
}
