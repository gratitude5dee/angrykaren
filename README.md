
# 🎭 AngryKaren — AI-Powered Customer Service & Sales Training Platform

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ecf8e?logo=supabase)
![Anam AI](https://img.shields.io/badge/Anam%20AI-Avatars-purple)

**Train your customer service and sales teams with realistic AI-powered simulations**

[Live Demo](#) · [Documentation](#) · [Report Bug](https://github.com/gratitude5dee/angrykaren/issues) · [Request Feature](https://github.com/gratitude5dee/angrykaren/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Analytics Pipeline](#-analytics-pipeline)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AngryKaren** is a next-generation training platform that uses lifelike AI avatars to simulate realistic customer interactions. Whether you're training Customer Service Representatives (CSRs) to handle difficult customers or coaching Sales Development Representatives (SDRs) to perfect their pitch, AngryKaren provides a safe, scalable environment for skill development.

Built with [Bolt.new](https://bolt.new) for rapid AI-assisted development, the platform leverages real-time video avatars from [Anam AI](https://anam.ai), serverless backend infrastructure with [Supabase](https://supabase.com), and sophisticated analytics powered by [n8n](https://n8n.io) workflows and [Redis](https://redis.io) for high-performance data processing.

### Why AngryKaren?

- **Safe Practice Environment**: Trainees can make mistakes and learn without impacting real customers
- **Consistent Training**: Every trainee faces the same scenarios, ensuring standardized skill assessment
- **Instant Feedback**: AI-powered scoring provides immediate, actionable insights
- **Scalable**: Train hundreds of employees simultaneously without additional human trainers
- **Data-Driven**: Track progress, identify skill gaps, and personalize learning paths

---

## ✨ Key Features

### 🎭 Realistic AI Personas
- Lifelike video avatars with natural speech and expressions
- Multiple personality types: friendly, neutral, difficult, hostile
- Configurable patience levels, technical understanding, and objection styles
- Role-specific personas (customers, gatekeepers, decision-makers)

### 📚 Training Scenarios

**Customer Service (CSR):**
- Complaint resolution
- Technical support
- Billing inquiries
- Escalation handling
- Churn prevention
- Upselling & cross-selling

**Sales Development (SDR):**
- Cold calls
- Discovery calls
- Objection handling
- Gatekeeper navigation
- Demo scheduling
- Pricing discussions

### 📊 AI-Powered Scoring
Real-time evaluation across key dimensions:
- **Empathy** — Emotional acknowledgment and understanding
- **Problem Solving** — Issue identification and solution effectiveness
- **Patience** — Composure and professional demeanor
- **Communication** — Clarity and professionalism
- **Resolution** — Outcome quality and next steps

### 📈 Analytics & Progress Tracking
- Individual skill proficiency dashboards
- Session history with transcript playback
- Learning path recommendations
- Team performance benchmarks
- Certification tracking

### 🎯 Learning Paths
Structured training modules that guide trainees from beginner to expert, with personalized scenario recommendations based on identified skill gaps.

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              AngryKaren Platform                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────────┐   │
│  │   React SPA     │────▶│  Supabase Edge  │────▶│     Anam AI API     │   │
│  │  (Bolt.new)     │     │    Functions    │     │  (Video Avatars)    │   │
│  └────────┬────────┘     └────────┬────────┘     └─────────────────────┘   │
│           │                       │                                         │
│           │                       ▼                                         │
│           │              ┌─────────────────┐                               │
│           │              │    Supabase     │                               │
│           │              │   PostgreSQL    │                               │
│           │              └────────┬────────┘                               │
│           │                       │                                         │
│           ▼                       ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Analytics Pipeline                               │   │
│  │  ┌──────────────┐     ┌──────────────┐     ┌──────────────────┐    │   │
│  │  │     n8n      │────▶│    Redis     │────▶│  AI Scoring      │    │   │
│  │  │  Workflows   │     │   Caching    │     │  (Gemini 2.5)    │    │   │
│  │  └──────────────┘     └──────────────┘     └──────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Session Initialization**: React app requests session token via Supabase Edge Function
2. **Avatar Streaming**: Anam AI streams real-time video/audio to the browser
3. **Transcript Capture**: Conversation is recorded with speaker identification
4. **Session Scoring**: Transcript sent to AI (Gemini 2.5 Flash) for multi-dimensional evaluation
5. **Analytics Processing**: n8n workflows aggregate data, Redis caches hot paths
6. **Dashboard Updates**: Trainees see scores, feedback, and recommendations

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **[Bolt.new](https://bolt.new)** | AI-powered development environment |
| **React 18** | UI framework with hooks |
| **TypeScript 5** | Type-safe JavaScript |
| **Vite** | Next-gen build tooling |
| **TailwindCSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Radix UI** | Headless UI primitives |
| **React Query** | Server state management |
| **React Router 6** | Client-side routing |
| **Recharts** | Data visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| **[Supabase](https://supabase.com)** | PostgreSQL database, Auth, Edge Functions |
| **Deno** | Edge function runtime |
| **[Anam AI](https://anam.ai)** | Real-time AI video avatars |

### Analytics & Processing
| Technology | Purpose |
|------------|---------|
| **[n8n](https://n8n.io)** | Workflow automation & data pipelines |
| **[Redis](https://redis.io)** | High-performance caching & session storage |
| **Gemini 2.5 Flash** | AI-powered session analysis & scoring |

### Development
| Technology | Purpose |
|------------|---------|
| **Bun** | Fast JavaScript runtime & package manager |
| **ESLint 9** | Code linting |
| **TypeScript ESLint** | Type-aware linting rules |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** or **Bun** (recommended)
- **Supabase Account** — [Create free account](https://supabase.com)
- **Anam AI API Key** — [Request access](https://anam.ai)

### Installation

```bash
# Clone the repository
git clone https://github.com/gratitude5dee/angrykaren.git
cd angrykaren

# Install dependencies (using Bun)
bun install

# Or with npm
npm install

# Copy environment template
cp .env.example .env.local
```

### Environment Setup

Create a `.env.local` file with:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Anam AI (set in Supabase Edge Function secrets)
ANAM_API_KEY=your-anam-api-key

# AI Gateway (for scoring)
LOVABLE_API_KEY=your-ai-gateway-key
```

### Supabase Setup

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Push database migrations
supabase db push

# Deploy edge functions
supabase functions deploy training-config
supabase functions deploy score-session

# Set function secrets
supabase secrets set ANAM_API_KEY=your-key
supabase secrets set LOVABLE_API_KEY=your-key
```

### Run Development Server

```bash
# Start dev server
bun run dev

# Or with npm
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📁 Project Structure

```
angrykaren/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── dashboard/         # Dashboard widgets
│   │   │   ├── LearningPathCard.tsx
│   │   │   ├── RecentSessionsList.tsx
│   │   │   ├── RecommendedPractice.tsx
│   │   │   └── StatsCards.tsx
│   │   ├── landing/           # Marketing pages
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── PersonasPreview.tsx
│   │   │   └── ...
│   │   ├── simulation/        # Live call components
│   │   │   ├── AnamAvatar.tsx
│   │   │   ├── CallControls.tsx
│   │   │   ├── ScoreCardModal.tsx
│   │   │   ├── TranscriptPanel.tsx
│   │   │   └── VoiceIndicator.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication state
│   ├── hooks/
│   │   ├── useAnamSession.ts  # Anam AI integration
│   │   ├── use-mobile.tsx     # Responsive detection
│   │   └── use-toast.ts       # Toast notifications
│   ├── integrations/
│   │   └── supabase/          # Supabase client & types
│   ├── lib/
│   │   ├── audio-utils.ts     # Audio processing
│   │   └── utils.ts           # Shared utilities
│   ├── pages/
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── FaceTimeCall.tsx   # Video call UI
│   │   ├── Landing.tsx        # Marketing page
│   │   ├── LiveCall.tsx       # Training session
│   │   ├── Personas.tsx       # Browse AI characters
│   │   ├── PersonaDetail.tsx  # Persona info & start
│   │   └── SessionDebrief.tsx # Post-session review
│   └── types/
│       ├── simulation.ts      # Call state types
│       └── training.ts        # Training domain types
├── supabase/
│   ├── functions/
│   │   ├── score-session/     # AI scoring endpoint
│   │   └── training-config/   # Session initialization
│   └── migrations/            # Database schema
└── ...config files
```

---

## 📊 Analytics Pipeline

<img width="1417" alt="n8n workflow diagram" src="https://github.com/user-attachments/assets/73d5698c-e79c-44ab-9c1c-823f1d42ec3d" />

### How We Analyze Training Sessions

The analytics pipeline uses **n8n** workflows and **Redis** to process and analyze training output in real-time:

1. **Session Completion Trigger**: When a training session ends, n8n webhook receives the event
2. **Transcript Processing**: Raw transcript is cleaned and formatted
3. **Redis Caching**: Recent sessions cached for dashboard performance
4. **AI Analysis**: Gemini 2.5 Flash evaluates performance across 6 categories
5. **Score Aggregation**: Individual scores rolled up to skill proficiencies
6. **Recommendation Engine**: Gap analysis triggers learning path suggestions
7. **Dashboard Sync**: Real-time updates pushed to trainee dashboards

### Redis Data Structures

```
# Session cache (24hr TTL)
session:{userId}:{sessionId} → JSON session data

# Leaderboards (hourly refresh)
leaderboard:daily → Sorted set of top performers
leaderboard:weekly → Sorted set of weekly scores

# User progress (persistent)
progress:{userId} → Hash of skill levels
```

---

## 🔐 Environment Variables

### Frontend (Vite)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | ✅ | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |

### Supabase Edge Functions

| Variable | Required | Description |
|----------|----------|-------------|
| `ANAM_API_KEY` | ✅ | Anam AI API key for avatar sessions |
| `LOVABLE_API_KEY` | ✅ | AI Gateway key for scoring |

### n8n Workflows (Optional)

| Variable | Required | Description |
|----------|----------|-------------|
| `REDIS_URL` | ⬜ | Redis connection string |
| `N8N_WEBHOOK_URL` | ⬜ | n8n webhook endpoint |

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Docker

```dockerfile
FROM oven/bun:1.0
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 4173
CMD ["bun", "run", "preview", "--host", "0.0.0.0"]
```

### Environment-Specific Builds

```bash
# Development build
bun run build:dev

# Production build
bun run build
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Bolt.new](https://bolt.new) — AI-powered development platform
- [Anam AI](https://anam.ai) — Realistic AI avatar technology
- [Supabase](https://supabase.com) — Open source Firebase alternative
- [n8n](https://n8n.io) — Workflow automation
- [shadcn/ui](https://ui.shadcn.com) — Beautiful component library

---

<div align="center">

**Built with ❤️ using [Bolt.new](https://bolt.new)**

[⬆ Back to Top](#-angrykaren--ai-powered-customer-service--sales-training-platform)

</div>

<img width="1417" height="529" alt="image" src="https://github.com/user-attachments/assets/73d5698c-e79c-44ab-9c1c-823f1d42ec3d" />
