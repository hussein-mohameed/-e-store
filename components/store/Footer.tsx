"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle } from "lucide-react";

export function Footer() {
  const t = useTranslations();

  const popularLinks = [
    t("footer.staples"),
    t("footer.beverages"),
    t("footer.personalCare"),
    t("footer.homeCare"),
    t("footer.babyCare"),
    t("footer.snacks"),
  ];

  const serviceLinks = [
    { label: t("footer.aboutUs"), href: "#" },
    { label: t("footer.terms"), href: "#" },
    { label: t("footer.faq"), href: "#" },
    { label: t("footer.privacy"), href: "#" },
    { label: t("footer.returns"), href: "#" },
  ];

  return (
    <footer className="mt-auto bg-[#111111] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">MegaMart</h2>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-90">
                {t("common.contactUs")}
              </h3>
              <div className="space-y-2 text-sm">
                <a
                  href="https://wa.me/966500000000"
                  className="flex items-center gap-2 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("common.whatsapp")}: +966 50 000 0000
                </a>
                <a
                  href="tel:+966500000000"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {t("common.call")}: +966 50 000 0000
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-90">
                {t("common.downloadApp")}
              </h3>
              <div className="flex gap-2">
                <div className="rounded-lg bg-white/10 px-4 py-2 text-xs font-medium">
                  App Store
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-2 text-xs font-medium">
                  Google Play
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide opacity-90">
              {t("common.mostPopularCategories")}
            </h3>
            <ul className="space-y-2 text-sm">
              {popularLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="opacity-90 hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide opacity-90">
              {t("common.customerServices")}
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="opacity-90 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs opacity-80">
        {t("common.copyright")}
      </div>
    </footer>
  );
}
