import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number | any; // Decimal type in Prisma comes as an object or string, so any/number
    originalPrice?: number | any | null;
    discount?: number;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, price, originalPrice, discount, image } = product;

  // Convert Prisma Decimals to numbers if necessary
  const currentPrice = Number(price);
  const oldPrice = originalPrice ? Number(originalPrice) : currentPrice;
  const hasDiscount = !!(discount && discount > 0);
  const discountPercent = discount || 0;
  const savedAmount = hasDiscount ? oldPrice - currentPrice : 0;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute right-0 top-0 z-10 flex flex-col items-center justify-center rounded-none rounded-bl-lg bg-[#008ECC] px-2 py-1 text-[10px] font-bold leading-tight text-white hover:bg-[#008ECC]/90">
          <span>{discountPercent}%</span>
          <span>OFF</span>
        </Badge>
      )}

      {/* Product Image */}
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50/30 p-6">
          <Image
            src={image || "https://placehold.co/400x400/png?text=Product"}
            alt={name}
            fill
            className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
          />
        </div>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="flex flex-1 flex-col p-4">
        <CardTitle className="line-clamp-2 text-sm font-semibold text-gray-800">
          {name}
        </CardTitle>
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm font-medium text-gray-400 line-through">
                ₹{oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-1 min-h-[20px]">
            {hasDiscount && (
              <span className="text-xs font-semibold text-[#249B3E]">
                Save - ₹{savedAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Optional Hover Action */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white p-4 transition-transform duration-300 group-hover:translate-y-0">
         <Button className="w-full bg-[#008ECC] hover:bg-[#008ECC]/90 text-white" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
         </Button>
      </div>
    </Card>
  );
}
