# Deveze Portfolio

A modern, responsive portfolio website built with **TanStack Start** and **TypeScript**, featuring a markdown-based blog, dark/light theme toggle, and seamless meeting scheduling.

## 🌟 Features

- **🎨 Dual Theme Support** — Dark and light mode with smooth transitions
- **📝 Markdown Blog** — File-based blog with syntax highlighting and reading progress
- **💼 Project Showcase** — Clean, image-first project display with lightbox galleries
- **📅 Meeting Scheduling** — Integrated Cal.com booking for client meetings
- **📱 Responsive** — Optimized for all devices and screen sizes
- **⚡ Fast** — SSR streaming via TanStack Start + Vite

## 🛠️ Tech Stack

- **Framework:** TanStack Start (React)
- **Router:** @tanstack/react-router (file-based)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 + shadcn/ui components
- **Blog:** gray-matter + remark for markdown processing
- **Icons:** Lucide React
- **Deployment:** Self-hosted with Docker

## 🚀 Quick Start

### Prerequisites

- Node.js 18+

### Local Development

```bash
# Clone the repository
git clone https://github.com/h1rdr3v2/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the portfolio.

### Docker Deployment

The project root includes a `Dockerfile` for containerized deployment.

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📁 Project Structure

```
├── src/
│   ├── app/                  # TanStack Start routes (file-based)
│   │   ├── __root.tsx        # Root layout + metadata
│   │   ├── index.tsx         # Homepage
│   │   └── blog/             # Blog routes
│   │       ├── index.tsx     # Blog listing
│   │       └── $slug.tsx     # Individual post
│   ├── components/
│   │   ├── common/           # Shared components (cursor, background, etc.)
│   │   ├── sections/         # Page sections (header, projects, roles, etc.)
│   │   └── ui/               # shadcn/ui primitives
│   ├── data/                 # Portfolio data (projects, roles, socials)
│   ├── lib/                  # Utilities (blog helpers, cn)
│   └── types/                # TypeScript interfaces
├── content/
│   └── blogs/                # Markdown blog posts
├── public/                   # Static assets
├── vite.config.ts            # Vite + TanStack Start config
├── tailwind.config.ts        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
```

## 📧 Contact

- **Portfolio:** [deveze.bleon.net](https://deveze.bleon.net)
- **Email:** [support@bleon.co](mailto:support@bleon.co)
- **LinkedIn:** [destinyezenwata](https://www.linkedin.com/in/destinyezenwata/)
- **GitHub:** [h1rdr3v2](https://github.com/h1rdr3v2)

## 📄 License

This project is for personal use. Please don't copy the design or content directly.

---

Built with ❤️ by Destiny Ezenwata
