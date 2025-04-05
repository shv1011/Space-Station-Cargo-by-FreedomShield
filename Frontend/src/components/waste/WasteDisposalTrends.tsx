
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

// Mock data for waste disposal trends over time
const trendData = [
  { month: "Jan", disposal: 18.5, return: 12.2 },
  { month: "Feb", disposal: 17.8, return: 13.1 },
  { month: "Mar", disposal: 19.2, return: 14.5 },
  { month: "Apr", disposal: 20.1, return: 15.2 },
  { month: "May", disposal: 21.5, return: 16.8 },
  { month: "Jun", disposal: 19.8, return: 15.5 },
  { month: "Jul", disposal: 18.2, return: 13.9 },
];

// Chart configuration for styling
const chartConfig = {
  disposal: { 
    label: "For Disposal (kg)",
    theme: { light: "hsl(var(--space-alert))", dark: "hsl(var(--space-alert))" } 
  },
  return: { 
    label: "For Return (kg)",
    theme: { light: "hsl(var(--space-highlight))", dark: "hsl(var(--space-highlight))" } 
  },
};

export function WasteDisposalTrends() {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Waste Disposal Trends</CardTitle>
        <CardDescription>Monthly waste generation by disposal method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <ChartTooltip
                content={({ active, payload, label }) => (
                  <ChartTooltipContent 
                    active={active} 
                    payload={payload}
                    label={label} 
                  />
                )}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="disposal"
                stroke="hsl(var(--space-alert))"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="hsl(var(--space-highlight))"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
