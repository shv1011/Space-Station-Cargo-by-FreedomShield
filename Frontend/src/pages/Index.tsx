
import { Box, Package, PackageCheck, Scale, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { ModuleWeightChart } from "@/components/dashboard/ModuleWeightChart";
import { PriorityItems } from "@/components/dashboard/PriorityItems";
import { ExpiringSoonItems } from "@/components/dashboard/ExpiringSoonItems";
import { StorageUtilization } from "@/components/dashboard/StorageUtilization";

const Dashboard = () => {
  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor real-time cargo status and key metrics.</p>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Total Cargo Items"
            value="1,284"
            icon={<Package className="h-5 w-5" />}
            description="Across all ISS modules"
            trend={{ value: 4, isPositive: true }}
          />
          <StatusCard
            title="Total Cargo Weight"
            value="3,842 kg"
            icon={<Scale className="h-5 w-5" />}
            description="Current cargo load"
            trend={{ value: 2, isPositive: true }}
          />
          <StatusCard
            title="Available Storage"
            value="38%"
            icon={<Box className="h-5 w-5" />}
            description="Remaining capacity"
            trend={{ value: 3, isPositive: false }}
          />
          <StatusCard
            title="Critical Alerts"
            value="7"
            icon={<AlertTriangle className="h-5 w-5" />}
            description="Items needing attention"
            trend={{ value: 2, isPositive: false }}
            className="border-space-alert/50"
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
          <ModuleWeightChart />
          <StorageUtilization />
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          <PriorityItems />
          <ExpiringSoonItems />
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
