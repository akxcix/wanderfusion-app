import { PATHS } from "@/commons/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EditIconButton } from "@/components/ui/editiconbutton";
import { TypographyH1, TypographyH2, TypographyMuted } from "@/components/ui/typography";
import { getUserProfile } from "@/network/nomadcore/client";
import { GetUserProfileResponse } from "@/network/nomadcore/types";
import { useAppSelector } from "@/store/hooks";
import { User, userSelector } from "@/store/userSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CalendarViewer from "../calendar/viewer";

export const UserProfile = () => {
  const navigate = useNavigate();

  const { username } = useParams();
  const [createdAt, setCreatedAt] = useState(new Date());
  const [bio, setBio] = useState<string>("something cool, unique, interesting");
  const [interests, setInterests] = useState<string>("travelling lol");
  const [user, setUser] = useState<User | undefined>(undefined);


  const setFromResponse = (data: GetUserProfileResponse) => {
    setBio(data.bio);
    setInterests(data.interests);
    setCreatedAt(new Date(data.createdAt));
  }

  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    const user = selectedUser.user;
    if (user) {
      setUser(user);
    }
  }, [selectedUser, user]);

  useEffect(() => {
    if (!username) return;
    getUserProfile(username).then(({ ok, err }) => {
      if (ok) {
        setFromResponse(ok);
      } else {
        console.error(err);
      }
    });
  }, [username]);

  return (
    <div className="flex flex-col w-1/2">
      <TypographyH1>{username}</TypographyH1>
      <div className="flex flex-row items-center p-2">
        <TypographyMuted>Total Groups: {createdAt.toLocaleDateString()}</TypographyMuted>
        <div className="flex-grow"></div>
        {
          (user !== undefined && user.username == username)? (
<EditIconButton
          name={"Edit Profile"}
          onclick={() => navigate(PATHS.UPDATE_PROFILE)}
          defaultVariantCondition={user !== undefined}
        />
          ):(<div></div>)
        }
        
      </div>

      <div className="flex flex-col s-y-8">
      <div className="p-2">
                <Card>
                  <CardHeader>
                    <TypographyH2>
                      <div className="truncate w-full">Bio</div>
                    </TypographyH2>
                  </CardHeader>
                  <CardContent>
                    <div className=" w-full">{bio}</div>
                  </CardContent>
                </Card>
              </div>
          <div className="grid grid-cols-2 gap-4">
              
          <CalendarViewer dateRanges={[[new Date(new Date().setDate(new Date().getDate() - 2)), new Date(new Date().setDate(new Date().getDate() + 1))]]}/>
              <div className="p-2">
                <Card>
                  <CardHeader>
                    <TypographyH2>
                      <div className="truncate w-full">Interests</div>
                    </TypographyH2>
                  </CardHeader>
                  <CardContent>
                    <div className="truncate w-full">{interests}</div>
                  </CardContent>
                </Card>
              </div>
          </div>
        
      </div>
    </div>
  );
};
