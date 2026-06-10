import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect(`/${locale}/admin/login`);
  }

  redirect(`/${locale}/admin/categories`);
}
