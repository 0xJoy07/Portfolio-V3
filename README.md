# Joy Sengupta — Portfolio V3

A high-performance personal portfolio built with Next.js 16 (App Router & Turbopack), React 19, TypeScript, Tailwind CSS v4, and Motion. Features hardware-accelerated micro-interactions, canvas-driven physics animations, dynamic shader gradients, and a curated dark/light design system.

Live Deployment: [0xjoy07.vercel.app](https://0xjoy07.vercel.app/)

---

## Overview

Portfolio V3 is engineered for optimal performance, smooth interactive UX, and modern web aesthetics. It utilizes static site generation (SSG) with code-splitting across below-the-fold sections to ensure low latency and fast First Contentful Paint (FCP).

---

## Key Features

- **High-Performance Architecture:** Static export (`output: 'export'`) powered by Next.js 16 and Turbopack for instantaneous page transitions.
- **Canvas Physics & Shaders:**
  - Interactive canvas scatter-dots reacting to cursor proximity with idle state detection and debounced resize handling.
  - SVG mesh gradient shaders for modern aesthetic depth.
  - Desktop cursor difference blending effect.
- **Tubelight Navigation:** Floating navigation bar with active section tracking, custom audio feedback, and smooth viewport transitions.
- **Theme System:** System-aware light and dark mode toggling using `next-themes` with scoped, GPU-optimized CSS variable transitions.
- **Interactive Tech Arsenal:** Categorized stack showcase with responsive hover feedback and brand iconography via SimpleIcons.
- **Career Timeline:** Structured chronicle of education, internships, and technical competencies.
- **Featured Projects:** Showcase of flagship full-stack, AI, and agentic engineering projects with live links and source code.
- **Contact Integration:** Form submissions handled via Web3Forms API.

---

## Technical Stack

### Core Framework & Language
- **Next.js 16** (App Router, Turbopack, Static Export)
- **React 19**
- **TypeScript 5**

### Styling & Animation
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **Motion** (`motion/react`) for layout animations and spring physics
- **GSAP** & **react-type-animation**
- **Lucide React** & **Radix UI Icons**

### State & Utilities
- **next-themes** for theme provider and persistence
- **clsx** & **tailwind-merge** for class composition
- **Web3Forms API** for contact form submissions

---

## Project Structure

```text
├── public/                 # Static assets, images, icons, and audio
│   └── assets/             # Project screenshots & media
├── projects/
│   └── projects.json       # Featured projects metadata and links
├── src/
│   ├── app/
│   │   ├── globals.css     # Design tokens, typography & CSS variables
│   │   ├── layout.tsx      # Root layout, Changa font & ThemeProvider setup
│   │   └── page.tsx        # Main page with code-split sections
│   ├── components/
│   │   ├── ui/             # Reusable UI primitives (dots, navbar, buttons, shaders)
│   │   ├── About.tsx       # Bio & animated timeline highlights
│   │   ├── Achievements.tsx# Badges & certifications
│   │   ├── Contact.tsx     # Contact form & social connections
│   │   ├── Experience.tsx  # Work experience & education history
│   │   ├── Hero.tsx        # Hero section with interactive cursor & word reveals
│   │   ├── Navbar.tsx      # Tubelight navigation bar
│   │   ├── Projects.tsx    # Project showcase cards
│   │   ├── TechArsenal.tsx # Tech stack categorization & icons
│   │   └── TechRow.tsx     # Animated tech stack marquee
│   └── lib/
│       └── utils.ts        # Utility helpers (cn)
├── next.config.ts          # Next.js configuration (static export & unoptimized images)
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- Node.js: `v20.x` or higher
- Package manager: `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/0xJoy07/Portfolio-V3.git
   cd Portfolio-V3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
   ```
   *(Obtain a key at [web3forms.com](https://web3forms.com))*

4. Start the development server:
   ```bash
   npm run dev
   ```
   Access the local instance at [http://localhost:3000](http://localhost:3000).

---

## Build & Deployment

Generate an optimized static export:

```bash
npm run build
```

Production-ready files will be generated in the `out/` directory.

### Vercel Deployment

1. Push commits to GitHub.
2. Link the repository in the Vercel dashboard.
3. Add the `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` environment variable in the project settings.
4. Deploy. Vercel automatically detects Next.js settings and publishes the static export.

---

## Author

**Joy Sengupta**
- Website: [0xjoy07.vercel.app](https://0xjoy07.vercel.app/)
- GitHub: [@0xJoy07](https://github.com/0xJoy07)
- LinkedIn: [linkedin.com/in/beinggojo](https://linkedin.com/in/beinggojo)
- X (Twitter): [@being_gojo](https://x.com/being_gojo)

---

## License

This project is open-source and distributed under the [MIT License](LICENSE).
