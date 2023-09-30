import { LucideEdit } from "lucide-react";
import { Button } from "./button";

interface EditIconButtonProps {
  name: string;
  onclick?: () => void;
  defaultVariantCondition?: boolean;
}

export const EditIconButton = ({
  name,
  defaultVariantCondition,
  onclick,
}: EditIconButtonProps) => {
  return (
    <div>
      <Button
        variant={defaultVariantCondition ? "default" : "outline"}
        onClick={onclick}
      >
        <LucideEdit className="mr-2 h-4 w-4" />
        {name}
      </Button>
    </div>
  );
};