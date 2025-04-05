
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { Check, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

// Mock data
const modules = [
  { id: "node1", name: "Unity (Node 1)" },
  { id: "node2", name: "Harmony (Node 2)" },
  { id: "node3", name: "Tranquility (Node 3)" },
  { id: "columbus", name: "Columbus" },
  { id: "jemKibo", name: "Kibo (JEM)" },
  { id: "usLab", name: "Destiny (US Lab)" },
  { id: "quest", name: "Quest" },
];

const racks = {
  node1: ["Storage Bay A", "Galley", "Sleep Station 1"],
  node2: ["Storage Bay B", "Storage Bay C", "Workstation"],
  node3: ["Locker 12", "Exercise Area", "Storage Bay D"],
  columbus: ["Rack 1", "Rack 2", "Rack 3"],
  jemKibo: ["Workstation", "Storage Bay E", "Experiments Area"],
  usLab: ["Medical Cabinet", "Science Station", "Storage Bay F"],
  quest: ["EVA Storage", "Airlock Equipment", "Tool Storage"],
};

const unassignedItems = [
  { 
    id: "ITM-5001", 
    name: "New Water Filter", 
    category: "Equipment", 
    priority: "high", 
    weight: 1.2, 
    dimensions: "20cm x 15cm x 10cm" 
  },
  { 
    id: "ITM-5002", 
    name: "Food Package Alpha", 
    category: "Food", 
    priority: "medium", 
    weight: 3.5, 
    dimensions: "30cm x 25cm x 20cm" 
  },
  { 
    id: "ITM-5003", 
    name: "Science Experiment Kit", 
    category: "Science", 
    priority: "high", 
    weight: 4.7, 
    dimensions: "40cm x 35cm x 25cm" 
  },
  { 
    id: "ITM-5004", 
    name: "Spare Parts Kit", 
    category: "Equipment", 
    priority: "low", 
    weight: 2.8, 
    dimensions: "25cm x 20cm x 15cm" 
  },
];

const recentDeliveries = [
  { 
    id: "DEL-1001", 
    name: "Progress MS-21", 
    date: "2024-07-15", 
    items: 23, 
    status: "Unpacking" 
  },
  { 
    id: "DEL-1002", 
    name: "SpaceX CRS-28", 
    date: "2024-07-10", 
    items: 15, 
    status: "Completed" 
  },
  { 
    id: "DEL-1003", 
    name: "Cygnus NG-20", 
    date: "2024-07-02", 
    items: 18, 
    status: "Completed" 
  },
];

const PlaceItems = () => {
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedItem, setSelectedItem] = useState<null | {
    id: string;
    name: string;
    category: string;
    priority: string;
    weight: number;
    dimensions: string;
  }>(null);
  
  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setSelectedRack("");
  };
  
  const handleRackChange = (value: string) => {
    setSelectedRack(value);
  };
  
  const handleSelectItem = (item: {
    id: string;
    name: string;
    category: string;
    priority: string;
    weight: number;
    dimensions: string;
  }) => {
    setSelectedItem(item);
  };
  
  const handlePlaceItem = () => {
    if (!selectedModule || !selectedRack || !selectedItem) {
      toast.error("Please select a module, rack, and item to place.");
      return;
    }
    
    const moduleName = modules.find(m => m.id === selectedModule)?.name;
    toast.success(`Placed ${selectedItem.name} in ${moduleName}, ${selectedRack}`);
    setSelectedItem(null);
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Place Items</h1>
        <p className="text-muted-foreground">
          Assign and place cargo items to specific locations on the ISS.
        </p>
        
        <Tabs defaultValue="unassigned">
          <TabsList className="mb-4">
            <TabsTrigger value="unassigned">Unassigned Items</TabsTrigger>
            <TabsTrigger value="recent">Recent Deliveries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unassigned" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Unassigned Items</CardTitle>
                    <CardDescription>
                      Items that need to be placed in a specific location.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {unassignedItems.map((item) => (
                        <div 
                          key={item.id}
                          className={`p-4 border rounded-md flex items-start justify-between cursor-pointer hover:bg-accent/50 transition-colors ${
                            selectedItem?.id === item.id ? "bg-accent border-primary" : ""
                          }`}
                          onClick={() => handleSelectItem(item)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{item.name}</h3>
                              <Badge 
                                variant={
                                  item.priority === "high" 
                                    ? "destructive" 
                                    : item.priority === "medium" 
                                      ? "default" 
                                      : "secondary"
                                }
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">ID: {item.id} • {item.category}</p>
                            <p className="text-sm">
                              {item.weight} kg • {item.dimensions}
                            </p>
                          </div>
                          {selectedItem?.id === item.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Placement Location</CardTitle>
                    <CardDescription>
                      Select where to place the item.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Module</label>
                      <Select value={selectedModule} onValueChange={handleModuleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select module" />
                        </SelectTrigger>
                        <SelectContent>
                          {modules.map((module) => (
                            <SelectItem key={module.id} value={module.id}>
                              {module.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rack/Location</label>
                      <Select 
                        value={selectedRack} 
                        onValueChange={handleRackChange}
                        disabled={!selectedModule}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rack/location" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedModule && 
                            racks[selectedModule as keyof typeof racks]?.map((rack) => (
                              <SelectItem key={rack} value={rack}>
                                {rack}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full flex items-center gap-2" 
                      disabled={!selectedModule || !selectedRack || !selectedItem}
                      onClick={handlePlaceItem}
                    >
                      <span>Place Item</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                {selectedItem && (
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Selected Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium">{selectedItem.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {selectedItem.id}</p>
                        <div className="flex gap-2 text-sm">
                          <Badge>{selectedItem.category}</Badge>
                          <Badge 
                            variant={
                              selectedItem.priority === "high" 
                                ? "destructive" 
                                : selectedItem.priority === "medium" 
                                  ? "default" 
                                  : "secondary"
                            }
                          >
                            {selectedItem.priority}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {delivery.name}
                      <Badge variant={delivery.status === "Unpacking" ? "outline" : "secondary"}>
                        {delivery.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Arrived: {delivery.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Total Items: {delivery.items}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Items</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default PlaceItems;
