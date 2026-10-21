/**
 * VEHICARE — Automotive Intelligence Platform
 * Production Vanilla JavaScript (ES6+)
 * 
 * Architecture:
 * 1. Global Application Configuration (Centralized APK Release URL)
 * 2. Mobile-First Navigation Drawer & Accessible Backdrop
 * 3. IntersectionObserver Active Navigation Highlighting
 * 4. Product Experience Walkthrough & Lightbox Zoom
 * 5. Automotive Diagnostic Demonstration Controller
 * 6. APK Download Handlers & Release Modal
 * 7. Contact Form Client-Side Validation
 * 8. Utilities (Back-to-Top & Copyright Year)
 */

'use strict';

/* ==========================================================================
   1. Centralized Application Configuration
   ========================================================================== */
const APP_CONFIG = {
  /**
   * Public APK download and repository release endpoints.
   */
  apkDownloadUrl: "https://github.com/andweigo/vehicare-website/releases/download/v1.0.0/vehicare-release.apk",
  githubReleasesUrl: "https://github.com/andweigo/vehicare-website/releases",
  githubRepoUrl: "https://github.com/andweigo/vehicare-website",
  appVersion: "v1.0.0-beta",
  releaseStatus: "Release v1.0.0 Ready",
  targetPlatform: "Android 8.0 (Oreo) or higher"
};

/* ==========================================================================
   2. DOM Ready Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initScrollSpy();
  initExperienceWalkthrough();
  initDiagnosticDemo();
  initDownloadHandlers();
  initContactForm();
  initUtilities();
});

/* ==========================================================================
   3. Mobile-First Navigation Drawer
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

  // Toggle button on header
  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('active');
    setDrawerState(!isOpen);
  });

  // Close button inside drawer
  if (closeBtn) {
    closeBtn.addEventListener('click', () => setDrawerState(false));
  }

  // Tap backdrop to close
  backdrop.addEventListener('click', () => setDrawerState(false));

  // Tap any link to close and navigate
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => setDrawerState(false));
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      setDrawerState(false);
      menuBtn.focus();
    }
  });

  // Automatically close drawer if window expands beyond mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1025 && drawer.classList.contains('active')) {
      setDrawerState(false);
    }
  }, { passive: true });
}

/* ==========================================================================
   4. Scroll Spy (Active Navigation Highlighting)
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
   5. Product Experience Walkthrough & Lightbox
   ========================================================================== */
function initExperienceWalkthrough() {
  const items = document.querySelectorAll('.walkthrough-item');
  const stageImg = document.getElementById('stageImage');
  const stageLabel = document.getElementById('stageLabel');
  const stageCaption = document.getElementById('stageCaption');
  const frame = document.getElementById('walkthroughFrame');

  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!items.length || !stageImg) return;

  const screens = {
    "01": {
      src: "assets/screenshots/mockup-maintenance.png",
      label: "MODULE 01 // HEALTH MONITORING",
      caption: "VehiCare Urgent Health Center: 25% health rating on Yamaha Sniper 150, 8 critical alerts, and beginner's maintenance guide"
    },
    "02": {
      src: "assets/screenshots/mockup-ai-consultation.png",
      label: "MODULE 02 // AI CONSULTATION",
      caption: "VehiCare AI Consultation: Real-time Yamaha Sniper 150 oil specifications (10W-40 4T), chain slack (25-35mm), and spark plug checks"
    },
    "03": {
      src: "assets/screenshots/mockup-home.png",
      label: "MODULE 03 // COMMAND DASHBOARD",
      caption: "VehiCare Command Hub: Active Yamaha Sniper 150, one-tap 'Something wrong?' intake, and 4 dedicated vehicle service centers"
    },
    "04": {
      src: "assets/screenshots/mockup-ai-chat.png",
      label: "MODULE 04 // RAPID INTAKE",
      caption: "VehiCare Diagnostic Intake: Guided prompt suggestions, acoustic engine sound analysis, and active vehicle context"
    },
    "05": {
      src: "assets/screenshots/mockup-splash.png",
      label: "MODULE 05 // SYSTEM CORE",
      caption: "VehiCare Multi-Vehicle Architecture: Offline-first native Android APK client designed for automotive, motorcycle, and bicycle diagnostics"
    }
  };

  let activeKey = "01";

  items.forEach(btn => {
    btn.addEventListener('click', () => {
      items.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const key = btn.getAttribute('data-screen');
      const data = screens[key];
      if (!data) return;

      activeKey = key;
      stageImg.src = data.src;
      stageImg.alt = data.caption;
      if (stageLabel) stageLabel.textContent = data.label;
      if (stageCaption) stageCaption.textContent = data.caption;
    });
  });

  // Lightbox Zoom & Multi-Mockup Inspection
  const heroFrame = document.getElementById('heroMockupFrame');
  const ecoFrame = document.getElementById('ecosystemFrame');

  function openLightboxWith(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.classList.add('drawer-open');
  }

  if (frame && lightbox && lightboxImg) {
    frame.addEventListener('click', () => {
      const data = screens[activeKey];
      if (!data) return;
      openLightboxWith(data.src, data.caption);
    });

    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        frame.click();
      }
    });
  }

  if (heroFrame) {
    heroFrame.addEventListener('click', () => {
      openLightboxWith(
        'assets/screenshots/mockup-duo-hero.png',
        'VehiCare 3D Dual-Screen Suite: Daily Command Dashboard and AI Diagnostic Consultation on Yamaha Sniper 150'
      );
    });
    heroFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        heroFrame.click();
      }
    });
  }

  if (ecoFrame) {
    ecoFrame.addEventListener('click', () => {
      openLightboxWith(
        'assets/screenshots/mockup-trio-showcase.png',
        'VehiCare 3-Device Ecosystem: Conversational AI Schedule, Urgent Maintenance Center (25% Health), and My Garage Fleet Switcher'
      );
    });
    ecoFrame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        ecoFrame.click();
      }
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  }

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
   6. Automotive Diagnostic Demonstration Controller
   ========================================================================== */
