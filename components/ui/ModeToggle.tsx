"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";


 export function ModeToggle() {
  const { setTheme } = useTheme();
  const { theme } = useTheme();

  useEffect(() => {
    setTheme("system");
  }, []);

  return (
    <Button variant="outline" size="icon" className="bg-transparent" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {
      theme === "light" ? 
      <Sun className={`bg-transparent h-[1.2rem] w-[1.2rem] scale-100 transition-all`} /> 
      : 
      <Moon className={`bg-transparent absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all`} />
      }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
