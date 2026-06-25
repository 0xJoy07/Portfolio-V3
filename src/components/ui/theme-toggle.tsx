"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-[76px] h-[38px] rounded-full border border-border bg-background/5" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-[76px] h-[38px] rounded-full border border-border bg-background/50 backdrop-blur-md p-1 cursor-pointer outline-none transition-colors"
      aria-label="Toggle theme"
    >
      <div className="flex w-full justify-between items-center px-1.5 z-10 text-muted-foreground">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "moon-active" : "moon-inactive"}
            initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Moon
              size={16}
              strokeWidth={2.5}
              className={`transition-colors duration-300 ${isDark ? "text-foreground" : "text-muted-foreground/50"}`}
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={!isDark ? "sun-active" : "sun-inactive"}
            initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Sun
              size={16}
              strokeWidth={2.5}
              className={`transition-colors duration-300 ${!isDark ? "text-foreground" : "text-muted-foreground/50"}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute left-1 w-[30px] h-[30px] bg-muted/80 rounded-full -z-0"
        initial={false}
        animate={{
          x: isDark ? 0 : 38,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />
    </button>
  )
}
