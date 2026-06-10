"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const active = formData.get("active") === "true"

  await prisma.category.create({
    data: {
      name,
      slug,
      active,
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/categories")
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({
    where: { id }
  })
  
  revalidatePath("/")
  revalidatePath("/admin/categories")
}
