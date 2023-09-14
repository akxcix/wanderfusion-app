import {
  TypographyH1,
  TypographyLarge,
  TypographyP,
} from "@/components/ui/typography";
import { getGroupByID } from "@/network/nomadcore/client";
import { GetGroupResponse, GroupDate, User } from "@/network/nomadcore/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CalendarViewer from "../calendar/viewer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CalendarPicker from "../calendar/picker";
import { Member } from "@/network/passport/types";
import { getUserByUserIDs } from "@/network/passport/client";
import { AvatarWithUsername } from "@/components/ui/avatarwithusername";
import { AddIconButton } from "@/components/ui/addiconbutton";

export const ViewGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<string>("init");

  const [groupName, setGroupName] = useState<string>("");
  const [calendarGroupID, setCalendarGroupID] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dates, setDates] = useState<GroupDate[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  const saveGroupDataFromResponse = (data: GetGroupResponse) => {
    setGroupName(data.group.name);
    setDescription(data.group.description);
    setDates(data.dates);
    setMembers(data.users);
    setCalendarGroupID(data.group.id);
  };

  useEffect(() => {
    setState("loading");
    if (!groupId) return;
    getGroupByID(groupId).then(({ ok, err }) => {
      if (ok) {
        saveGroupDataFromResponse(ok);
        setState("loaded");
      } else {
        console.error(err);
      }
    });
  }, [groupId]);

  return (
    <div className="flex flex-col w-11/12 space-y-2">
      {state !== "loaded" ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="py-10">
            <TypographyH1>{groupName}</TypographyH1>
          </div>
          <div className="flex flex-row flex-grow space-x-4">
            <div className="flex flex-col w-3/12 space-y-2">
              <GroupDescription description={description} />
              <MembersCard membersIDs={members.map((x) => x.id)} />
            </div>
            <div className="flex flex-col w-5/12 space-y-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-row items-center">
                    <div>
                      <TypographyLarge>Calendar</TypographyLarge>
                    </div>
                    <div className="flex-grow" />
                    <div>
                      <Dialog>
                        <DialogTrigger>
                          <AddIconButton name="Add Dates" />
                        </DialogTrigger>
                        <DialogContent>
                          <CalendarPicker
                            groupId={calendarGroupID}
                            callback={() => navigate(0)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CalendarViewer
                    dateRanges={dates?.map((date) => [
                      new Date(date.from),
                      new Date(date.to),
                    ])}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col w-4/12 space-y-2">
              <GroupChat />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface GroupDescriptionProps {
  description: string;
}
const GroupDescription = ({ description }: GroupDescriptionProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <TypographyLarge>Description</TypographyLarge>
        </CardHeader>
        <CardContent>
          <TypographyP>{description}</TypographyP>
        </CardContent>
      </Card>
    </div>
  );
};

const GroupChat = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <TypographyLarge>Chat</TypographyLarge>
          <TypographyP>Coming Soon!</TypographyP>
        </CardHeader>
      </Card>
    </div>
  );
};

interface MembersCardProps {
  membersIDs?: string[];
}
const MembersCard = ({ membersIDs }: MembersCardProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [state, setState] = useState<string>("init");

  useEffect(() => {
    setState("loading");
    if (!membersIDs) return;
    getUserByUserIDs(membersIDs).then(({ ok, err }) => {
      if (ok) {
        setState("loaded");
        setMembers(ok);
      } else {
        console.error(err);
      }
    });
  }, [membersIDs]);

  return (
    <div>
      {state !== "loaded" ? (
        <div>Loading</div>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <div className="flex flex-row items-center">
                <div>
                  <TypographyLarge>Members</TypographyLarge>
                </div>
                <div className="flex-grow" />
                <div>
                  <Dialog>
                    <DialogTrigger>
                      <AddIconButton name="Add Members" />
                    </DialogTrigger>
                    <DialogContent>Hello</DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {members?.map((member) => (
                <AvatarWithUsername
                  username={member.username}
                  avatarUrl={member.profilePic}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
