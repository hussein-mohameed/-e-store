import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel: string;
}

export function SectionHeader({
  title,
  viewAllHref = "#",
  viewAllLabel,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h2>
      <Link
        href={viewAllHref}
        className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:underline underline-offset-4"
      >
        {viewAllLabel}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
