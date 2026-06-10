"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const BANNERS = [
  {
    id: 1,
    title: "SMART WEARABLE.",
    subtitle: "Best Deal Online on smart watches",
    discount: "UP to 80% OFF",
    image: "https://placehold.co/600x400/png?text=Smart+Watch", // Placeholder
    bgClass: "bg-foreground", // Dark contrast
  },
  {
    id: 2,
    title: "LATEST SMARTPHONES.",
    subtitle: "Upgrade your lifestyle today",
    discount: "UP to 50% OFF",
    image: "https://placehold.co/600x400/png?text=Smartphone",
    bgClass: "bg-primary", // Attractive Teal
  }
]

export function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="container mx-auto px-4 py-6 w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full relative rounded-[2rem] overflow-hidden shadow-float"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {BANNERS.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className={`relative h-[350px] md:h-[450px] w-full flex items-center ${banner.bgClass}`}>
                <div className="flex-1 px-8 md:px-20 z-10 text-white">
                  <p className="text-sm md:text-lg mb-3 text-white/80 font-bold tracking-[0.2em] uppercase">{banner.subtitle}</p>
                  <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1]">{banner.title}</h2>
                  <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <p className="text-xl md:text-2xl font-bold text-white">{banner.discount}</p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none">
                  {/* Decorative shape or image wrapper */}
                  <div className="relative w-full h-full max-w-[500px]">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-contain object-right p-8 scale-105"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border border-white/20 w-14 h-14 rounded-2xl shadow-sm backdrop-blur-md transition-all" />
        <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border border-white/20 w-14 h-14 rounded-2xl shadow-sm backdrop-blur-md transition-all" />
      </Carousel>
    </div>
  )
}
