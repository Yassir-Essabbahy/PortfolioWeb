/**
 * ============================================================================
 * PROJECTS DATA STORE — projects.js
 * ============================================================================
 * 
 * HOW TO ADD A NEW PROJECT:
 * ----------------------------------------------------------------------------
 * 1. Copy the template object below.
 * 2. Paste it into the `PROJECTS` array (at the top if it's your newest work).
 * 3. Fill in the fields:
 *      id          : Unique slug string (e.g. "my-new-game")
 *      title       : Name of the project
 *      category    : One of "game" | "system" | "3d" | "vrar"
 *      year        : Release year or date range (e.g. "2026" or "09.2026 - Present")
 *      tags        : Array of 2–4 short tech/genre tags
 *      summary     : One-line hook for compact cards (max ~100 characters)
 *      description : In-depth overview shown inside the detail modal
 *      features    : Array of up to 4 key highlights/bullet points
 *      thumbnail   : Path to card cover image (e.g. "assets/my-game/cover.png")
 *      images      : Array of image paths for the detail modal gallery
 *      video       : (Optional) Path to .mp4 video if applicable (or null)
 *      links       : Array of { label, url, isPrimary? }
 *      featured    : Boolean (true to display in top 3 Featured Work cards)
 * 
 * TEMPLATE:
 * {
 *   id: "project-slug",
 *   title: "Project Title",
 *   category: "game", // "game" | "system" | "3d" | "vrar"
 *   year: "2026",
 *   tags: ["Unity", "C#", "Blender"],
 *   summary: "Short one-line hook under 100 characters describing the project.",
 *   description: "Detailed description of the gameplay, mechanics, or art pipeline.",
 *   features: [
 *     "Feature highlight 1",
 *     "Feature highlight 2",
 *     "Feature highlight 3",
 *     "Feature highlight 4"
 *   ],
 *   thumbnail: "assets/path/thumbnail.png",
 *   images: ["assets/path/img1.png", "assets/path/img2.png"],
 *   video: null, // or "assets/video.mp4"
 *   links: [
 *     { label: "Play on itch.io", url: "https://yassir001.itch.io/...", isPrimary: true }
 *   ],
 *   featured: false
 * },
 * ============================================================================
 */

