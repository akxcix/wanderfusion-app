import { TypographyH1 } from "@/components/ui/typography";
import { useParams } from "react-router";

export const UserProfile = () => {
  const { username } = useParams();
  return (
    <div>
      <TypographyH1>{username}</TypographyH1>
    </div>
  );
};
