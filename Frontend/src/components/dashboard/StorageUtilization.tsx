
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StorageModule {
  name: string;
  utilization: number;
  totalItems: number;
}

const storageModules: StorageModule[] = [
  { name: 'Unity (Node 1)', utilization: 78, totalItems: 342 },
  { name: 'Destiny (US Lab)', utilization: 62, totalItems: 286 },
  { name: 'Harmony (Node 2)', utilization: 85, totalItems: 412 },
  { name: 'Tranquility (Node 3)', utilization: 53, totalItems: 215 },
  { name: 'Columbus (ESA)', utilization: 71, totalItems: 318 },
  { name: 'Kibo (JAXA)', utilization: 68, totalItems: 294 },
  { name: 'Quest Airlock', utilization: 91, totalItems: 125 },
];

export function StorageUtilization() {
  return (
    <Card className="col-span-3 h-[400px] overflow-auto scrollbar-thin">
      <CardHeader>
        <CardTitle>Storage Utilization by Module</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {storageModules.map((module) => (
            <div key={module.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{module.name}</span>
                <span className="text-sm font-medium">
                  {module.utilization}% ({module.totalItems} items)
                </span>
              </div>
              <Progress 
                value={module.utilization} 
                className={cn(
                  "h-2",
                  module.utilization > 80 ? "bg-space-alert" : 
                  module.utilization > 70 ? "bg-space-warning" : 
                  "bg-space-success"
                )}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
