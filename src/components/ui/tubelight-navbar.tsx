"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import { ThemeToggle } from "./theme-toggle"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

const EASE = [0.4, 0, 0.2, 1] as const

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for morph
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = items
      .map((item) => item.url.replace("#", ""))
      .filter(Boolean)

    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const matched = items.find((item) => item.url === `#${id}`)
              if (matched) setActiveTab(matched.name)
            }
          })
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [items])

  const handleClick = useCallback((item: NavItem) => {
    setActiveTab(item.name)
    const id = item.url.replace("#", "")
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    /* Outer wrapper — animates padding to "squeeze" the nav inward on scroll */
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center",
        className,
      )}
      animate={{
        paddingTop: isScrolled ? 14 : 0,
        paddingLeft: isScrolled ? 16 : 0,
        paddingRight: isScrolled ? 16 : 0,
      }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Nav bar — same element always, properties morph smoothly */}
      <motion.nav
        className={cn(
          "w-full flex items-center backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500",
          isScrolled
            ? "bg-background/60 border border-border shadow-lg"
            : "bg-background/80 border border-transparent border-b-border/30 shadow-none",
        )}
        animate={{
          borderRadius: isScrolled ? 9999 : 0,
          maxWidth: isScrolled ? 720 : 3000,
          paddingLeft: isScrolled ? 8 : 28,
          paddingRight: isScrolled ? 8 : 28,
          paddingTop: isScrolled ? 6 : 12,
          paddingBottom: isScrolled ? 6 : 12,
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* ── Left: "JS." logo ── */}
        <motion.div
          className="overflow-hidden whitespace-nowrap select-none flex-shrink-0"
          animate={{
            width: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
            marginRight: isScrolled ? 0 : 12,
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="text-xl font-bold text-foreground font-[family-name:var(--font-cursive)]">
            JS.
          </span>
        </motion.div>

        {/* ── Center: Nav links ── */}
        <div className="flex items-center gap-0.5 mx-auto">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item)
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200 group",
                  isActive
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {/* Hover underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-[width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "w-5 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100",
                  )}
                />

                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary/8 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* ── Right: Theme toggle + "Let's Contact" ── */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* "Let's Contact" — collapses when scrolled */}
          <motion.div
            className="overflow-hidden whitespace-nowrap hidden md:block flex-shrink-0"
            animate={{
              width: isScrolled ? 0 : "auto",
              opacity: isScrolled ? 0 : 1,
              marginLeft: isScrolled ? 0 : 4,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById("contact")
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="inline-flex items-center text-sm font-semibold px-5 py-2 border border-foreground/20 text-foreground rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-200"
            >
              Let&apos;s Contact
            </Link>
          </motion.div>
        </div>
      </motion.nav>
    </motion.div>
  )
}
