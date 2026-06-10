"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Minus, Plus, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, cn } from "@/lib/utils";
import type { ProductItem } from "@/types";

export function ProductClient({ product }: { product: ProductItem }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const name = isAr && product.nameAr ? product.nameAr : product.name;
  const description = product.description 
    ? product.description 
    : (isAr 
        ? "هذا المنتج من أفضل المنتجات في فئته، يتميز بجودة عالية وتصميم عصري يناسب احتياجاتك اليومية. مصنوع من مواد ممتازة تضمن لك عمراً افتراضياً طويلاً وأداءً لا يضاهى." 
        : "This is one of the best products in its category, featuring high quality and a modern design that fits your daily needs. Made from premium materials that guarantee a long lifespan and unparalleled performance.");

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      image: product.image,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Product Images Gallery */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-[#f5f5f7] p-8 flex items-center justify-center group transition-all">
          {product.discount && product.discount > 0 && (
            <span className={cn(
              "absolute top-6 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white shadow-sm z-10",
              isAr ? "right-6" : "left-6"
            )}>
              {product.discount}% {isAr ? "خصم" : "OFF"}
            </span>
          )}
          <button className={cn(
            "absolute top-6 rounded-full bg-gray-100 p-3 text-gray-500 hover:text-red-500 transition-colors z-10",
            isAr ? "left-6" : "right-6"
          )}>
            <Heart className="h-5 w-5" />
          </button>
          
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-contain p-10 transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        </div>
        {/* Thumbnails (Mocked) */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={cn(
              "relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-2 transition-all",
              i === 1 ? "border-black" : "border-gray-100 hover:border-gray-300"
            )}>
              <Image src={product.image} alt="Thumbnail" fill className="object-contain p-2" unoptimized />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="w-full lg:w-1/2 flex flex-col pt-4">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center text-sm text-gray-500 font-medium">
          <Link href={`/${locale}`} className="hover:text-black transition-colors">
            {isAr ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className={cn("mx-2 h-4 w-4", isAr && "rotate-180")} />
          <Link href={`/${locale}/categories`} className="hover:text-black transition-colors">
            {isAr ? "المنتجات" : "Products"}
          </Link>
          <ChevronRight className={cn("mx-2 h-4 w-4", isAr && "rotate-180")} />
          <span className="text-gray-900 line-clamp-1">{name}</span>
        </nav>

        {/* Title and Rating */}
        <h1 className="mb-4 text-3xl md:text-4xl font-black leading-tight text-gray-900">
          {name}
        </h1>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current text-gray-300" />
          </div>
          <span className="text-sm font-medium text-gray-500 underline cursor-pointer hover:text-black">
            (128 {isAr ? "تقييم" : "Reviews"})
          </span>
        </div>

        {/* Price */}
        <div className="mb-8 flex items-end gap-3">
          <span className="text-4xl font-black text-black">
            {formatPrice(product.price, locale)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg font-bold text-gray-400 line-through mb-1">
              {formatPrice(product.originalPrice, locale)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mb-8 text-gray-600 leading-relaxed font-medium">
          {description}
        </p>

        {/* Add to Cart Actions */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 border-y border-gray-100 py-8">
          <div className="flex h-14 items-center justify-between rounded-xl border border-gray-200 bg-white px-4 sm:w-32">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className={cn(
              "h-14 flex-1 rounded-xl text-lg font-bold shadow-lg transition-all gap-2",
              isAdded ? "bg-[#25D366] hover:bg-[#128C7E]" : "bg-black hover:bg-gray-800"
            )}
          >
            {isAdded ? (
              isAr ? "تمت الإضافة بنجاح!" : "Added Successfully!"
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                {isAr ? "أضف إلى السلة" : "Add to Cart"}
              </>
            )}
          </Button>
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 p-4 text-center">
            <Truck className="h-6 w-6 text-gray-900" />
            <span className="text-xs font-bold text-gray-700">{isAr ? "شحن سريع" : "Fast Delivery"}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 p-4 text-center">
            <ShieldCheck className="h-6 w-6 text-gray-900" />
            <span className="text-xs font-bold text-gray-700">{isAr ? "ضمان لمدة سنة" : "1 Year Warranty"}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 p-4 text-center">
            <RotateCcw className="h-6 w-6 text-gray-900" />
            <span className="text-xs font-bold text-gray-700">{isAr ? "إرجاع خلال 30 يوم" : "30-Day Return"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
