"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/actions/products";
import type { CategoryItem, ProductItem } from "@/types";

interface ProductManagerProps {
  products: ProductItem[];
  categories: CategoryItem[];
  labels: Record<string, string>;
}

const emptyForm = {
  name: "",
  nameAr: "",
  slug: "",
  description: "",
  price: 0,
  originalPrice: 0,
  image: "",
  discount: 0,
  featured: false,
  active: true,
  categoryId: "",
};

export function ProductManager({
  products,
  categories,
  labels,
}: ProductManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setEditingId("new");
    setForm({ ...emptyForm, categoryId: categories[0]?.id ?? "" });
  };

  const openEdit = (product: ProductItem) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      nameAr: product.nameAr ?? "",
      slug: product.slug,
      description: product.description ?? "",
      price: product.price,
      originalPrice: product.originalPrice ?? 0,
      image: product.image,
      discount: product.discount,
      featured: product.featured,
      active: product.active,
      categoryId: product.categoryId,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      nameAr: form.nameAr || undefined,
      slug: form.slug,
      description: form.description || undefined,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice) || undefined,
      image: form.image,
      discount: Number(form.discount),
      featured: form.featured,
      active: form.active,
      categoryId: form.categoryId,
    };

    if (editingId === "new") {
      await createProduct(payload);
    } else if (editingId) {
      await updateProduct(editingId, payload);
    }

    setEditingId(null);
    setForm(emptyForm);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(labels.confirmDelete)) return;
    await deleteProduct(id);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{labels.products}</h2>
        <Button onClick={openCreate} className="gap-2" disabled={categories.length === 0}>
          <Plus className="h-4 w-4" />
          {labels.addProduct}
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId === "new" ? labels.addProduct : labels.editProduct}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{labels.name}</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.nameAr}</Label>
                <Input
                  value={form.nameAr}
                  onChange={(e) =>
                    setForm({ ...form, nameAr: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.slug}</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.category}</Label>
                <select
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  className="flex h-10 w-full rounded-xl border border-gray-200 px-3 text-sm"
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>{labels.price}</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.originalPrice}</Label>
                <Input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      originalPrice: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.discount}</Label>
                <Input
                  type="number"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>{labels.image}</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                  />
                  {labels.featured}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) =>
                      setForm({ ...form, active: e.target.checked })
                    }
                  />
                  {labels.active}
                </label>
              </div>
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" disabled={loading}>
                  {labels.save}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                >
                  {labels.cancel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-start font-medium">{labels.name}</th>
              <th className="px-4 py-3 text-start font-medium">{labels.price}</th>
              <th className="px-4 py-3 text-start font-medium">
                {labels.category}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {labels.featured}
              </th>
              <th className="px-4 py-3 text-end font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3 text-gray-500">
                  {categories.find((c) => c.id === product.categoryId)?.name ??
                    "-"}
                </td>
                <td className="px-4 py-3">
                  {product.featured ? "✓" : "✗"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(product)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
