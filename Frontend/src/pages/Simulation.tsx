
import { AppShell } from "@/components/layout/AppShell";
import { useState, useEffect } from "react";
import { Calendar, Clock, FastForward, RotateCcw, Play, Pause, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format, addDays } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for forecasts
const generateForecastData = (days: number, currentDate: Date) => {
  const data = [];
  
  // Start with some initial values
  let foodSupply = 95;
  let waterSupply = 88;
  let oxygenSupply = 92;
  let storageCapacity = 62;
  let wasteAccumulation = 15;
  
  // Rate of change per day (can be adjusted)
  const foodDecreaseRate = 0.7;
  const waterDecreaseRate = 0.8;
  const oxygenDecreaseRate = 0.5;
  const storageDecreaseRate = 0.6;
  const wasteIncreaseRate = 1.1;
  
  for (let i = 0; i <= days; i++) {
    const date = addDays(currentDate, i);
    
    // Add some randomness to the rates
    const foodRandom = Math.random() * 0.3 - 0.15; // -0.15 to 0.15
    const waterRandom = Math.random() * 0.3 - 0.15;
    const oxygenRandom = Math.random() * 0.2 - 0.1;
    const storageRandom = Math.random() * 0.4 - 0.2;
    const wasteRandom = Math.random() * 0.3 - 0.1;
    
    // Update values with randomness
    foodSupply = Math.max(0, Math.min(100, foodSupply - foodDecreaseRate + foodRandom));
    waterSupply = Math.max(0, Math.min(100, waterSupply - waterDecreaseRate + waterRandom));
    oxygenSupply = Math.max(0, Math.min(100, oxygenSupply - oxygenDecreaseRate + oxygenRandom));
    storageCapacity = Math.max(0, Math.min(100, storageCapacity - storageDecreaseRate + storageRandom));
    wasteAccumulation = Math.max(0, Math.min(100, wasteAccumulation + wasteIncreaseRate + wasteRandom));
    
    data.push({
      date: format(date, "MMM dd"),
      foodSupply: Math.round(foodSupply),
      waterSupply: Math.round(waterSupply),
      oxygenSupply: Math.round(oxygenSupply),
      storageCapacity: Math.round(100 - storageCapacity),
      wasteAccumulation: Math.round(wasteAccumulation)
    });
  }
  
  return data;
};

// Mock data for expiring items forecast
const generateExpiringItemsData = (days: number, currentDate: Date) => {
  const itemCategories = ["Food", "Medical", "Equipment", "Science"];
  const data = [];
  
  for (let i = 0; i <= days; i += 10) { // Every 10 days
    const date = addDays(currentDate, i);
    
    const dataPoint: any = {
      date: format(date, "MMM dd"),
    };
    
    // Generate expiring items for each category
    itemCategories.forEach(category => {
      // More items expire as time progresses
      const baseCount = Math.floor(i / 10) + 1;
      const randomVariation = Math.floor(Math.random() * 3);
      dataPoint[category] = baseCount + randomVariation;
    });
    
    data.push(dataPoint);
  }
  
  return data;
};

