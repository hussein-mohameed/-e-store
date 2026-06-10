import type { CategoryItem, ProductItem } from "@/types";

export function getDemoCategories(): CategoryItem[] {
  return [
    {
      id: "1",
      name: "Groceries",
      nameAr: "بقالة",
      slug: "groceries",
      icon: "https://png.pngtree.com/png-clipart/20230811/original/pngtree-grocery-basket-png-image_10304313.png",
      active: true,
      sortOrder: 0,
    },
    {
      id: "2",
      name: "Premium Fruits",
      nameAr: "فواكه فاخرة",
      slug: "premium-fruits",
      icon: "https://pngimg.com/d/fruit_PNG2.png",
      active: true,
      sortOrder: 1,
    },
    {
      id: "3",
      name: "Home & Kitchen",
      nameAr: "المنزل والمطبخ",
      slug: "home-kitchen",
      icon: "https://pngimg.com/d/blender_PNG56.png",
      active: true,
      sortOrder: 2,
    },
    {
      id: "4",
      name: "Fashion",
      nameAr: "أزياء",
      slug: "fashion",
      icon: "https://pngimg.com/d/tshirt_PNG5450.png",
      active: true,
      sortOrder: 3,
    },
    {
      id: "5",
      name: "Electronics",
      nameAr: "إلكترونيات",
      slug: "electronics",
      icon: "https://pngimg.com/d/macbook_PNG65.png",
      active: true,
      sortOrder: 4,
    },
    {
      id: "6",
      name: "Beauty",
      nameAr: "جمال",
      slug: "beauty",
      icon: "https://pngimg.com/d/cosmetics_PNG24.png",
      active: true,
      sortOrder: 5,
    },
    {
      id: "7",
      name: "Home Improvement",
      nameAr: "تحسين المنزل",
      slug: "home-improvement",
      icon: "https://pngimg.com/d/drill_PNG53.png",
      active: true,
      sortOrder: 6,
    },
    {
      id: "8",
      name: "Sports",
      nameAr: "رياضة",
      slug: "sports",
      icon: "https://pngimg.com/d/football_PNG52789.png",
      active: true,
      sortOrder: 7,
    },
    {
      id: "9",
      name: "Toys & Luggage",
      nameAr: "ألعاب وحقائب",
      slug: "toys-luggage",
      icon: "https://pngimg.com/d/toys_PNG59.png",
      active: true,
      sortOrder: 8,
    },
  ];
}

export function getDemoProducts(categorySlug?: string): ProductItem[] {
  const electronics = [
    {
      name: "iPhone 15 Pro Max 256GB",
      nameAr: "آيفون 15 برو ماكس 256 جيجابايت",
      price: 1199,
      originalPrice: 1299,
      discount: 8,
      image: "/products/iphone_15.png",
    },
    {
      name: "Apple MacBook Pro M3",
      nameAr: "أبل ماك بوك برو M3",
      price: 1999,
      originalPrice: 2199,
      discount: 9,
      image: "/products/macbook.png",
    },
    {
      name: "Sony PlayStation 5 Console",
      nameAr: "سوني بلايستيشن 5",
      price: 499,
      originalPrice: 549,
      discount: 9,
      image: "/products/ps5.png",
    },
    {
      name: "Apple AirPods Pro (2nd Gen)",
      nameAr: "سماعات أبل إيربودز برو الجيل الثاني",
      price: 249,
      originalPrice: 299,
      discount: 16,
      image: "/products/airpods.png",
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      nameAr: "سامسونج جالاكسي S24 ألترا",
      price: 1299,
      originalPrice: 1399,
      discount: 7,
      image: "/products/galaxy_s24.png",
    },
  ];

  const cosmetics = [
    {
      name: "Dior Sauvage Parfum 100ml",
      nameAr: "عطر ديور سوفاج 100 مل",
      price: 155,
      originalPrice: 185,
      discount: 16,
      image: "/products/dior_perfume.png",
    },
    {
      name: "MAC Ruby Woo Matte Lipstick",
      nameAr: "أحمر شفاه ماك روبي وو مات",
      price: 25,
      originalPrice: 30,
      discount: 16,
      image: "/products/mac_lipstick.png",
    },
    {
      name: "Estee Lauder Night Repair Serum",
      nameAr: "سيروم إيستي لودر للإصلاح الليلي",
      price: 115,
      originalPrice: 135,
      discount: 14,
      image: "/products/estee_serum.png",
    },
    {
      name: "Huda Beauty Nude Eyeshadow Palette",
      nameAr: "لوحة ظلال عيون هدى بيوتي نود",
      price: 65,
      originalPrice: 75,
      discount: 13,
      image: "/products/huda_eyeshadow.png",
    },
    {
      name: "Chanel Coco Mademoiselle 50ml",
      nameAr: "عطر شانيل كوكو مدموزيل 50 مل",
      price: 135,
      originalPrice: 155,
      discount: 12,
      image: "/products/chanel_perfume.png",
    },
  ];

  let rawProducts = electronics;
  let defaultCatId = "5"; // electronics

  if (categorySlug === "beauty" || categorySlug === "cosmetics") {
    rawProducts = cosmetics;
    defaultCatId = "6"; // beauty
  }

  return rawProducts.map((p, i) => ({
    id: `demo-${categorySlug || 'all'}-${i}`,
    name: p.name,
    nameAr: p.nameAr,
    slug: p.name.toLowerCase().replace(/\s+/g, "-"),
    description: null,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    discount: p.discount,
    featured: true,
    active: true,
    categoryId: defaultCatId,
  }));
}
