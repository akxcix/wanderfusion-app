import { PlusCircleIcon } from "lucide-react";
import { Button } from "./button";

interface AddIconButtonProps {
  name: string;
  onclick?: () => void;
  defaultVariantCondition?: boolean;
}

export const AddIconButton = ({
  name,
  defaultVariantCondition,
  onclick,
}: AddIconButtonProps) => {
  return (
    <div>
      <Button
        variant={defaultVariantCondition ? "default" : "outline"}
        onClick={onclick}
      >
        <PlusCircleIcon className="mr-2 h-4 w-4" />
        {name}
      </Button>
    </div>
  );
};
