
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Eye, Navigation, ShoppingCart } from "lucide-react";

export interface CargoItem {
  id: string;
  name: string;
  category: string;
  location: {
    module: string;
    rack: string;
    shelf: string;
  };
  priority: 'high' | 'medium' | 'low';
  weight: number;
  arrival: string;
}

interface SearchResultsProps {
  items: CargoItem[];
  onViewItem: (id: string) => void;
  onRetrieveItem: (id: string) => void;
}

export function SearchResults({ items, onViewItem, onRetrieveItem }: SearchResultsProps) {
  if (items.length === 0) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">No items found matching your search criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{item.location.module}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.location.rack} / {item.location.shelf}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={item.priority} />
                </TableCell>
                <TableCell>{item.weight} kg</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewItem(item.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="default"
                      size="sm"
                      className="gap-1"
                      onClick={() => onRetrieveItem(item.id)}
                    >
                      <Navigation className="h-4 w-4" />
                      Retrieve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function PriorityBadge({ priority }: { priority: CargoItem['priority'] }) {
  return (
    <Badge 
      className={cn(
        "text-white",
        priority === 'high' ? "bg-space-alert" : 
        priority === 'medium' ? "bg-space-warning" : 
        "bg-space-success"
      )}
    >
      {priority}
    </Badge>
  );
}
