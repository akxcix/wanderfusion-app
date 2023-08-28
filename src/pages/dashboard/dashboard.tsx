import { PATHS } from "@/commons/constants";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { formatUsername } from "@/lib/utils";
import { useGetEmail, useGetUsername } from "@/redux/utils";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const email = useGetEmail();
  const rawUsername = useGetUsername();
  const username = formatUsername(rawUsername);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <TypographyH1>Hola, {username ? username : email}</TypographyH1>
      <Button
        onClick={() => {
          navigate(PATHS.UPDATE_PROFILE);
        }}
      >
        Update Profile
      </Button>
    </div>
  );
};