function initDiagnosticDemo() {
  const form = document.getElementById('demoForm');
  const input = document.getElementById('demoInput');
  const submitBtn = document.getElementById('demoSubmitBtn');
  const screen = document.getElementById('demoScreen');
  const loader = document.getElementById('demoLoader');
  const resetBtn = document.getElementById('demoResetBtn');
  const vehicleModeBtns = document.querySelectorAll('.terminal-mode-btn');
  const presetsBar = document.getElementById('presetsBar');

  const aiKeyBtn = document.getElementById('aiKeyToggleBtn');
  const aiEngineLabel = document.getElementById('aiEngineLabel');
  const terminalStatusDot = document.getElementById('terminalStatusDot');
  const aiKeyModal = document.getElementById('aiKeyModal');
  const aiKeyClose = document.getElementById('aiKeyClose');
  const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
  const saveAiKeyBtn = document.getElementById('saveAiKeyBtn');
  const clearAiKeyBtn = document.getElementById('clearAiKeyBtn');

  let geminiApiKey = localStorage.getItem('vehicare_gemini_key') || '';

  function updateAiEngineUI() {
    if (geminiApiKey && geminiApiKey.trim().length > 5) {
      if (aiEngineLabel) aiEngineLabel.innerHTML = '<span style="color:#86efac; font-weight:700;">Live Gemini AI</span>';
      if (terminalStatusDot) {
        terminalStatusDot.style.background = '#10b981';
        terminalStatusDot.style.boxShadow = '0 0 8px rgba(16,185,129,0.7)';
      }
      if (geminiApiKeyInput) geminiApiKeyInput.value = geminiApiKey;
    } else {
      if (aiEngineLabel) aiEngineLabel.textContent = 'Local Triage';
      if (terminalStatusDot) {
        terminalStatusDot.style.background = '#f5501c';
        terminalStatusDot.style.boxShadow = '0 0 8px rgba(245,80,28,0.5)';
      }
      if (geminiApiKeyInput) geminiApiKeyInput.value = '';
    }
  }
  updateAiEngineUI();

  if (aiKeyBtn && aiKeyModal) {
    aiKeyBtn.addEventListener('click', () => {
      aiKeyModal.classList.add('open');
      document.body.classList.add('drawer-open');
      if (geminiApiKeyInput) geminiApiKeyInput.focus();
    });
  }

  function closeAiKeyModal() {
    if (aiKeyModal) {
      aiKeyModal.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  }

  if (aiKeyClose) aiKeyClose.addEventListener('click', closeAiKeyModal);
  if (aiKeyModal) {
    aiKeyModal.addEventListener('click', (e) => {
      if (e.target === aiKeyModal) closeAiKeyModal();
    });
  }

  if (saveAiKeyBtn && geminiApiKeyInput) {
    saveAiKeyBtn.addEventListener('click', () => {
      const val = geminiApiKeyInput.value.trim();
      if (val && val.length > 8) {
        geminiApiKey = val;
        localStorage.setItem('vehicare_gemini_key', val);
        updateAiEngineUI();
        closeAiKeyModal();
        appendMessage('system', '⚡ Google Gemini Live AI Engine activated! Your queries are now evaluated dynamically by Gemini in real time.');
      } else {
        window.alert('Please paste a valid Google Gemini API key from Google AI Studio.');
      }
    });
  }

  if (clearAiKeyBtn) {
    clearAiKeyBtn.addEventListener('click', () => {
      geminiApiKey = '';
      localStorage.removeItem('vehicare_gemini_key');
      updateAiEngineUI();
      closeAiKeyModal();
      appendMessage('system', 'Switched back to VehiCare built-in local triage engine.');
    });
  }

  if (!form || !input || !submitBtn || !screen) return;

  const vehicleConfigs = {
    motorcycle: {
      name: "Yamaha Sniper 150 (2017)",
      tag: "Motorcycle",
      presets: [
        { label: "Maintenance schedule", query: "Yamaha Sniper 150 maintenance schedule" },
        { label: "Rear brake grinding noise", query: "Rear brake grinding noise when pedal pressed" },
        { label: "Drive chain slack (20-30mm)", query: "How to adjust drive chain slack on Yamaha Sniper" },
        { label: "4T engine oil interval", query: "What engine oil interval for 150cc motorcycle" }
      ]
    },
    car: {
      name: "Honda Civic 1.5 Turbo (2020)",
      tag: "Car / Sedan",
      presets: [
        { label: "Battery dying after 48h idle", query: "What should I check if car battery keeps dying" },
        { label: "Cold start engine ticking", query: "Why is engine ticking on cold start for 30s" },
        { label: "Brake pedal sinking to floor", query: "What does a spongy brake pedal mean" },
        { label: "Check engine light P0420", query: "OBD-II trouble code P0420 catalytic efficiency" }
      ]
    },
    bicycle: {
      name: "Trek Marlin 7 (2021)",
      tag: "Bicycle / MTB",
      presets: [
        { label: "Hydraulic brake lever spongy", query: "What to inspect if bicycle brakes feel weak" },
        { label: "Gears slipping under pedal load", query: "Why are bicycle gears slipping when pedaling hard" },
        { label: "Chain stretch gauge check", query: "How to check bicycle chain elongation" },
        { label: "Rotor oil contamination squeal", query: "How to clean bicycle disc brake rotors" }
      ]
    }
  };

  let activeVehicle = {
    type: "motorcycle",
    ...vehicleConfigs.motorcycle
  };

  function renderPresets() {
    if (!presetsBar) return;
    presetsBar.innerHTML = '';

    const labelSpan = document.createElement('span');
    labelSpan.style.fontFamily = 'var(--font-mono)';
    labelSpan.style.fontSize = '10px';
    labelSpan.style.color = 'var(--text-low)';
    labelSpan.style.textTransform = 'uppercase';
    labelSpan.style.whiteSpace = 'nowrap';
    labelSpan.style.marginRight = '4px';
    labelSpan.textContent = 'Presets:';
    presetsBar.appendChild(labelSpan);

    activeVehicle.presets.forEach(p => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'preset-chip';
      chip.textContent = p.label;
      chip.setAttribute('data-query', p.query);
      chip.addEventListener('click', () => {
        input.value = p.query;
        input.dispatchEvent(new Event('input'));
        executeTriage(p.query);
      });
      presetsBar.appendChild(chip);
    });
  }

  // Render initial presets
  renderPresets();

  // Switch Vehicle Context
  vehicleModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      vehicleModeBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const vType = btn.getAttribute('data-vehicle');
      if (vehicleConfigs[vType]) {
        activeVehicle = {
          type: vType,
          ...vehicleConfigs[vType]
        };
        renderPresets();
        appendMessage('system', `Active diagnostic context shifted to: ${activeVehicle.name} [${activeVehicle.tag}]`);
      }
    });
  });

  input.addEventListener('input', () => {
    submitBtn.disabled = input.value.trim().length === 0;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      executeTriage(query);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      screen.innerHTML = `
        <div class="terminal-msg report">
          <div class="report-top">
            <span class="report-headline">VehiCare Diagnostic Triage Initialized</span>
            <span class="badge badge-ready">System Ready</span>
          </div>
          <p>Active vehicle: <strong>${activeVehicle.name}</strong>.</p>
          <p>Enter any mechanical symptom, noise, or maintenance inquiry below to generate a structured assessment.</p>
          <p style="font-size:11px; color:var(--text-low); margin-top:8px; border-top:1px solid #1c1c1c; padding-top:6px;">
            Note: This console demonstrates client-side triage logic. The VehiCare Android application runs neural multimodal sound and photo inspection.
          </p>
        </div>
      `;
      input.value = '';
      submitBtn.disabled = true;
    });
  }

  async function executeTriage(rawQuery) {
    appendMessage('user', rawQuery);
    input.value = '';
    submitBtn.disabled = true;

    if (loader) {
      const loaderText = loader.querySelector('span:nth-child(2)');
      if (loaderText) {
        loaderText.textContent = geminiApiKey
          ? 'Connecting to Gemini AI neural diagnostic engine...'
          : 'Evaluating mechanical symptom matrix...';
      }
      loader.classList.add('active');
    }
    screen.scrollTop = screen.scrollHeight;

    if (geminiApiKey && geminiApiKey.trim().length > 5) {
      try {
        const liveReport = await queryGeminiAI(rawQuery, activeVehicle, geminiApiKey);
        if (loader) loader.classList.remove('active');
        appendMessage('report', liveReport);
        return;
      } catch (err) {
        console.warn('Gemini Live AI error, falling back to local engine:', err);
        appendMessage('system', `⚠️ Gemini API note: ${err.message}. Seamlessly falling back to local automotive engine.`);
      }
    }

    // Local evaluation fallback
    setTimeout(() => {
      if (loader) loader.classList.remove('active');
      const assessment = evaluateSymptom(rawQuery, activeVehicle);
      appendMessage('report', assessment);
    }, 450);
  }

  async function queryGeminiAI(query, vehicle, apiKey) {
    const systemPrompt = `You are VehiCare AI, an expert multi-vehicle diagnostics and repair intelligence system specialized in passenger cars, motorcycles/scooters, and bicycles.
Analyze the user's vehicle concern for:
Vehicle: ${vehicle.name} (${vehicle.tag})
Symptom/Question: "${query}"

Provide a realistic, professional mechanical triage assessment in JSON format with EXACTLY these keys:
{
  "title": "Short technical diagnostic title (e.g. Valvetrain Triage // Valve Clearance Slack)",
  "severity": "Routine Care" or "Due Soon" or "Needs Immediate Attention",
  "severityClass": "badge-ready" (for Routine Care) or "badge-attention" (for Due Soon) or "badge-urgent" (for Needs Immediate Attention),
  "causes": ["Possible root cause 1 with specific mechanical detail", "Possible root cause 2 with specific mechanical detail", "Possible root cause 3 with specific mechanical detail"],
  "action": "Clear step-by-step immediate inspection recommendation or DIY check",
  "costRef": "Estimated parts + labor price range in USD and Philippine Pesos (e.g. Parts: $20 – $40 (₱1,100 – ₱2,200) • Labor: $15 – $30 (₱850 – ₱1,700))"
}
Output ONLY raw valid JSON without markdown code blocks.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    parsed.title = `⚡ [LIVE GEMINI AI] ${parsed.title || 'Diagnostic Assessment'}`;
    return parsed;
  }

  function evaluateSymptom(query, vehicle) {
    const q = query.toLowerCase();

    // 1. Motorcycle Maintenance
    if (q.includes('maintain') || q.includes('schedule') || q.includes('sniper') || (vehicle.type === 'motorcycle' && (q.includes('oil') || q.includes('interval')))) {
      return {
        title: `Maintenance Schedule // ${vehicle.name}`,
        severity: "Routine Care",
        severityClass: "badge-ready",
        causes: [
          "4T Engine Oil & Filter: Change every 1,000–1,500 km using motorcycle-specific 4T oil (wet clutch shear protection).",
          "Drive Chain Slack: Maintain 20–30mm slack; clean and lubricate every 500 km or post-rain.",
          "Coolant System: Verify reservoir level and inspect radiator fins for road debris.",
          "Brake Pads: Inspect friction lining against backing plate before rotor grooving occurs."
        ],
        action: "Follow the 1,500 km maintenance cycle. Log odometer readings in the mobile app.",
        costRef: "Parts: $15 – $25 &bull; Labor: $10 – $20"
      };
    }

    // 2. Battery Drain
    if (q.includes('battery') || q.includes('dying') || q.includes('drain') || q.includes('alternator')) {
      return {
        title: `Electrical Triage // 12V Battery Discharge`,
        severity: "Due Soon",
        severityClass: "badge-attention",
        causes: [
          "Parasitic Draw: Aftermarket accessory or stuck glovebox switch pulling >50mA when off.",
          "Alternator Failure: Running voltage across posts must read 13.8V – 14.4V. Below 13.2V indicates failing regulator.",
          "Terminal Corrosion: Sulfur crust on posts introduces electrical resistance.",
          "Battery Plate Sulfation: Batteries past 3 years of service cannot sustain cranking amps."
        ],
        action: "Perform a multimeter parasitic draw test. Clean terminal posts and check resting voltage (12.6V = full).",
        costRef: "New Battery: $110 – $180 &bull; Diagnostic Trace: $45 – $80"
      };
    }

    // 3. Bicycle Brakes Spongy
    if (q.includes('bicycle') || q.includes('marlin') || q.includes('weak') || (vehicle.type === 'bicycle' && (q.includes('brake') || q.includes('hydraulic')))) {
      return {
        title: `Braking Triage // Hydraulic Disc System`,
        severity: "Needs Immediate Attention",
        severityClass: "badge-urgent",
        causes: [
          "Air Contamination in Lines: Compressible air bubbles cause lever to pull to the grip.",
          "Rotor Contamination: Chain lube or oversprayed wash wax severely reduces stopping friction.",
          "Pad Glazing: Overheated organic brake pads developing a vitrified glassy surface."
        ],
        action: "Perform a hydraulic fluid syringe bleed with mineral oil. Clean rotor with 90%+ isopropyl alcohol.",
        costRef: "Mineral Oil Bleed: $20 – $40 &bull; Pad Set: $25 – $40"
      };
    }

    // 4. Cold Start Ticking
    if (q.includes('ticking') || q.includes('cold start') || q.includes('tick')) {
      return {
        title: `Acoustic Triage // Cold Start Valvetrain Ticking`,
        severity: "Needs Attention",
        severityClass: "badge-attention",
        causes: [
          "Hydraulic Lifter Bleed-Down: Lifters bleeding down oil pressure overnight; tick clears within 30–60s.",
          "Improper Cold Oil Viscosity: Heavy winter grade slowing cold oil delivery to top cylinder head.",
          "Exhaust Manifold Hairline Crack: Crack closes as engine thermal expansion seals gap."
        ],
        action: "Check oil dipstick level immediately. If ticking exceeds 2 minutes, record an audio clip in the VehiCare app.",
        costRef: "Oil Change: $40 – $70 &bull; Lifter Service: $250 – $600"
      };
    }

    // 5. Spongy Sinking Brake Pedal
    if (q.includes('sinking') || q.includes('spongy brake') || q.includes('pedal')) {
      return {
        title: `Safety Critical // Brake Pedal Travel Failure`,
        severity: "Needs Immediate Attention",
        severityClass: "badge-urgent",
        causes: [
          "Master Cylinder Internal Seal Bypass: Hydraulic fluid bypassing piston cups without external leak.",
          "Hydraulic Line Leak: Corroded hardline or cracked rubber flex hose under pedal pressure.",
          "Moisture Vaporization: Boiled fluid vaporizing into gas pockets under heavy braking."
        ],
        action: "CRITICAL SAFETY RISK: HALT VEHICLE OPERATION. Transport to a certified repair facility.",
        costRef: "Master Cylinder Replacement & Flush: $190 – $380"
      };
    }

    // Default Triage
    return {
      title: `General Triage // Symptom Evaluation`,
      severity: "Preliminary Assessment",
      severityClass: "badge-attention",
      causes: [
        `Reported symptom on ${vehicle.name}: "${escapeHtml(query)}"`,
        "Physical Inspection: Inspect engine bay and undercarriage for fluid weeping (coolant, oil, brake fluid).",
        "Operational Correlation: Document whether symptoms correlate with acceleration, cold idle, or braking."
      ],
      action: "Log this symptom in your VehiCare mobile garage. The mobile app provides acoustic waveform recording and verified repair shop discovery.",
      costRef: "Standard Diagnostic Inspection: $40 – $80"
    };
  }

  function appendMessage(type, payload) {
    const msg = document.createElement('div');
    msg.className = `terminal-msg ${type}`;

    if (type === 'user') {
      msg.textContent = payload;
    } else if (type === 'system') {
      msg.className = 'terminal-msg report';
      msg.style.borderLeftColor = '#555';
      msg.innerHTML = `<span style="font-family:var(--font-mono);font-size:11px;color:#888;">// ${escapeHtml(payload)}</span>`;
    } else if (type === 'report') {
      let causesHtml = '';
      payload.causes.forEach(c => {
        causesHtml += `<li>${escapeHtml(c)}</li>`;
      });

      msg.innerHTML = `
        <div class="report-top">
          <span class="report-headline">${escapeHtml(payload.title)}</span>
          <span class="badge ${payload.severityClass}">${escapeHtml(payload.severity)}</span>
        </div>
        <p><strong>Probable Causes:</strong></p>
        <ul>${causesHtml}</ul>
        <p><strong>Recommended Action:</strong> ${escapeHtml(payload.action)}</p>
        <p style="margin-top:6px;"><strong>Cost Reference:</strong> <span style="color:#fff;">${escapeHtml(payload.costRef)}</span></p>
      `;
    }

    screen.appendChild(msg);
    screen.scrollTop = screen.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

/* ==========================================================================
   7. APK Download Handlers & Release Modal
   ========================================================================== */
function initDownloadHandlers() {
  const downloadTriggers = document.querySelectorAll('.js-download-trigger');
  const modal = document.getElementById('downloadModal');
  const closeBtn = document.getElementById('downloadClose');
  const directApkBtn = document.getElementById('directApkBtn');

  if (directApkBtn && APP_CONFIG.apkDownloadUrl) {
    directApkBtn.href = APP_CONFIG.apkDownloadUrl;
  }

  downloadTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('open');
        document.body.classList.add('drawer-open');
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
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
   8. Contact Form Live Gmail Dispatch (FormSubmit Integration)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alert = document.getElementById('contactSuccess');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const vehicle = document.getElementById('contactVehicle');
    const msg = document.getElementById('contactMsg');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!name || name.value.trim().length < 2) valid = false;
    if (!email || !emailRegex.test(email.value.trim())) valid = false;
    if (!vehicle || vehicle.value === '') valid = false;
    if (!msg || msg.value.trim().length < 10) valid = false;

    if (!valid) {
      window.alert('Please fill out all required fields with a valid email address and a message of at least 10 characters.');
      return;
    }

    const prevBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending to Andrei via Gmail...';
    }

    try {
      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        vehicle_category: vehicle.options[vehicle.selectedIndex].text,
        message: msg.value.trim(),
        _subject: `New VehiCare Inquiry from ${name.value.trim()} [${vehicle.options[vehicle.selectedIndex].text}]`,
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
        if (alert) {
          alert.innerHTML = '<strong>✓ Message Delivered to VehiCare!</strong> Thank you for your inquiry. Your message has been routed directly to <code>vehicare0@gmail.com</code>. We will respond to your email address shortly.';
          alert.style.display = 'block';
          alert.style.background = 'rgba(16,185,129,0.12)';
          alert.style.borderColor = 'rgba(16,185,129,0.35)';
          alert.style.color = '#86efac';
        }
        form.reset();
      } else {
        throw new Error('FormSubmit returned status ' + response.status);
      }
    } catch (err) {
      console.warn('FormSubmit network error, launching mailto fallback:', err);
      window.location.href = `mailto:vehicare0@gmail.com?subject=${encodeURIComponent('VehiCare Inquiry from ' + name.value.trim())}&body=${encodeURIComponent(msg.value.trim() + '\n\nSender: ' + name.value.trim() + ' (' + email.value.trim() + ')\nVehicle: ' + vehicle.options[vehicle.selectedIndex].text)}`;
      if (alert) {
        alert.innerHTML = '<strong>✓ Dispatch Ready:</strong> If your email client did not open automatically, please send directly to <a href="mailto:vehicare0@gmail.com" style="color:#fff; text-decoration:underline;">vehicare0@gmail.com</a>.';
        alert.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = prevBtnText;
      }
    }
  });
}

/* ==========================================================================
   9. Utilities (Back-to-Top & Dynamic Copyright Year)
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
