import { TypographyH1 } from "@/components/ui/typography";
import { useGetEmail, useGetUsername } from "@/redux/utils";

export const Dashboard = () => {
  const email = useGetEmail();
  const username = useGetUsername();
  return (
    <div className="dashboard">
      <TypographyH1>Hola, {username ? username : email}</TypographyH1>
    </div>
  );
};
