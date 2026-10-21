# VehiCare — Automotive Intelligence Platform

A high-performance, responsive, accessible, and production-ready static website for **VehiCare**, engineered using **HTML5, CSS3, and vanilla JavaScript only**. No frameworks, no Node.js build process, and no external bundlers are required.

Designed specifically to be committed to a GitHub repository and deployed directly on **Render** as a **Static Site**.

---

## 1. Project Overview & Creative Direction

VehiCare is an intelligent multi-vehicle diagnostics and maintenance assistance system built for **passenger cars, motorcycles, and bicycles**.

Unlike generic SaaS landing pages, this website is art-directed for automotive technology:
- **Editorial, Product-First Composition:** Replaces generic card grids and artificial neon glows with clean typography, restrained surfaces (`#0A0A0A`, `#121212`, `#181818`), and surgical brand orange (`#F5501C`) accents.
- **Authentic App Evidence:** Highlights 5 genuine Android application screenshots in high-definition hardware frames with touch-friendly inspection and fullscreen zoom lightbox.
- **Multi-Vehicle Architecture:** Tailored mechanical inspection points for motorcycles (4T oil, drive chain slack), cars (OBD-II codes, 12V battery drain), and bicycles (hydraulic mineral oil bleeds, chain elongation).
- **Honest Diagnostic Demonstration:** An interactive browser terminal demonstrating client-side triage heuristics with vehicle presets, clear severity ratings, and safety boundaries.
- **Centralized APK Distribution:** Configurable Android APK release URL with graceful "Coming Soon" modal handling.

---

## 2. Project File Structure

```
vehicare-website/
├── index.html                           # Semantic HTML5 document (Mobile-first layout)
├── styles.css                           # Production CSS3 design system & responsive styling
├── script.js                            # Modular vanilla ES6+ controllers (Live AI & Gmail dispatch)
├── favicon.svg                          # Scalable SVG brand mark
├── render.yaml                          # Render Blueprint for 1-click deployment
├── README.md                            # Complete engineering & deployment guide
├── vehicare-website-production.zip      # Clean production archive ready for upload
└── assets/
    ├── logo.png                         # Web-optimized 256x256 brand mark
    ├── ic_launcher_round.png.png        # Original 2048x2048 Android launcher icon
    └── screenshots/                     # Authentic Android application screens & transparent hardware mockups:
        ├── mockup-duo-hero.png          # 3D Dual-Phone Hero Mockup (Home Dashboard + AI Consultation)
        ├── mockup-trio-showcase.png     # 3D Triple-Phone Ecosystem Showcase (AI Chat + Health + Garage)
        ├── mockup-home.png              # Home Dashboard (Active Yamaha Sniper 150 & 4 Service Hubs)
        ├── mockup-maintenance.png       # Urgent Health Center (25% Health Score & 3-Step Guide)
        ├── mockup-ai-consultation.png   # Active AI Consultation (Yamaha Sniper 150 10W-40 specs)
        ├── mockup-ai-chat.png           # Diagnostic Intake (Prompt suggestions & multimodal context)
        ├── mockup-splash.png            # Application Splash Screen & Official Logo Emblem
        ├── 01-ai-chat-assistant.jpg     # Raw Screen Capture: AI Consultation
        ├── 02-maintenance-dashboard.jpg # Raw Screen Capture: Urgent Health Center
        ├── 03-my-garage.jpg             # Raw Screen Capture: My Garage (5/5 Protected Profiles)
        ├── 04-vehicle-selector.jpg      # Raw Screen Capture: Context Switcher
        └── 05-history-activity.jpg      # Raw Screen Capture: Diagnostic History
```

---

## 3. How to Preview Locally

No dependencies, Node.js, or build commands are required:

### Option A: Direct Browser Preview
Double-click `index.html` or drag it into Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option B: VS Code Live Server
1. Open the project directory in Visual Studio Code.
2. Right-click `index.html` and select **"Open with Live Server"**.
3. View the live local server at `http://127.0.0.1:5500/`.

