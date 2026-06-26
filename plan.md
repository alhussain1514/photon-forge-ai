# Implementation Plan - SunScale Pro

SunScale Pro is a premium, AI-powered solar engineering and project management platform. The application features an ultra-modern dark interface with neon blue highlights, solar gold accents, and a glassmorphism design language, catering to professional solar engineers and EPC companies.

## Scope & Non-Goals
- **Scope:** Complete mobile-first web application covering 23 functional areas including Dashboards, Project Wizards, AI Audits, Roof Analysis, System Design, and Financial Calculators.
- **Non-Goals:** Real-time hardware integration (IoT) is simulated; actual CAD/DWG file parsing (simulated with mock data); backend persistence (client-side state only for this session).

## Strategic Design Language
- **Background:** Matte Black (`#0B0B0B`) with Deep Navy surfaces.
- **Accents:** Neon Blue (`#00F2FF`), Solar Gold (`#FFD700`), Emerald Green (`#10B981`).
- **Style:** 18-24px corner radii, glassmorphism (backdrop-blur), fine engineering-style icons (Lucide/Custom), and interactive charts (Recharts).

## Affected Areas
- **Frontend:** React + Vite + Tailwind CSS (v4) + Shadcn UI.
- **Data:** Client-side state (React Context/Zustand), no remote database.
- **Navigation:** Multi-step wizards and tab-based dashboard navigation.

## Execution Phases

### Phase 1: Foundation & Global Styling
- Configure Tailwind v4 with the premium color palette and glassmorphism utilities.
- Set up global typography (Inter/SF Pro style).
- Create base Layout components (Mobile Shell, Navigation).
- **Owner:** frontend_engineer

### Phase 2: Onboarding & Authentication
- Implement the elegant Splash Screen with animated solar rays.
- Build the 3-page high-fidelity onboarding flow.
- Create the professional Authentication screens (Login/Create Account) with biometric simulation.
- **Owner:** frontend_engineer

### Phase 3: Core Dashboard & Project Wizard
- Build the Home Dashboard with energy charts and quick actions.
- Implement the New Project Wizard (Step-by-step form).
- Integrate weather and irradiation widgets (mocked).
- **Owner:** frontend_engineer

### Phase 4: Engineering & Analysis Tools
- Build the AI Load Audit (appliance list and peak load calculator).
- Create the AI Roof Analysis view (satellite/heatmap visualization).
- Implement the Solar System Designer (drag-and-drop simulation).
- **Owner:** frontend_engineer

### Phase 5: Recommendation Engine & Financials
- Component Recommendation Engine with comparison radar charts.
- Financial Calculator (ROI, Payback, Cash Flow).
- AI Quotation Generator and Proposal Presentation Mode.
- **Owner:** frontend_engineer

### Phase 6: Management & Operations
- Installation Management (Timeline/Checklists).
- Live Monitoring Dashboard (Real-time energy flow animations).
- Maintenance Center and Inventory Management.
- **Owner:** frontend_engineer

### Phase 7: CRM, Collaboration & Reporting
- Customer CRM and Team Collaboration modules.
- Reports & Analytics dashboard.
- Profile & Settings (Dark/Light toggle, license info).
- **Owner:** frontend_engineer

### Phase 8: Refinement & Micro-interactions
- Add Framer Motion transitions, skeleton loading, and haptic-style feedback.
- Final pixel-perfect audit against "premium enterprise" requirements.
- **Owner:** quick_fix_engineer

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup foundation, core UI/UX, and all complex functional modules (Phases 1-7).
2. quick_fix_engineer — Polish interactions, fix minor styling issues, and ensure pixel-perfect alignment (Phase 8).

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2, 3, 4, 5, 6, 7
- **Scope:** Build the entire application structure. Focus on the "SunScale Pro" premium aesthetic (Matte Black, Glassmorphism, Neon Blue).
- **Files:** `src/App.tsx`, `src/index.css`, `src/components/*`, `src/pages/*`.
- **Depends on:** none
- **Acceptance criteria:** All 23 functional areas from the user request must be represented with high-fidelity UI. Charts must be interactive (Recharts). Wizards must be functional using local state.

### 2. quick_fix_engineer
- **Phases:** 8
- **Scope:** Localized CSS refinements, animation timing, and icon consistency.
- **Files:** `src/index.css`, `src/components/ui/*`.
- **Depends on:** frontend_engineer
- **Acceptance criteria:** Smooth transitions between all views. Consistent 18-24px border radii and glassmorphism effects across all cards.
