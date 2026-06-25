"use client";

import { Home, User, Briefcase, BookOpen, Clock, Phone } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
  const navItems = [
    { name: 'HOME', url: '#home', icon: Home },
    { name: 'ABOUT', url: '#about', icon: User },
    { name: 'TECH', url: '#tech', icon: BookOpen },
    { name: 'PROJECTS', url: '#projects', icon: Briefcase },
    { name: 'EXPERIENCE', url: '#experience', icon: Clock },
    { name: 'CONTACT', url: '#contact', icon: Phone }
  ]

  return <NavBar items={navItems} />
}
