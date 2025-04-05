
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface WasteItem {
  id: string;
  name: string;
  category: string;
  expiredSince: string;
  weight: number;
  disposalMethod: 'return' | 'discard';
  location: string;
}

const wasteItems: WasteItem[] = [
  {
    id: 'FD-1234',
    name: 'Food Package (Expired)',
    category: 'Food',
    expiredSince: '12 days ago',
    weight: 0.4,
    disposalMethod: 'discard',
    location: 'Unity / Food Storage'
  },
  {
    id: 'MED-5678',
    name: 'Medical Kit (Expired)',
    category: 'Medical',
    expiredSince: '5 days ago',
    weight: 1.2,
    disposalMethod: 'return',
    location: 'Columbus / Medical Cabinet'
  },
  {
    id: 'SCI-9012',
    name: 'Plant Sample',
    category: 'Science',
    expiredSince: '3 days ago',
    weight: 0.8,
    disposalMethod: 'return',
    location: 'Kibo / Experiment Rack'
  },
  {
    id: 'FD-3456',
    name: 'Water Container (Empty)',
    category: 'Consumable',
    expiredSince: '7 days ago',
    weight: 0.3,
    disposalMethod: 'discard',
    location: 'Harmony / Personal Storage'
  },
  {
    id: 'EQ-7890',
    name: 'Filter Cartridge (Used)',
    category: 'Equipment',
    expiredSince: '2 days ago',
    weight: 1.5,
    disposalMethod: 'discard',
    location: 'Tranquility / Life Support'
  },
  {
    id: 'SCI-1234',
    name: 'Experiment Results',
    category: 'Science',
    expiredSince: '1 day ago',
    weight: 0.9,
    disposalMethod: 'return',
    location: 'Destiny / Science Rack'
  },
];

export function WasteItemsList() {
  const handleDispose = (id: string, method: 'return' | 'discard') => {
    toast.success(`Item ${id} marked for ${method === 'return' ? 'return to Earth' : 'disposal'}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expired & Waste Items</CardTitle>
        <CardDescription>Items that need disposal or return to Earth</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Item Details</TableHead>
              <TableHead>Expired</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Disposal Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wasteItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <Badge className="w-fit mt-1" variant="outline">{item.category}</Badge>
                  </div>
                </TableCell>
                <TableCell>{item.expiredSince}</TableCell>
                <TableCell>{item.weight} kg</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Badge 
                    className={cn(
                      "text-white",
                      item.disposalMethod === 'return' ? "bg-space-highlight" : "bg-space-alert"
                    )}
                  >
                    {item.disposalMethod === 'return' ? 'Return to Earth' : 'Discard'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={item.disposalMethod === 'return' ? 'default' : 'destructive'}
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDispose(item.id, item.disposalMethod)}
                  >
                    {item.disposalMethod === 'return' ? (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Return
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Dispose
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
