/**
 * ==========================================================================
 * SkillSwap – Student Skill Exchange Platform
 * 5th Semester Web Engineering Project
 * Main Interactive JavaScript Engine
 * Author: Student Project Submission
 * Technologies: Vanilla JavaScript (ES6+), Bootstrap 5.3 Components
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarActiveLink();
  initCurrentUserSession();
  initIndexQuickSearch();
  initExploreDirectory();
  initStudentProfilePage();
  initSwapProposalForm();
  initDashboardEngine();
  initAuthHelpers();
});

/* ==========================================================================
   0. Mock Student Database (Used across Explore, Profile, and Proposals)
   ========================================================================== */
const STUDENT_DATABASE = {
  "alex chen": {
    name: "Alex Chen",
    role: "Verified Student",
    badge: "Fast Responder",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    degree: "B.Tech Computer Science & Engineering",
    semester: "5th Semester",
    roll: "CS-2022-048",
    rating: "4.90",
    swapsCount: 28,
    hoursTaught: "34h",
    location: "North Campus, Room 302",
    since: "Sept 2024",
    bio: "Hey there! I'm a 5th semester Computer Science student passionate about frontend engineering and accessible web standards. Currently building responsive web layouts with HTML5, CSS3, and Bootstrap 5.\n\nI love teaching fundamentals of web architecture, flexbox, CSS Grid, and DOM manipulation. In exchange, I'm eager to pair up with peers who can help me with Machine Learning algorithms in Python, UI wireframing in Figma, or Discrete Math midterm review!",
    teach: [
      { name: "HTML5 & Bootstrap 5 Responsive Design", level: "Advanced (95%)", percent: 95, desc: "Semantic markup, responsive navigation, grid layout, cards, and accessibility." },
      { name: "JavaScript & DOM Interactivity", level: "Proficient (85%)", percent: 85, desc: "Event handling, modal triggers, dynamic form validation, and local storage state." },
      { name: "Git & GitHub Collaboration", level: "Intermediate (80%)", percent: 80, desc: "Branching, merge conflict resolution, and GitHub Pages deployment." }
    ],
    learn: [
      { icon: "bi-cpu text-primary", title: "Machine Learning in Python", desc: "Need help understanding linear regression, decision trees, and scikit-learn models for our semester lab." },
      { icon: "bi-palette text-warning", title: "Figma UI Wireframing", desc: "Want to improve design thinking, color theory, and prototyping high-fidelity student dashboards." },
      { icon: "bi-calculator text-success", title: "Discrete Math Proofs", desc: "Looking for a peer to review recurrence relations and graph theory before midterms." },
      { icon: "bi-translate text-info", title: "Conversational Spanish", desc: "Interested in 30-min weekly language exchange practice for elective credits." }
    ],
    schedule: [
      { days: "Monday - Wednesday", time: "5:00 PM – 8:00 PM" },
      { days: "Thursday", time: "6:00 PM – 8:00 PM" },
      { days: "Friday", time: "Not Available (Lab Days)" },
      { days: "Saturday", time: "10:00 AM – 2:00 PM" },
      { days: "Sunday", time: "By Appointment" }
    ],
    reviews: [
      { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80", rating: 5, exchange: "Python for Bootstrap 5 Grid", text: "Alex is an incredible peer mentor! He explained the Bootstrap grid and custom CSS responsive breakpoints in just two sessions. In exchange, I helped him with SQL queries. Super patient and punctual.", date: "Nov 04, 2026" },
      { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80", rating: 5, exchange: "Calculus III for Web Layout", text: "Helped me debug our team's web engineering lab project. Very clear explanations and great communication throughout our swap session.", date: "Oct 28, 2026" }
    ]
  },
  "aarav patel": {
    name: "Aarav Patel",
    role: "Verified Student",
    badge: "Top Mentor",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
    degree: "B.Tech Computer Science & Engineering",
    semester: "5th Semester",
    roll: "CS-2022-014",
    rating: "4.95",
    swapsCount: 24,
    hoursTaught: "36h",
    location: "Main Tech Block, Library Study 2",
    since: "Aug 2024",
    bio: "Passionate competitive programmer and DSA enthusiast. I have solved 350+ LeetCode problems and enjoy breaking down tricky recursive trees and dynamic programming into intuitive visual patterns. Looking to learn modern UI/UX design to make my applications look clean!",
    teach: [
      { name: "C++ & Object Oriented Programming", level: "Expert (95%)", percent: 95, desc: "STL containers, pointers, memory allocation, and class hierarchies." },
      { name: "Data Structures & Algorithms (Trees, Graphs, DP)", level: "Advanced (92%)", percent: 92, desc: "Graph traversals (BFS/DFS), shortest path algorithms, and LeetCode problem solving patterns." }
    ],
    learn: [
      { icon: "bi-palette text-primary", title: "Figma UI Design & Prototyping", desc: "Want to learn responsive layout grids, component states, and modern design systems." },
      { icon: "bi-code-slash text-success", title: "Tailwind CSS & Mobile Styling", desc: "Need assistance translating Figma mockups into sleek CSS utility code." }
    ],
    schedule: [
      { days: "Monday - Friday", time: "5:00 PM – 8:00 PM" },
      { days: "Saturday", time: "2:00 PM – 6:00 PM" },
      { days: "Sunday", time: "Available on Discord" }
    ],
    reviews: [
      { name: "Kenji Tanaka", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", rating: 5, exchange: "C++ Graphs for Web Portfolio", text: "Aarav walked me through Dijkstra's and Topological Sort with crystal clear diagrams. Best peer tutor on campus!", date: "Nov 02, 2026" }
    ]
  },
  "sarah jenkins": {
    name: "Sarah Jenkins",
    role: "Verified Student",
    badge: "Top Mentor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    degree: "Computer Science & Data Analytics",
    semester: "5th Semester",
    roll: "CS-2022-072",
    rating: "4.90",
    swapsCount: 18,
    hoursTaught: "26h",
    location: "Science Block & Zoom",
    since: "Oct 2024",
    bio: "Hey! I focus on backend databases, SQL query optimization, and Python data pipelines. Currently working on semester projects involving SQLite, MySQL, and pandas. Looking for peers who know frontend frameworks and French language basics!",
    teach: [
      { name: "Python Scripting & Data Pipelines", level: "Advanced (90%)", percent: 90, desc: "Data structures, file handling, automation scripts, and API consumption." },
      { name: "SQL & Relational Database Design", level: "Proficient (88%)", percent: 88, desc: "Normalization (1NF to BCNF), complex joins, subqueries, and indexing." }
    ],
    learn: [
      { icon: "bi-braces text-primary", title: "React Component Architecture", desc: "Want to learn hooks, state management, and props passing." },
      { icon: "bi-translate text-info", title: "French A1 Conversational", desc: "Practicing pronunciation and basic dialogue for semester language elective." }
    ],
    schedule: [
      { days: "Tuesday & Thursday", time: "4:00 PM – 7:00 PM" },
      { days: "Saturday - Sunday", time: "11:00 AM – 3:00 PM" }
    ],
    reviews: [
      { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80", rating: 5, exchange: "SQL Joins for Bootstrap Cards", text: "Sarah made database normalization finally make sense for my midterm exams. 10/10!", date: "Nov 04, 2026" }
    ]
  },
  "david kim": {
    name: "David Kim",
    role: "Verified Student",
    badge: "Math Club Head",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    degree: "Department of Mathematics & Statistics",
    semester: "6th Semester",
    roll: "MATH-2021-029",
    rating: "5.00",
    swapsCount: 31,
    hoursTaught: "42h",
    location: "Ramanujan Math Hall",
    since: "Jan 2024",
    bio: "President of the Campus Math Circle. If you need help with multivariable calculus, linear algebra, Laplace transforms, or probability distributions, I've got your back. In exchange, I'm trying to learn Python so I can run Monte Carlo simulations!",
    teach: [
      { name: "Calculus III & Differential Equations", level: "Expert (98%)", percent: 98, desc: "Multiple integrals, vector calculus, Greens & Stokes theorems, ODEs." },
      { name: "Probability & Applied Statistics", level: "Advanced (92%)", percent: 92, desc: "Hypothesis testing, random variables, regression analysis, and Bayes Theorem." }
    ],
    learn: [
      { icon: "bi-filetype-py text-primary", title: "Python for Scientific Computing", desc: "Looking to master numpy arrays, pandas DataFrames, and matplotlib charts." }
    ],
    schedule: [
      { days: "Monday, Wednesday, Friday", time: "4:00 PM – 7:00 PM" }
    ],
    reviews: [
      { name: "Rhea Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", rating: 5, exchange: "Calculus III for Web Portfolio", text: "David is the reason I got an A in Calculus! Super clear explanations.", date: "Oct 28, 2026" }
    ]
  },
  "emma watson": {
    name: "Emma Watson",
    role: "Verified Student",
    badge: "Design Lead",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    degree: "School of Design, Media & Visual Arts",
    semester: "4th Semester",
    roll: "DES-2023-018",
    rating: "4.88",
    swapsCount: 19,
    hoursTaught: "28h",
    location: "Design Studio A & Google Meet",
    since: "Feb 2024",
    bio: "UI/UX enthusiast and digital illustrator. I spend my days designing wireframes in Figma and vector graphics in Adobe Illustrator. Eager to swap design lessons for HTML5, CSS3, and Bootstrap web basics!",
    teach: [
      { name: "Figma UI Prototyping & Design Systems", level: "Advanced (94%)", percent: 94, desc: "Auto-layout, responsive constraints, variants, and interactive prototyping." },
      { name: "Vector Illustration & Logo Design", level: "Proficient (88%)", percent: 88, desc: "Pen tool mastery, typography pairings, and brand asset export." }
    ],
    learn: [
      { icon: "bi-code-slash text-primary", title: "HTML5 & CSS3 Flexbox", desc: "Want to convert Figma designs directly into live web pages." },
      { icon: "bi-grid text-success", title: "Bootstrap 5 Framework", desc: "Need guidance on Bootstrap utilities and responsive grid containers." }
    ],
    schedule: [
      { days: "Tuesday & Thursday", time: "6:00 PM – 8:00 PM" }
    ],
    reviews: [
      { name: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80", rating: 5, exchange: "Figma for JavaScript", text: "Emma taught me how to use Figma like a pro. Her tips on spacing and hierarchy elevated my project!", date: "Nov 01, 2026" }
    ]
  },
  "carlos rodriguez": {
    name: "Carlos Rodriguez",
    role: "Verified Student",
    badge: "Native Speaker",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    degree: "International Relations & Humanities",
    semester: "5th Semester",
    roll: "IR-2022-055",
    rating: "4.95",
    swapsCount: 27,
    hoursTaught: "32h",
    location: "Humanities Lounge & Library",
    since: "May 2024",
    bio: "Native Spanish speaker from Valencia, currently studying abroad. I love sharing Hispanic culture and conversational fluency. Seeking a buddy who can teach me web programming fundamentals or Excel automation!",
    teach: [
      { name: "Conversational Spanish (A1 to C1)", level: "Native (100%)", percent: 100, desc: "Grammar, listening comprehension, accent training, and everyday dialogue." }
    ],
    learn: [
      { icon: "bi-laptop text-primary", title: "Web Development Basics", desc: "Want to build simple web pages for our campus international society." }
    ],
    schedule: [
      { days: "Weekdays", time: "Flexible Afternoons & Evenings" }
    ],
    reviews: [
      { name: "Ananya Mishra", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", rating: 5, exchange: "Spanish for Content Writing", text: "Carlos makes language learning genuinely fun and conversational. Highly recommend!", date: "Oct 19, 2026" }
    ]
  },
  "lucas meyer": {
    name: "Lucas Meyer",
    role: "Verified Student",
    badge: "Video Creator",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    degree: "Film & Media Studies",
    semester: "4th Semester",
    roll: "FM-2023-033",
    rating: "4.85",
    swapsCount: 14,
    hoursTaught: "21h",
    location: "Media Lab 2",
    since: "Aug 2024",
    bio: "Video editor, colorist, and content creator. I edit student film projects in Premiere Pro and DaVinci Resolve. Looking to learn JavaScript DOM manipulation to build interactive portfolios!",
    teach: [
      { name: "Premiere Pro & Video Post-Production", level: "Advanced (92%)", percent: 92, desc: "Cut pacing, transitions, color grading, and clean audio mixing." }
    ],
    learn: [
      { icon: "bi-filetype-js text-warning", title: "JavaScript DOM Programming", desc: "Need to make interactive video gallery controls on web pages." }
    ],
    schedule: [
      { days: "Saturdays & Sundays", time: "1:00 PM – 5:00 PM" }
    ],
    reviews: [
      { name: "Priya Nair", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80", rating: 5, exchange: "Video Editing for Logic Gates", text: "Lucas helped me edit my club's symposium video. Excellent instruction!", date: "Oct 12, 2026" }
    ]
  },
  "priya nair": {
    name: "Priya Nair",
    role: "Verified Student",
    badge: "Top Scorer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    degree: "Electrical & Electronics Engineering",
    semester: "5th Semester",
    roll: "EEE-2022-019",
    rating: "4.92",
    swapsCount: 22,
    hoursTaught: "30h",
    location: "Hardware Lab 1",
    since: "Mar 2024",
    bio: "Hardware enthusiast with a love for digital circuit design, Karnaugh maps, flip-flops, and FPGA architecture. Looking for peers who can guide me through embedded C programming and microcontroller projects!",
    teach: [
      { name: "Digital Logic Design & Verilog", level: "Advanced (94%)", percent: 94, desc: "Combinational and sequential circuits, state machines, and K-map optimization." }
    ],
    learn: [
      { icon: "bi-cpu text-primary", title: "Embedded C & Arduino", desc: "Want to write clean firmware for sensors and serial communication." }
    ],
    schedule: [
      { days: "Monday & Friday", time: "5:00 PM – 7:00 PM" }
    ],
    reviews: [
      { name: "Aarav Patel", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80", rating: 5, exchange: "Digital Circuits for C++ Pointers", text: "Priya explained state machine reduction so well. Got 100% on that lab assignment!", date: "Nov 03, 2026" }
    ]
  }
};

/* ==========================================================================
   1. Active Navbar Link & User State
   ========================================================================== */
function initNavbarActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Strip anchors or query strings for matching
    const cleanHref = href.split('?')[0].split('#')[0];
    const cleanPath = currentPath.split('?')[0].split('#')[0];

    if (cleanHref === cleanPath || (cleanPath === '' && cleanHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function initCurrentUserSession() {
  try {
    const savedUser = JSON.parse(localStorage.getItem('skillswap_user') || 'null');
    if (savedUser) {
      const navUserName = document.getElementById('navUserName');
      if (navUserName) navUserName.textContent = savedUser.name || 'Alex Chen';
    }
  } catch (err) {
    console.debug('Session check:', err);
  }
}

/* ==========================================================================
   2. Index Quick Search Handler
   ========================================================================== */
function initIndexQuickSearch() {
  const heroForm = document.querySelector('.hero-search-card form');
  if (!heroForm) return;

  heroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const learnInput = heroForm.querySelector('input[name="learn"]');
    const teachInput = heroForm.querySelector('input[name="teach"]');
    
    const learnVal = learnInput ? encodeURIComponent(learnInput.value.trim()) : '';
    const teachVal = teachInput ? encodeURIComponent(teachInput.value.trim()) : '';

    let url = 'explore.html?';
    if (learnVal) url += `learn=${learnVal}&`;
    if (teachVal) url += `teach=${teachVal}&`;

    window.location.href = url.replace(/&$/, '');
  });
}

/* ==========================================================================
   3. Explore Skills Directory (Search, Filter, URL Params, Quick Swap Modal)
   ========================================================================== */
function initExploreDirectory() {
  const searchInput = document.getElementById('skillSearchInput');
  const filterButtons = document.querySelectorAll('.category-filter-btn');
  const cardsGrid = document.getElementById('skillCardsGrid');
  
  if (!cardsGrid) return; // Not on explore.html

  // Read URL params (e.g. ?category=programming or ?learn=React or ?q=Calculus)
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  const paramLearn = urlParams.get('learn');
  const paramTeach = urlParams.get('teach');
  const paramQuery = urlParams.get('q');

  let initialQuery = '';
  if (paramQuery) initialQuery = paramQuery;
  else if (paramLearn) initialQuery = paramLearn;
  else if (paramTeach) initialQuery = paramTeach;

  if (searchInput && initialQuery) {
    searchInput.value = initialQuery;
  }

  if (paramCategory && filterButtons.length) {
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-category') === paramCategory.toLowerCase()) {
        btn.click();
      }
    });
  } else {
    filterSkillCards(initialQuery.toLowerCase(), 'all');
  }

  // Live input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cat = getActiveCategory();
      filterSkillCards(q, cat);
    });
  }

  // Category buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'btn-primary', 'text-white');
        b.classList.add('btn-outline-secondary');
      });

      btn.classList.add('active', 'btn-primary', 'text-white');
      btn.classList.remove('btn-outline-secondary');

      const category = btn.getAttribute('data-category');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      filterSkillCards(query, category);
    });
  });

  // Init Quick Swap Modal on explore page
  initQuickSwapModal();
}