const PROJECTS = [
  // ==========================================================================
  // GAMES
  // ==========================================================================
  {
    id: "barzakh",
    title: "As A Kid: Barzakh",
    category: "game",
    year: "09.2026 - Present",
    tags: ["Unity 6", "C#", "Blender", "Psychological Horror"],
    summary: "Moroccan psychological horror limbo with Darija branching dialogue. Sequel to As A Kid.",
    description: "The next chapter in the psychological horror series, expanding upon the domestic world of As A Kid (+6,000 itch.io downloads). Barzakh plunges players into an eerie Moroccan limbo between reality and what lies beyond. Navigate familiar domestic rooms, liminal subway transit corridors, and dreamlike coastal shores while uncovering memories through interactive encounters with enigmatic souls.",
    features: [
      "Direct sequel and expansion to the acclaimed As A Kid universe",
      "Interactive branching dialogue system written and voiced in Moroccan Darija",
      "Evocative Moroccan settings: traditional salons, metro platforms, and coastlines",
      "Engineered in Unity 6 and Blender with custom low-poly art and lighting"
    ],
    thumbnail: "assets/barzakh/barzakh-1.png",
    images: [
      "assets/barzakh/barzakh-1.png",
      "assets/barzakh/barzakh-2.png",
      "assets/barzakh/barzakh-3.png",
      "assets/barzakh/barzakh-4.png"
    ],
    video: null,
    links: [
      { label: "Follow Devlog on Instagram", url: "https://www.instagram.com/thats_yessir", isPrimary: true },
      { label: "Original Demo on itch.io", url: "https://yassir001.itch.io/as-a-kid-demo" }
    ],
    featured: true
  },
  {
    id: "finger-luck",
    title: "A Finger of Luck",
    category: "game",
    year: "08.2026 - 09.2026",
    tags: ["Unity", "C#", "WebGL", "Card Horror"],
    summary: "High-stakes Moroccan Blackjack horror where every loss costs a finger. Playable in browser.",
    description: "Trapped in a dimly lit backroom with a ruthless dealer, play Moroccan Blackjack to pay off your debt. Every lost hand or bust costs you a finger. With only five fingers to spare, you must outplay the dealer, settle your debt, and unlock the suitcase to earn your freedom.",
    features: [
      "Traditional 40-card Moroccan deck rules (1–7, Sota, Caballo, Rey)",
      "High-stakes penalty system with 5 fingers on the line",
      "Dynamic camera transitions, realistic card handling, and tense penalty beats",
      "Playable directly in desktop and mobile browsers via WebGL"
    ],
    thumbnail: "assets/finger/finger-1.png",
    images: [
      "assets/finger/finger-1.png",
      "assets/finger/finger-2.png",
      "assets/finger/finger-3.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/a-finger-of-luck", isPrimary: true }
    ],
    featured: true
  },
  {
    id: "as-a-kid",
    title: "As A Kid",
    category: "game",
    year: "06.2026 - 08.2026",
    tags: ["Unity", "C#", "Blender", "Narrative Horror"],
    summary: "Psychological horror in a Moroccan household. +6,000 itch.io downloads.",
    description: "A short psychological horror game set inside a traditional Moroccan household — a world of familiar walls, locked doors, and things you were never supposed to hear. You play as a child navigating a night that feels wrong. Hide, listen, and piece together memories that linger in the dark.",
    features: [
      "Over 6,000 downloads and positive community acclaim on itch.io",
      "Authentic Moroccan atmosphere: architecture, soundscapes, and Darija dialogue",
      "Psychological narrative rooted in emotional isolation and memory",
      "Stylized low-poly art and handcrafted domestic 3D assets built in Blender"
    ],
    thumbnail: "assets/AsAKid/asakid-1.png",
    images: [
      "assets/AsAKid.png",
      "assets/AsAKid/asakid-1.png",
      "assets/AsAKid/asakid-2.png",
      "assets/AsAKid/asakid-3.png",
      "assets/AsAKid/asakid-4.png",
      "assets/AsAKid/asakid-5.png",
      "assets/AsAKid/asakid-6.png",
      "assets/AsAKid/asakid-7.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/as-a-kid-demo", isPrimary: true }
    ],
    featured: true
  },
  {
    id: "pharmacy-night-shift",
    title: "Pharmacy Night Shift",
    category: "game",
    year: "02.2026 - 04.2026",
    tags: ["Unity 6", "C#", "Blender", "Simulation"],
    summary: "Late-night pharmacy simulation where routine customer service spirals into eerie tension.",
    description: "Work a lonely nocturnal shift at a quiet city pharmacy. Dispense prescriptions, manage medicine inventory, and attend to strange customers as subtle environmental events slowly mount into psychological unease.",
    features: [
      "Core interaction logic, prescription validation, and progression systems in C#",
      "Custom 3D medicine packaging, shelves, and checkout interior modeled in Blender",
      "Interactive register UI and prescription inspection system",
      "Dynamic atmospheric event triggers that escalate tension throughout the shift"
    ],
    thumbnail: "assets/PharmacyNightShift.png",
    images: [
      "assets/PharmacyNightShift.png",
      "assets/pharmacy/pharmacy-1.png",
      "assets/pharmacy/pharmacy-2.png",
      "assets/pharmacy/pharmacy-3.png",
      "assets/pharmacy/pharmacy-4.png",
      "assets/pharmacy/pharmacy-5.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/pharmacy-night-shift", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "report-protocol",
    title: "Report Protocol",
    category: "game",
    year: "03.2026 - 04.2026",
    tags: ["Unity", "C#", "Blender", "Puzzle"],
    summary: "Surveillance anomaly detection game with multi-camera feeds and reporting interface.",
    description: "An observation-based puzzle game where players monitor security cameras across multiple rooms. Inspect rooms for subtle anomalies, track state changes, and submit accurate incident reports before anomalies breach protocol.",
    features: [
      "Multi-camera security monitoring system with hotkey switching (1 / 2 / 3)",
      "Dynamic anomaly engine supporting real-time room state transformations",
      "Accuracy-based report validation and scoring system",
      "Custom CCTV surveillance user interface with retro CRT monitor shaders"
    ],
    thumbnail: "assets/ReportProtocol.png",
    images: [
      "assets/ReportProtocol.png",
      "assets/report/report-1.png",
      "assets/report/report-2.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/report-protocol", isPrimary: true },
      { label: "GitHub Repository", url: "https://github.com/Yassir-Essabbahy/Report-Protocol-Game" }
    ],
    featured: false
  },
  {
    id: "flip-that-can",
    title: "FlipThatCan",
    category: "game",
    year: "01.2026 - 02.2026",
    tags: ["Unity", "C#", "Aseprite", "Mobile Arcade"],
    summary: "Fast-paced mobile physics game controlling a bouncing can through tricky obstacles.",
    description: "A fast, responsive mobile arcade title where players guide a bouncing soda can across challenging obstacle courses. Built with custom 2D pixel art and finely tuned physics to deliver addictive, high-precision arcade gameplay.",
    features: [
      "Physics-based bounce trajectories tuned for responsive mobile touch inputs",
      "Original 2D pixel art sprites and frame animations created in Aseprite",
      "Lightweight rendering pipeline optimized for smooth mobile framerates",
      "Progressive difficulty curve with dynamic obstacle positioning"
    ],
    thumbnail: "assets/FlipThatCan.png",
    images: [
      "assets/FlipThatCan.png",
      "assets/flip/flip-1.gif",
      "assets/flip/flip-2.gif",
      "assets/flip/flip-3.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/flip-that-can", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "dr-dance",
    title: "DrDance",
    category: "game",
    year: "01.2026 - 02.2026",
    tags: ["Unity", "C#", "Physics", "Mobile Arcade"],
    summary: "Rhythm-infused mobile arcade game with precision obstacle navigation and score tracking.",
    description: "An endless mobile arcade challenge inspired by classic one-touch mechanics with a musical twist. Navigate rhythm-timed obstacles with precision tap controls while competing against your personal high score.",
    features: [
      "Responsive one-touch tap controls tailored for mobile gameplay",
      "Rhythm countdown sequences and obstacle pattern synchronization",
      "Real-time score tracking system and lightweight UI feedback",
      "Efficient mobile memory footprint and battery-conscious performance"
    ],
    thumbnail: "assets/DrDance.png",
    images: [
      "assets/DrDance.png",
      "assets/DrDance/drdance-1.png",
      "assets/DrDance/drdance-2.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/drdance", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "recording-0217",
    title: "Recording 02:17",
    category: "game",
    year: "11.2025 - 01.2026",
    tags: ["Unity", "C#", "Level Design", "Horror Prototype"],
    summary: "Atmospheric investigation prototype exploring environmental storytelling and suspense.",
    description: "An investigative horror prototype set in an eerie, dim residential space. Players piece together events through careful inspection of environmental clues, audio logs, and hidden notes.",
    features: [
      "Suspenseful exploration built with atmospheric lighting and shadow contrast",
      "Interactive clue discovery, note reading, and trigger-based events",
      "Level design and environmental layout crafted for tension pacing",
      "Foundation prototype that established core mechanics for subsequent projects"
    ],
    thumbnail: "assets/Recording.png",
    images: [
      "assets/Recording.png",
      "assets/recording/recording-1.png",
      "assets/recording/recording-2.png",
      "assets/recording/recording-3.png",
      "assets/recording/recording-4.png",
      "assets/recording/recording-5.png"
    ],
    video: null,
    links: [
      { label: "Play on itch.io", url: "https://yassir001.itch.io/recording-0217", isPrimary: true }
    ],
    featured: false
  },

  // ==========================================================================
  // SYSTEMS & PROTOTYPES
  // ==========================================================================
  {
    id: "system-driving",
    title: "First-Person Driving System",
    category: "system",
    year: "2026",
    tags: ["Unity", "C#", "Vehicle Physics", "Immersion"],
    summary: "First-person vehicle controller with 5-gear transmission, dials, and terrain alignment.",
    description: "A lightweight, atmospheric first-person vehicle controller built for narrative games like Fears to Fathom. Prioritizes tactile cockpit feel and natural ground interaction over bloated physics simulations.",
    features: [
      "Simulated 5-gear manual transmission with engine RPM curves",
      "Functional dashboard gauges (speedometer, tachometer) and steering wheel rotation",
      "Dynamic ground normal alignment for natural terrain contact",
      "Interactive headlight illumination cone tuned for atmospheric night driving"
    ],
    thumbnail: "assets/systems/car-controller.jpg",
    images: [
      "assets/systems/car-controller.jpg"
    ],
    video: "assets/CarLinkedin.mp4",
    links: [
      { label: "LinkedIn Post", url: "https://lnkd.in/p/e_gNCktp", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "system-cleaning",
    title: "Decoupled Cleaning System",
    category: "system",
    year: "2026",
    tags: ["Unity (URP)", "C#", "Shader Graph", "Gameplay Mechanic"],
    summary: "Extensible cleaning mechanic in Unity URP using ICleanable interface and Shader Graph.",
    description: "A dynamic, decoupled cleaning mechanic engineered in Unity Universal Render Pipeline (URP) using C# and Shader Graph. Built with an extensible interface-based architecture using ICleanable combined with player raycasting rather than tightly coupled scripts.",
    features: [
      "Interface-based architecture using ICleanable combined with raycasting",
      "Custom Shader Graph dirt mask and dynamic texture reveal effect",
      "Decoupled tool interaction allowing any surface to be cleanly scrubbed",
      "Tactile player feedback and extensible progression triggers"
    ],
    thumbnail: "assets/systems/cleaning-system.jpg",
    images: [
      "assets/systems/cleaning-system.jpg"
    ],
    video: null,
    links: [
      { label: "LinkedIn Video Showcase", url: "https://lnkd.in/p/eJRN5pEW", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "system-dialogue",
    title: "Unity NPC Dialogue System Prototype",
    category: "system",
    year: "2026",
    tags: ["Unity", "C#", "Narrative", "UI Architecture"],
    summary: "Modular NPC dialogue system with Raycast detection, Cinemachine zoom, and conversation trees.",
    description: "A modular, scalable NPC dialogue system built in Unity. Features interaction detection using raycasting (5m range) with 'Press E to Talk' prompt, Cinemachine camera framing, and character look-at IK. A Dialogue Manager handles conversation flow and branching player choices.",
    features: [
      "Raycast interaction detection (5m range) with 'Press E to Talk' UI prompt",
      "Cinemachine camera zoom for cinematic framing when conversations start",
      "NPC head-look animation & IK so characters naturally face the player",
      "Dialogue Manager & Conversation Script architecture for branching dialogue trees"
    ],
    thumbnail: "assets/systems/npc-dialogue.jpg",
    images: [
      "assets/systems/npc-dialogue.jpg"
    ],
    video: null,
    links: [
      { label: "GitHub Repository", url: "https://github.com/Yassir-Essabbahy/NPC_Interaction_Dialogue_Unity", isPrimary: true },
      { label: "LinkedIn Video Demo", url: "https://lnkd.in/p/eB6uVxrv" }
    ],
    featured: false
  },
  {
    id: "system-sms",
    title: "Interactive SMS Messaging App System",
    category: "system",
    year: "2026",
    tags: ["Unity", "C#", "UI System", "Mobile Simulation"],
    summary: "In-game draggable messaging UI with dynamic chat bubbles, notification alerts, and sound triggers.",
    description: "A draggable mobile messaging app prototype in Unity for narrative games and gameplay systems. Features incoming/outgoing message bubbles with layout groups, reusable message dispatcher, and sliding notification alerts.",
    features: [
      "Draggable chat window interface built with Unity UI layout groups & prefabs",
      "Dynamic incoming and outgoing message bubbles with automatic sizing",
      "Reusable AddMessage(bool incomingOrOutgoing, string message) architecture",
      "Sliding notification bell trigger and audio alert when new messages arrive"
    ],
    thumbnail: "assets/systems/sms-messaging.jpg",
    images: [
      "assets/systems/sms-messaging.jpg"
    ],
    video: null,
    links: [
      { label: "GitHub Repository", url: "https://github.com/Yassir-Essabbahy/Messaging_App_Unity", isPrimary: true },
      { label: "LinkedIn Video Demo", url: "https://lnkd.in/p/eNc_79is" }
    ],
    featured: false
  },
  {
    id: "system-storytelling",
    title: "Cinematic Dialogue & Storytelling System",
    category: "system",
    year: "2026",
    tags: ["Unity", "C#", "Game Design", "Narrative Pacing"],
    summary: "Cinematic conversation sequencing with dynamic camera cuts and Darija narrative beats.",
    description: "An atmospheric narrative delivery system developed for As A Kid: Barzakh. Controls pacing, dynamic camera cuts, text events, and environmental storytelling cues synchronized with player interaction.",
    features: [
      "Cinematic dialogue sequencing with automatic camera cuts and framing",
      "Branching response selection with full Moroccan Darija localization",
      "Timeline-independent trigger sequences driven by player discovery",
      "Seamless synchronization of environmental lighting, audio stingers, and story progression"
    ],
    thumbnail: "assets/systems/cinematic-dialogue.jpg",
    images: [
      "assets/systems/cinematic-dialogue.jpg"
    ],
    video: null,
    links: [
      { label: "LinkedIn Video Showcase", url: "https://lnkd.in/p/ecCr2Pfd", isPrimary: true }
    ],
    featured: false
  },
  {
    id: "system-item-pickup",
    title: "Item Pickup & Inspection System",
    category: "system",
    year: "2026",
    tags: ["Unity", "C#", "Interaction", "Inventory"],
    summary: "First-person interaction framework for picking up, 3D rotating, and stashing items.",
    description: "A clean first-person interaction system supporting 3D object inspection, smooth lerped pickup motions, inventory stashing, and item-specific gameplay events.",
    features: [
      "Full 360-degree 3D item inspection with smooth rotation controls in hand",
      "Contextual raycast targeting with dynamic crosshair prompt feedback",
      "Inventory event dispatching for keys, documents, and interactive props",
      "Optimized zero-garbage-collection interaction state handling"
    ],
    thumbnail: "assets/pharmacy/pharmacy-4.png",
    images: [
      "assets/pharmacy/pharmacy-4.png",
      "assets/AsAKid/asakid-6.png"
    ],
    video: null,
    links: [
      { label: "GitHub Core Systems Build", url: "https://github.com/Yassir-Essabbahy/Core_Systems", isPrimary: true }
    ],
    featured: false
  },

  // ==========================================================================
  // 3D ART & MODELING
  // ==========================================================================
  {
    id: "3d-reel",
    title: "Blender 3D Modeling Reel",
    category: "3d",
    year: "2026",
    tags: ["Blender", "Low-Poly", "Asset Modeling", "Showreel"],
    summary: "Realtime low-poly viewport modeling, topology, and UV workflows in Blender.",
    description: "A comprehensive video showreel displaying custom 3D asset modeling in Blender. Covers viewport wireframes, low-poly geometry budgets, UV layout optimization, and game-ready exports.",
    features: [
      "Clean low-poly topology with strict polygon budgets for real-time engines",
      "Custom prop modeling for everyday Moroccan objects and vintage appliances",
      "UV unwrapping and compact texture atlas packing",
      "Realtime viewport turntable showcase of wireframes and shaded models"
    ],
    thumbnail: "assets/barzakh/barzakh-4.png",
    images: [
      "assets/barzakh/barzakh-4.png"
    ],
    video: "assets/3D/PSX_Arts.mp4",
    links: [],
    featured: false
  }
];

// Attach to window for global access in browser, and module.exports in Node
if (typeof window !== "undefined") {
  window.PROJECTS = PROJECTS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = PROJECTS;
}
