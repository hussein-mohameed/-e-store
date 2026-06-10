"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { Navbar } from "./Navbar";
import type { CategoryItem } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  categories: CategoryItem[];
}

export function Header({ categories }: HeaderProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const { totalItems, mounted } = useCart();
  const otherLocale = locale === "ar" ? "en" : "ar";
  
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between gap-8">
          
          {/* 1. Logo (Left) */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 text-3xl font-black text-gray-900 tracking-tighter transition-opacity hover:opacity-80"
          >
            MegaMart<span className="text-black">.</span>
          </Link>

          {/* 2. Search Bar (Center) - Perfectly sized and constrained */}
          <div className="hidden md:flex flex-1 max-w-2xl justify-center">
            <form 
              onSubmit={handleSearch}
              className="group flex h-12 w-full items-center overflow-hidden rounded-full bg-[#f5f5f7] px-4 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-black focus-within:shadow-md border border-transparent focus-within:border-gray-200"
            >
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder") || "Search products, brands and categories..."}
                className="h-full w-full bg-transparent px-4 text-sm font-bold text-gray-900 placeholder:font-medium placeholder:text-gray-400 focus:outline-none"
              />
              {/* Optional submit button for better UX, hidden visually but clickable */}
              <button type="submit" className="hidden" aria-label="Submit search" />
            </form>
          </div>

          {/* 3. Actions (Right) */}
          <div className="flex flex-shrink-0 items-center gap-3 sm:gap-6">
            
            <Link
              href={`/${otherLocale}`}
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 text-sm font-bold text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
            >
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

            <Link
              href={`/${locale}/auth`}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <User className="h-5 w-5 stroke-[2]" />
              </div>
              <span className="hidden lg:inline text-sm font-bold">{t("signIn")}</span>
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-5 w-5 stroke-[2]" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-black text-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm font-bold">{t("cart")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navbar (Bottom) */}
      <div className="border-t border-gray-50 bg-white/50">
        <Navbar categories={categories} />
      </div>
    </header>
  );
}
