"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryItem } from "@/types";

interface NavbarProps {
  categories: CategoryItem[];
}

export function Navbar({ categories }: NavbarProps) {
  const locale = useLocale();

  if (categories.length === 0) return null;

  return (
    <nav className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex items-center justify-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category, index) => {
            const label =
              locale === "ar" && category.nameAr
                ? category.nameAr
                : category.name;
            return (
              <li key={category.id} className="shrink-0">
                <Link
                  href={`/${locale}/categories/${category.slug}`}
                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                >
                  {label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
