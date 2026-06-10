"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, calculateSavings } from "@/lib/utils";
import type { ProductItem } from "@/types";

interface ProductCardProps {
  product: ProductItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const { addItem } = useCart();

  const displayName =
    locale === "ar" && product.nameAr ? product.nameAr : product.name;
  const originalPrice = product.originalPrice ?? product.price;
  const savings = calculateSavings(product.price, originalPrice);
  const discount =
    product.discount > 0
      ? product.discount
      : originalPrice > product.price
        ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
        : 0;

  return (
    <div className="group relative flex flex-col h-full overflow-hidden bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left">
      {discount > 0 && (
        <div className="absolute end-6 top-6 z-10 rounded-full bg-black px-3 py-1 text-xs font-bold text-white shadow-md">
          {discount}% {t("off")}
        </div>
      )}

      <Link href={`/${locale}/products/${product.id}`} className="block">
        <div className="relative flex h-52 items-center justify-center rounded-xl bg-gray-50 p-6 transition-all duration-500 group-hover:bg-gray-100">
          <Image
            src={product.image}
            alt={displayName}
            width={160}
            height={160}
            className="h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-end gap-2 pt-4 px-1 pb-2 text-start">
        <Link href={`/${locale}/products/${product.id}`} className="hover:text-black transition-colors">
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900 leading-tight">
            {displayName}
          </h3>
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-1">
          <span className="text-base font-black text-black">
            {formatPrice(product.price, locale)}
          </span>
          {originalPrice > product.price && (
            <span className="text-xs font-bold text-gray-400 line-through">
              {formatPrice(originalPrice, locale)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="text-xs font-bold text-gray-500">
            {t("save")} - {formatPrice(savings, locale)}
          </p>
        )}

        <Button
          className="mt-4 w-full gap-2 rounded-xl h-11 bg-black hover:bg-gray-800 text-white font-bold shadow-md transition-all active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            addItem({
              id: product.id,
              name: product.name,
              nameAr: product.nameAr,
              price: product.price,
              image: product.image,
            });
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          {t("addToCart")}
        </Button>
      </div>
    </div>
  );
}
