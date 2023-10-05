import { PATHS } from "@/commons/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { LucideMail, LucideTwitter } from "lucide-react";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate()
  return (
    <div className="home flex flex-col items-center justify-center">
      <div className="flex flex-col w-1/2 space-y-5">
        <TypographyH1>WanderFusion</TypographyH1>
        <TypographyP>
          Seamless Group Getaways, Now a Click Away
        </TypographyP>
        <TypographyH2>
        Simplify. Collaborate. Adventure.
        </TypographyH2>
        <a href={PATHS.REGISTER}>
        <Button
          variant={"default"}
          onClick={() => {
            navigate(PATHS.REGISTER);
          }}
        >
          Register
        </Button>
      </a>
        <TypographyH2>
        Why Juggle When You Can Wander?

        </TypographyH2>
        <TypographyP>
        Tired of fragmented group chats and disarrayed travel plans? Meet WanderFusion, your digital roundtable for orchestrating getaways that are as seamless as they are memorable.


        </TypographyP>
        <TypographyH3>
          Wander Together, Right Down to the Details

        </TypographyH3>
        <TypographyP>
        Imagine a Figma canvas, but for your travel escapades. Collaborate in real time with a common chat and interactive maps. Cast votes, add events, and watch your itinerary take shape before your eyes.


        </TypographyP>
        <Separator />

        <TypographyH2>
          Features:
        </TypographyH2>
        <TypographyP>
          <li>Create Groups: A tribe for each journey.</li>
          <li>Common Chat & Calls: Plan while you laugh.</li>
          <li>Real-time Maps: See your friend's cursor sketch the path to the next hidden gem.</li>
          <li>Events & Calendar: Automate the mundane. Add events that populate a shared calendar.</li>
          <li>Interactive Highlights: Hover for a time-based glimpse on the calendar or trace your path on the map.</li>
        </TypographyP>
        <Card className="my-10">
          <CardHeader>
            <TypographyH2>Contact</TypographyH2>
            <TypographyP>
            Queries? Opinions? Reach out.             </TypographyP>
          </CardHeader>

          <CardContent className="flex flex-row space-x-4">
            <a
              className="flex flex-row flex-grow"
              href="https://twitter.com/messages/compose?recipient_id=388806300"
            >
              <Button variant={"outline"} className="flex-grow">
                <LucideTwitter className="mr-2 h-4 w-4" /> DM on Twitter
              </Button>
            </a>

            <a
              className="flex flex-row flex-grow"
              href="mailto:hello@wanderfusion.com"
            >
              <Button variant={"outline"} className="flex-grow">
                <LucideMail className="mr-2 h-4 w-4" /> Send an eMail
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
