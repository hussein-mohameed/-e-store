import Image from "next/image";
import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function CategoryList() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between border-b border-border pb-2 mb-8">
        <h2 className="text-xl md:text-2xl font-black text-foreground">
          Shop From <span className="text-primary border-b-4 border-primary pb-1 inline-block">Top Categories</span>
        </h2>
        <Link href="/categories" className="text-sm font-bold text-text-secondary hover:text-primary flex items-center transition-colors">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 justify-between md:justify-start">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="flex flex-col items-center gap-4 group min-w-[110px]">
            <div className="w-28 h-28 rounded-full bg-surface shadow-sm border border-border/50 flex items-center justify-center overflow-hidden group-hover:border-primary group-hover:shadow-float group-hover:-translate-y-1.5 transition-all duration-300 relative">
               {category.icon ? (
                 <Image
                   src={category.icon}
                   alt={category.name}
                   fill
                   className="object-cover p-5 transition-transform duration-500 group-hover:scale-110"
                 />
               ) : (
                 <LayoutGrid className="w-10 h-10 text-text-tertiary group-hover:text-primary transition-colors" />
               )}
            </div>
            <span className="text-sm font-bold text-text-secondary group-hover:text-primary transition-colors">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
