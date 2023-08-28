import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";

export function Home() {
  return (
    <div className="home">
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
    </div>
  );
}
