import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      content: "Hi, how can I help you today?",
    },
    {
      username: "akxcix",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      username: "wftest2",
      content: "What seems to be the problem?",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
    },
    {
      username: "akxcix",
      content: "I can't log in.",
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
              <ScrollArea className="h-[850px] p-2">
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
              </ScrollArea>
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
  member: Member;
  content: string;
  isSelf: boolean;
}
const ChatBubble = ({ member, content, isSelf }: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-2 py-1 text-sm",
        isSelf ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
      )}
    >
      <div className="flex flex-col">
        <TypographyMuted>@{member.username}</TypographyMuted>
        <div className="text-left text-sm">{content}</div>
      </div>
    </div>
  );
};
