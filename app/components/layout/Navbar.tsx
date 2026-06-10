import Link from "next/link";
import { Search, ShoppingCart, User, Menu, ChevronDown, List } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/app/components/auth/AuthDialog";

export default async function Navbar() {
  // Fetch active categories from database
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-gray-100 py-2 text-xs text-gray-600 hidden md:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p>Welcome to worldwide MegaMart!</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[#008ECC] transition-colors">Deliver to 423651</Link>
            <span className="w-px h-3 bg-gray-300"></span>
            <Link href="#" className="hover:text-[#008ECC] transition-colors">Track your order</Link>
            <span className="w-px h-3 bg-gray-300"></span>
            <Link href="#" className="hover:text-[#008ECC] transition-colors">All Offers</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#008ECC] rounded-lg p-1.5 flex items-center justify-center">
              <Menu className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#008ECC]">MegaMart</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 items-center bg-gray-100 rounded-lg max-w-2xl px-4 py-2 border border-transparent focus-within:border-[#008ECC] focus-within:bg-white transition-colors">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search essentials, groceries and more..." 
              className="w-full bg-transparent outline-none text-sm text-gray-700"
            />
            <button className="text-gray-400 hover:text-[#008ECC] ml-2">
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <AuthDialog />
            
            <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-[#008ECC] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline font-medium text-sm">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-4 lg:hidden flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-transparent focus-within:border-[#008ECC] focus-within:bg-white">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search essentials..." 
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4">
          {/* Scrollable container for categories */}
          <div className="flex items-center gap-4 overflow-x-auto py-3 no-scrollbar">
            {/* Hardcoded Groceries dropdown to match design */}
            <div className="flex items-center gap-1 bg-[#008ECC] text-white px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer hover:bg-[#008ECC]/90 transition-colors">
              <span>Groceries</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            {/* Dynamic Categories */}
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="flex items-center gap-1 text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
              >
                {category.name}
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
