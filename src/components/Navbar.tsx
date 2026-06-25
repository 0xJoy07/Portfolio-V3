"use client";

import { Home, User, Briefcase, BookOpen, Clock, Phone } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
  const navItems = [
    { name: 'Home', url: '#home', icon: Home },
    { name: 'About', url: '#about', icon: User },
    { name: 'Insights', url: '#insights', icon: BookOpen },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Experience', url: '#experience', icon: Clock },
    { name: 'Contact', url: '#contact', icon: Phone }
  ]

  return <NavBar items={navItems} />
}
