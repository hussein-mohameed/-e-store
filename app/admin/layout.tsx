import Link from "next/link"
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
        <div className="flex min-h-screen">
          <aside className="w-64 bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="space-y-4">
              <Link href="/admin/categories" className="block text-gray-300 hover:text-white transition-colors">Categories</Link>
              <Link href="/admin/products" className="block text-gray-300 hover:text-white transition-colors">Products</Link>
              <Link href="/" className="block text-gray-400 hover:text-white transition-colors mt-8 pt-4 border-t border-gray-800">Back to Store</Link>
            </nav>
          </aside>
          <main className="flex-1 bg-gray-50 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
