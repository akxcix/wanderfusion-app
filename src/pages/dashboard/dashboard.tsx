import { TypographyH1 } from "@/components/ui/typography";
import { formatUsername } from "@/lib/utils";
import { useGetEmail, useGetUsername } from "@/redux/utils";

export const Dashboard = () => {
  const email = useGetEmail();
  const rawUsername = useGetUsername();
  const username = formatUsername(rawUsername);
  return (
    <div className="dashboard">
      <TypographyH1>Hola, {username ? username : email}</TypographyH1>
    </div>
  );
};
