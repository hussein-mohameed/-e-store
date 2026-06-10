"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function CartClient() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { items, mounted, totalPrice, updateQuantity, removeItem } = useCart();

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white py-32 text-center shadow-sm">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-400">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="mb-2 text-2xl font-black text-gray-900">
          {isAr ? "سلة المشتريات فارغة" : "Your cart is empty"}
        </h2>
        <p className="mb-8 max-w-md text-gray-500">
          {isAr
            ? "يبدو أنك لم تضف أي منتجات إلى سلة المشتريات حتى الآن. استكشف مجموعتنا الواسعة من المنتجات وتسوق الآن!"
            : "Looks like you haven't added anything to your cart yet. Explore our wide range of products and shop now!"}
        </p>
        <Link href={`/${locale}`}>
          <Button size="lg" className="h-14 rounded-xl px-12 font-bold shadow-soft bg-primary text-white hover:bg-primary-hover transition-all">
            {isAr ? "ابدأ التسوق الآن" : "Start Shopping Now"}
          </Button>
        </Link>
      </div>
    );
  }

  const shippingEstimate = totalPrice > 1000 ? 0 : 50;
  const finalTotal = totalPrice + shippingEstimate;

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Cart Items List */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-black text-gray-900">
            {isAr ? "سلة المشتريات" : "Shopping Cart"}
          </h1>
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {items.length} {isAr ? "منتجات" : "Items"}
          </span>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const name = locale === "ar" && item.nameAr ? item.nameAr : item.name;
            const itemTotal = item.price * item.quantity;
            
            return (
              <div
                key={item.id}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-soft"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[var(--bg-surface)] p-2">
                    <Image
                      src={item.image}
                      alt={name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link href={`/${locale}/products/${item.id}`} className="hover:text-black transition-colors">
                      <h3 className="line-clamp-2 text-base font-bold text-gray-900 leading-tight">
                        {name}
                      </h3>
                    </Link>
                    <div className="flex flex-col text-start">
                      <span className="text-sm font-bold text-gray-900" dir="ltr">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                      </span>
                      <span className="text-xs font-bold text-gray-400" dir="rtl">
                        ({new Intl.NumberFormat(isAr ? 'ar-IQ' : 'en-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(item.price * 1500)})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0">
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-xl bg-surface p-1.5 border border-transparent focus-within:border-border-focus transition-colors">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-text-secondary shadow-sm transition-all hover:text-foreground hover:shadow active:scale-95"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-text-secondary shadow-sm transition-all hover:text-foreground hover:shadow active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Total Price & Delete */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-black text-foreground" dir="ltr">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(itemTotal)}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-text-tertiary hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-full lg:w-96 shrink-0 space-y-6">
        <div className="rounded-3xl bg-surface border border-border/50 shadow-float p-6 md:p-8 sticky top-28">
          <h2 className="mb-8 text-2xl font-black text-foreground">
            {isAr ? "ملخص الطلب" : "Order Summary"}
          </h2>

          <div className="space-y-5 border-b border-border pb-6 text-sm font-medium text-text-secondary">
            <div className="flex justify-between items-start gap-4">
              <span className="pt-1">{isAr ? "المجموع الفرعي" : "Subtotal"}</span>
              <div className="flex flex-col items-end gap-1 font-bold text-foreground">
                <span dir="ltr">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalPrice)}</span>
                <span dir="rtl" className="text-xs text-text-tertiary">({new Intl.NumberFormat(isAr ? 'ar-IQ' : 'en-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(totalPrice * 1500)})</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>{isAr ? "رسوم الشحن" : "Shipping Estimate"}</span>
              <span className="font-bold text-foreground">
                {shippingEstimate === 0 
                  ? <span className="text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-full text-xs">{isAr ? "مجاني" : "Free"}</span> 
                  : <span dir="ltr">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(shippingEstimate)}</span>}
              </span>
            </div>

            <div className="flex justify-between items-center text-foreground">
              <span>{isAr ? "الخصم" : "Discount"}</span>
              <span className="font-bold text-[#FF3B30] bg-[#FF3B30]/10 px-3 py-1 rounded-full text-xs" dir="ltr">-$0</span>
            </div>
          </div>

          <div className="mt-6 mb-8 flex items-end justify-between gap-4">
            <span className="text-xl font-bold text-foreground">{isAr ? "الإجمالي" : "Total"}</span>
            <div className="flex flex-col items-end gap-1">
              <span className="text-3xl font-black text-foreground leading-none" dir="ltr">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(finalTotal)}
              </span>
              <span className="text-sm font-bold text-text-secondary" dir="rtl">
                {new Intl.NumberFormat(isAr ? 'ar-IQ' : 'en-IQ', { style: 'currency', currency: 'IQD', maximumFractionDigits: 0 }).format(finalTotal * 1500)}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Promo Code */}
            <div className="relative flex items-center bg-background rounded-2xl p-1.5 border border-transparent focus-within:border-border-focus transition-colors shadow-sm">
              <Tag className={cn("absolute h-5 w-5 text-text-tertiary pointer-events-none", isAr ? "right-4" : "left-4")} />
              <input 
                placeholder={isAr ? "أدخل كود الخصم" : "Promo Code"} 
                className={cn("h-12 w-full bg-transparent border-none outline-none text-sm font-bold placeholder:text-text-tertiary", isAr ? "pr-12 pl-24" : "pl-12 pr-24")} 
              />
              <Button className={cn("absolute rounded-xl font-bold bg-foreground text-white hover:bg-text-secondary h-11 px-6 transition-all active:scale-95", isAr ? "left-1.5" : "right-1.5")}>
                {isAr ? "تطبيق" : "Apply"}
              </Button>
            </div>

            <Link href={`/${locale}/checkout`} className="block w-full">
              <Button className="h-16 w-full rounded-2xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-lg font-bold shadow-soft hover:shadow-float transition-all hover:scale-[1.02] gap-3">
                {isAr ? "متابعة الدفع" : "Proceed to Checkout"}
                <ArrowRight className={cn("h-6 w-6", isAr && "rotate-180")} />
              </Button>
            </Link>
            
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-text-tertiary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              {isAr ? "عملية دفع آمنة ومشفرة 100%" : "100% Secure & Encrypted Checkout"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
