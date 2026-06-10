import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { logoutAdmin } from "@/lib/actions/admin-auth";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}

async function AdminNav({ locale }: { locale: string }) {
  const t = await getTranslations("admin");
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) return null;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link
            href={`/${locale}/admin`}
            className="text-lg font-bold text-[#008ECC]"
          >
            {t("title")}
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link
              href={`/${locale}/admin/categories`}
              className="text-gray-600 hover:text-[#008ECC]"
            >
              {t("categories")}
            </Link>
            <Link
              href={`/${locale}/admin/products`}
              className="text-gray-600 hover:text-[#008ECC]"
            >
              {t("products")}
            </Link>
            <Link
              href={`/${locale}`}
              className="text-gray-600 hover:text-[#008ECC]"
            >
              Storefront
            </Link>
          </nav>
        </div>
        <form action={logoutAdmin.bind(null, locale)}>
          <Button type="submit" variant="outline" size="sm">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
