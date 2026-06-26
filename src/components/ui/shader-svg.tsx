"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

export function MeshGradientSVG() {
  const svgRef = useRef<SVGSVGElement>(null)
  const colors = [
    "#FFB3D9", // Pastel pink
    "#87CEEB", // Sky blue
    "#4A90E2", // Medium blue
    "#2C3E50", // Dark blue-gray
    "#1A1A2E", // Very dark blue
  ]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const eyeOffsetX = useSpring(useTransform(mouseX, (x: number) => {
    if (!svgRef.current) return 0
    const rect = svgRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const deltaX = (x - centerX) * 0.08
    return Math.max(-8, Math.min(8, deltaX))
  }), { stiffness: 150, damping: 15 })

  const eyeOffsetY = useSpring(useTransform(mouseY, (y: number) => {
    if (!svgRef.current) return 0
    const rect = svgRef.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    const deltaY = (y - centerY) * 0.08
    return Math.max(-8, Math.min(8, deltaY))
  }), { stiffness: 150, damping: 15 })

  const eye1Cx = useTransform(eyeOffsetX, x => 80 + x)
  const eye1Cy = useTransform(eyeOffsetY, y => 120 + y)
  
  const eye2Cx = useTransform(eyeOffsetX, x => 150 + x)
  const eye2Cy = useTransform(eyeOffsetY, y => 120 + y)

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto p-8 rounded-lg"
      animate={{
        y: [0, -8, 0],
        scaleY: [1, 1.08, 1],
      }}
      transition={{
        duration: 2.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "top center" }}
    >
      <motion.a 
        href="mailto:joysengupta521@gmail.com"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 2, duration: 0.5, type: "spring" } }}
        whileHover={{ scale: 1.05, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -top-4 -left-32 md:-left-40 bg-foreground text-background w-32 h-32 md:w-40 md:h-40 rounded-full rounded-br-sm flex items-center justify-center shadow-2xl z-20 text-xl md:text-2xl font-black tracking-tighter text-center cursor-pointer"
      >
        <span>let&apos;s<br/>connect</span>
      </motion.a>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="231" height="289" viewBox="0 0 231 289" className="w-full h-auto">
        <defs>
          <clipPath id="shapeClip">
            <path d="M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z" />
          </clipPath>
        </defs>

        <foreignObject width="231" height="289" clipPath="url(#shapeClip)">
          <div className="w-full h-full">
            <MeshGradient colors={colors} className="w-full h-full" speed={1} />
          </div>
        </foreignObject>

        <motion.ellipse
          rx="20"
          ry="30"
          fill="currentColor"
          className="animate-blink"
          style={{
            cx: eye1Cx,
            cy: eye1Cy,
          }}
        />
        <motion.ellipse
          rx="20"
          ry="30"
          fill="currentColor"
          className="animate-blink"
          style={{
            cx: eye2Cx,
            cy: eye2Cy,
          }}
        />
      </svg>

      <style jsx>{`
        .animate-blink {
          animation: blink 3s infinite ease-in-out;
        }

        @keyframes blink {
          0%,
          90%,
          100% {
            ry: 30;
          }
          95% {
            ry: 3;
          }
        }
      `}</style>
    </motion.div>
  )
}
