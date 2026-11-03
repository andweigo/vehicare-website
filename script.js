/**
 * VEHICARE — Multi-Vehicle Diagnostics, Maintenance & Garage Intelligence
 * Production Vanilla JavaScript (ES6+)
 *
 * Modules:
 * 1. Global Application Configuration (Centralized APK Release URL)
 * 2. Theme Controller (Dark Obsidian & Light Architectural Daylight)
 * 3. Mobile-First Navigation Drawer & Focus Management
 * 4. IntersectionObserver Active Navigation Highlighting (ScrollSpy)
 * 5. Scroll Reveal System (Apple-inspired subtle fade-and-rise)
 * 6. Accessible App Walkthrough (WAI-ARIA Tablist, 300ms Crossfade) & Lightbox
 * 7. Gemini AI Diagnostics Configuration Modal
 * 8. APK Download Modal Controller
 * 9. Accessible Contact Form with Inline Field Validation & FormSubmit Dispatch
 * 10. Utilities (Back-to-Top & Copyright Year)
 */

'use strict';

/* ==========================================================================
   1. Centralized Application Configuration
   ========================================================================== */
const APP_CONFIG = {
  apkDownloadUrl: "https://github.com/andweigo/VehiCare/releases/latest/download/app-release.apk",
  githubReleasesUrl: "https://github.com/andweigo/VehiCare/releases/latest",
  githubRepoUrl: "https://github.com/andweigo/VehiCare",
  appVersion: "v1.0.0",
  releaseStatus: "Official Release v1.0.0 (Verified APK)",
  targetPlatform: "Android 8.0 (Oreo) or higher",
  apkSize: "136.3 MB",
  defaultGeminiApiKey: ""
};

/* ==========================================================================
   2. DOM Ready Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileDrawer();
  initScrollSpy();
  initScrollReveal();
  initExperienceWalkthrough();
  initGeminiConfigModal();
  initDownloadHandlers();
  initPricingSelection();
  initContactForm();
  initUtilities();
});

/* ==========================================================================
   3. Theme Controller (Dark & Light Mode)
   ========================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const metaTheme = document.getElementById('metaThemeColor');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#FFFFFF' : '#0A0A0A');
    }
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      );
    }
    try {
      localStorage.setItem('vehicare_theme', theme);
    } catch (e) {
      // Ignore storage errors in private browsing
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
}

/* ==========================================================================
   4. Mobile-First Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('navBackdrop');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuBtn || !drawer || !backdrop) return;

  function setDrawerState(open) {
    if (open) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('drawer-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      if (closeBtn) closeBtn.focus();
    } else {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('drawer-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    setDrawerState(!isOpen);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => setDrawerState(false));
  }

  backdrop.addEventListener('click', () => setDrawerState(false));

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => setDrawerState(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      setDrawerState(false);
      menuBtn.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && drawer.classList.contains('active')) {
      setDrawerState(false);
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Scroll Spy (Active Navigation Highlighting)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav a');

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   6. Scroll Reveal System (Apple-Inspired Subtle Rise & Fade)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (reveals.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // Animate once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. Accessible App Walkthrough & Lightbox Zoom (300ms Crossfade)
   ========================================================================== */
