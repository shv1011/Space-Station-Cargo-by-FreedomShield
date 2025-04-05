
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Package, RotateCcw, Trash2 } from "lucide-react";

export function WasteSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Waste Items</CardTitle>
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <Package className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32</div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-space-alert mr-1">
              +12%
            </div>
            <ArrowUpRight className="h-3 w-3 text-space-alert" />
            <div className="text-xs text-muted-foreground ml-1">from last month</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Items for Return</CardTitle>
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <RotateCcw className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18 items (12.4 kg)</div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-space-success mr-1">
              -5%
            </div>
            <ArrowDownRight className="h-3 w-3 text-space-success" />
            <div className="text-xs text-muted-foreground ml-1">from last month</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Items for Disposal</CardTitle>
          <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
            <Trash2 className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14 items (5.8 kg)</div>
          <div className="flex items-center mt-2">
            <div className="text-xs font-medium text-space-alert mr-1">
              +8%
            </div>
            <ArrowUpRight className="h-3 w-3 text-space-alert" />
            <div className="text-xs text-muted-foreground ml-1">from last month</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Waste Disposal Capacity</CardTitle>
          <CardDescription>Current waste storage utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-space-alert" />
                  <span className="font-medium text-sm">Return Vehicle Capacity</span>
                </div>
                <span className="text-sm font-medium">78% (12.4/16 kg)</span>
              </div>
              <Progress value={78} className="h-2 bg-space-alert" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-space-warning" />
                  <span className="font-medium text-sm">Compactable Waste Storage</span>
                </div>
                <span className="text-sm font-medium">45% (4.5/10 kg)</span>
              </div>
              <Progress value={45} className="h-2 bg-space-warning" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-space-success" />
                  <span className="font-medium text-sm">Biological Waste Storage</span>
                </div>
                <span className="text-sm font-medium">22% (1.3/6 kg)</span>
              </div>
              <Progress value={22} className="h-2 bg-space-success" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
