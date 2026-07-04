# SpringQuest 🚀

> **A gamified learning platform to master Java, Spring Boot, and Reactive Programming through hands-on coding missions.**

Engineered by **Saket Saurav**.

---

## 🎮 Overview

SpringQuest transforms the traditional software engineering learning curve into an interactive, RPG-style adventure. Navigate through a beautifully animated World Map, complete coding challenges, earn experience points (XP), and unlock achievements as you progress from basic Java syntax to advanced Reactive Spring WebFlux concepts.

## ✨ Features

* **🌍 Immersive Learning Worlds:** Journey through 11 carefully crafted zones, including *Java Academy*, *OOP City*, *Spring Core Campus*, *Database Division*, and *WebFlux HQ*.
* **🏆 Gamification Engine:** Level up your profile, maintain daily login streaks, earn coins, and unlock exclusive achievements to stay motivated.
* **💻 Built-in Code Editor:** Integrated Monaco Editor with real-time syntax highlighting, custom code validation, and interactive feedback.
* **🧠 AI Mentor & Hint System:** Stuck on a complex challenge? Get intelligent hints and targeted guidance from the AI Mentor System.
* **📚 Knowledge Hub:** Access a comprehensive Revision Module packed with quick notes and interactive MCQs to test your conceptual knowledge.
* **🌌 Premium Aesthetics:** Features a modern, arcade-inspired UI with a dynamic `Three.js` 3D background, smooth transitions, and engaging micro-animations.

## 🛠️ Tech Stack

* **Frontend Structure:** HTML5, CSS3 (Modern features, Flexbox/Grid, Keyframe Animations)
* **Logic:** Vanilla JavaScript (ES6 Modules) - *No framework required!*
* **3D Graphics:** [Three.js](https://threejs.org/) for the captivating interactive background.
* **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) for an authentic IDE-like experience in the browser.
* **Data Storage:** LocalStorage API (via `LocalStorageManager`) to persist your game state and progress seamlessly.

## 📂 Project Structure

```text
├── index.html            # Main application entry point
├── src/
│   ├── main.js           # Application bootstrapper and core orchestration
│   ├── components/       # UI modules (WorldMapSystem, MissionView, StatsPanel, etc.)
│   ├── core/             # Core engines (GameState, Gamification, Validation, Animation)
│   ├── data/             # Content (Worlds, Missions, Achievements, MCQ Data)
│   └── styles/           # CSS stylesheets (main.css)
```

## 🚀 How to Run Locally

Since SpringQuest utilizes Vanilla ES6 modules, it must be served via a local web server (opening `index.html` directly from the filesystem will result in CORS errors).

1. Clone or download the repository.
2. Open the project folder in your terminal.
3. Start a local HTTP server. Here are a few easy options:
   * **Using Python:** `python -m http.server 8000` (or `python3 -m http.server 8000`)
   * **Using Node.js:** `npx serve .` or `npx http-server`
   * **Using VS Code:** Install the **Live Server** extension, right-click `index.html`, and select "Open with Live Server".
4. Open your browser and navigate to `http://localhost:8000` (or the port provided by your server).

## 🕵️ Cheat Codes (Developer Tools)

Want to explore the entire map without completing the missions? 
* **Unlock All Worlds:** Simply type `unlock` on your keyboard (while not focused on an input or code editor) to bypass progression locks.
* **Restore Locks:** Type `lock` to restore the map's original progression state based on your legitimately completed missions.

---
*SpringQuest — Making Enterprise Java Fun Again.*
