import Navbar from "@/components/ui/navbar";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="flex flex-col px-5 py-10 items-center justify-center">
        {children}
      </div>

      <Toaster />
    </div>
  );
};

export default Layout;
