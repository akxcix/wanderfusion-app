import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUsername = (username: string | undefined) => {
  if (username) {
    return "@" + username;
  }

  return username;
};

export const randomUsername = () => {
  const adjectives = ["Sly", "Whimsical", "Jolly", "Daring", "Bold"];
  const nouns = ["Bear", "Fox", "Eagle", "Lion", "Tiger"];
  const numbers = Math.floor(Math.random() * 9999);

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective}${randomNoun}${numbers}`;
};