function initExperienceWalkthrough() {
  const tabs = Array.from(document.querySelectorAll('.walkthrough-item'));
  const stagePanel = document.getElementById('walkthroughStagePanel');
  const stageImg = document.getElementById('stageImage');
  const stageCaption = document.getElementById('stageCaption');
  const walkthroughFrame = document.getElementById('walkthroughFrame');

  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  const screens = {
    "01": {
      src: "assets/screenshots/mockup-maintenance.png",
      label: "Screen 01 • Maintenance & Health Score",
      caption: "Maintenance Center on a 2021 Trek Marlin 7: 94% optimal health, 4 items due soon, and direct inspection guides."
    },
    "02": {
      src: "assets/screenshots/mockup-ai-consultation.png",
      label: "Screen 02 • Contextual AI Consultation",
      caption: "VehiCare AI Chat Assistant: Conversational mechanical intake and symptom analysis tailored specifically to Trek Marlin 7."
    },
    "03": {
      src: "assets/screenshots/mockup-home.png",
      label: "Screen 03 • Home Command Dashboard",
      caption: "Home Command Dashboard: Real-time 94% diagnostic condition gauge, active Trek Marlin 7 profile, and instant diagnosis entry."
    },
    "04": {
      src: "assets/screenshots/mockup-profile.png",
      label: "Screen 04 • My Garage & Profile (4/5 Vehicles)",
      caption: "User Profile & Garage Hub: Active Premium Plan with 5-vehicle capacity, account security, and dark mode interface settings."
    },
    "05": {
      src: "assets/screenshots/mockup-notifications.png",
      label: "Screen 05 • Diagnostic Alerts & Notifications",
      caption: "Activity & Notification Center: Prioritized high-severity diagnostic alerts, inspection reminders, and category filtering."
    }
  };

  let activeKey = "01";
  let lastTriggerEl = null;

  function activateScreenTab(targetTab, focusTab = false) {
    if (!targetTab || !stageImg) return;
    const key = targetTab.getAttribute('data-screen');
    const data = screens[key];
    if (!data) return;

    tabs.forEach(tab => {
      const isSelected = tab === targetTab;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    activeKey = key;

    // Smooth Crossfade: 140ms fade out, swap src, fade back in
    stageImg.style.opacity = '0';
    setTimeout(() => {
      stageImg.src = data.src;
      stageImg.alt = data.caption;
      if (stageCaption) stageCaption.textContent = data.caption;
      stageImg.style.opacity = '1';
    }, 140);

    if (stagePanel && targetTab.id) {
      stagePanel.setAttribute('aria-labelledby', targetTab.id);
    }
    if (focusTab) {
      targetTab.focus();
    }
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateScreenTab(tab, false));

    tab.addEventListener('keydown', (e) => {
      let nextIdx = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextIdx = (idx + 1) % tabs.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        nextIdx = (idx - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabs.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        activateScreenTab(tabs[nextIdx], true);
      }
    });
  });

  function openLightbox(src, caption, triggerEl) {
    if (!lightbox || !lightboxImg) return;
    lastTriggerEl = triggerEl || document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  }

  function bindZoomableFrame(el, getPayload) {
    if (!el) return;
    el.addEventListener('click', () => {
      const payload = getPayload();
      if (payload) openLightbox(payload.src, payload.caption, el);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const payload = getPayload();
        if (payload) openLightbox(payload.src, payload.caption, el);
      }
    });
  }

  bindZoomableFrame(walkthroughFrame, () => screens[activeKey]);
  bindZoomableFrame(document.getElementById('heroMockupFrame'), () => ({
    src: 'assets/screenshots/mockup-trio-showcase.png',
    caption: 'VehiCare 3-Device Perspective Showcase: AI Consultation on Trek Marlin 7, History Log, and Multi-Vehicle Garage'
  }));
  bindZoomableFrame(document.getElementById('ecosystemFrame'), () => ({
    src: 'assets/screenshots/mockup-duo-hero.png',
    caption: 'VehiCare Dual-Screen System: Home Diagnostic Condition (94% Health) & Model-Specific AI Consultation'
  }));

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   8. Gemini AI Diagnostics Configuration Modal
   ========================================================================== */