function getActiveCategory() {
  const activeBtn = document.querySelector('.category-filter-btn.active');
  return activeBtn ? activeBtn.getAttribute('data-category') : 'all';
}

function filterSkillCards(query, category) {
  const cards = document.querySelectorAll('.skill-item-card');
  const emptyState = document.getElementById('noResultsState');
  const countBadge = document.getElementById('searchCountBadge');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
    const textContent = card.innerText.toLowerCase();

    const matchesQuery = query === '' || textContent.includes(query);
    const matchesCategory = category === 'all' || cardCategory === category.toLowerCase();

    if (matchesQuery && matchesCategory) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (countBadge) {
    countBadge.textContent = `${visibleCount} Students Available`;
  }

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

function initQuickSwapModal() {
  const modalEl = document.getElementById('quickSwapModal');
  if (!modalEl) return;

  modalEl.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget;
    if (!trigger) return;

    const studentName = trigger.getAttribute('data-student-name') || 'Student';
    const studentTeach = trigger.getAttribute('data-student-teach') || 'Their Skill';
    const studentLearn = trigger.getAttribute('data-student-learn') || 'Your Skill';

    const targetStudentInput = document.getElementById('modalTargetStudent');
    const targetTeachInput = document.getElementById('modalTargetTeach');
    const myOfferSelect = document.getElementById('modalMyOfferSelect');

    if (targetStudentInput) targetStudentInput.value = studentName;
    if (targetTeachInput) targetTeachInput.value = studentTeach;
    if (myOfferSelect && studentLearn) {
      const hintOpt = myOfferSelect.querySelector('option[data-hint]');
      if (hintOpt) hintOpt.textContent = `Recommended: Teach them ${studentLearn}`;
    }
  });

  const modalForm = document.getElementById('quickSwapForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetStudent = document.getElementById('modalTargetStudent')?.value || 'Student';
      const myOffer = document.getElementById('modalMyOfferSelect')?.value || 'Web Dev Skills';
      const learningSkill = document.getElementById('modalTargetTeach')?.value || 'Skills';
      const message = document.getElementById('modalMessage')?.value || 'Looking forward to our skill exchange session!';

      saveProposalToStorage({
        targetStudent,
        myOffer,
        learningSkill,
        message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending'
      });

      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      showCustomToast(`🎉 Swap Proposal Sent!`, `Your proposal was delivered to ${targetStudent}. You can view and manage it on your Dashboard.`);
      modalForm.reset();
    });
  }
}

