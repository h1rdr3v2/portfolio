# Deveze Portfolio

A modern, responsive portfolio website built with Next.js and TypeScript, featuring dark/light mode toggle and seamless meeting scheduling integration.

## 🌟 Features

- **🎨 Dual Theme Support** - Dark and light mode with smooth transitions
- **📅 Easy Meeting Scheduling** - Integrated booking system for client meetings
- **💼 Professional Showcase** - Clean presentation of work experience and projects
- **🚀 Fast & Responsive** - Optimized for all devices and screen sizes
- **🔄 Auto-Deployment** - Automatically updates on every commit
- **🐳 Docker Ready** - Containerized for easy deployment

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind
- **Deployment:** Self-hosted with Docker
- **CI/CD:** Automated deployment pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

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

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── docker-compose.yml    # Docker compose configuration
├── Dockerfile           # Container configuration
└── README.md
```

## 🔧 Configuration

Create a `.env.local` file:

```bash
# Meeting scheduling (if using Calendly/similar)
NEXT_PUBLIC_CALENDLY_URL=your-calendly-url

# Contact form (if applicable)
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🚀 Deployment

This portfolio features automatic deployment:

1. **Push to main branch** → Triggers automated build
2. **Docker container rebuilds** → Latest changes deployed
3. **Zero downtime deployment** → Seamless updates

## 🎨 Customization

- **Themes:** Modify theme colors in `src/styles/themes.ts`
- **Content:** Update personal information in `src/data/profile.ts`
- **Components:** All UI components are in `src/components/`

## 📧 Contact & Meeting

- **Schedule a meeting:** [Direct booking link on portfolio](https://deveze.bleon.co/)
- **Email:** [Mail](mailto:destinyezenwata@gmail.com)
- **LinkedIn:** [My LinkedIn](https://www.linkedin.com/in/destinyezenwata/)

## 📄 License

This project is for personal use. Please don't copy the design or content directly.

---

Built with ❤️ by Deveze | [Visit Portfolio](deveze.bleon.co)
