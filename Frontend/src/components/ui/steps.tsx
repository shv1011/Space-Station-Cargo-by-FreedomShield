
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
}

export function Steps({ currentStep, className, ...props }: StepsProps) {
  return (
    <div className={cn("flex items-center", className)} {...props} />
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export function Step({ isActive, className, children, ...props }: StepProps) {
  return (
    <div className="flex-1 flex items-center" {...props}>
      <div
        className={cn(
          "flex-1 h-1 bg-muted transition-colors duration-300",
          isActive && "bg-primary",
          className
        )}
      />
      <div
        className={cn(
          "relative text-center mx-2 my-2 flex-none",
          isActive && "text-primary font-medium"
        )}
      >
        <div
          className={cn(
            "absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {children}
        </div>
      </div>
      <div
        className={cn(
          "flex-1 h-1 bg-muted transition-colors duration-300",
          isActive && "bg-primary",
          className
        )}
      />
    </div>
  );
}
