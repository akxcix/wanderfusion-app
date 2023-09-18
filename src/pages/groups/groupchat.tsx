import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyLarge, TypographyMuted } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getUserByUserIDs } from "@/network/passport/client";
import { Member } from "@/network/passport/types";
import { useAppSelector } from "@/store/hooks";
import { User, userSelector } from "@/store/userSlice";
import { LucidePhone, LucideSend } from "lucide-react";
import { useEffect, useState } from "react";

interface GroupChatProps {
  groupID: string;
  membersIDs?: string[];
}
export const GroupChat = ({ groupID, membersIDs }: GroupChatProps) => {
  console.log(groupID);
  const [input, setInput] = useState("");
  const inputLength = input.trim().length;
  const [messages, setMessages] = useState([
    {
      username: "wftest2",
      content: "Hey! Got plans for New Year's?",
    },
    {
      username: "akxcix",
      content: "Nothing concrete. Got any ideas?",
    },
    {
      username: "wftest2",
      content:
        "How about a trip across South East Asia? Beaches, jungles, cities, and the works.",
    },
    {
      username: "akxcix",
      content: "Sounds tempting. But isn't it pricey?",
    },
    {
      username: "wftest2",
      content:
        "It can be, but budget options abound. Plus, planning ahead could cut costs.",
    },
    {
      username: "akxcix",
      content: "True. What's the itinerary?",
    },
    {
      username: "wftest2",
      content:
        "Start with Bangkok, then Vietnam, maybe hit Bali, and finally Singapore for New Year's fireworks.",
    },
    {
      username: "akxcix",
      content: "That's a lot to pack in. What about visas?",
    },
    {
      username: "wftest2",
      content: "Mostly visa-on-arrival or e-visa. Simple if we stay organized.",
    },
    {
      username: "akxcix",
      content: "Sounds manageable. Count me in.",
    },
    {
      username: "wftest2",
      content: "Awesome! I'll start the planning then.",
    },
    {
      username: "akxcix",
      content: "Can't wait. This will be epic.",
    },
  ]);

  const [members, setMembers] = useState<Member[]>([]);
  const [state, setState] = useState<string>("init");

  const [user, setUser] = useState<User | undefined>(undefined);
  const selectedUser = useAppSelector(userSelector);

  useEffect(() => {
    const user = selectedUser.user;
    if (user) {
      setUser(user);
    } else {
      setUser(undefined);
    }
  }, [selectedUser, user]);

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
      <Card>
        {state !== "loaded" ? (
          <div></div>
        ) : (
          <div>
            <CardHeader>
              <div className="flex flex-row items-center">
                <div>
                  <TypographyLarge>Conversations</TypographyLarge>
                </div>
                <div className="flex-grow" />
                <div>
                  <Button variant={"outline"}>
                    <LucidePhone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* <ScrollArea className="h-[850px] w-max p-2"> */}
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    member={
                      members.find((x) => x.username === message.username)!
                    }
                    content={message.content}
                    isSelf={message.username === user?.username}
                  />
                ))}
              </div>
              {/* </ScrollArea> */}
            </CardContent>
            <CardFooter>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (inputLength === 0) return;
                  setMessages([
                    ...messages,
                    {
                      username: "akxcix",
                      content: input,
                    },
                  ]);
                  setInput("");
                }}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  id="message"
                  placeholder="Type your message..."
                  className="flex-1"
                  autoComplete="off"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Button type="submit" size="icon" disabled={inputLength === 0}>
                  <LucideSend className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
};

interface ChatBubbleProps {
  member?: Member;
  content: string;
  isSelf: boolean;
}
const ChatBubble = ({ member, content, isSelf }: ChatBubbleProps) => {
  if (!member) return <div></div>;
  return (
    <div className="flex flex-row">
      {isSelf ? <div className="flex-grow"></div> : <div></div>}
      <div
        className={cn(
          "flex w-max max-w-[50%] flex-col gap-2 rounded-lg px-2 py-1 text-sm border",
          isSelf
            ? "bg-primary text-primary-foreground justify-end place-self-end"
            : "bg-muted"
        )}
      >
        <div className="flex flex-col">
          <TypographyMuted>@{member.username}</TypographyMuted>
          <div className="text-left text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};
