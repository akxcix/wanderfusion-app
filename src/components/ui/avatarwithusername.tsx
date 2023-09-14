import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { PATHS } from "@/commons/constants";

interface AvatarWithUsernameProps {
  username?: string;
  avatarUrl?: string;
}

export const AvatarWithUsername = ({
  username,
  avatarUrl,
}: AvatarWithUsernameProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row items-center justify-left m-4 gap-4 cursor-pointer rounded-md hover:bg-accent hover:text-accent-foreground px-4 py-2"
      onClick={() => navigate(`${PATHS.VIEW_PROFILE}/${username}`)}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} alt={"User Profile Picture"} />
        <AvatarFallback>{username?.at(0)}</AvatarFallback>
      </Avatar>
      @{username}
    </div>
  );
};
