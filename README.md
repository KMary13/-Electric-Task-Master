# ⚡ Electric Task Master

## 🚀 Demo
[(https://melodic-sprinkles-0c27c5.netlify.app/)]

## 📝 Overview
This project is a fully functional To-Do list application that goes beyond standard CRUD operations by implementing a unique "Electric" UI theme. The main goal was to practice advanced DOM manipulation, state management without frameworks, and complex CSS rendering effects (SVG filters).

## ✨ Key Features
- **CRUD Operations:** Create, Read, Update, and Delete tasks efficiently.
- - **Persistent Data:** Uses `localStorage` to save data between sessions.
- **Advanced UI/UX:**
- Custom SVG filters (feTurbulence) to create a realistic "electric current" effect on borders.
- CSS Animations (@keyframes) for adding tasks, error shaking, and a "shock" effect upon completion.
- Neon glow effects using CSS `box-shadow` and animations.
- **Mobile Optimization:**
  - Implemented specific performance fixes for mobile GPUs (disabling heavy SVG filters on small screens to maintain 60fps).
  - Touch-friendly interface and "Empty State" handling.
  - Vibration feedback (Haptic API) for mobile interactions on Android devices.
- **Responsive Design:** Fully adaptive layout for mobile and desktop.
## 🛠️ Tech Stack
- **HTML5:** Semantic structure, SVG filters integration.
- **CSS3:** Flexbox, CSS Variables, Keyframe Animations, Backdrop Filter, Media Queries.
- **JavaScript (ES6+):**
  - Event Delegation.
  - LocalStorage API.
  - DOM Manipulation.
  - Performance optimization (Will-change property).

- **Project Origin:** The core logic was inspired by a tutorial, but the UI was completely redesigned, and features like the Vibration API, SVG turbulence filters, and advanced interaction animations were implemented independently to enhance the user experience.

- ## 💡 Lessons Learned & Optimization
Initially, the heavy SVG `feTurbulence` filter caused rendering lag on mobile devices. I solved this by implementing a media query strategy to simplify effects on constrained hardware, ensuring a smooth user experience without sacrificing the desktop visual appeal.

