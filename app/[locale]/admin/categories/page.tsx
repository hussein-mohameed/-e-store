import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCategories } from "@/lib/data";

export default async function AdminCategoriesPage({
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

  const categories = await getAllCategories();

  const labels = {
    categories: t("categories"),
    addCategory: t("addCategory"),
    editCategory: t("editCategory"),
    name: t("name"),
    nameAr: t("nameAr"),
    slug: t("slug"),
    icon: t("icon"),
    active: t("active"),
    sortOrder: t("sortOrder"),
    save: t("save"),
    cancel: t("cancel"),
    confirmDelete: t("confirmDelete"),
  };

  return <CategoryManager categories={categories} labels={labels} />;
}
