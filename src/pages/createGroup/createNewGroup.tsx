import { TypographyH1 } from "@/components/ui/typography";
import { CreateGroupForm } from "./newGroupForm";

export function CreateGroup() {
  return (
    <div className="updateProfile">
      <TypographyH1>Create New Calendar</TypographyH1>
      <CreateGroupForm />
    </div>
  );
}
