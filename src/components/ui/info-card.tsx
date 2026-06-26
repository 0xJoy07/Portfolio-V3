"use client"

import { useRef } from "react"
import { Star, UserPlus } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

type ProfileCardProps = {
  name: string
  role: string
  status: "online" | "offline" | "away"
  avatar: string
  tags?: string[]
  isVerified?: boolean
  socials?: { platform: string; url: string }[]
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function ProfileCardGrid() {
  const joyProfile: ProfileCardProps = {
    name: "Joy Sengupta",
    role: "Full Stack Developer",
    status: "online",
    avatar: "/profile.png",
    tags: ["Open to Work"],
    isVerified: true,
    socials: [
      { platform: "linkedin", url: "https://linkedin.com/in/beinggojo" },
      { platform: "twitter", url: "https://x.com/_being_gojo_" },
      { platform: "github", url: "https://github.com/0xJoy07" },
      { platform: "whatsapp", url: "https://wa.me/+917003480325" }
    ]
  }

  return <ProfileCard {...joyProfile} />
}

function DockButton({ mouseX, icon, href }: { mouseX: any, icon: React.ReactNode, href?: string }) {
  let ref = useRef<any>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-100, 0, 100], [48, 72, 48]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const className = "flex items-center justify-center rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/80 hover:text-foreground shrink-0";
  const inner = (
    <div className="flex items-center justify-center w-[60%] h-[60%]">
      {icon}
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        style={{ width, height: width }}
        className={className}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      className={className}
    >
      {inner}
    </motion.button>
  );
}

function ProfileCard({ name, role, status, avatar, tags = [], isVerified, socials = [] }: ProfileCardProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-card w-full max-w-sm h-full min-h-[400px] flex flex-col justify-end shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.3),-12px_-12px_24px_rgba(255,255,255,0.1)] transition-all duration-500 hover:shadow-[20px_20px_40px_rgba(0,0,0,0.2),-20px_-20px_40px_rgba(255,255,255,1)] dark:hover:shadow-[20px_20px_40px_rgba(0,0,0,0.4),-20px_-20px_40px_rgba(255,255,255,0.15)] hover:-translate-y-2">
      
      {/* Background Image */}
      <img
        src={avatar}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Verified badge */}
      {isVerified && (
        <div className="absolute top-4 right-4 z-20">
          <div className="rounded-full bg-blue-500 dark:bg-blue-600 p-1.5 shadow-[2px_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110">
            <Star className="h-4 w-4 fill-white text-white" />
          </div>
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <div className="absolute top-4 left-4 z-20">
          <div className="relative">
            <div className={cn("h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 transition-all duration-300", status === "online" ? "bg-green-500" : status === "away" ? "bg-amber-500" : "bg-gray-400")}></div>
            {status === "online" && (
              <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30"></div>
            )}
          </div>
        </div>
      )}

      {/* Glassmorphic Overlay at the bottom */}
      <div className="relative z-10 w-full p-6 pt-6 bg-background/70 dark:bg-background/40 backdrop-blur-md border-t border-white/20 dark:border-white/10 flex flex-col items-center">
        
        {/* Profile Info */}
        <div className="text-center transition-transform duration-300 group-hover:-translate-y-1">
          <h3 className="text-xl font-bold text-foreground">
            {name}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {role}
          </p>
        </div>

        {/* Tags with bounce animation */}
        {tags.length > 0 && (
          <div className="mt-3 flex justify-center gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className={cn(
                  "inline-block rounded-full bg-background px-3 py-1 text-xs font-medium shadow-[2px_2px_4px_rgba(0,0,0,0.05),-2px_-2px_4px_rgba(255,255,255,0.8)] dark:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(255,255,255,0.1)] transition-all duration-300",
                  tag === "Open to Work"
                    ? "text-green-600 dark:text-green-400 group-hover:bg-green-50 dark:group-hover:bg-green-900/30 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                    : "text-gray-600 dark:text-gray-300 group-hover:scale-105",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons with macOS Dock animation */}
        <div 
          className="mt-4 flex justify-center gap-2 h-[64px] items-center"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {socials.map((social, idx) => {
            let Icon = UserPlus;
            if (social.platform === "github") Icon = GithubIcon;
            if (social.platform === "linkedin") Icon = LinkedinIcon;
            if (social.platform === "twitter") Icon = TwitterIcon;
            if (social.platform === "mail") Icon = MailIcon;
            if (social.platform === "instagram") Icon = InstagramIcon;
            if (social.platform === "whatsapp") Icon = WhatsappIcon;

            return (
              <DockButton key={idx} mouseX={mouseX} href={social.url} icon={<Icon className="w-full h-full" />} />
            )
          })}
        </div>
      </div>

      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-3xl border border-blue-200 dark:border-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>
    </div>
  )
}
