"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const banners = [
  {
    id: 1,
    title: { en: "New Arrival in Gadgets", ar: "تشكيلة جديدة من الأجهزة" },
    subtitle: { en: "Get 20% Off", ar: "احصل على خصم 20%" },
    link: "/categories/electronics",
    image: "/images/headphones_promo.png",
  },
  {
    id: 2,
    title: { en: "Premium Cosmetics", ar: "مستحضرات تجميل فاخرة" },
    subtitle: { en: "Up to 40% Off", ar: "خصم يصل إلى 40%" },
    link: "/categories/cosmetics",
    image: "/images/perfume_promo.png",
  },
];

export function PromoBanners() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";

  return (
    <div className="flex flex-col gap-6 h-full">
      {banners.map((banner) => (
        <Link 
          key={banner.id} 
          href={`/${locale}${banner.link}`}
          className="group flex flex-col flex-1 overflow-hidden rounded-2xl bg-[#f5f5f7] transition-all hover:bg-[#ebebeF] hover:shadow-sm"
        >
          {/* Image Section */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <Image
              src={banner.image}
              alt={banner.title["en"]}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col flex-1 justify-between p-6">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-black/5 px-3 py-1.5 text-xs font-bold text-gray-600">
                {banner.subtitle[locale]}
              </span>
              <h3 className="text-xl md:text-2xl font-black leading-tight text-black">
                {banner.title[locale]}
              </h3>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-black group-hover:underline decoration-2 underline-offset-4">
              {isAr ? "تسوق الآن" : "Shop Now"}
              <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isAr && "rotate-180 group-hover:-translate-x-1")} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
