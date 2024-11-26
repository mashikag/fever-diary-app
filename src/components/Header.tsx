import React from "react";
import { Pill } from "lucide-react"; // Assuming lucide-react has a pill icon
import { cn } from "@/lib/utils"; // Utility for class names

const Header: React.FC = () => {
  return (
    <header
      className={cn("flex items-center max-w-full p-4 bg-white shadow-md")}
    >
      <Pill className="w-6 h-6 mr-2 text-primary" />
      <h1 className="text-xl font-bold text-primary">Fever Diary</h1>
    </header>
  );
};

export default Header;
