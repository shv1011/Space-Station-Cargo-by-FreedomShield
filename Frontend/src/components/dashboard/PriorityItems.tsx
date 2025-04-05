
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PriorityItem {
  id: string;
  name: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const priorityItems: PriorityItem[] = [
  { id: 'ITM-4231', name: 'Water Filter Cartridge', location: 'Node 2 / Storage Bay C', priority: 'high', dueDate: 'Today' },
  { id: 'ITM-3892', name: 'Air Scrubber', location: 'Columbus / Rack 3', priority: 'high', dueDate: 'Tomorrow' },
  { id: 'ITM-4102', name: 'Oxygen Tank', location: 'Node 3 / Locker 12', priority: 'medium', dueDate: 'In 3 days' },
  { id: 'ITM-3998', name: 'EVA Maintenance Kit', location: 'Quest / EVA Storage', priority: 'medium', dueDate: 'In 5 days' },
  { id: 'ITM-4187', name: 'ISS Food Supply Box', location: 'Unity / Galley', priority: 'low', dueDate: 'Next week' },
];

export function PriorityItems() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Priority Retrieval Items</CardTitle>
        <CardDescription>Items that need urgent attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priorityItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.id}</span>
                </div>
                <div className="text-xs text-muted-foreground">{item.location}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs">{item.dueDate}</div>
                <PriorityBadge priority={item.priority} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PriorityBadge({ priority }: { priority: PriorityItem['priority'] }) {
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
