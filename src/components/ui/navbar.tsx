import React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TypographyLarge, TypographySmall } from "@/components/ui/typography";
import { useGetEmail, useGetProfilePic, useGetUsername } from "@/redux/utils";
import { PATHS } from "@/commons/constants";
import { Avatar, AvatarImage } from "./avatar";

const Navbar: React.FC = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const email = useGetEmail();
  const username = useGetUsername();
  const profilePic = useGetProfilePic();

  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur">
      <div
        className={cn("flex p-4 justify-end items-center px-6", className)}
        {...props}
      >
        <a href={PATHS.HOME}>
          <TypographyLarge>WanderFusion</TypographyLarge>
        </a>
        <div className="grow" />
        {email ? (
          <SignedInNav
            email={email}
            username={username}
            profilePic={profilePic}
          />
        ) : (
          <SignedOutNav />
        )}
      </div>
      <Separator />
    </div>
  );
};

interface SignedInNavProps {
  email: string;
  username?: string;
  profilePic?: string;
}

const SignedInNav = ({ email, username, profilePic }: SignedInNavProps) => {
  return (
    <div className="flex gap-4">
      <a href={PATHS.DASHBOARD}>
        {profilePic ? (
          <Avatar>
            <AvatarImage src={profilePic} alt={username ? username : email} />
          </Avatar>
        ) : username ? (
          <TypographySmall>{username}</TypographySmall>
        ) : (
          <TypographySmall>{email}</TypographySmall>
        )}
      </a>
    </div>
  );
};

const SignedOutNav = () => {
  return (
    <div className="flex gap-4">
      <a href={PATHS.LOGIN}>
        <Button variant={"outline"}>Login</Button>
      </a>
      <a href={PATHS.REGISTER}>
        <Button variant={"default"}>Register</Button>
      </a>
    </div>
  );
};

export default Navbar;
