
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Steps, Step } from "@/components/ui/steps";
import { CargoItem } from "./SearchResults";
import { Eye, Navigation, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RetrievalGuideProps {
  isOpen: boolean;
  onClose: () => void;
  item: CargoItem | null;
}

export function RetrievalGuide({ isOpen, onClose, item }: RetrievalGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  if (!item) return null;
  
  const steps = [
    {
      title: "Navigate to Location",
      description: `Go to ${item.location.module}`,
      detail: `Find Rack ${item.location.rack} and locate Shelf ${item.location.shelf}`,
      icon: <Navigation className="h-5 w-5" />
    },
    {
      title: "Locate the Item",
      description: `Find ${item.name} (${item.id})`,
      detail: `The item is in a ${getContainerType(item.category)} container`,
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: "Retrieve the Item",
      description: "Carefully remove the item",
      detail: `Remember that this item weighs ${item.weight} kg`,
      icon: item.weight > 10 ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />
    },
    {
      title: "Mark as Retrieved",
      description: "Confirm item retrieval in the system",
      detail: "This updates inventory records automatically",
      icon: <Check className="h-5 w-5" />
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete retrieval
      toast.success(`Successfully retrieved ${item.name}`);
      onClose();
      setCurrentStep(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Item Retrieval Guide
            <Badge className="ml-2">{item.id}</Badge>
          </DialogTitle>
          <DialogDescription>
            Follow these steps to retrieve {item.name} from {item.location.module}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Steps currentStep={currentStep} className="pb-6">
            {steps.map((step, index) => (
              <Step key={index} isActive={currentStep === index}>
                {step.title}
              </Step>
            ))}
          </Steps>
          
          <div className="bg-muted/50 rounded-lg p-6 mt-2">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                {steps[currentStep].icon}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
                <p>{steps[currentStep].description}</p>
                <p className="text-sm text-muted-foreground">{steps[currentStep].detail}</p>
                
                {currentStep === 0 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="rounded-lg border border-border p-3 bg-background">
                      <div className="font-medium">Navigation Instructions:</div>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Head {getNavigationDirection(item.location.module)} from your current position</li>
                        <li>Enter {item.location.module} through the main hatch</li>
                        <li>Rack {item.location.rack} is on the {getRelativePosition(item.location.rack)} wall</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="rounded-lg border border-border p-3 bg-background">
                      <div className="font-medium">Item Details:</div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>Category: <span className="text-primary">{item.category}</span></div>
                        <div>Weight: <span className="text-primary">{item.weight} kg</span></div>
                        <div>Arrived: <span className="text-primary">{item.arrival}</span></div>
                        <div>Container: <span className="text-primary">{getContainerType(item.category)}</span></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="rounded-lg border border-border p-3 bg-background">
                      <div className="font-medium">Handling Instructions:</div>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Use proper lifting technique for this {item.weight}kg item</li>
                        {item.weight > 10 && <li className="text-space-alert">Caution: Heavy item! Consider using assistance</li>}
                        <li>Ensure pathway is clear before transporting</li>
                        <li>Verify contents match the inventory description</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="rounded-lg border border-border p-3 bg-background">
                      <div className="flex flex-col items-center text-center p-2">
                        <div className="font-medium mb-2">Press Complete to confirm retrieval of:</div>
                        <div className="text-lg font-bold">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.id}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getContainerType(category: string): string {
  switch (category.toLowerCase()) {
    case 'food':
      return 'Blue Soft Pack';
    case 'medical':
      return 'White Hard Shell';
    case 'equipment':
      return 'Gray Utility Box';
    case 'science':
      return 'Clear Container';
    case 'personal':
      return 'Storage Bag';
    default:
      return 'Standard Container';
  }
}

function getNavigationDirection(module: string): string {
  // This would be dynamic based on current location in a real app
  const directions = {
    'Unity (Node 1)': 'forward',
    'Destiny (US Lab)': 'starboard (right)',
    'Harmony (Node 2)': 'port (left)',
    'Tranquility (Node 3)': 'nadir (down)',
    'Columbus (ESA)': 'starboard (right), past Harmony',
    'Kibo (JAXA)': 'port (left), past Harmony',
    'Quest Airlock': 'starboard (right), past Unity',
  };
  
  return directions[module as keyof typeof directions] || 'forward';
}

function getRelativePosition(rack: string): string {
  // Simple algorithm to determine position based on rack number
  const rackNum = parseInt(rack.replace(/\D/g, ''));
  if (isNaN(rackNum)) return 'starboard (right)';
  
  if (rackNum % 3 === 0) return 'aft (back)';
  if (rackNum % 3 === 1) return 'starboard (right)';
  return 'port (left)';
}
