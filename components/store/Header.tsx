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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md shadow-soft border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex h-24 items-center justify-between gap-6 md:gap-10">
          
          {/* 1. Logo (Left) */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 text-3xl font-black text-foreground tracking-tighter transition-opacity hover:opacity-80 flex items-center gap-1"
          >
            MegaMart<span className="text-primary">.</span>
          </Link>

          {/* 2. Search Bar (Center) - Perfectly sized and constrained */}
          <div className="hidden md:flex flex-1 max-w-2xl justify-center">
            <form 
              onSubmit={handleSearch}
              className="group flex h-14 w-full items-center overflow-hidden rounded-xl bg-surface px-4 transition-all duration-300 focus-within:bg-background focus-within:ring-2 focus-within:ring-border-focus focus-within:shadow-soft border border-transparent focus-within:border-border-focus"
            >
              <Search className="h-5 w-5 text-text-secondary group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchPlaceholder") || "Search products, brands and categories..."}
                className="h-full w-full bg-transparent px-4 text-sm font-medium text-foreground placeholder:font-normal placeholder:text-text-tertiary focus:outline-none"
              />
              {/* Optional submit button for better UX, hidden visually but clickable */}
              <button type="submit" className="hidden" aria-label="Submit search" />
            </form>
          </div>

          {/* 3. Actions (Right) */}
          <div className="flex flex-shrink-0 items-center gap-3 sm:gap-6">
            
            <Link
              href={`/${otherLocale}`}
              className="hidden sm:flex items-center justify-center h-12 w-12 rounded-xl bg-surface text-sm font-bold text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>

            <div className="h-8 w-px bg-border hidden sm:block"></div>

            <Link
              href={`/${locale}/auth`}
              className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface group-hover:bg-surface-hover group-hover:text-primary transition-colors">
                <User className="h-5 w-5 stroke-[2]" />
              </div>
              <span className="hidden lg:inline text-sm font-semibold">{t("signIn")}</span>
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-surface group-hover:bg-surface-hover group-hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5 stroke-[2]" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[11px] font-black text-white shadow-soft">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm font-semibold">{t("cart")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navbar (Bottom) */}
      <div className="border-t border-border bg-background">
        <Navbar categories={categories} />
      </div>
    </header>
  );
}
