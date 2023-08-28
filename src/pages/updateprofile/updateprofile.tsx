import { TypographyH1 } from "@/components/ui/typography";
import { UpdateProfileForm } from "./updateprofileForm";

export function UpdateProfile() {
  return (
    <div className="updateProfile">
      <TypographyH1>Update Profile</TypographyH1>
      <UpdateProfileForm />
    </div>
  );
}
