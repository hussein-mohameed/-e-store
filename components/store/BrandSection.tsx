"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const brands = [
  {
    name: "Apple",
    discount: "20%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    image: "https://pngimg.com/d/macbook_PNG65.png",
    bg: "bg-[#111111]",
    textColor: "text-white",
    imgClass: "-end-12 bottom-0 w-[200px]"
  },
  {
    name: "Samsung",
    discount: "30%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    image: "https://pngimg.com/d/samsung_galaxy_PNG18.png",
    bg: "bg-[#034EA2]",
    textColor: "text-white",
    imgClass: "-end-4 bottom-0 w-[140px]"
  },
  {
    name: "Sony",
    discount: "15%",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg",
    image: "https://pngimg.com/d/playstation_5_PNG13.png",
    bg: "bg-[#E5E5E5]",
    textColor: "text-gray-900",
    imgClass: "-end-2 bottom-0 w-[140px]"
  },
];

export function BrandSection() {
  const t = useTranslations();

  return (
    <section>
      <SectionHeader
        title={t("home.brandsTitle")}
        viewAllLabel={t("common.viewAll")}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className={cn(
              "relative flex min-h-[160px] items-center overflow-hidden rounded-2xl p-6 shadow-sm transition hover:shadow-md",
              brand.bg
            )}
          >
            <div className="relative z-10 space-y-4 max-w-[60%]">
              <div className="inline-flex h-12 w-24 items-center justify-center rounded-xl bg-[var(--bg-surface)] p-2 shadow-sm">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  width={80} 
                  height={24} 
                  className="h-6 w-auto object-contain"
                  unoptimized
                />
              </div>
              <p className={cn("text-sm font-bold", brand.textColor)}>
                {t("common.upTo")} {brand.discount} {t("common.off")}
              </p>
            </div>
            <Image
              src={brand.image}
              alt={brand.name}
              width={200}
              height={200}
              className={cn("absolute object-contain transition-transform duration-500 hover:scale-105", brand.imgClass)}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
