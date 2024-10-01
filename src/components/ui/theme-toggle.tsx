"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

```
/**
 * ThemeToggle component for switching between light, dark, and system themes
 * @returns {JSX.Element} A dropdown menu with theme options
 */

```export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        /**
         * Sets the theme to light mode.
         * @param {Function} onClick - The function to be called when the menu item is clicked.
         * @returns {JSX.Element} A DropdownMenuItem component that changes the theme to light mode when clicked.
         */
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        /**
         * Sets the theme to dark mode
         * @param {void} - This function doesn't take any parameters
         /**
          * Sets the theme to system default
          * @param {void} - No parameters
          * @returns {void} This function doesn't return a value
          */
         * @returns {void} This function doesn't return a value
         */
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
