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
    bgClass: "bg-gradient-to-r from-[#1E293B] to-[#0F172A]", // Dark blue theme
  },
  {
    id: 2,
    title: "LATEST SMARTPHONES.",
    subtitle: "Upgrade your lifestyle today",
    discount: "UP to 50% OFF",
    image: "https://placehold.co/600x400/png?text=Smartphone",
    bgClass: "bg-gradient-to-r from-[#008ECC] to-[#005F8A]",
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
        className="w-full relative rounded-3xl overflow-hidden shadow-soft"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {BANNERS.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className={`relative h-[300px] md:h-[400px] w-full flex items-center ${banner.bgClass}`}>
                <div className="flex-1 px-8 md:px-16 z-10 text-white">
                  <p className="text-sm md:text-lg mb-2 text-white/80 font-medium tracking-wide uppercase">{banner.subtitle}</p>
                  <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">{banner.title}</h2>
                  <p className="text-xl md:text-2xl font-bold text-white/90">{banner.discount}</p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none">
                  {/* Decorative shape or image wrapper */}
                  <div className="relative w-full h-full max-w-[400px]">
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-contain object-right p-8"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-none w-12 h-12 shadow-sm backdrop-blur-md" />
        <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-none w-12 h-12 shadow-sm backdrop-blur-md" />
      </Carousel>
    </div>
  )
}
