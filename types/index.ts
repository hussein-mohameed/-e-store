export interface CategoryItem {
  id: string;
  name: string;
  nameAr: string | null;
  slug: string;
  icon: string | null;
  active: boolean;
  sortOrder: number;
}

export interface ProductItem {
  id: string;
  name: string;
  nameAr: string | null;
  slug: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  image: string;
  discount: number;
  featured: boolean;
  active: boolean;
  categoryId: string;
  category?: CategoryItem;
}

export interface CartItem {
  id: string;
  name: string;
  nameAr: string | null;
  price: number;
  image: string;
  quantity: number;
}
