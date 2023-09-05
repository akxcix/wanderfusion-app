import React from "react";

import { cn, formatUsername } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetEmail, useGetProfilePic, useGetUsername } from "@/redux/utils";
import { PATHS } from "@/commons/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/lib/authutils";
import { useNavigate } from "react-router";
import { LogOutIcon } from "lucide-react";
import LogoPNG from "../../../public/logo.png"; // Adjust the path accordingly

const Navbar: React.FC = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate();
  const email = useGetEmail();
  const rawUsername = useGetUsername();
  const username = formatUsername(rawUsername);
  const profilePic = useGetProfilePic();

  return (
    <div className="navbar">
      <div className="sticky top-0 z-40 w-full backdrop-blur">
        <div
          className={cn("flex p-4 justify-end items-center px-6", className)}
          {...props}
        >
          <Button
            variant={"ghost"}
            onClick={() => {
              navigate(PATHS.HOME);
            }}
          >
            <img src={LogoPNG} alt="logo" className="logo" width={40} />
          </Button>
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
    </div>
  );
};

interface SignedInNavProps {
  email: string;
  username?: string;
  profilePic?: string;
}

const SignedInNav = ({ email, username, profilePic }: SignedInNavProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    handleLogout(dispatch);
    navigate(PATHS.LOGIN);
  };
  return (
    <div className="flex gap-4">
      <Button
        variant={"outline"}
        onClick={() => {
          navigate(PATHS.DASHBOARD);
        }}
      >
        Dashboard
      </Button>
      <Button variant={"outline"} onClick={onLogoutClick}>
        <LogOutIcon />
      </Button>
      <a href={PATHS.UPDATE_PROFILE}>
        <Avatar>
          <AvatarImage src={profilePic} alt={username ? username : email} />
          <AvatarFallback>{email.toUpperCase().at(0)}</AvatarFallback>
        </Avatar>
      </a>
    </div>
  );
};

const SignedOutNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        variant={"outline"}
        onClick={() => {
          navigate(PATHS.LOGIN);
        }}
      >
        Login
      </Button>
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
    </div>
  );
};

export default Navbar;
