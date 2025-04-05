
import { AppShell } from "@/components/layout/AppShell";
import { ISSModuleMap } from "@/components/cargo-map/ISSModuleMap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const CargoMap = () => {
  const [selectedModule, setSelectedModule] = useState("all");

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Cargo Map</h1>
        <p className="text-muted-foreground">
          Visual representation of cargo locations throughout the ISS.
        </p>

        <Tabs defaultValue="visual" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visual">Visual Map</TabsTrigger>
            <TabsTrigger value="list">Module List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4">
            <ISSModuleMap />
            
            <Card>
              <CardHeader>
                <CardTitle>Module Information</CardTitle>
                <CardDescription>Select a module on the map for details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard 
                    title="Unity (Node 1)" 
                    stats={[
                      { label: "Items", value: "342" },
                      { label: "Utilization", value: "78%" },
                      { label: "Capacity", value: "4,000 kg" }
                    ]}
                    tags={["Central Node", "High Traffic"]}
                  />
                  
                  <InfoCard 
                    title="Destiny (US Lab)" 
                    stats={[
                      { label: "Items", value: "286" },
                      { label: "Utilization", value: "62%" },
                      { label: "Capacity", value: "3,800 kg" }
                    ]}
                    tags={["Science", "Equipment"]}
                  />
                  
                  <InfoCard 
                    title="Harmony (Node 2)" 
                    stats={[
                      { label: "Items", value: "412" },
                      { label: "Utilization", value: "85%" },
                      { label: "Capacity", value: "3,500 kg" }
                    ]}
                    tags={["Docking Port", "High Capacity"]}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>ISS Modules</CardTitle>
                <CardDescription>Current cargo distribution by module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard 
                    title="Unity (Node 1)" 
                    stats={[
                      { label: "Items", value: "342" },
                      { label: "Utilization", value: "78%" },
                      { label: "Capacity", value: "4,000 kg" }
                    ]}
                    tags={["Central Node", "High Traffic"]}
                  />
                  
                  <InfoCard 
                    title="Destiny (US Lab)" 
                    stats={[
                      { label: "Items", value: "286" },
                      { label: "Utilization", value: "62%" },
                      { label: "Capacity", value: "3,800 kg" }
                    ]}
                    tags={["Science", "Equipment"]}
                  />
                  
                  <InfoCard 
                    title="Harmony (Node 2)" 
                    stats={[
                      { label: "Items", value: "412" },
                      { label: "Utilization", value: "85%" },
                      { label: "Capacity", value: "3,500 kg" }
                    ]}
                    tags={["Docking Port", "High Capacity"]}
                  />
                  
                  <InfoCard 
                    title="Tranquility (Node 3)" 
                    stats={[
                      { label: "Items", value: "215" },
                      { label: "Utilization", value: "53%" },
                      { label: "Capacity", value: "4,000 kg" }
                    ]}
                    tags={["Life Support", "Exercise"]}
                  />
                  
                  <InfoCard 
                    title="Columbus (ESA)" 
                    stats={[
                      { label: "Items", value: "318" },
                      { label: "Utilization", value: "71%" },
                      { label: "Capacity", value: "3,200 kg" }
                    ]}
                    tags={["European Lab", "Research"]}
                  />
                  
                  <InfoCard 
                    title="Kibo (JAXA)" 
                    stats={[
                      { label: "Items", value: "294" },
                      { label: "Utilization", value: "68%" },
                      { label: "Capacity", value: "3,200 kg" }
                    ]}
                    tags={["Japanese Lab", "Airlock"]}
                  />
                  
                  <InfoCard 
                    title="Quest Airlock" 
                    stats={[
                      { label: "Items", value: "125" },
                      { label: "Utilization", value: "91%" },
                      { label: "Capacity", value: "2,000 kg" }
                    ]}
                    tags={["EVA", "Critical Access"]}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

interface InfoCardProps {
  title: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  tags: string[];
}

function InfoCard({ title, stats, tags }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CargoMap;
