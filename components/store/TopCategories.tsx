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
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6] transition group-hover:bg-[#E5E7EB] md:h-24 md:w-24">
                <Image
                  src={icon}
                  alt={label}
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
                  unoptimized
                />
              </div>
              <span className="text-center text-xs font-bold text-gray-800 md:text-sm">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
