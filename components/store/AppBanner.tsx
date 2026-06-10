"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function AppBanner() {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#111111] text-white shadow-xl shadow-black/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,white_2px,transparent_2px)] bg-[length:30px_30px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-12 md:flex-row md:px-16 md:py-16">
        <div className="max-w-xl space-y-6 text-center md:text-start">
          <h2 className="text-4xl font-black leading-tight md:text-5xl tracking-tight">
            {isAr ? "حمل التطبيق الآن واحصل على خصم 20%" : "Download Our App & Get 20% Off"}
          </h2>
          <p className="text-lg text-gray-400 font-medium">
            {isAr 
              ? "تسوق أينما كنت وفي أي وقت بكل سهولة وسرعة من خلال تطبيقنا المميز." 
              : "Shop wherever you are, anytime, with ease and speed through our premium app."}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Button size="lg" className="h-14 w-48 rounded-xl bg-gray-900 text-white hover:bg-gray-800 gap-2">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg" alt="Apple" width={20} height={20} className="object-contain" unoptimized />
              <div className="flex flex-col items-start text-start leading-none">
                <span className="text-[10px] text-gray-300">Download on the</span>
                <span className="font-bold">App Store</span>
              </div>
            </Button>
            <Button size="lg" className="h-14 w-48 rounded-xl bg-gray-900 text-white hover:bg-gray-800 gap-2">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" width={20} height={20} className="object-contain" unoptimized />
              <div className="flex flex-col items-start text-start leading-none">
                <span className="text-[10px] text-gray-300">GET IT ON</span>
                <span className="font-bold">Google Play</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Floating Phones Mockup */}
        <div className="hidden lg:block relative w-[300px] h-[250px]">
          <Image
            src="https://pngimg.com/d/iphone_14_PNG18.png"
            alt="App Mockup"
            width={200}
            height={400}
            className="absolute top-[-100px] end-10 drop-shadow-2xl rotate-12 z-20 h-[400px] w-auto object-contain"
            unoptimized
          />
          <Image
            src="https://pngimg.com/d/samsung_galaxy_PNG18.png"
            alt="App Mockup 2"
            width={180}
            height={360}
            className="absolute top-[-50px] end-32 drop-shadow-2xl -rotate-6 z-10 h-[340px] w-auto object-contain opacity-80"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
