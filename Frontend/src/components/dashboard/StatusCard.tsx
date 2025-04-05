
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatusCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatusCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <div
              className={cn(
                "text-xs font-medium mr-1",
                trend.isPositive ? "text-space-success" : "text-space-alert"
              )}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </div>
            <div className="text-xs text-muted-foreground">from last week</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
