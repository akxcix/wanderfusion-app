import { Card, CardContent } from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardContent className="text-center p-8 rounded-lg shadow-md">
          <TypographyH1>404</TypographyH1>
          <TypographyH2>Oops! You've ventured into the void.</TypographyH2>
          <TypographyP>
            Turn back now or remain forever a digital wanderer.
          </TypographyP>
        </CardContent>
      </Card>
    </div>
  );
};
