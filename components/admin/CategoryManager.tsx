"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/categories";
import type { CategoryItem } from "@/types";

interface CategoryManagerProps {
  categories: CategoryItem[];
  labels: Record<string, string>;
}

const emptyForm = {
  name: "",
  nameAr: "",
  slug: "",
  icon: "",
  active: true,
  sortOrder: 0,
};

export function CategoryManager({ categories, labels }: CategoryManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setEditingId("new");
    setForm(emptyForm);
  };

  const openEdit = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      nameAr: cat.nameAr ?? "",
      slug: cat.slug,
      icon: cat.icon ?? "",
      active: cat.active,
      sortOrder: cat.sortOrder,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      nameAr: form.nameAr || undefined,
      slug: form.slug,
      icon: form.icon || undefined,
      active: form.active,
      sortOrder: Number(form.sortOrder),
    };

    if (editingId === "new") {
      await createCategory(payload);
    } else if (editingId) {
      await updateCategory(editingId, payload);
    }

    setEditingId(null);
    setForm(emptyForm);
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(labels.confirmDelete)) return;
    await deleteCategory(id);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{labels.categories}</h2>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          {labels.addCategory}
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId === "new" ? labels.addCategory : labels.editCategory}
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
                <Label>{labels.icon}</Label>
                <Input
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>{labels.sortOrder}</Label>
                <Input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm({ ...form, sortOrder: Number(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                  className="h-4 w-4 rounded"
                />
                <Label htmlFor="active">{labels.active}</Label>
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
              <th className="px-4 py-3 text-start font-medium">{labels.slug}</th>
              <th className="px-4 py-3 text-start font-medium">
                {labels.sortOrder}
              </th>
              <th className="px-4 py-3 text-start font-medium">
                {labels.active}
              </th>
              <th className="px-4 py-3 text-end font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-gray-50">
                <td className="px-4 py-3">{cat.name}</td>
                <td className="px-4 py-3 text-gray-500">{cat.slug}</td>
                <td className="px-4 py-3">{cat.sortOrder}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      cat.active ? "text-green-600" : "text-gray-400"
                    }
                  >
                    {cat.active ? "✓" : "✗"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(cat)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(cat.id)}
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
