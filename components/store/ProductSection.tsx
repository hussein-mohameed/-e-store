import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";
import type { ProductItem } from "@/types";

interface ProductSectionProps {
  title: string;
  viewAllLabel: string;
  products: ProductItem[];
  viewAllHref?: string;
}

export function ProductSection({
  title,
  viewAllLabel,
  products,
  viewAllHref,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <SectionHeader
        title={title}
        viewAllLabel={viewAllLabel}
        viewAllHref={viewAllHref}
      />
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 md:mx-0 md:px-0">
        {products.map((product) => (
          <div key={product.id} className="w-[260px] shrink-0 snap-start md:w-auto md:shrink">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
