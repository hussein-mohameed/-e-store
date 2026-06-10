"use client";

import { Truck, ShieldCheck, HeadphonesIcon, RotateCcw } from "lucide-react";
import { useLocale } from "next-intl";

const features = [
  {
    icon: Truck,
    title: { en: "Free Shipping", ar: "شحن مجاني" },
    subtitle: { en: "On orders over $50", ar: "للطلبات فوق 50 دولار" },
  },
  {
    icon: ShieldCheck,
    title: { en: "Secure Payment", ar: "دفع آمن" },
    subtitle: { en: "100% secure checkout", ar: "حماية 100% لعمليات الدفع" },
  },
  {
    icon: HeadphonesIcon,
    title: { en: "24/7 Support", ar: "دعم فني 24/7" },
    subtitle: { en: "Dedicated support", ar: "فريق دعم مخصص" },
  },
  {
    icon: RotateCcw,
    title: { en: "Free Returns", ar: "إرجاع مجاني" },
    subtitle: { en: "30 days return policy", ar: "سياسة إرجاع خلال 30 يوماً" },
  },
];

export function FeaturesBar() {
  const locale = useLocale() as "en" | "ar";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center text-center space-y-3 group">
          <div className="flex h-12 w-12 items-center justify-center text-gray-900 transition-transform group-hover:scale-110">
            <feature.icon className="h-7 w-7 stroke-[1.2px]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{feature.title[locale]}</h4>
            <p className="mt-1 text-xs text-gray-500">{feature.subtitle[locale]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
