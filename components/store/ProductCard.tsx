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
    <div className="group relative flex flex-col h-full overflow-hidden bg-background rounded-3xl p-5 hover:shadow-float hover:-translate-y-1 transition-all duration-500 border border-border text-left">
      {discount > 0 && (
        <div className="absolute end-6 top-6 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-soft tracking-wider">
          {discount}% {t("off")}
        </div>
      )}

      <Link href={`/${locale}/products/${product.id}`} className="block">
        <div className="relative flex h-56 items-center justify-center rounded-2xl bg-surface p-6 transition-all duration-500 group-hover:bg-surface-hover">
          <Image
            src={product.image}
            alt={displayName}
            width={180}
            height={180}
            className="h-44 w-auto object-contain transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-end gap-3 pt-5 px-1 pb-2 text-start">
        <Link href={`/${locale}/products/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="line-clamp-2 text-sm font-semibold text-text-secondary leading-snug">
            {displayName}
          </h3>
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-auto">
          <span className="text-xl font-black text-foreground">
            {formatPrice(product.price, locale)}
          </span>
          {originalPrice > product.price && (
            <span className="text-sm font-semibold text-text-tertiary line-through">
              {formatPrice(originalPrice, locale)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <p className="text-xs font-bold text-primary bg-primary-subtle w-fit px-2 py-0.5 rounded-md">
            {t("save")} {formatPrice(savings, locale)}
          </p>
        )}

        <Button
          className="mt-2 w-full gap-2 rounded-xl h-12 bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold shadow-soft hover:shadow-float transition-all"
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