const Simulation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(format(new Date(), "MMM dd, yyyy"));
  const [simulationDays, setSimulationDays] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [expiringItemsData, setExpiringItemsData] = useState<any[]>([]);
  
  // Initialize forecast data
  useEffect(() => {
    const data = generateForecastData(simulationDays, currentDate);
    setForecastData(data);
    
    const expiringData = generateExpiringItemsData(simulationDays, currentDate);
    setExpiringItemsData(expiringData);
  }, [simulationDays, currentDate]);
  
  // Simulation play/pause effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isPlaying && currentDay < simulationDays) {
      interval = window.setInterval(() => {
        setCurrentDay(prev => {
          const next = prev + 1;
          if (next > simulationDays) {
            setIsPlaying(false);
            return simulationDays;
          }
          
          // Update display date
          const newDate = addDays(currentDate, next);
          setDisplayDate(format(newDate, "MMM dd, yyyy"));
          
          return next;
        });
      }, 1000 / simulationSpeed);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, simulationSpeed, simulationDays, currentDay, currentDate]);
  
  const handleReset = () => {
    setCurrentDay(0);
    setIsPlaying(false);
    setDisplayDate(format(currentDate, "MMM dd, yyyy"));
    toast.info("Simulation reset to current date.");
  };
  
  const handleFastForward = () => {
    setCurrentDay(simulationDays);
    setIsPlaying(false);
    setDisplayDate(format(addDays(currentDate, simulationDays), "MMM dd, yyyy"));
    toast.info(`Fast-forwarded to day ${simulationDays}.`);
  };
  
  const handlePlayPause = () => {
    if (currentDay >= simulationDays) {
      handleReset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleSimulationDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value, 10);
    if (!isNaN(days) && days > 0 && days <= 365) {
      setSimulationDays(days);
      const data = generateForecastData(days, currentDate);
      setForecastData(data);
      const expiringData = generateExpiringItemsData(days, currentDate);
      setExpiringItemsData(expiringData);
      
      // Reset the simulation when changing days
      handleReset();
    }
  };

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Time Simulation</h1>
        <p className="text-muted-foreground">
          Simulate future cargo scenarios and visualize trends over time.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Simulation Controls</CardTitle>
            <CardDescription>
              Configure and run time-based simulations to forecast cargo status.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-xl font-medium">{displayDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  title="Reset Simulation"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  variant={isPlaying ? "secondary" : "outline"}
                  size="icon"
                  onClick={handlePlayPause}
                  title={isPlaying ? "Pause Simulation" : "Play Simulation"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFastForward}
                  title="Fast Forward to End"
                >
                  <FastForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Simulation Progress:</label>
                  <span className="text-sm">
                    Day {currentDay} of {simulationDays}
                  </span>
                </div>
                <Progress value={(currentDay / simulationDays) * 100} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Simulation Days:</label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="365" 
                    value={simulationDays} 
                    onChange={handleSimulationDaysChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Simulation Speed:</label>
                    <span className="text-sm">{simulationSpeed}x</span>
                  </div>
                  <Slider 
                    value={[simulationSpeed]} 
                    min={1} 
                    max={10} 
                    step={1} 
                    onValueChange={values => setSimulationSpeed(values[0])}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="resources">
          <TabsList className="mb-4">
            <TabsTrigger value="resources">Resource Forecast</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Forecast</CardTitle>
                <CardDescription>
                  Projected levels over the next {simulationDays} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={forecastData.slice(0, currentDay + 1)}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="foodSupply" 
                        name="Food Supply" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        stackId="1" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="waterSupply" 
                        name="Water Supply" 
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        stackId="2" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="oxygenSupply" 
                        name="Oxygen Supply" 
                        stroke="#ffc658" 
                        fill="#ffc658" 
                        stackId="3" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="storageCapacity" 
                        name="Storage Used" 
                        stroke="#ff8042" 
                        fill="#ff8042" 
                        stackId="4" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="wasteAccumulation" 
                        name="Waste Accumulation" 
                        stroke="#ff0000" 
                        fill="#ff0000" 
                        stackId="5" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
                  {currentDay > 0 && forecastData.length > currentDay && (
                    <>
                      <Card className="bg-primary/10">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">Food</p>
                          <p className="text-xl font-bold">{forecastData[currentDay].foodSupply}%</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/10">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">Water</p>
                          <p className="text-xl font-bold">{forecastData[currentDay].waterSupply}%</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/10">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">Oxygen</p>
                          <p className="text-xl font-bold">{forecastData[currentDay].oxygenSupply}%</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/10">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">Storage</p>
                          <p className="text-xl font-bold">{forecastData[currentDay].storageCapacity}%</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-primary/10">
                        <CardContent className="p-3">
                          <p className="text-xs text-muted-foreground">Waste</p>
                          <p className="text-xl font-bold">{forecastData[currentDay].wasteAccumulation}%</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="expiring">
            <Card>
              <CardHeader>
                <CardTitle>Expiring Items Forecast</CardTitle>
                <CardDescription>
                  Projected number of items expiring over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={expiringItemsData.filter((_, i) => i * 10 <= currentDay)}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Food" fill="#8884d8" name="Food Items" />
                      <Bar dataKey="Medical" fill="#82ca9d" name="Medical Items" />
                      <Bar dataKey="Equipment" fill="#ffc658" name="Equipment Items" />
                      <Bar dataKey="Science" fill="#ff8042" name="Science Items" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => toast.info("In a real application, this would generate a detailed report of expiring items.")}
                >
                  Generate Detailed Expiry Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default Simulation;
