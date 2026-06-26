"use client";

import { Home, User, Briefcase, BookOpen, Clock, Phone, Trophy } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Navbar() {
  const navItems = [
    { name: 'HOME', url: '#home', icon: Home },
    { name: 'ABOUT', url: '#about', icon: User },
    { name: 'TECH', url: '#tech', icon: BookOpen },
    { name: 'EXPERIENCE', url: '#experience', icon: Clock },
    { name: 'AWARDS', url: '#achievements', icon: Trophy },
    { name: 'PROJECTS', url: '#projects', icon: Briefcase },
    { name: 'CONTACT', url: '#contact', icon: Phone }
  ]

  return <NavBar items={navItems} />
}
