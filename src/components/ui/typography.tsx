import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
}

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="text-left scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="text-left scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: TypographyProps) {
  return (
    <h3 className="text-left scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className="text-left scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: TypographyProps) {
  return (
    <p className="text-left leading-7 [&:not(:first-child)]:mt-6">{children}</p>
  );
}

export function TypographyBlockquote({ children }: TypographyProps) {
  return (
    <blockquote className="text-left mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  );
}

export function TypographyInlineCode({ children }: TypographyProps) {
  return (
    <code className="text-left relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-left text-xl text-muted-foreground">{children}</p>;
}

export function TypographyLarge({ children }: TypographyProps) {
  return <div className="text-left text-lg font-semibold"> {children}</div>;
}

export function TypographySmall({ children }: TypographyProps) {
  return (
    <small className="text-left text-sm font-medium leading-none">
      {children}
    </small>
  );
}

export function TypographyMuted({ children }: TypographyProps) {
  return <p className="text-left text-sm text-muted-foreground"> {children}</p>;
}
