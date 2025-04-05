
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Mock data for waste distribution
const wasteData = [
  { name: "Food Packaging", value: 35, color: "hsl(var(--space-alert))" },
  { name: "Science Materials", value: 25, color: "hsl(var(--space-highlight))" },
  { name: "Medical Waste", value: 15, color: "hsl(var(--space-warning))" },
  { name: "Used Equipment", value: 20, color: "hsl(var(--space-success))" },
  { name: "Other", value: 5, color: "hsl(var(--muted))" },
];

// Chart configuration for styling
const chartConfig = {
  "Food Packaging": { theme: { light: "hsl(var(--space-alert))", dark: "hsl(var(--space-alert))" } },
  "Science Materials": { theme: { light: "hsl(var(--space-highlight))", dark: "hsl(var(--space-highlight))" } },
  "Medical Waste": { theme: { light: "hsl(var(--space-warning))", dark: "hsl(var(--space-warning))" } },
  "Used Equipment": { theme: { light: "hsl(var(--space-success))", dark: "hsl(var(--space-success))" } },
  "Other": { theme: { light: "hsl(var(--muted))", dark: "hsl(var(--muted))" } },
};

export function WasteDisposalChart() {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Waste Composition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <ChartTooltip
                content={({ active, payload }) => (
                  <ChartTooltipContent 
                    active={active} 
                    payload={payload} 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                )}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
