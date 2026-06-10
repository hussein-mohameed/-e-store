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
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <ul className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category, index) => {
            const label =
              locale === "ar" && category.nameAr
                ? category.nameAr
                : category.name;
            return (
              <li key={category.id} className="shrink-0">
                <Link
                  href={`/${locale}/categories/${category.slug}`}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface hover:text-primary transition-colors"
                >
                  {label}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
