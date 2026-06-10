import { prisma } from "@/lib/prisma"
import { createCategory, deleteCategory } from "../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Categories</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form action={createCategory} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" name="name" required placeholder="e.g. Smartphones" />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" required placeholder="e.g. smartphones" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="active" name="active" value="true" defaultChecked className="w-4 h-4" />
            <Label htmlFor="active">Active</Label>
          </div>
          <Button type="submit" className="w-full">Create Category</Button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{cat.name}</td>
                <td className="p-4 text-gray-500">{cat.slug}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {cat.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteCategory(cat.id)
                  }}>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