function initGeminiConfigModal() {
  const modal = document.getElementById('geminiConfigModal');
  const openBtn = document.getElementById('geminiConfigOpenBtn');
  const closeBtn = document.getElementById('geminiConfigClose');
  const saveBtn = document.getElementById('geminiConfigSaveBtn');
  const testBtn = document.getElementById('geminiConfigTestBtn');
  const keyInput = document.getElementById('geminiApiKeyInput');
  const statusText = document.getElementById('geminiStatusText');

  if (!modal) return;

  function updateStatusDisplay() {
    let savedKey = '';
    try {
      savedKey = localStorage.getItem('vehicare_gemini_api_key') || '';
    } catch (e) {}

    if (keyInput) {
      keyInput.value = savedKey;
    }

    if (statusText) {
      if (savedKey) {
        const masked = savedKey.slice(0, 6) + '...' + savedKey.slice(-4);
        statusText.textContent = `Custom key active (${masked})`;
      } else {
        statusText.textContent = 'Default engine ready (Gemini 2.5 Flash)';
      }
    }
  }

  function openModal() {
    updateStatusDisplay();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    if (keyInput) keyInput.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    if (openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const val = keyInput ? keyInput.value.trim() : '';
      try {
        if (val) {
          localStorage.setItem('vehicare_gemini_api_key', val);
          if (statusText) statusText.textContent = 'Custom key saved successfully!';
        } else {
          localStorage.removeItem('vehicare_gemini_api_key');
          if (statusText) statusText.textContent = 'Key cleared (Using default engine)';
        }
      } catch (e) {
        if (statusText) statusText.textContent = 'Storage unavailable in private mode';
      }
      setTimeout(updateStatusDisplay, 1500);
    });
  }

  if (testBtn) {
    testBtn.addEventListener('click', () => {
      const val = keyInput ? keyInput.value.trim() : '';
      if (!val) {
        if (statusText) statusText.textContent = 'Enter an API key first before testing.';
        return;
      }
      if (val.length < 20 || !val.startsWith('AIzaSy')) {
        if (statusText) statusText.textContent = 'Key format appears unusual (expected AIzaSy...)';
      } else {
        if (statusText) statusText.textContent = 'Valid Gemini API key syntax confirmed.';
      }
    });
  }

  updateStatusDisplay();
}

/* ==========================================================================
   9. APK Download Modal Controller
   ========================================================================== */
