import React, { useEffect } from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/commons/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
// import { handleLogout } from "@/lib/authutils";
import { useNavigate } from "react-router";
import { LogOutIcon } from "lucide-react";
import LogoPNG from "../../../public/logo.png"; // Adjust the path accordingly
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { User, removeUser, userSelector } from "@/store/userSlice";
import { handleLogout } from "@/lib/authutils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const Navbar: React.FC = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    const user = selectedUser.user;
    if (user) {
      setUser(user);
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [selectedUser, user]);

  return (
    <div className="navbar">
      <div className="sticky top-0 z-40 w-full backdrop-blur">
        <div
          className={cn("flex p-4 justify-end items-center px-6", className)}
          {...props}
        >
          <div
            className="cursor-pointer hover:bg-gray-200 rounded-full"
            onClick={() => {
              navigate(PATHS.HOME);
            }}
          >
            <img src={LogoPNG} alt="logo" className="logo" width={40} />
          </div>
          <div className="grow" />
          {isSignedIn ? (
            <SignedInNav
              profilePic={user?.profilePicture}
              username={user?.username}
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
  profilePic?: string;
  username?: string;
}

const SignedInNav = ({ profilePic, username }: SignedInNavProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogoutClick = () => {
    handleLogout();
    dispatch(removeUser());
    navigate(PATHS.LOGIN);
  };
  return (
    <div className="flex gap-4">
      <Sheet>
        <SheetTrigger>
          <div className="cursor-pointer hover:bg-gray-200 rounded-full p-0.5">
            <Avatar>
              <AvatarImage src={profilePic} alt={"User Profile Picture"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="my-5">
            <SheetTitle className="flex flex-row items-center justify-left gap-4">
              <Avatar>
                <AvatarImage src={profilePic} alt={"User Profile Picture"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              @{username}
            </SheetTitle>
            {/* <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
          </SheetHeader>
          <Separator />
          <SheetClose className="flex flex-col space-y-2 w-full my-2">
            <Button
              className="flex-grow w-full"
              variant={"ghost"}
              onClick={() => {
                navigate(PATHS.UPDATE_PROFILE);
              }}
            >
              Update Profile
            </Button>
            <Separator />
            <Button
              className="flex-grow w-full"
              variant={"ghost"}
              onClick={() => {
                navigate(PATHS.DASHBOARD);
              }}
            >
              Dashboard
            </Button>
            <Button
              className="flex-grow w-full"
              variant={"ghost"}
              onClick={() => {
                navigate(PATHS.CREATE_GROUP);
              }}
            >
              New Group
            </Button>
            <Separator />
            <Button
              className="flex-grow w-full"
              variant={"ghost"}
              onClick={onLogoutClick}
            >
              <LogOutIcon className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
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
