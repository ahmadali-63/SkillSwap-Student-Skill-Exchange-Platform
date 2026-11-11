/**
 * SkillSwap – Main Interactive JavaScript
 * 5th Semester Web Development Project
 * Handles: Live Search/Filter, Swap Proposal System, Dashboard Actions, Mock Storage, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarActiveLink();
  initLiveSkillSearch();
  initCategoryFilters();
  initSwapRequestModal();
  initSwapProposalForm();
  initDashboardActions();
  initAuthFormHelpers();
});

/* ==========================================================================
   1. Active Navbar Link Highlighter
   ========================================================================== */
function initNavbarActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. Live Skill Search & Filtering (explore.html)
   ========================================================================== */
function initLiveSkillSearch() {
  const searchInput = document.getElementById('skillSearchInput');
  const countBadge = document.getElementById('searchCountBadge');
  const emptyState = document.getElementById('noResultsState');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    filterSkillCards(query, getActiveCategory());
  });
}

function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.category-filter-btn');
  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active', 'btn-primary', 'text-white'));
      filterButtons.forEach(b => b.classList.add('btn-outline-secondary'));

      btn.classList.add('active', 'btn-primary', 'text-white');
      btn.classList.remove('btn-outline-secondary');

      const category = btn.getAttribute('data-category');
      const searchInput = document.getElementById('skillSearchInput');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      filterSkillCards(query, category);
    });
  });
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
    const cardCategory = card.getAttribute('data-category') || '';
    const textContent = card.innerText.toLowerCase();

    const matchesQuery = query === '' || textContent.includes(query);
    const matchesCategory = category === 'all' || cardCategory.toLowerCase() === category.toLowerCase();

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

/* ==========================================================================
   3. Quick Swap Request Modal (Prefill data)
   ========================================================================== */
function initSwapRequestModal() {
  const modalElement = document.getElementById('quickSwapModal');
  if (!modalElement) return;

  modalElement.addEventListener('show.bs.modal', (event) => {
    const triggerBtn = event.relatedTarget;
    if (!triggerBtn) return;

    const studentName = triggerBtn.getAttribute('data-student-name') || 'Student';
    const studentTeach = triggerBtn.getAttribute('data-student-teach') || 'Their Skill';
    const studentLearn = triggerBtn.getAttribute('data-student-learn') || 'Your Skill';

    const targetNameInput = document.getElementById('modalTargetStudent');
    const targetTeachInput = document.getElementById('modalTargetTeach');
    const targetLearnSelect = document.getElementById('modalMyOfferSelect');

    if (targetNameInput) targetNameInput.value = studentName;
    if (targetTeachInput) targetTeachInput.value = studentTeach;
    if (targetLearnSelect && studentLearn) {
      // Set default offer hint
      const promptOption = targetLearnSelect.querySelector('option[data-hint]');
      if (promptOption) promptOption.textContent = `Recommended: Teach them ${studentLearn}`;
    }
  });

  const modalForm = document.getElementById('quickSwapForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetStudent = document.getElementById('modalTargetStudent')?.value || 'Student';
      const myOffer = document.getElementById('modalMyOfferSelect')?.value || 'General Skill';
      const learningSkill = document.getElementById('modalTargetTeach')?.value || 'Target Skill';
      const message = document.getElementById('modalMessage')?.value || 'Let us swap skills!';

      // Save to mock storage
      saveMockProposal({
        targetStudent,
        myOffer,
        learningSkill,
        message,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending'
      });

      // Hide modal
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      if (bsModal) bsModal.hide();

      showCustomToast(`🎉 Swap Proposal Sent!`, `Your request has been delivered to ${targetStudent}. You can track it in your Dashboard.`);
      modalForm.reset();
    });
  }
}

/* ==========================================================================
   4. Dedicated Swap Proposal Form (swap-request.html)
   ========================================================================== */
function initSwapProposalForm() {
  const proposalForm = document.getElementById('detailedSwapForm');
  if (!proposalForm) return;

  // Check URL params for student prefill (e.g., ?student=Aarav%20Sharma&skill=Python)
  const urlParams = new URLSearchParams(window.location.search);
  const paramStudent = urlParams.get('student');
  const paramSkill = urlParams.get('skill');

  if (paramStudent) {
    const partnerSelect = document.getElementById('proposalPartner');
    if (partnerSelect) {
      // Find matching option or set value
      let optionExists = false;
      for (let option of partnerSelect.options) {
        if (option.text.toLowerCase().includes(paramStudent.toLowerCase())) {
          partnerSelect.value = option.value;
          optionExists = true;
          break;
        }
      }
      if (!optionExists) {
        const newOption = new Option(`${paramStudent} (Selected Peer)`, paramStudent, true, true);
        partnerSelect.add(newOption);
      }
    }
  }

  if (paramSkill) {
    const wantLearnInput = document.getElementById('proposalSkillToLearn');
    if (wantLearnInput) wantLearnInput.value = paramSkill;
  }

  proposalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const partner = document.getElementById('proposalPartner')?.value || 'Peer Student';
    const skillToTeach = document.getElementById('proposalSkillToTeach')?.value || 'Web Dev';
    const skillToLearn = document.getElementById('proposalSkillToLearn')?.value || 'Data Science';
    const notes = document.getElementById('proposalNotes')?.value || 'Excited to collaborate!';

    saveMockProposal({
      targetStudent: partner,
      myOffer: skillToTeach,
      learningSkill: skillToLearn,
      message: notes,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending'
    });

    showCustomToast('🚀 Proposal Dispatched!', `Swap offer sent to ${partner}. Redirecting to your dashboard...`);
    
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
}

