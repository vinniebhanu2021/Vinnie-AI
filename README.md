# Vinnie AI - 3D Interactive Portfolio

🎮 **Live Demo:** [https://vinniebhanu.vercel.app/](https://vinniebhanu.vercel.app/)

Welcome to my 3D Interactive Web Portfolio! This is a fully playable, AAA-style 3D web experience built with React, Three.js, and Rapier Physics. Walk around, explore the Cyberpunk world, and view my portfolio data dynamically mapped onto 3D monoliths!

## 🏗️ Architecture

- **Rendering Engine:** The 3D world is rendered using **Three.js** via the **React Three Fiber (R3F)** ecosystem.
- **Physics Engine:** Full 3D rigid-body collision and movement physics are powered by the **Rapier** physics engine, running on blazing-fast WebAssembly (WASM).
- **Framework:** The entire application is built on top of **Next.js 15 (App Router)** for optimized delivery and React Server Components.
- **Mobile Support:** Fully responsive with a custom CSS/DOM-based **Virtual Touch Joystick** that seamlessly merges with the keyboard inputs at the physics controller layer.

## 🛠️ Tech Stack

- **Core:** Next.js 15, React 19
- **3D Graphics:** Three.js, @react-three/fiber, @react-three/drei
- **Physics:** @react-three/rapier (WASM-based Rigid Body Dynamics)
- **Styling:** CSS3, React DOM overlays

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser.

Use `W A S D` to move and `SPACE` to jump! (Or use the on-screen touch D-Pad on mobile devices).
