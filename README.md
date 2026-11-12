# 🎓 SkillSwap – Student Skill Exchange Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Status](https://img.shields.io/badge/Status-Completed%20%26%20Interactive-success?style=for-the-badge)]()
[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ahmadali-63/SkillSwap-Student-Skill-Exchange-Platform)

---

## 📌 Project Overview

**SkillSwap** is a peer-to-peer student skill exchange web application developed for college and university campuses. The platform eliminates monetary barriers to learning by enabling students to trade academic tutoring, technical skills, creative design, and language practice through mutual, equal-time knowledge exchanges.

Built as a **5th Semester Web Engineering / Academic Coursework Project**, the application emphasizes semantic HTML5 markup, responsive CSS3 design, Bootstrap 5.3 UI components, and an interactive JavaScript engine that provides dynamic search, routing, modal proposals, profile generation, and local state persistence.

---

## 🚀 Key Features & Functionality

### 1. 🏠 Interactive Landing Page (`index.html`)
- **Hero Quick Search Bar**: Users can input skills they wish to learn and teach. Submissions pass query parameters directly to the directory (`explore.html?learn=...&teach=...`) and auto-trigger live filtering.
- **Popular Skill Categories**: Quick-navigation cards for Coding & Web, Academics & Math, UI/UX Design, Foreign Languages, Multimedia, and Music.
- **Community Highlights & Testimonials**: Showcases real-world student swap scenarios, ratings, and feedback.
- **Platform Metrics**: Live counters for verified students, cataloged skills, and exchanged hours.

### 2. 🔍 Real-Time Skill Directory (`explore.html`)
- **Instant Keyword Search**: Live filter querying student names, degrees, offered skills, and requested topics with zero delay.
- **Category Filter Pills**: Interactive buttons filtering cards by domain (*All*, *Programming*, *Academics*, *Design*, *Languages*, *Multimedia*).
- **Dynamic Counter & Empty State**: Live counter badge reflecting visible students and a friendly reset fallback state when no matches are found.
- **Quick Swap Modal**: Allows students to send a proposal directly from any card with pre-filled partner details.

### 3. 👤 Dynamic Student Profiles (`profile.html`)
- **Query Parameter-Driven Engine**: Dynamically populates student data (`profile.html?student=Hamza%20Tariq`, `Bilal%20Hassan`, etc.) from an internal database.
- **Skill Proficiency Bars**: Visual percentage progress bars highlighting each student's mastery in offered topics.
- **Weekly Availability Schedule**: Detailed timetable of campus study hours, labs, and online slots.
- **Interactive Review System**: Includes a **"Leave Review"** modal that allows users to rate peers (1–5 stars) and immediately renders the new feedback on the profile.

### 4. 📊 Comprehensive Student Dashboard (`dashboard.html`)
- **Metric Cards**: Real-time stats for Active Swaps, Pending Requests, Total Hours Exchanged, and Rating.
- **Incoming Requests**: Interactive **Accept** and **Decline** actions that update status badges, decrement pending counts, and display toast alerts.
- **Outgoing Proposals**: Dynamically renders proposals dispatched by the user, stored in `localStorage`, complete with withdrawal capabilities.
- **Scheduled Sessions**: Displays upcoming confirmed exchanges with simulated **"Join Google Meet"** room actions.
- **Active Skills Catalog & "List New Skill" Modal**: Allows students to list new skills (teaching or seeking) which dynamically render into the dashboard.

### 5. 🔄 Dedicated Proposal Wizard (`swap-request.html`)
- **Multi-Step Proposal Form**: Auto-populates exchange partners and topics from query parameters.
- **Schedule & Mode Selection**: Choose between campus library study rooms, computer labs, or online video meetings with date/time pickers.
- **Automatic Sync**: Dispatched proposals are stored in `localStorage` and automatically redirect to the user's dashboard.

### 6. 🔐 Student Authentication (`login.html` & `register.html`)
- **Teacher / Evaluator Auto-Fill Buttons**: One-click **"Auto Fill"** demo buttons on both login and registration forms to allow instant grading without manual typing.
- **Client-Side Session Simulation**: Stores user session details in `localStorage` and synchronizes the student's name across the navbar.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used | Implementation Details |
| :--- | :--- | :--- |
| **Markup** | **HTML5** | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), accessible form controls, and modal structures. |
| **Styling** | **CSS3** | Custom CSS variables (color tokens, gradients), responsive flexbox/grid layouts, card hover lift transitions, and custom scrollbars. |
| **Framework** | **Bootstrap 5.3** | Responsive grid system, navbar toggler, pill badges, modal dialogs, tab panes, and alerts. |
| **Iconography** | **Bootstrap Icons 1.11** | Clean iconography across cards, buttons, badges, and navigation links. |
| **Interactivity** | **Vanilla JavaScript (ES6+)** | DOM manipulation, URL search parameter parsing, mock database management, toast notifications, and `localStorage` persistence. |

