"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession } from "@/lib/admin-auth";

export async function loginAdmin(locale: string, formData: FormData) {
  const secret = formData.get("secret") as string;
  const success = await setAdminSession(secret);
  if (success) {
    redirect(`/${locale}/admin`);
  }
  redirect(`/${locale}/admin/login?error=invalid`);
}

export async function logoutAdmin(locale: string) {
  await clearAdminSession();
  redirect(`/${locale}/admin/login`);
}
