
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ExpiringItem {
  id: string;
  name: string;
  location: string;
  category: string;
  expiresIn: {
    value: number;
    unit: 'days' | 'weeks' | 'months';
  };
}

const expiringItems: ExpiringItem[] = [
  { 
    id: 'FD-2341', 
    name: 'Fresh Fruit Pack', 
    location: 'Unity / Food Storage', 
    category: 'Food',
    expiresIn: { value: 2, unit: 'days' } 
  },
  { 
    id: 'MED-1982', 
    name: 'Antibiotic Solution', 
    location: 'Columbus / Medical Cabinet', 
    category: 'Medical',
    expiresIn: { value: 1, unit: 'weeks' } 
  },
  { 
    id: 'FD-2298', 
    name: 'Rehydratable Entrée', 
    location: 'Harmony / Personal Locker', 
    category: 'Food',
    expiresIn: { value: 2, unit: 'weeks' } 
  },
  { 
    id: 'SCP-4211', 
    name: 'Plant Growth Medium', 
    location: 'Kibo / Experiment Rack', 
    category: 'Science',
    expiresIn: { value: 1, unit: 'months' } 
  },
];

export function ExpiringSoonItems() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>Items approaching expiration date</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringItems.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{item.name}</span>
                    <Badge variant="outline" className="font-normal">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.location}</div>
                </div>
                <Badge 
                  className={cn(
                    "text-white",
                    getExpiryUrgencyColor(item.expiresIn)
                  )}
                >
                  {item.expiresIn.value} {item.expiresIn.unit}
                </Badge>
              </div>
              <Progress 
                value={getProgressValue(item.expiresIn)} 
                className={cn(
                  "h-1",
                  getExpiryUrgencyColor(item.expiresIn)
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function getExpiryUrgencyColor(expiresIn: ExpiringItem['expiresIn']) {
  if (expiresIn.unit === 'days') return "bg-space-alert";
  if (expiresIn.unit === 'weeks' && expiresIn.value <= 1) return "bg-space-warning";
  return "bg-space-success";
}

function getProgressValue(expiresIn: ExpiringItem['expiresIn']) {
  if (expiresIn.unit === 'days') return 15 + (expiresIn.value * 5);
  if (expiresIn.unit === 'weeks') return 25 + (expiresIn.value * 10);
  return 60 + (expiresIn.value * 5);
}
