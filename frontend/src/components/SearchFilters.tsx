import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";

const diseases = ["All Diseases", "Dengue", "Flu", "TB", "COVID-like", "Malaria"];
const dateRanges = ["Last 24h", "Last 7 days", "Last 30 days", "Last 90 days"];

interface SearchFiltersProps {
  onSearch?: (query: string) => void;
  onDiseaseFilter?: (disease: string) => void;
  onDateFilter?: (range: string) => void;
}

export function SearchFilters({ onSearch, onDiseaseFilter, onDateFilter }: SearchFiltersProps) {
  const [query, setQuery] = useState("");
  const [activeDisease, setActiveDisease] = useState("All Diseases");
  const [activeDate, setActiveDate] = useState("Last 7 days");

  return (
    <div className="glass-card p-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by city, state, or region..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch?.(e.target.value); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Disease Filter */}
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <Filter className="h-4 w-4 text-muted-foreground ml-2 mr-1" />
          {diseases.map((d) => (
            <button
              key={d}
              onClick={() => { setActiveDisease(d); onDiseaseFilter?.(d); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeDisease === d
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <Calendar className="h-4 w-4 text-muted-foreground ml-2 mr-1" />
          {dateRanges.map((r) => (
            <button
              key={r}
              onClick={() => { setActiveDate(r); onDateFilter?.(r); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeDate === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
