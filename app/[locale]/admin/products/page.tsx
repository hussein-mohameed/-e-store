import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductManager } from "@/components/admin/ProductManager";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCategories, getAllProducts } from "@/lib/data";

export default async function AdminProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/admin/login`);
  }

  const [products, categories] = await Promise.all([
    getAllProducts(true),
    getAllCategories(),
  ]);

  const labels = {
    products: t("products"),
    addProduct: t("addProduct"),
    editProduct: t("editProduct"),
    name: t("name"),
    nameAr: t("nameAr"),
    slug: t("slug"),
    price: t("price"),
    originalPrice: t("originalPrice"),
    image: t("image"),
    category: t("category"),
    featured: t("featured"),
    discount: t("discount"),
    active: t("active"),
    save: t("save"),
    cancel: t("cancel"),
    confirmDelete: t("confirmDelete"),
  };

  return (
    <ProductManager
      products={products}
      categories={categories}
      labels={labels}
    />
  );
}
