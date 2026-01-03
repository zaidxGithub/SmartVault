import { Search, ArrowUpDown } from 'lucide-react';

export default function SearchAndSort({ searchQuery, onSearchChange, sortBy, onSortChange }) {
 
return (
  <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 mb-6">
    {/* Search Input */}
    <div className="flex-1 relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search passwords by name, username, or tags..."
        className="w-full pl-12 pr-4 py-2 sm:py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--accent)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
      />
    </div>

    {/* Sort Dropdown */}
    <div className="relative">
      <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] w-5 h-5 pointer-events-none" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-full sm:w-64 pl-12 pr-4 py-2 sm:py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition appearance-none cursor-pointer bg-[var(--accent)] text-[var(--muted-foreground)]"
      >
        <option value="created_newest">Newest First</option>
        <option value="created_oldest">Oldest First</option>
        <option value="title_asc">Title (A-Z)</option>
        <option value="title_desc">Title (Z-A)</option>
        <option value="strength_high">Strongest First</option>
        <option value="strength_low">Weakest First</option>
        <option value="important_first">Important First</option>
      </select>
    </div>
  </div>
);

}
