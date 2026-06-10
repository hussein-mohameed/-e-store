import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/auth/AuthForm";
import { Store } from "lucide-react";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === "ar";

  return (
    <main className="flex min-h-screen w-full bg-white">
      {/* Left/Right Side Image (Hidden on mobile) */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/login_bg.png"
          alt="Login Background"
          fill
          className="object-cover"
          unoptimized
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Brand Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
          <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 transition-transform hover:scale-105">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#008ECC] shadow-xl">
              <Store className="h-8 w-8 text-white" />
            </div>
            <span className="text-4xl font-black tracking-tight drop-shadow-md">MegaMart</span>
          </Link>
          <h2 className="text-3xl font-bold drop-shadow-md">
            {isAr ? "اكتشف متعة التسوق الحقيقية" : "Discover the true joy of shopping"}
          </h2>
          <p className="mt-4 text-lg font-medium text-white/90 drop-shadow-md max-w-md">
            {isAr 
              ? "انضم إلينا الآن واحصل على أفضل العروض والخصومات الحصرية على ملايين المنتجات." 
              : "Join us now and get the best exclusive offers and discounts on millions of products."}
          </p>
        </div>
      </div>

      {/* Auth Form Side */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24 xl:px-32 relative">
        {/* Mobile Logo */}
        <Link href={`/${locale}`} className="absolute top-8 start-8 flex items-center gap-2 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008ECC]">
            <Store className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900">MegaMart</span>
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
