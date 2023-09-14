import { MinusCircleIcon } from "lucide-react";
import { Button } from "./button";

interface MinusIconButtonProps {
  name: string;
  onclick?: () => void;
  defaultVariantCondition?: boolean;
}

export const MinusIconButton = ({
  name,
  defaultVariantCondition,
  onclick,
}: MinusIconButtonProps) => {
  return (
    <div>
      <Button
        variant={defaultVariantCondition ? "default" : "outline"}
        onClick={onclick}
      >
        <MinusCircleIcon className="mr-2 h-4 w-4" />
        {name}
      </Button>
    </div>
  );
};
