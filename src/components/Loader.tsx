import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={25} className="animate-spin" />
    </div>
  );
};
