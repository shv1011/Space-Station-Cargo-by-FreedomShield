
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFiltersProps {
  filters: {
    query: string;
    category: string;
    module: string;
    priority: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    query: string;
    category: string;
    module: string;
    priority: string;
  }>>;
  onSearch: () => void;
}

export function SearchFilters({ filters, setFilters, onSearch }: SearchFiltersProps) {
  const handleReset = () => {
    setFilters({
      query: "",
      category: "",
      module: "",
      priority: "",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="query">Search Cargo Items</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="query"
                placeholder="ID, name, or description..."
                className="pl-8"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="module">Module</Label>
            <Select
              value={filters.module}
              onValueChange={(value) => setFilters({ ...filters, module: value })}
            >
              <SelectTrigger id="module">
                <SelectValue placeholder="All Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="unity">Unity (Node 1)</SelectItem>
                <SelectItem value="destiny">Destiny (US Lab)</SelectItem>
                <SelectItem value="harmony">Harmony (Node 2)</SelectItem>
                <SelectItem value="tranquility">Tranquility (Node 3)</SelectItem>
                <SelectItem value="columbus">Columbus (ESA)</SelectItem>
                <SelectItem value="kibo">Kibo (JAXA)</SelectItem>
                <SelectItem value="quest">Quest Airlock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={filters.priority}
              onValueChange={(value) => setFilters({ ...filters, priority: value })}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters applied</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button size="sm" onClick={onSearch}>
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
