import "dotenv/config";
import { prisma } from '../lib/prisma'

async function main() {
  console.log('Seeding database with MegaMart data...')

  // Wipe existing data (optional, good for dev seeding)
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 1. Create Categories
  const categoriesData = [
    { name: 'Mobile', slug: 'mobile', icon: 'https://placehold.co/100x100/png?text=Mobile' },
    { name: 'Cosmetics', slug: 'cosmetics', icon: 'https://placehold.co/100x100/png?text=Cosmetics' },
    { name: 'Electronics', slug: 'electronics', icon: 'https://placehold.co/100x100/png?text=Electronics' },
    { name: 'Furniture', slug: 'furniture', icon: 'https://placehold.co/100x100/png?text=Furniture' },
    { name: 'Watches', slug: 'watches', icon: 'https://placehold.co/100x100/png?text=Watches' },
    { name: 'Decor', slug: 'decor', icon: 'https://placehold.co/100x100/png?text=Decor' },
    { name: 'Accessories', slug: 'accessories', icon: 'https://placehold.co/100x100/png?text=Accessories' },
    { name: 'Essentials', slug: 'essentials', icon: 'https://placehold.co/100x100/png?text=Essentials' },
    { name: 'Fruits', slug: 'fruits', icon: 'https://placehold.co/100x100/png?text=Fruits' },
  ]

  const categories = []
  for (const c of categoriesData) {
    const created = await prisma.category.create({
      data: c
    })
    categories.push(created)
  }

  const mobileCat = categories.find(c => c.slug === 'mobile')!
  const essentialsCat = categories.find(c => c.slug === 'essentials')!
  const fruitsCat = categories.find(c => c.slug === 'fruits')!

  // 2. Create Products
  const productsData = [
    // Mobile / Smartphones
    {
      categoryId: mobileCat.id,
      name: 'Galaxy S22 Ultra',
      slug: 'galaxy-s22-ultra',
      description: 'The ultimate smartphone experience.',
      price: 32999,
      originalPrice: 74000,
      discount: 56,
      image: 'https://placehold.co/400x400/png?text=S22+Ultra',
    },
    {
      categoryId: mobileCat.id,
      name: 'Galaxy M13 (4GB | 64 GB)',
      slug: 'galaxy-m13',
      description: 'More than a monster.',
      price: 10499,
      originalPrice: 14999,
      discount: 30,
      image: 'https://placehold.co/400x400/png?text=Galaxy+M13',
    },
    {
      categoryId: mobileCat.id,
      name: 'Galaxy M33 5G (4GB | 64 GB)',
      slug: 'galaxy-m33-5g',
      description: 'Up for it all.',
      price: 16999,
      originalPrice: 24999,
      discount: 32,
      image: 'https://placehold.co/400x400/png?text=Galaxy+M33',
    },
    {
      categoryId: mobileCat.id,
      name: 'Galaxy M53 (4GB | 64 GB)',
      slug: 'galaxy-m53',
      description: 'Brilliant display and camera.',
      price: 31999,
      originalPrice: 40999,
      discount: 22,
      image: 'https://placehold.co/400x400/png?text=Galaxy+M53',
    },
    {
      categoryId: mobileCat.id,
      name: 'Galaxy S22 Ultra (Green)',
      slug: 'galaxy-s22-ultra-green',
      description: 'Stand out with green.',
      price: 67999,
      originalPrice: 86999,
      discount: 22,
      image: 'https://placehold.co/400x400/png?text=S22+Green',
    },
    // Essentials & Fruits
    {
      categoryId: essentialsCat.id,
      name: 'Daily Essentials',
      slug: 'daily-essentials-basket',
      description: 'Everyday grocery items.',
      price: 500,
      originalPrice: 1000,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Essentials+Basket',
    },
    {
      categoryId: essentialsCat.id,
      name: 'Vegetables',
      slug: 'fresh-vegetables',
      description: 'Fresh from the farm.',
      price: 200,
      originalPrice: 400,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Vegetables',
    },
    {
      categoryId: fruitsCat.id,
      name: 'Fruits',
      slug: 'mixed-fruits',
      description: 'Healthy and delicious.',
      price: 300,
      originalPrice: 600,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Fruits',
    },
    {
      categoryId: fruitsCat.id,
      name: 'Strawberry',
      slug: 'fresh-strawberry',
      description: 'Sweet and juicy.',
      price: 150,
      originalPrice: 300,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Strawberry',
    },
    {
      categoryId: fruitsCat.id,
      name: 'Mango',
      slug: 'fresh-mango',
      description: 'King of fruits.',
      price: 250,
      originalPrice: 500,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Mango',
    },
    {
      categoryId: fruitsCat.id,
      name: 'Cherry',
      slug: 'fresh-cherry',
      description: 'Perfect for snacking.',
      price: 200,
      originalPrice: 400,
      discount: 50,
      image: 'https://placehold.co/400x400/png?text=Cherry',
    }
  ]

  for (const p of productsData) {
    await prisma.product.create({
      data: p
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
