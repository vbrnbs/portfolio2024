"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"


 export function ModeToggle() {
  const { setTheme } = useTheme()
  const { theme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className={`h-[1.2rem] w-[1.2rem] ${theme === "light" ? "scale-100" : "scale-0"} transition-all`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] ${theme === "dark" ? "scale-100" : "scale-0"} transition-all`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

}
