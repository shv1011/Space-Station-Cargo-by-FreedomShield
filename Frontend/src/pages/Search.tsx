
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults, CargoItem } from "@/components/search/SearchResults";
import { RetrievalGuide } from "@/components/search/RetrievalGuide";
import { toast } from "sonner";

// Mock data for search results
const mockItems: CargoItem[] = [
  {
    id: "ITM-4231",
    name: "Water Filter Cartridge",
    category: "Equipment",
    location: {
      module: "Node 2 (Harmony)",
      rack: "Storage Bay C",
      shelf: "Shelf 3"
    },
    priority: "high",
    weight: 1.2,
    arrival: "2023-11-15"
  },
  {
    id: "ITM-3892",
    name: "Air Scrubber",
    category: "Equipment",
    location: {
      module: "Columbus",
      rack: "Rack 3",
      shelf: "Compartment A"
    },
    priority: "high",
    weight: 3.5,
    arrival: "2023-10-20"
  },
  {
    id: "ITM-4102",
    name: "Oxygen Tank",
    category: "Life Support",
    location: {
      module: "Node 3 (Tranquility)",
      rack: "Locker 12",
      shelf: "Upper"
    },
    priority: "medium",
    weight: 12.8,
    arrival: "2023-12-03"
  },
  {
    id: "ITM-3998",
    name: "EVA Maintenance Kit",
    category: "Equipment",
    location: {
      module: "Quest",
      rack: "EVA Storage",
      shelf: "Middle"
    },
    priority: "medium",
    weight: 8.5,
    arrival: "2023-09-18"
  },
  {
    id: "ITM-4187",
    name: "ISS Food Supply Box",
    category: "Food",
    location: {
      module: "Unity (Node 1)",
      rack: "Galley",
      shelf: "Food Storage"
    },
    priority: "low",
    weight: 5.2,
    arrival: "2023-12-12"
  },
  {
    id: "ITM-4033",
    name: "Medical Supply Kit",
    category: "Medical",
    location: {
      module: "Destiny (US Lab)",
      rack: "Medical Cabinet",
      shelf: "Emergency"
    },
    priority: "high",
    weight: 2.3,
    arrival: "2023-11-30"
  },
  {
    id: "ITM-3722",
    name: "Laptop Computer",
    category: "Electronics",
    location: {
      module: "Kibo (JEM)",
      rack: "Workstation",
      shelf: "Upper"
    },
    priority: "low",
    weight: 1.8,
    arrival: "2023-10-05"
  }
];

const Search = () => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    module: "",
    priority: ""
  });
  
  const [searchResults, setSearchResults] = useState<CargoItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CargoItem | null>(null);
  const [retrievalGuideOpen, setRetrievalGuideOpen] = useState(false);
  
  const handleSearch = () => {
    // Filter the mock items based on the filters
    // This would be replaced with an API call in a real application
    let results = [...mockItems];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(
        item => 
          item.id.toLowerCase().includes(query) || 
          item.name.toLowerCase().includes(query)
      );
    }
    
    if (filters.category) {
      results = results.filter(
        item => item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    if (filters.module) {
      results = results.filter(
        item => item.location.module.toLowerCase().includes(filters.module.toLowerCase())
      );
    }
    
    if (filters.priority) {
      results = results.filter(
        item => item.priority === filters.priority
      );
    }
    
    setSearchResults(results);
    setHasSearched(true);
    
    if (results.length === 0) {
      toast.info("No items found matching your search criteria.");
    } else {
      toast.success(`Found ${results.length} items matching your search.`);
    }
  };
  
  const handleViewItem = (id: string) => {
    const item = searchResults.find(item => item.id === id);
    if (item) {
      toast.info(`Viewing details for ${item.name}`);
      // In a real app, this would open a detailed view of the item
    }
  };
  
  const handleRetrieveItem = (id: string) => {
    const item = searchResults.find(item => item.id === id);
    if (item) {
      setSelectedItem(item);
      setRetrievalGuideOpen(true);
    }
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Search & Retrieve</h1>
        <p className="text-muted-foreground">
          Find and retrieve cargo items from anywhere on the ISS.
        </p>
        
        <SearchFilters 
          filters={filters} 
          setFilters={setFilters} 
          onSearch={handleSearch} 
        />
        
        {hasSearched && (
          <SearchResults 
            items={searchResults} 
            onViewItem={handleViewItem}
            onRetrieveItem={handleRetrieveItem}
          />
        )}
        
        <RetrievalGuide 
          isOpen={retrievalGuideOpen} 
          onClose={() => setRetrievalGuideOpen(false)} 
          item={selectedItem}
        />
      </div>
    </AppShell>
  );
};

export default Search;
