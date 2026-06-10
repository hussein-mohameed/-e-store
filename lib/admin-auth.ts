import { cookies } from "next/headers";

const ADMIN_COOKIE = "megamart-admin";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return token === process.env.ADMIN_SECRET;
}

export async function setAdminSession(secret: string): Promise<boolean> {
  if (secret !== process.env.ADMIN_SECRET) return false;
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return true;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
