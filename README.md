# Yassir ESSABAHY — Developer Portfolio Website

[![Live Website](https://img.shields.io/badge/Live-yessirdev.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://yessirdev.vercel.app)
[![Tech](https://img.shields.io/badge/Frontend-HTML5%20%2F%20CSS3%20%2F%20Vanilla%20JS-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://yessirdev.vercel.app)
[![Deployment](https://img.shields.io/badge/Hosting-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

The official source code for **[yessirdev.vercel.app](https://yessirdev.vercel.app)** — the personal web portfolio of Yassir ESSABAHY, showcasing indie horror titles (+6,000 itch.io downloads), gameplay systems programming, 3D modeling reels, and software engineering projects.

🌐 **[Visit Live Website](https://yessirdev.vercel.app)**

---

## 💻 Tech Stack & Architecture

* **Pure Vanilla Architecture**: Engineered with semantic HTML5, modern CSS3 variables, and vanilla JavaScript for ultra-fast load times and zero framework bloat.
* **Data-Driven Project Store (`projects.js`)**:
  * Decoupled JSON-like data store containing project slugs, tags, descriptions, feature bullet points, media paths, and links.
  * Adding a new project card and detail modal requires zero HTML modifications—just appending a data object to `PROJECTS`.
* **Dynamic Modal & Media Gallery**:
  * Interactive modal inspector featuring image galleries, gameplay video embeds, external itch.io/GitHub links, and keyboard navigation (`Escape` to close).
* **Dark / Light Theme System**:
  * System color-scheme detection (`prefers-color-scheme`) paired with manual toggle and `localStorage` state persistence.
* **Mobile-First Responsive Layout**: Fully responsive CSS Grid and Flexbox layouts optimized for mobile, tablet, and ultra-wide screens.

---

## 📁 Repository Structure

```
├── index.html          # Semantic HTML5 markup & section anchors
├── style.css           # Modern CSS variables, typography, and responsive media queries
├── script.js           # UI interactions, theme toggle, modal controllers & smooth scroll
├── projects.js         # Centralized project data store & metadata
├── server.js           # Local development server
└── assets/             # Project screenshots, cover thumbnails, videos & CV PDF
```

---

## 🚀 Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/Yassir-Essabbahy/PortfolioWeb.git
   cd PortfolioWeb
   ```
2. Serve locally with any static server:
   ```bash
   # Using Node.js:
   node server.js
   # Or using Python:
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

---

## 👨‍💻 Author

**Yassir ESSABAHY** — Solo Game Developer & Technical Artist  
* Portfolio: [yessirdev.vercel.app](https://yessirdev.vercel.app) | LinkedIn: [linkedin.com/in/yessir001](https://www.linkedin.com/in/yessir001/) | Instagram: [@thats_yessir](https://www.instagram.com/thats_yessir)