/* ==========================================================================
   4. Student Profile Page (Dynamic Rendering by Query Parameter)
   ========================================================================== */
function initStudentProfilePage() {
  const profileNameEl = document.getElementById('profileName');
  if (!profileNameEl) return; // Not on profile.html

  // Read ?student= from URL
  const urlParams = new URLSearchParams(window.location.search);
  const requestedStudent = urlParams.get('student');
  const lookupKey = requestedStudent ? requestedStudent.toLowerCase().trim() : 'alex chen';

  const data = STUDENT_DATABASE[lookupKey] || STUDENT_DATABASE['alex chen'];

  // Update Page Title & Name
  document.title = `${data.name} – Student Profile | SkillSwap`;
  profileNameEl.textContent = data.name;

  // Avatars
  const avatarEl = document.getElementById('profileAvatar');
  if (avatarEl) {
    avatarEl.src = data.avatar;
    avatarEl.onerror = () => {
      avatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=120&background=2563eb&color=fff`;
    };
  }

  // Badges & Details
  const roleBadge = document.getElementById('profileRoleBadge');
  if (roleBadge) roleBadge.innerHTML = `<i class="bi bi-patch-check-fill me-1"></i> ${data.role}`;

  const honorBadge = document.getElementById('profileHonorBadge');
  if (honorBadge) honorBadge.innerHTML = `<i class="bi bi-lightning-charge-fill me-1"></i> ${data.badge}`;

  const degreeLine = document.getElementById('profileDegreeLine');
  if (degreeLine) {
    degreeLine.innerHTML = `${data.degree} • ${data.semester} • Roll: <span id="profileRollNum" class="fw-semibold text-dark">${data.roll}</span>`;
  }

  const locEl = document.getElementById('profileLocation');
  if (locEl) locEl.innerHTML = `<i class="bi bi-geo-alt-fill text-danger me-1"></i> ${data.location}`;

  const sinceEl = document.getElementById('profileMemberSince');
  if (sinceEl) sinceEl.innerHTML = `<i class="bi bi-calendar-event me-1"></i> Member since ${data.since}`;

  const ratingEl = document.getElementById('profileRatingNum');
  if (ratingEl) ratingEl.textContent = data.rating;

  const swapsCountEl = document.getElementById('profileTotalSwaps');
  if (swapsCountEl) swapsCountEl.textContent = data.swapsCount;

  const summaryRatingEl = document.getElementById('profileReviewSummaryRating');
  if (summaryRatingEl) summaryRatingEl.textContent = `${data.rating} / 5.0`;

  const totalSwapsStat = document.getElementById('statTotalSwaps');
  if (totalSwapsStat) totalSwapsStat.textContent = data.swapsCount;

  const hoursTaughtStat = document.getElementById('statHoursTaught');
  if (hoursTaughtStat) hoursTaughtStat.textContent = data.hoursTaught;

  // Sidebar target name
  const sidebarTargetName = document.getElementById('profileSidebarTargetName');
  if (sidebarTargetName) sidebarTargetName.textContent = data.name.split(' ')[0];

  // CTA Links
  const proposeBtn = document.getElementById('profileProposeSwapBtn');
  const sidebarBtn = document.getElementById('profileSidebarSwapBtn');
  const firstTeachSkill = data.teach[0]?.name || 'Skill';

  const swapUrl = `swap-request.html?student=${encodeURIComponent(data.name)}&skill=${encodeURIComponent(firstTeachSkill)}`;
  if (proposeBtn) proposeBtn.setAttribute('href', swapUrl);
  if (sidebarBtn) sidebarBtn.setAttribute('href', swapUrl);

  // Bio
  const bioContainer = document.getElementById('profileBioText');
  if (bioContainer) {
    bioContainer.innerHTML = data.bio.split('\n\n').map(p => `<p class="mb-2 text-muted">${p}</p>`).join('');
  }

  // Render Teaching Skills
  const teachesContainer = document.getElementById('profileTeachesContainer');
  if (teachesContainer) {
    teachesContainer.innerHTML = data.teach.map(item => `
      <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center small mb-1">
          <span class="fw-bold">${item.name}</span>
          <span class="text-primary fw-semibold">${item.level}</span>
        </div>
        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${item.percent}%;"></div>
        </div>
        <small class="text-muted">${item.desc}</small>
      </div>
    `).join('');
  }

  // Render Seeking Skills
  const learnsContainer = document.getElementById('profileLearnsContainer');
  if (learnsContainer) {
    learnsContainer.innerHTML = data.learn.map(item => `
      <div class="col-md-6">
        <div class="p-3 border rounded-3 bg-light h-100">
          <div class="fw-bold text-dark mb-1">
            <i class="bi ${item.icon} me-1"></i> ${item.title}
          </div>
          <p class="small text-muted mb-0">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Render Schedule List
  const scheduleList = document.getElementById('profileScheduleList');
  if (scheduleList) {
    scheduleList.innerHTML = data.schedule.map(slot => `
      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
        <span class="fw-semibold">${slot.days}</span>
        <span class="badge bg-light text-dark border">${slot.time}</span>
      </li>
    `).join('');
  }

  // Render Reviews List
  renderProfileReviews(data.reviews);

  // Initialize "Leave a Review" Modal
  initLeaveReviewModal(data.name);
}

function renderProfileReviews(reviews) {
  const container = document.getElementById('profileReviewsContainer');
  if (!container) return;

  if (!reviews || reviews.length === 0) {
    container.innerHTML = `<p class="text-muted small">No reviews yet. Be the first to swap skills and leave feedback!</p>`;
    return;
  }

  container.innerHTML = reviews.map((rev, index) => {
    const stars = Array(rev.rating).fill('<i class="bi bi-star-fill"></i>').join('');
    const isLast = index === reviews.length - 1;

    return `
      <div class="${isLast ? '' : 'border-bottom pb-3 mb-3'}">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="d-flex align-items-center gap-2">
            <img src="${rev.avatar}" alt="Student" class="rounded-circle" width="36" height="36" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(rev.name)}'">
            <div>
              <h6 class="mb-0 fw-bold small">${rev.name}</h6>
              <span class="text-muted" style="font-size: 0.75rem;">Exchanged: ${rev.exchange}</span>
            </div>
          </div>
          <div class="text-warning small">${stars}</div>
        </div>
        <p class="text-muted small mb-0">"${rev.text}"</p>
        <span class="text-muted" style="font-size: 0.72rem;">${rev.date} • Verified Exchange</span>
      </div>
    `;
  }).join('');
}

function initLeaveReviewModal(targetStudentName) {
  const reviewTargetInput = document.getElementById('reviewTargetNameInput');
  if (reviewTargetInput) reviewTargetInput.value = targetStudentName;

  const reviewForm = document.getElementById('leaveReviewForm');
  if (!reviewForm) return;

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = document.getElementById('reviewTopicInput')?.value || 'Skill Exchange';
    const score = parseInt(document.getElementById('reviewRatingScore')?.value || '5', 10);
    const comment = document.getElementById('reviewCommentText')?.value || 'Great peer exchange!';

    const newReview = {
      name: "Alex Chen (You)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
      rating: score,
      exchange: topic,
      text: comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const container = document.getElementById('profileReviewsContainer');
    if (container) {
      const stars = Array(score).fill('<i class="bi bi-star-fill"></i>').join('');
      const reviewHtml = `
        <div class="border-bottom pb-3 mb-3 bg-light p-3 rounded-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center gap-2">
              <img src="${newReview.avatar}" alt="You" class="rounded-circle" width="36" height="36">
              <div>
                <h6 class="mb-0 fw-bold small text-primary">${newReview.name}</h6>
                <span class="text-muted" style="font-size: 0.75rem;">Exchanged: ${newReview.exchange}</span>
              </div>
            </div>
            <div class="text-warning small">${stars}</div>
          </div>
          <p class="text-dark small mb-0">"${newReview.text}"</p>
          <span class="badge bg-success-subtle text-success small mt-1">Just Now • Verified Review</span>
        </div>
      `;
      container.insertAdjacentHTML('afterbegin', reviewHtml);
    }

    const modalEl = document.getElementById('leaveReviewModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    reviewForm.reset();
    showCustomToast('⭐ Review Submitted!', `Your rating and review for ${targetStudentName} has been recorded.`);
  });
}

/* ==========================================================================
   5. Dedicated Swap Proposal Page (swap-request.html)
   ========================================================================== */
function initSwapProposalForm() {
  const form = document.getElementById('detailedSwapForm');
  if (!form) return;

  // Set default date to tomorrow
  const dateInput = document.getElementById('proposalDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Parse URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramStudent = urlParams.get('student');
  const paramSkill = urlParams.get('skill');

  if (paramStudent) {
    const partnerSelect = document.getElementById('proposalPartner');
    if (partnerSelect) {
      let matched = false;
      for (let i = 0; i < partnerSelect.options.length; i++) {
        if (partnerSelect.options[i].text.toLowerCase().includes(paramStudent.toLowerCase())) {
          partnerSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const customOpt = new Option(`${paramStudent} (Selected Student)`, paramStudent, true, true);
        partnerSelect.add(customOpt);
      }
    }
  }

  if (paramSkill) {
    const learnInput = document.getElementById('proposalSkillToLearn');
    if (learnInput) learnInput.value = paramSkill;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const partner = document.getElementById('proposalPartner')?.value || 'Peer';
    const teach = document.getElementById('proposalSkillToTeach')?.value || 'Web Dev';
    const learn = document.getElementById('proposalSkillToLearn')?.value || 'General Skill';
    const mode = document.getElementById('proposalMode')?.value || 'Campus Library';
    const time = document.getElementById('proposalTimeSlot')?.value || '5:00 PM';
    const date = document.getElementById('proposalDate')?.value || 'Next Week';
    const notes = document.getElementById('proposalNotes')?.value || 'Looking forward to our skill exchange session!';

    // Save proposal to localStorage
    saveProposalToStorage({
      targetStudent: partner,
      myOffer: teach,
      learningSkill: learn,
      venue: `${mode} (${time})`,
      message: notes,
      date: date,
      status: 'Pending'
    });

    showCustomToast('🚀 Swap Proposal Dispatched!', `Proposal sent to ${partner}. Redirecting you to your dashboard...`);

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1200);
  });
}

/* ==========================================================================
   6. Dashboard Engine (Accept/Decline, Persistence, Adding Skills, Calendar)
   ========================================================================== */
function initDashboardEngine() {
  const incomingPane = document.getElementById('incoming-tab-pane');
  if (!incomingPane) return; // Not on dashboard.html

  // 1. Render dynamic outgoing proposals
  renderDynamicProposals();

  // 2. Render user's custom skills from storage
  renderDynamicUserSkills();

  // 3. Accept / Decline for Incoming Requests
  document.querySelectorAll('.btn-accept-request').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.request-card');
      const studentName = card.querySelector('.request-student-name')?.textContent || 'Peer';
      
      const badge = card.querySelector('.badge.badge-status-pending');
      if (badge) {
        badge.className = 'badge badge-status-completed';
        badge.textContent = 'Accepted';
      }

      this.disabled = true;
      this.classList.remove('btn-success-custom');
      this.classList.add('btn-secondary');
      this.innerHTML = '<i class="bi bi-check2-circle"></i> Accepted';

      const declineBtn = card.querySelector('.btn-decline-request');
      if (declineBtn) declineBtn.remove();

      updateIncomingCount();
      showCustomToast('✅ Swap Accepted!', `You and ${studentName} are now connected. Session added to your scheduled sessions.`);
    });
  });

  document.querySelectorAll('.btn-decline-request').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.request-card');
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        card.remove();
        updateIncomingCount();
      }, 300);

      showCustomToast('Request Declined', 'The swap request was politely removed.');
    });
  });

  // 4. Add New Skill Modal Form
  const addSkillForm = document.getElementById('addSkillForm');
  if (addSkillForm) {
    addSkillForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.querySelector('input[name="skillTypeRadio"]:checked')?.value || 'teach';
      const name = document.getElementById('newSkillName')?.value.trim();
      const level = document.getElementById('newSkillLevel')?.value || 'Intermediate';

      if (!name) return;

      const newSkillObj = {
        name,
        type: type === 'teach' ? 'Teaching' : 'Seeking',
        level,
        swaps: 0
      };

      saveSkillToStorage(newSkillObj);
      appendSkillCard(newSkillObj);

      const modalEl = document.getElementById('addSkillModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();

      addSkillForm.reset();
      showCustomToast('🌟 Skill Listed!', `Added "${name} (${level})" to your active profile catalog.`);
    });
  }
}

