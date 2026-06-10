import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import type { CategoryItem } from "@/types";

interface TopCategoriesProps {
  categories: CategoryItem[];
  title: string;
  viewAllLabel: string;
  locale: string;
}

const FALLBACK_ICONS: Record<string, string> = {
  mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop",
  cosmetics: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop",
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop",
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
  watches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  decor: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=100&h=100&fit=crop",
  accessories: "https://images.unsplash.com/photo-1606760227091-3dd870d5f817?w=100&h=100&fit=crop",
};

export function TopCategories({
  categories,
  title,
  viewAllLabel,
  locale,
}: TopCategoriesProps) {
  return (
    <section>
      <SectionHeader title={title} viewAllLabel={viewAllLabel} />
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {categories.map((category) => {
          const label =
            locale === "ar" && category.nameAr
              ? category.nameAr
              : category.name;
          const icon =
            category.icon ||
            FALLBACK_ICONS[category.slug] ||
            FALLBACK_ICONS.mobile;

          return (
            <Link
              key={category.id}
              href={`/${locale}/categories/${category.slug}`}
              className="group flex flex-col items-center gap-4"
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[2rem] bg-surface border border-border/50 shadow-sm transition-all duration-300 group-hover:bg-surface-hover group-hover:shadow-float group-hover:-translate-y-1.5 md:h-28 md:w-28">
                <Image
                  src={icon}
                  alt={label}
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              </div>
              <span className="text-center text-xs font-bold text-text-secondary md:text-sm group-hover:text-primary transition-colors">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