---

## 📁 Project Directory Structure

```text
SkillSwap – Student Skill Exchange Platform/
│
├── index.html              # Landing page (hero search, categories, testimonials)
├── explore.html            # Search & filter directory with quick swap modal
├── profile.html            # Dynamic student profile with review submission
├── dashboard.html          # Student dashboard (incoming/outgoing swaps, sessions)
├── swap-request.html       # Proposal creation wizard with schedule picker
├── login.html              # Student login with evaluator auto-fill
├── register.html           # Student registration with demo auto-fill
│
├── css/
│   ├── style.css           # Custom theme, CSS variables, card elevations, animations
│   └── responsive.css      # Custom media queries for mobile and tablet devices
│
├── js/
│   └── main.js             # Core JS engine: routing, database, search, modals, toasts
│
├── assets/
│   ├── images/             # Image directory for student avatars and graphics
│   └── icons/              # Custom brand icons and assets
│
└── README.md               # Project documentation & evaluation guide
```

---

## 💻 Quick Evaluation & Viva Walkthrough

To review and grade the project in less than 3 minutes, follow these steps:

1. **Launch the Project**:
   - Double-click [`index.html`](file:///c:/Users/Nur%20Sultan/Desktop/5TH%20SEM%20WORK/SkillSwap%20%E2%80%93%20Student%20Skill%20Exchange%20Platform/index.html) or run with **VS Code Live Server**.
2. **Test One-Click Login**:
   - Go to [`login.html`](file:///c:/Users/Nur%20Sultan/Desktop/5TH%20SEM%20WORK/SkillSwap%20%E2%80%93%20Student%20Skill%20Exchange%20Platform/login.html), click the yellow **"Auto Fill"** button, then click **"Log In to SkillSwap"**.
3. **Test Dashboard Interactivity**:
   - On [`dashboard.html`](dashboard.html), click **"Accept Swap"** on Neha Ahmed's request. Notice the status turns green, the incoming count decreases, and a confirmation toast appears.
   - Click **"List New Skill"**, enter a skill (e.g., `React Fundamentals`), and click **Add**. The new skill card appears dynamically.
4. **Test Real-Time Directory & Search**:
   - Go to [`explore.html`](explore.html), type `"Python"` or `"Calculus"` into the search box.
   - Click the category buttons (*Academics*, *Design*, *Programming*) to observe instant client-side filtering.
5. **Test Dynamic Profile Switching**:
   - Click **"Profile"** on any card (e.g. *Bilal Hassan* or *Hamza Tariq*).
   - Notice that [`profile.html`](file:///c:/Users/Nur%20Sultan/Desktop/5TH%20SEM%20WORK/SkillSwap%20%E2%80%93%20Student%20Skill%20Exchange%20Platform/profile.html) automatically updates the avatar, bio, roll number, schedule, and reviews for that specific student.
   - Click **"Leave Review"**, select 5 stars, submit, and watch the review prepend live to the list.
6. **Test Sending a Proposal**:
   - Click **"Swap"** on any student card, fill in the terms, and submit. You will be redirected to the dashboard, where the new proposal appears under **"Outgoing Proposals"**.

---

## 🎯 5th Semester Coursework Objectives Achieved

- [x] **Semantic Markup**: Proper document outline with accessible form labels, ARIA attributes, and structured sections.
- [x] **Responsive Mobile-First Layout**: Fully fluid across mobile, tablet, and desktop viewports using Bootstrap grid and custom media queries.
- [x] **Component Architecture**: Modular cards, modal dialogs, tab navigation, and toasts without framework overhead.
- [x] **Interactive DOM Scripting**: Dynamic event handling, real-time string filtering, parameter parsing, and client-side data persistence.

---

## 🔮 Future Enhancements

- **Real-Time WebSockets**: In-browser instant messaging between students during active swaps.
- **Backend API Integration**: Connect to Node.js/Express with MongoDB or PostgreSQL for multi-campus persistence.
- **Time Banking Ledger**: Automated 1:1 credit system rewarding students who teach more hours.
- **WebRTC Video Rooms**: Integrated peer-to-peer audio/video calling within the browser.

---

## 📄 Academic Attribution & Repository

- **Repository**: [ahmadali-63/SkillSwap-Student-Skill-Exchange-Platform](https://github.com/ahmadali-63/SkillSwap-Student-Skill-Exchange-Platform)
- **Course**: 5th Semester Web Engineering / Web Development Lab
- Developed for educational and academic evaluation purposes.