/* ==========================================================================
   5. Dashboard Interactivity (Accept / Decline / Add Skills)
   ========================================================================== */
function initDashboardActions() {
  // Render dynamically saved proposals from mock storage
  renderDynamicProposals();

  // Handle Accept / Decline on static incoming requests
  document.querySelectorAll('.btn-accept-request').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.request-card');
      const studentName = card.querySelector('.request-student-name')?.textContent || 'Peer';
      
      const badge = card.querySelector('.badge');
      if (badge) {
        badge.className = 'badge badge-status-completed';
        badge.textContent = 'Accepted';
      }

      this.disabled = true;
      this.textContent = 'Accepted';
      const declineBtn = card.querySelector('.btn-decline-request');
      if (declineBtn) declineBtn.remove();

      showCustomToast('✅ Swap Accepted!', `You and ${studentName} are now connected. Check your email for session details.`);
    });
  });

  document.querySelectorAll('.btn-decline-request').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.request-card');
      card.style.opacity = '0.5';
      card.style.pointerEvents = 'none';
      setTimeout(() => {
        card.remove();
        updateIncomingBadgeCount();
      }, 400);

      showCustomToast('Declined', 'Swap request was politely declined.');
    });
  });

  // Handle Add Skill Form
  const addSkillForm = document.getElementById('addSkillForm');
  if (addSkillForm) {
    addSkillForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const skillName = document.getElementById('newSkillName')?.value;
      const skillLevel = document.getElementById('newSkillLevel')?.value;

      if (skillName) {
        showCustomToast('🌟 Skill Listed!', `Added "${skillName} (${skillLevel})" to your profile.`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('addSkillModal'));
        if (modal) modal.hide();
        addSkillForm.reset();
      }
    });
  }
}

function updateIncomingBadgeCount() {
  const badge = document.getElementById('incomingCountBadge');
  const remaining = document.querySelectorAll('#incoming-tab-pane .request-card').length;
  if (badge) badge.textContent = `${remaining} New`;
}

function saveMockProposal(proposal) {
  try {
    const existing = JSON.parse(localStorage.getItem('skillswap_proposals') || '[]');
    existing.unshift(proposal);
    localStorage.setItem('skillswap_proposals', JSON.stringify(existing));
  } catch (err) {
    console.warn('Storage error: ', err);
  }
}

function renderDynamicProposals() {
  const outgoingContainer = document.getElementById('dynamicOutgoingList');
  if (!outgoingContainer) return;

  try {
    const saved = JSON.parse(localStorage.getItem('skillswap_proposals') || '[]');
    if (saved.length === 0) return;

    saved.forEach(item => {
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
              </div>
              <p class="text-muted small mb-0">
                You offer: <span class="fw-semibold text-primary">${item.myOffer}</span> • 
                To learn: <span class="fw-semibold text-success">${item.learningSkill}</span>
              </p>
              <p class="text-muted small fst-italic mb-0 mt-1">"${item.message}"</p>
            </div>
          </div>
          <div class="text-md-end">
            <span class="text-muted small d-block mb-1">Sent on ${item.date}</span>
            <button class="btn btn-sm btn-outline-secondary" onclick="this.closest('.request-card').remove(); showCustomToast('Cancelled', 'Proposal was cancelled.');">Cancel Request</button>
          </div>
        </div>
      `;
      outgoingContainer.prepend(card);
    });
  } catch (e) {
    console.error(e);
  }
}

/* ==========================================================================
   6. Authentication Form Helpers (Demo Login & Fast Test)
   ========================================================================== */
function initAuthFormHelpers() {
  const demoLoginBtn = document.getElementById('btnDemoLogin');
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('loginEmail');
      const passInput = document.getElementById('loginPassword');
      if (emailInput && passInput) {
        emailInput.value = 'alex.chen@university.edu';
        passInput.value = 'Student@2026';
        showCustomToast('🔑 Demo Credentials Filled', 'Click "Log In to SkillSwap" to access your dashboard.');
      }
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showCustomToast('🎉 Logged in successfully', 'Redirecting to your student dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showCustomToast('🎓 Account Created!', 'Welcome to SkillSwap! Redirecting to your dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }
}

/* ==========================================================================
   7. Reusable Bootstrap Toast Notification
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
        <i class="bi bi-info-circle-fill text-primary me-2"></i>
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
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }
}

