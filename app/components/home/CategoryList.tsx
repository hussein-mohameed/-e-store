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
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">
          Shop From <span className="text-[#008ECC] border-b-2 border-[#008ECC] pb-2 inline-block">Top Categories</span>
        </h2>
        <Link href="/categories" className="text-sm font-medium text-gray-500 hover:text-[#008ECC] flex items-center transition-colors">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 justify-between md:justify-start">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="flex flex-col items-center gap-3 group min-w-[100px]">
            <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200 group-hover:border-[#008ECC] transition-colors relative">
               {category.icon ? (
                 <Image
                   src={category.icon}
                   alt={category.name}
                   fill
                   className="object-cover p-4"
                 />
               ) : (
                 <LayoutGrid className="w-10 h-10 text-gray-400 group-hover:text-[#008ECC] transition-colors" />
               )}
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#008ECC] transition-colors">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
