import {
  TypographyH1,
  TypographyH2,
  TypographyMuted,
} from "@/components/ui/typography";

import { useEffect, useState } from "react";
import { getGroups } from "@/network/nomadcore/client";
import { Group } from "@/network/nomadcore/types";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/commons/constants";
import { AddIconButton } from "@/components/ui/addiconbutton";

export const Dashboard = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGroups()
      .then((data) => {
        if (data) {
          setGroups(data?.groups);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col w-1/2">
      <TypographyH1>Your Groups</TypographyH1>
      <div className="flex flex-row items-center p-2">
        <TypographyMuted>Total Groups: {groups.length}</TypographyMuted>
        <div className="flex-grow"></div>
        <AddIconButton
          name={"Create Group"}
          onclick={() => navigate(PATHS.CREATE_GROUP)}
          defaultVariantCondition={groups.length === 0}
        />
      </div>

      <div className="flex flex-col s-y-8">
        {groups.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {groups.map((x) => (
              <div key={x.id} className="p-2">
                <Card>
                  <CardHeader>
                    <TypographyH2>
                      <div className="truncate w-full">{x.name}</div>
                    </TypographyH2>
                  </CardHeader>
                  <CardContent>
                    <div className="truncate w-full">{x.description}</div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={"default"}
                      onClick={() => navigate(`${PATHS.VIEW_GROUP}/${x.id}`)}
                    >
                      Go to Group
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