function updateIncomingCount() {
  const badge = document.getElementById('incomingCountBadge');
  const countBadgeTab = document.querySelector('#incoming-tab .badge');
  const remaining = document.querySelectorAll('#incoming-tab-pane .request-card').length;

  if (badge) badge.textContent = `${remaining} New`;
  if (countBadgeTab) countBadgeTab.textContent = remaining;
}

function saveProposalToStorage(proposal) {
  try {
    const list = JSON.parse(localStorage.getItem('skillswap_proposals') || '[]');
    list.unshift(proposal);
    localStorage.setItem('skillswap_proposals', JSON.stringify(list));
  } catch (err) {
    console.error('Storage error:', err);
  }
}

function renderDynamicProposals() {
  const container = document.getElementById('dynamicOutgoingList');
  if (!container) return;

  try {
    const list = JSON.parse(localStorage.getItem('skillswap_proposals') || '[]');
    if (list.length === 0) return;

    container.innerHTML = '';
    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'request-card';
      card.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div class="d-flex align-items-center gap-3">
            <div class="category-icon-box bg-primary-subtle text-primary mb-0" style="width: 48px; height: 48px; font-size: 1.25rem;">
              <i class="bi bi-arrow-left-right"></i>
            </div>
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <h6 class="mb-0 fw-bold">${item.targetStudent}</h6>
                <span class="badge badge-status-pending">${item.status}</span>
                <span class="badge bg-light text-muted border small">New Proposal</span>
              </div>
              <p class="text-muted small mb-0">
                You offer: <span class="fw-semibold text-primary">${item.myOffer}</span> • 
                To learn: <span class="fw-semibold text-success">${item.learningSkill}</span>
              </p>
              <p class="text-muted small fst-italic mb-0 mt-1">"${item.message}"</p>
            </div>
          </div>
          <div class="text-md-end">
            <span class="text-muted small d-block mb-1">Date: ${item.date}</span>
            <button class="btn btn-sm btn-outline-danger" onclick="cancelProposal(${index})">
              <i class="bi bi-trash3"></i> Withdraw
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

window.cancelProposal = function(index) {
  try {
    const list = JSON.parse(localStorage.getItem('skillswap_proposals') || '[]');
    list.splice(index, 1);
    localStorage.setItem('skillswap_proposals', JSON.stringify(list));
    renderDynamicProposals();
    showCustomToast('Proposal Withdrawn', 'Your swap request was cancelled.');
  } catch (err) {
    console.error(err);
  }
};

function saveSkillToStorage(skill) {
  try {
    const skills = JSON.parse(localStorage.getItem('skillswap_custom_skills') || '[]');
    skills.unshift(skill);
    localStorage.setItem('skillswap_custom_skills', JSON.stringify(skills));
  } catch (err) {
    console.error(err);
  }
}

function renderDynamicUserSkills() {
  const container = document.getElementById('userSkillsContainer');
  if (!container) return;

  try {
    const skills = JSON.parse(localStorage.getItem('skillswap_custom_skills') || '[]');
    skills.forEach(skill => appendSkillCard(skill, true));
  } catch (err) {
    console.error(err);
  }
}

function appendSkillCard(skill, isInitial = false) {
  const container = document.getElementById('userSkillsContainer');
  if (!container) return;

  const col = document.createElement('div');
  col.className = 'col-md-6';
  col.innerHTML = `
    <div class="p-3 border border-primary-subtle rounded-3 bg-white h-100 shadow-sm position-relative">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <div class="d-flex align-items-center gap-2">
          <div class="category-icon-box bg-primary-subtle text-primary mb-0" style="width: 40px; height: 40px; font-size: 1.1rem;">
            <i class="bi bi-star-fill text-warning"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-0">${skill.name}</h6>
            <span class="badge ${skill.type === 'Teaching' ? 'bg-primary-subtle text-primary' : 'bg-warning-subtle text-warning'} border">${skill.type}</span>
          </div>
        </div>
        <span class="badge bg-success-subtle text-success">${skill.level}</span>
      </div>
      <p class="small text-muted mb-2">Newly listed skill ready for student peer exchanges.</p>
      <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
        <span>0 swaps (Active)</span>
        <button class="btn btn-sm btn-link text-danger p-0" onclick="this.closest('.col-md-6').remove(); showCustomToast('Skill Removed', 'Unlisted from profile.');">Remove</button>
      </div>
    </div>
  `;

  if (isInitial) {
    container.appendChild(col);
  } else {
    container.prepend(col);
  }
}

/* ==========================================================================
   7. Authentication Form Helpers (Demo Fill & Interactive Sign-in)
   ========================================================================== */
function initAuthHelpers() {
  // Demo Login Quick Fill
  const btnDemoLogin = document.getElementById('btnDemoLogin');
  if (btnDemoLogin) {
    btnDemoLogin.addEventListener('click', () => {
      const email = document.getElementById('loginEmail');
      const pass = document.getElementById('loginPassword');
      if (email) email.value = 'alex.chen@university.edu';
      if (pass) pass.value = 'Student@2026';
      showCustomToast('🔑 Credentials Auto-Filled', 'Click "Log In to SkillSwap" to test dashboard access.');
    });
  }

  // Demo Register Quick Fill
  const btnDemoRegister = document.getElementById('btnDemoRegister');
  if (btnDemoRegister) {
    btnDemoRegister.addEventListener('click', () => {
      const name = document.getElementById('regFullName');
      const email = document.getElementById('regEmail');
      const college = document.getElementById('regCollege');
      const major = document.getElementById('regMajor');
      const teach = document.getElementById('regTeach');
      const learn = document.getElementById('regLearn');
      const pass = document.getElementById('regPassword');
      const confirmPass = document.getElementById('regConfirmPassword');

      if (name) name.value = 'Alex Chen';
      if (email) email.value = 'alex.chen@university.edu';
      if (college) college.value = 'State Institute of Engineering & Technology';
      if (major) major.value = 'Computer Science • 5th Sem';
      if (teach) teach.value = 'HTML5, CSS3 & Bootstrap 5';
      if (learn) learn.value = 'Python for Machine Learning';
      if (pass) pass.value = 'Student@2026';
      if (confirmPass) confirmPass.value = 'Student@2026';

      showCustomToast('📝 Sample Data Filled', 'Click "Complete Registration" to create the profile.');
    });
  }

  // Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value || 'alex.chen@university.edu';
      const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());

      localStorage.setItem('skillswap_user', JSON.stringify({
        email,
        name: name || 'Alex Chen',
        role: 'Verified Student'
      }));

      showCustomToast('🎉 Logged in Successfully!', 'Welcome back. Redirecting to your student dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }

  // Register Form Submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regFullName')?.value || 'Alex Chen';
      const email = document.getElementById('regEmail')?.value || 'student@university.edu';
      const pass = document.getElementById('regPassword')?.value;
      const confirmPass = document.getElementById('regConfirmPassword')?.value;

      if (pass && confirmPass && pass !== confirmPass) {
        showCustomToast('Password Mismatch', 'Passwords do not match. Please verify and try again.');
        return;
      }

      localStorage.setItem('skillswap_user', JSON.stringify({
        email,
        name,
        role: 'Verified Student'
      }));

      showCustomToast('🎓 Welcome to SkillSwap!', 'Your student profile is active. Redirecting to dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
}

/* ==========================================================================
   8. Global Reusable Bootstrap Toast Notification
   ========================================================================== */
function showCustomToast(title, message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }

  const toastId = 'toast-' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast custom-toast border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header bg-dark text-white border-0 py-2">
        <i class="bi bi-mortarboard-fill text-warning me-2"></i>
        <strong class="me-auto text-white">${title}</strong>
        <small class="text-white-50">Just now</small>
        <button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body bg-white text-dark py-3">
        ${message}
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  if (toastEl) {
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4500 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }
}
