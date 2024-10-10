"use client";
import { UserButton } from "@clerk/nextjs";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="hidden lg:flex justify-between bg-blue-5 dark:bg-blue-1 p-6">
      <h1 className="text-2xl font-semibold">Hey👋</h1>

      <div className="flex gap-8">
        <div className="flex-center">
          <label htmlFor="theme-toggle" className="mr-2">
            Dark Mode
          </label>
          <Switch
            id="theme-toggle"
            checked={theme === "dark"}
            onCheckedChange={toggleTheme}
          />
        </div>

        <UserButton />
      </div>
    </nav>
  );
}
