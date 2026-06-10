import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAdmin } from "@/lib/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");

  if (await isAdminAuthenticated()) {
    redirect(`/${locale}/admin`);
  }

  const login = loginAdmin.bind(null, locale);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secret">{t("password")}</Label>
              <Input
                id="secret"
                name="secret"
                type="password"
                required
                placeholder="Enter admin secret"
              />
            </div>
            <Button type="submit" className="w-full">
              {t("login")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
