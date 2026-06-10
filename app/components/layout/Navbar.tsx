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
    <header className="w-full bg-background shadow-soft border-b border-border/50">
      {/* Top Utility Bar */}
      <div className="bg-surface py-2 text-xs text-text-secondary hidden md:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p>Welcome to worldwide MegaMart!</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Deliver to 423651</Link>
            <span className="w-px h-3 bg-border"></span>
            <Link href="#" className="hover:text-primary transition-colors">Track your order</Link>
            <span className="w-px h-3 bg-border"></span>
            <Link href="#" className="hover:text-primary transition-colors">All Offers</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-xl p-2 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <Menu className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black text-foreground tracking-tight">MegaMart<span className="text-primary">.</span></span>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 items-center bg-surface hover:bg-surface-hover rounded-xl max-w-2xl px-4 py-3 border border-border focus-within:border-border-focus focus-within:bg-background focus-within:shadow-soft transition-all">
            <Search className="h-5 w-5 text-text-tertiary mr-3" />
            <input 
              type="text" 
              placeholder="Search essentials, groceries and more..." 
              className="w-full bg-transparent outline-none text-sm text-foreground font-medium placeholder:text-text-tertiary placeholder:font-normal"
            />
            <button className="text-text-tertiary hover:text-primary ml-2 transition-colors">
              <List className="h-5 w-5" />
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            <AuthDialog />
            
            <Link href="/cart" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors group">
              <div className="p-2 rounded-lg group-hover:bg-primary-subtle transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="hidden md:inline font-bold text-sm">Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="mt-4 lg:hidden flex items-center bg-surface rounded-xl px-4 py-3 border border-border focus-within:border-border-focus focus-within:bg-background focus-within:shadow-soft transition-all">
          <Search className="h-5 w-5 text-text-tertiary mr-3" />
          <input 
            type="text" 
            placeholder="Search essentials..." 
            className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4">
          {/* Scrollable container for categories */}
          <div className="flex items-center gap-4 overflow-x-auto py-3 no-scrollbar">
            {/* Hardcoded Groceries dropdown to match design */}
            <div className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap cursor-pointer hover:bg-primary-hover shadow-sm transition-all">
              <span>Groceries</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            {/* Dynamic Categories */}
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className="flex items-center gap-1 text-text-secondary bg-surface hover:bg-surface-hover hover:text-primary px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border border-transparent hover:border-border"
              >
                {category.name}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
