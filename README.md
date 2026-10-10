<p align="center">
  <img src=".github/assets/banner.svg" alt="Ecointelligence - Real-time dashboard" width="100%">
</p>

<p align="center">
  <img alt="Technata Hacks 2024" src="https://img.shields.io/badge/%F0%9F%A5%89%203rd%20Place-Technata%20Hacks%202024-b45309?style=flat-square">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white">
</p>

# Ecointelligence - Dashboard

The web front end for **Ecointelligence**, an AI-assisted router energy management project that won **3rd place at Technata Hacks (October 2024)**. It gives IT admins a single view of router temperature, energy usage, load and efficiency, with animated stat cards and an energy-vs-efficiency chart.

> ML backend: [Technata-24-AI_router_Management_System](https://github.com/anakafeel/Technata-24-AI_router_Management_System) (Flask API, notebook, trained models).

## Screenshots

![Dashboard with sliders adjusted](.github/assets/dashboard-home.png)

![Chart page](.github/assets/dashboard-charts.png)

## What it does

- **Router Energy Details** page: four animated stat cards (temperature, energy usage, total users, efficiency) driven by Users, Load and Energy Efficiency sliders, with an ApexCharts line chart.
- **Chart** page: energy usage vs efficiency over the months.
- Light/dark toggle and a sidebar nav.

Honest scope: in this version the metrics are computed in the browser from the slider inputs (simple linear formulas in `src/components/Dashboard/E-commerce.tsx`), and apart from the slider-driven first point the chart series are randomly generated placeholders. The dashboard does **not** call the Flask API yet. The REST wiring (`POST /predict` on the backend repo) is the planned next step. The UI is built on the free [TailAdmin](https://tailadmin.com/) Next.js template, customized with the Ecointelligence pages, branding, sliders and Framer Motion animations.

## How it fits together

```mermaid
flowchart LR
    A[Router telemetry CSV] --> B[Notebook training<br/>LinearRegression + RandomForest]
    B --> C[Flask API<br/>POST /predict]
    C -. planned .-> D[Next.js dashboard]
    E[Sliders: users, load, efficiency] --> D
    D --> F[Stat cards + ApexCharts]
```

## Quick start

Requires Node 18.17+ (verified on Node 24) with `npm ci`, `npm run build` and `npm start` (all 12 pages prerender).

```bash
git clone https://github.com/anakafeel/Eco-Intelligence-dashboard-TechnataHack24.git
cd Eco-Intelligence-dashboard-TechnataHack24
npm ci
npm run dev                 # http://localhost:3000
# or a production build:
npm run build && npm start
```

## Tech stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, ApexCharts (`react-apexcharts`), Framer Motion.

## Project structure

```
src/
├── app/                      # routes: / (dashboard), /chart, /calendar, /tables, /settings, /forms, /ui
├── components/
│   ├── Dashboard/E-commerce.tsx   # Ecointelligence dashboard (sliders, stat cards)
│   ├── Charts/                    # ApexCharts components
│   ├── Sidebar, Header, Layouts/  # app shell (TailAdmin base)
│   └── ...                        # remaining template components
├── css/, fonts/, hooks/, types/
public/images/                # favicon and assets
.github/assets/               # banner and screenshots
```

## Related

- ML backend: [Technata-24-AI_router_Management_System](https://github.com/anakafeel/Technata-24-AI_router_Management_System)

## Author

**Saim Hashmi** - Computer Systems Engineering, Carleton University. Built at Technata Hacks 2024 (3rd place); commit history in this repo is under Saim's name.
GitHub: [@anakafeel](https://github.com/anakafeel)
