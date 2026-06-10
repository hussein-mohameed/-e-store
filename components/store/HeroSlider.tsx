"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: { en: "The New Standard", ar: "المعيار الجديد" },
    subtitle: { en: "APPLE WATCH SERIES 9", ar: "أبل واتش سيريس 9" },
    desc: { en: "Smarter, brighter, and mightier.", ar: "أذكى، أكثر سطوعاً، وأقوى من أي وقت مضى." },
    image: "https://pngimg.com/d/smart_watch_PNG49.png",
    bg: "bg-[#f5f5f7]",
  },
  {
    id: 2,
    title: { en: "Pro Performance", ar: "أداء احترافي" },
    subtitle: { en: "MACBOOK PRO M3", ar: "ماك بوك برو M3" },
    desc: { en: "Mind-blowing speed and battery life.", ar: "سرعة خيالية وعمر بطارية لا يصدق." },
    image: "/products/macbook.png",
    bg: "bg-[#f5f5f7]",
  },
  {
    id: 3,
    title: { en: "Titanium Strong", ar: "قوة التيتانيوم" },
    subtitle: { en: "IPHONE 15 PRO", ar: "آيفون 15 برو" },
    desc: { en: "The first iPhone with an aerospace-grade titanium design.", ar: "أول آيفون بتصميم من التيتانيوم المستخدم في مجال الطيران." },
    image: "/products/iphone_15.png",
    bg: "bg-[#f5f5f7]",
  },
];

export function HeroSlider() {
  const locale = useLocale();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-surface h-full flex flex-col shadow-soft">
      <div className="relative flex-1 flex min-h-[400px] md:min-h-[500px] w-full items-center justify-between transition-all duration-700 ease-in-out px-8 md:px-20 py-12">
        {/* Subtle Gradient Overlay for Text Readability */}
        <div className={cn(
          "absolute inset-0 z-0 bg-gradient-to-r from-surface via-surface/80 to-transparent w-full md:w-3/4",
          isAr && "bg-gradient-to-l"
        )} />
        
        {/* Left/Right controls (Subtle) */}
        <button
          onClick={prev}
          className="absolute start-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/5 text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all shadow-sm backdrop-blur-sm"
        >
          <ChevronLeft className={cn("h-6 w-6", isAr && "rotate-180")} />
        </button>

        <button
          onClick={next}
          className="absolute end-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-foreground/5 text-text-secondary hover:bg-surface-hover hover:text-foreground transition-all shadow-sm backdrop-blur-sm"
        >
          <ChevronRight className={cn("h-6 w-6", isAr && "rotate-180")} />
        </button>

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-sm md:text-base font-bold tracking-[0.2em] text-primary uppercase">
            {slide.title[locale as "en" | "ar"]}
          </p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
            {slide.subtitle[locale as "en" | "ar"]}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary font-medium max-w-md leading-relaxed">
            {slide.desc[locale as "en" | "ar"]}
          </p>
          
          <div className="pt-6 flex gap-4 items-center">
            <button className="px-10 py-5 bg-primary text-white rounded-xl font-bold text-base hover:bg-primary-hover active:bg-primary-active transition-all shadow-soft hover:shadow-float hover:-translate-y-0.5">
              {isAr ? "اشتري الآن" : "Buy Now"}
            </button>
            <button className="px-10 py-5 bg-background text-foreground rounded-xl font-bold text-base hover:bg-surface-hover transition-all shadow-sm hover:shadow-soft border border-border">
              {isAr ? "اكتشف المزيد" : "Learn More"}
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:flex absolute end-20 top-1/2 -translate-y-1/2 w-1/2 justify-center items-center pointer-events-none">
          <Image
            key={slide.id}
            src={slide.image}
            alt="Product image"
            width={600}
            height={600}
            className="object-contain h-[350px] md:h-[450px] animate-in fade-in zoom-in-95 duration-1000 ease-out"
            unoptimized
          />
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 start-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === current ? "w-12 bg-primary shadow-soft" : "w-4 bg-border hover:bg-text-tertiary"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
