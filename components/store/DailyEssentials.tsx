"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

interface DailyEssentialsProps {
  title: string;
  viewAllLabel: string;
  categories: { name: string; image: string; discount: string }[];
}

export function DailyEssentials({
  title,
  viewAllLabel,
  categories,
}: DailyEssentialsProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const tabs = [
    { id: "all", label: isAr ? "الكل" : "All" },
    { id: "fruits", label: isAr ? "فواكه وخضار" : "Fruits & Veg" },
    { id: "dairy", label: isAr ? "ألبان" : "Dairy" },
    { id: "beverages", label: isAr ? "مشروبات" : "Beverages" },
  ];
  
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section>
      <SectionHeader title={title} viewAllLabel={viewAllLabel} />
      
      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id 
                ? "bg-primary text-white shadow-md" 
                : "bg-surface text-text-secondary hover:text-primary hover:bg-surface-hover border border-border/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {categories.map((item) => (
          <div
            key={item.name}
            className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-float hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="flex h-32 items-center justify-center p-4">
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
            </div>
            <div className="border-t border-border bg-background p-3 text-center">
              <p className="text-sm font-black text-foreground line-clamp-1">{item.name}</p>
              <p className="text-[11px] font-bold text-primary bg-primary-subtle px-2 py-1 rounded-md mt-2 inline-block">
                {item.discount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
