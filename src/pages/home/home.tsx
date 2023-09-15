import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { LucideTwitter } from "lucide-react";

export function Home() {
  return (
    <div className="home flex flex-col items-center justify-center">
      <div className="flex flex-col w-1/2">
        <TypographyH1>WanderFusion</TypographyH1>
        <TypographyH2>
          Your Travel Buddy for the Ultimate Group Getaways
        </TypographyH2>
        <TypographyH3>Get Ready. Propose. Explore. Enjoy.</TypographyH3>
        <TypographyP>
          Gone are the days of juggling group chats and scattered plans.
          Introducing WanderFusion, the one-stop destination to make your trips
          with friends and family as smooth as a breeze. Planning together? Now
          it’s not just possible, it's fun!
        </TypographyP>
        <Separator />

        <TypographyH2>Plan Travel Collaboratively</TypographyH2>
        <TypographyP>
          Ever used Figma? WanderFusion is like Figma for travel planning. You &
          your friends can collaborate on a trip together, and see each other's
          changes in real-time. Chat with your friends, add places to your
          itinerary, and vote on the best options. See your trip come together
          in real-time.
        </TypographyP>
        <Card className="my-10">
          <CardHeader>
            <TypographyH2>Contact</TypographyH2>
            <TypographyP>
              Have any questions? Feel free to reach out to us!
            </TypographyP>
          </CardHeader>

          <CardContent className="flex flex-row">
            <a
              className="flex-grow"
              href="https://twitter.com/messages/compose?recipient_id=388806300"
            >
              <Button variant={"outline"} className="flex-grow">
                <LucideTwitter className="mr-2 h-4 w-4" /> DM on Twitter
              </Button>
            </a>

            {/* <Button variant={"ghost"} className="flex-grow">
              Send an Email
            </Button> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
