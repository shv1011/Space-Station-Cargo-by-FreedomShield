
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 md:px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter">404 - Module Not Found</h1>
          <p className="max-w-[600px] text-muted-foreground">
            The module you requested could not be located in the ISS. Please check your navigation coordinates and try again.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/">
            <Button>Return to Command Center</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
