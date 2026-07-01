# 🌟 Interactive 3D Developer Portfolio

A premium, immersive 3D developer portfolio built using modern web technologies. This repository is configured as a monorepo containing two project variants: the flagship **Interactive 3D Portfolio** and a legacy React portfolio.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=flat-square)](#)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?logo=three.js&logoColor=white&style=flat-square)](#)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white&style=flat-square)](#)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-F107A3?logo=framer&logoColor=white&style=flat-square)](#)
[![Netlify Status](https://api.netlify.com/api/v1/badges/deploy-status?style=flat-square)](#)

---

## 📁 Repository Structure

```text
portfolio/
├── 3d-portfolio/         # Flagship interactive 3D Portfolio (Vite + Three.js + Tailwind)
├── my-react-app/         # Legacy React portfolio version
└── netlify.toml          # Root-level configuration for automated Netlify deployment
```

---

## 🚀 Flagship Feature: Interactive 3D Portfolio (`3d-portfolio`)

The flagship 3D portfolio creates an immersive experience by placing the visitor in a developer's digital workstation.

### ✨ Key Features
* **Interactive 3D Workstation**: Built with React Three Fiber (R3F) and `@react-three/drei`. Includes realistic lighting, shadows, and interactive components.
* **Seamless Camera Transitions**: Click the 3D laptop to zoom directly into the screen and unlock the interactive project workspace.
* **Stats Dashboard**: Integrated dashboard featuring live GitHub activity metrics and LeetCode problem-solving benchmarks.
* **Command Palette**: Press `Ctrl + K` (or `Cmd + K` on macOS) to toggle a floating navigation menu to quickly travel between different sections.
* **Ambient Soundscape**: Toggable ambient low-fi music player integrated into the navigation sidebar.
* **Fully Responsive**: Optimized controls and layouts for desktop, tablet, and mobile browsers.

---

## 🛠️ Local Development Setup

To run the flagship 3D portfolio locally:

1. **Navigate to the portfolio directory**:
   ```bash
   cd 3d-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Dev Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ⚡ Deployment to Netlify

This repository is pre-configured with a root-level `netlify.toml` file that points Netlify directly to the `3d-portfolio` build commands.

### Auto-Configuration Settings:
* **Base directory**: `3d-portfolio`
* **Build command**: `npm run build`
* **Publish directory**: `dist` (relative to base)
