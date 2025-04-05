
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: 'Unity', current: 3200, capacity: 4000 },
  { name: 'Harmony', current: 2800, capacity: 3500 },
  { name: 'Tranquility', current: 3500, capacity: 4000 },
  { name: 'Columbus', current: 2200, capacity: 3000 },
  { name: 'Kibo', current: 2600, capacity: 3200 },
  { name: 'Destiny', current: 2900, capacity: 3800 },
  { name: 'Quest', current: 1200, capacity: 2000 },
];

export function ModuleWeightChart() {
  return (
    <Card className="col-span-3 h-[400px]">
      <CardHeader>
        <CardTitle>Cargo Weight Distribution by Module (kg)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="current" 
              stackId="1" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))" 
              fillOpacity={0.3}
              name="Current Weight"
            />
            <Area 
              type="monotone" 
              dataKey="capacity" 
              stackId="2" 
              stroke="hsl(var(--destructive))" 
              fill="hsl(var(--destructive))" 
              fillOpacity={0.1}
              name="Maximum Capacity"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
