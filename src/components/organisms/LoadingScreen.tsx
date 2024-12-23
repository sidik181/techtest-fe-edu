import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