function initDownloadHandlers() {
  const downloadTriggers = document.querySelectorAll('.js-download-trigger');
  const modal = document.getElementById('downloadModal');
  const closeBtn = document.getElementById('downloadClose');
  const dismissBtn = document.getElementById('downloadDismissBtn');
  const directApkBtn = document.getElementById('directApkBtn');

  let lastTrigger = null;

  if (directApkBtn && APP_CONFIG.apkDownloadUrl) {
    directApkBtn.href = APP_CONFIG.apkDownloadUrl;
  }

  function openModal(trigger) {
    if (!modal) return;
    lastTrigger = trigger || document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    if (directApkBtn) directApkBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  }

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. Accessible Contact Form (Inline Validation + FormSubmit Dispatch)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const banner = document.getElementById('contactFeedbackBanner');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('contactName'),
      error: document.getElementById('contactNameError'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'
    },
    email: {
      input: document.getElementById('contactEmail'),
      error: document.getElementById('contactEmailError'),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid email address (e.g., alex@example.com).'
    },
    vehicle: {
      input: document.getElementById('contactVehicle'),
      error: document.getElementById('contactVehicleError'),
      validate: (val) => val !== '' ? '' : 'Please select your primary vehicle category.'
    },
    msg: {
      input: document.getElementById('contactMsg'),
      error: document.getElementById('contactMsgError'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please include a message of at least 10 characters.'
    }
  };

  Object.values(fields).forEach(({ input, error, validate }) => {
    if (!input) return;
    const clearFieldError = () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        const msg = validate(input.value);
        if (!msg) {
          input.removeAttribute('aria-invalid');
          if (error) error.textContent = '';
        }
      }
    };
    input.addEventListener('input', clearFieldError);
    input.addEventListener('change', clearFieldError);
  });

  function showBanner(html, type) {
    if (!banner) return;
    banner.innerHTML = html;
    banner.className = `form-banner ${type}`;
    banner.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (banner) banner.hidden = true;

    let firstInvalidInput = null;

    Object.values(fields).forEach(({ input, error, validate }) => {
      if (!input) return;
      const errMsg = validate(input.value);
      if (errMsg) {
        input.setAttribute('aria-invalid', 'true');
        if (error) error.textContent = errMsg;
        if (!firstInvalidInput) firstInvalidInput = input;
      } else {
        input.removeAttribute('aria-invalid');
        if (error) error.textContent = '';
      }
    });

    if (firstInvalidInput) {
      firstInvalidInput.focus();
      return;
    }

    const nameVal = fields.name.input.value.trim();
    const emailVal = fields.email.input.value.trim();
    const vehicleSelect = fields.vehicle.input;
    const vehicleText = vehicleSelect.options[vehicleSelect.selectedIndex].text;
    const msgVal = fields.msg.input.value.trim();

    const prevBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message &rarr;';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
    }

    try {
      const payload = {
        name: nameVal,
        email: emailVal,
        vehicle_category: vehicleText,
        message: msgVal,
        _subject: `VehiCare Inquiry from ${nameVal} [${vehicleText}]`,
        _template: "table",
        _captcha: "false"
      };

      const response = await fetch("https://formsubmit.co/ajax/vehicare0@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showBanner(
          '<strong>Message sent to VehiCare.</strong> Thank you for reaching out—we have routed your note to <code>vehicare0@gmail.com</code> and will reply to your email shortly.',
          'success'
        );
        form.reset();
      } else {
        throw new Error('FormSubmit status ' + response.status);
      }
    } catch (err) {
      console.warn('FormSubmit network fallback:', err);
      const mailtoUrl = `mailto:vehicare0@gmail.com?subject=${encodeURIComponent('VehiCare Inquiry from ' + nameVal)}&body=${encodeURIComponent(msgVal + '\n\nSender: ' + nameVal + ' (' + emailVal + ')\nVehicle: ' + vehicleText)}`;
      window.location.href = mailtoUrl;
      showBanner(
        '<strong>Email client opened:</strong> If your mail app did not launch automatically, please email us directly at <a href="mailto:vehicare0@gmail.com"><strong>vehicare0@gmail.com</strong></a>.',
        'success'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevBtnText;
      }
    }
  });
}

/* ==========================================================================
   11. Interactive Pricing Card Selection
   ========================================================================== */
function initPricingSelection() {
  const cards = document.querySelectorAll('.pricing-plan-card');
  const btnFree = document.getElementById('pricingBtnFree');
  const btnPremium = document.getElementById('pricingBtnPremium');

  if (cards.length === 0) return;

  function selectPlan(selectedCard) {
    cards.forEach(card => {
      const isTarget = card === selectedCard;
      card.classList.toggle('is-selected', isTarget);
      card.setAttribute('aria-checked', isTarget ? 'true' : 'false');
    });

    const isPremium = selectedCard.getAttribute('data-plan') === 'premium';

    if (btnFree && btnPremium) {
      if (isPremium) {
        btnPremium.classList.remove('btn-secondary');
        btnPremium.classList.add('btn-primary');
        btnFree.classList.remove('btn-primary');
        btnFree.classList.add('btn-secondary');
      } else {
        btnFree.classList.remove('btn-secondary');
        btnFree.classList.add('btn-primary');
        btnPremium.classList.remove('btn-primary');
        btnPremium.classList.add('btn-secondary');
      }
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      selectPlan(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectPlan(card);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = card.nextElementSibling;
        if (next && next.classList.contains('pricing-plan-card')) {
          selectPlan(next);
          next.focus();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = card.previousElementSibling;
        if (prev && prev.classList.contains('pricing-plan-card')) {
          selectPlan(prev);
          prev.focus();
        }
      }
    });
  });
}

/* ==========================================================================
   11. Utilities (Back-to-Top & Copyright Year)
   ========================================================================== */
function initUtilities() {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