### Option C: Python Simple HTTP Server
Open a terminal in the project directory and execute:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/`.

---

## 4. Mobile Navigation & Touch-Friendly Verification

The mobile navigation is built with mobile-first CSS and touch-friendly controls:
- **Menu Trigger:** A 44×44px button on the top right opens the slide-in drawer.
- **Backdrop Overlay:** Dims background content and dismisses the drawer when tapped.
- **Close Button & Keyboard:** Dedicated `×` button and `Escape` key close the drawer.
- **Auto-Close:** Selecting any navigation link automatically closes the drawer and smoothly scrolls to the selected section.
- **Scroll Lock:** Background body scrolling is automatically disabled while the drawer is active (`body.drawer-open`).

---

## 5. Configuring the Real APK Download Link

The APK download URL is centralized in **one single location** in `script.js` (lines 22–33):

```javascript
const APP_CONFIG = {
  /**
   * Set your public APK download URL here when ready.
   * Example: "https://github.com/your-username/vehicare/releases/download/v1.0.0/vehicare-v1.0.0.apk"
   * Leave empty ("") to show the informative "Release in Preparation" modal.
   */
  apkDownloadUrl: "",
  appVersion: "v1.0.0-beta",
  releaseStatus: "Beta Testing Phase",
  targetPlatform: "Android 8.0 (Oreo) or higher",
  repoUrl: "https://github.com"
};
```

- **When `apkDownloadUrl` is empty (`""`):** Clicking any download button opens an informative "Release in Preparation" modal guiding the user and providing a waitlist option. No broken 404 links or invalid local file paths are exposed.
- **When `apkDownloadUrl` is set:** Clicking any download button immediately downloads the APK binary from the specified URL.

---

## 6. How to Upload to GitHub

1. Open your terminal in the project directory:
   ```bash
   cd vehicare-website
   git init
   git add .
   git commit -m "feat: complete VehiCare automotive platform website"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `vehicare-website`.
3. Push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/vehicare-website.git
   git push -u origin main
   ```

*(Alternatively, upload `vehicare-website-production.zip` or drag-and-drop the files via the GitHub web interface).*

---

## 7. How to Deploy on Render as a Static Site

Deploying on **Render** as a Static Site requires zero build steps:

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** &rarr; **Static Site**.
3. Connect your GitHub repository (`vehicare-website`).
4. Configure the settings:
   - **Name:** `vehicare` (or your custom name)
   - **Branch:** `main`
   - **Build Command:** *(leave completely blank)*
   - **Publish Directory:** `.` *(a single dot representing the directory containing `index.html`)*
5. Click **Create Static Site**.
6. Render will instantly deploy your website to a global CDN URL (e.g., `https://vehicare.onrender.com`).

---

## 8. Summary of Render Deployment Settings

| Setting | Recommended Value | Reason |
| :--- | :--- | :--- |
| **Service Type** | Static Site | Instant CDN delivery, zero server maintenance |
| **Branch** | `main` | Production branch |
| **Build Command** | *(blank)* | Pure HTML5/CSS3/vanilla JS; no build process needed |
| **Publish Directory** | `.` | Serves directly from repository root |
| **Auto Deploy** | Yes | Automatically deploys new Git commits to `main` |

---

## 9. Architecture Boundaries: Front-End Demo vs. Mobile Backend

This static website maintains complete security and transparency regarding client-side vs. backend capabilities:

### What Runs Client-Side on the Static Website
- **Mobile Navigation Drawer & Backdrop:** Full keyboard, touch, and ARIA compliance.
- **Product Experience Walkthrough:** Dynamic screen inspection switching between the authentic mobile screens.
- **Diagnostic Triage Console:** Demonstrates diagnostic heuristics, prompt presets, and report generation entirely in JavaScript.
- **Client-Side Form Validation:** Validates contact information and feedback locally.
- **Screenshot Lightbox Zoom:** Full-resolution modal viewer for app screens.

### What Runs on the VehiCare Mobile App & Backend
1. **Live Neural AI Model Inference:** Audio waveform FFT analysis and photo object detection execute on the dedicated Node.js AI microservice.
2. **User Authentication & Profiles:** User management, session tokens, and vehicle VIN storage run on the Laravel REST API.
3. **Database Operations:** Persistent maintenance logs, odometer readings, and service timelines reside on a managed Aiven database.
4. **GPS Workshop Discovery:** Real-time geolocation repair shop routing operates through native Android location APIs.

> **Security Rule:** Never commit API secrets, private database credentials, or Laravel `.env` variables into this public repository. All sensitive operations are isolated to backend servers.

---

&copy; VehiCare. All rights reserved.  
*“Driving Smarter. Diagnosing Faster. Maintaining Better.”*
