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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-float hover:-translate-y-1 hover:border-primary/50">
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute right-0 top-0 z-10 flex flex-col items-center justify-center rounded-none rounded-bl-xl bg-primary px-3 py-1.5 text-[10px] font-black leading-tight text-white hover:bg-primary-hover shadow-sm">
          <span>{discountPercent}%</span>
          <span>OFF</span>
        </Badge>
      )}

      {/* Product Image */}
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-background p-6">
          <Image
            src={image || "https://placehold.co/400x400/png?text=Product"}
            alt={name}
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 20vw"
            unoptimized
          />
        </div>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="flex flex-1 flex-col p-5 bg-surface">
        <CardTitle className="line-clamp-2 text-sm font-bold text-foreground leading-snug">
          {name}
        </CardTitle>
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-foreground">
              ₹{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm font-bold text-text-tertiary line-through">
                ₹{oldPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="mt-2 min-h-[24px]">
            {hasDiscount && (
              <span className="text-xs font-bold text-primary bg-primary-subtle px-2 py-1 rounded-md">
                Save - ₹{savedAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Optional Hover Action */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-surface/95 backdrop-blur-sm p-4 transition-transform duration-300 group-hover:translate-y-0 border-t border-border">
         <Button className="w-full bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-xl h-11 font-bold shadow-sm transition-all" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
         </Button>
      </div>
    </Card>
  );
}
