# System Architecture & UI/UX Design Document
## Project: BridgeBuilder AI
**Target Event**: APTA Bridge Builders Hackathon  
**Platform**: Responsive Edge-First Web Application (Desktop & Mobile)

---

## 1. System Architecture Overview

BridgeBuilder AI is built with an **Edge-First, Client-Side Orchestration Architecture**. By eliminating heavy backend servers, the platform achieves instant load times, zero server maintenance overhead, zero hosting costs, and maximum privacy for sensitive immigrant health, legal, and visa inquiries.

```mermaid
graph TD
    User["Immigrant Family / Elder / Parent"] -->|Interacts with UI| WebApp["BridgeBuilder AI Web App (SPA)"]
    
    subgraph Client Application Layer (Browser Runtime)
        WebApp --> NavController["Tab Router & State Manager (app.js)"]
        
        NavController --> Mod1["ArogyaCard (Medical Intake & Triage)"]
        NavController --> Mod2["EduBridge (School Flyer & Calendar)"]
        NavController --> Mod3["Decodr (Lease & Form Demystifier)"]
        NavController --> Mod4["DMVReady (License Document Auditor)"]
        
        Mod1 --> ClinicalEngine["Clinical Triage Formatter (gemini.js)"]
        Mod2 --> ICSEngine["RFC-5545 .ics Generator (calendar.js)"]
        Mod3 --> LegalEngine["Plain-Language Decoder (gemini.js)"]
        Mod4 --> DocumentAuditor["State & Visa Rules Engine (gemini.js)"]
        
        WebApp --> SpeechEngine["Web Speech Synthesis (speech.js)"]
        WebApp --> FallbackStore["Deterministic Demo Preset Store"]
        WebApp --> Storage["Client LocalStorage (API Key Storage)"]
    end
    
    subgraph AI Gateway
        ClinicalEngine -->|Structured Prompt| GeminiAPI["Google Gemini 1.5 Flash API"]
        LegalEngine -->|Structured Prompt| GeminiAPI
        ICSEngine -->|Vision / Text Prompt| GeminiAPI
    end
    
    subgraph User Touchpoints & Physical Outputs
        ICSEngine --> CalendarExport["Google Calendar / Apple iCal (.ics)"]
        ClinicalEngine --> NurseModal["Fullscreen 'Show to Nurse' Medical View"]
        ClinicalEngine --> PrintView["Formatted Paper Clinical Intake Handout"]
        LegalEngine --> Clipboard["1-Click Copied Counter Response Email"]
        SpeechEngine --> AudioOutput["Clinical Voice Readout (EN-US / EN-US)"]
    end
```

---

## 2. Technical Stack & Decision Rationale

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Architecture** | Edge-First Single Page App (SPA) | Zero-build fragility. Zero node version incompatibilities. Runs on any browser. |
| **Core Structure** | HTML5 Semantic Elements | High accessibility, screen reader friendly, clean DOM hierarchy. |
| **Logic & State** | Vanilla Modern JavaScript (ES6+) | Instant load times, no heavy bundle downloads, direct DOM manipulation. |
| **Styling** | Tailwind CSS (CDN) + Custom CSS | Rapid design token utility with custom glassmorphism and `@media print` rules. |
| **Typography** | *Noto Sans English* + *Plus Jakarta Sans* | Flawless rendering of English conjunct characters (వత్తులు) and diacritics without vertical clipping. |
| **Iconography** | Lucide Icons (CDN) | Lightweight, customizable SVG icons matching modern iOS/Android conventions. |
| **AI Engine** | Google Gemini 1.5 Flash (`gemini-1.5-flash`) | Sub-1.5s latency, multilingual English/English proficiency, native JSON schema support. |
| **Calendar Engine** | Custom RFC-5545 `.ics` Builder (`calendar.js`) | Generates standards-compliant calendar files with zero external dependencies. |
| **Voice & Speech** | Native Web Speech Synthesis API (`speech.js`) | Built-in browser speech synthesis; zero third-party TTS fees. |
| **Demo Resilience** | High-Fidelity Deterministic Fallback Engine | Guarantees 100% demo stability even if venue Wi-Fi drops or API rate limits trigger. |

---

## 3. UI/UX Design System & Design Tokens

### 3.1 Color Palette
* **Brand Navy (Deep Heritage Navy)**: `#0B132B` / `#1C2541`
  * Represents trust, security, institutional authority, and immigrant resilience.
* **Warm Amber / Marigold (`amber-500` / `#F59E0B`)**:
  * Reflects cultural warmth (*పసుపు / కుంకుమ* traditions), optimism, and high-visibility CTAs.
* **Clinical Emerald (`emerald-600` / `#059669`)**:
  * Used for medical triage verification, validated documents, and actionable steps.
* **Alert Coral / Rose (`rose-600` / `#E11D48`)**:
  * Used for acute pain indicators (8–10), strict deadlines, and financial penalty warnings.
* **Slate Backgrounds (`slate-50` / `slate-100` / `slate-900`)**:
  * Clean, calming canvas with dark-mode contrast boxes for terminal scripts and nurse views.

### 3.2 Typography Hierarchy
* **Headings**: `Plus Jakarta Sans`, font weights `700` and `800`, tight letter-spacing (`tracking-tight`).
* **Body / Clinical Data**: `Inter`, font weights `400`, `500`, and `600` for clinical scannability.
* **English Content**: `Noto Sans English`, font weight `500` to `700`, with `leading-relaxed` (1.75 line-height) to prevent complex English glyphs from clipping.
* **Monospace / Scripts**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` for legal email drafts and counter scripts.

### 3.3 Touch Targets & Elder Accessibility
* **Minimum Tap Target**: All symptom buttons, tab buttons, and preset pills are $\ge 48\text{px} \times 48\text{px}$ to accommodate elderly or tremoring hands.
* **High Contrast Text**: All text conforms to WCAG 2.1 AA contrast ratios ($\ge 4.5:1$).
* **Audio Assistance**: Prominent 🔊 "Listen in English" and "Listen in English" buttons on every result card.

---

## 4. Structured AI Output Schemas (Gemini 1.5 Flash)

### 4.1 ArogyaCard (Clinical Triage Note Schema)
```json
{
  "chiefComplaint": "Acute Epigastric Burning Pain with Dizziness",
  "onset": "48 hours, progressive worsening postprandial",
  "severity": "8/10 (Burning / Severe spasms)",
  "associatedSymptoms": ["Mild dizziness on standing", "Postprandial nausea", "Absence of fever"],
  "medications": ["Metformin 500mg daily", "Amlodipine 5mg daily"],
  "allergies": "NKDA (No Known Drug Allergies)",
  "hpiSummary": "Patient presents with a 48-hour history of acute, progressive epigastric burning pain rated 8/10...",
  "englishSummary": "ఈ కార్డు డాక్టర్‌కు మీ పరిస్థితిని తెలియజేస్తుంది: మీకు గత 2 రోజుల నుండి తీవ్రమైన కడుపు మంట...",
  "nurseQuickNotes": "Check orthostatic vitals; blood glucose check recommended; evaluate for acute gastritis vs. biliary colic.",
  "urgencyLevel": "High"
}
```

### 4.2 EduBridge (School Calendar Extractor Schema)
```json
{
  "schoolName": "Frisco ISD - Centennial Elementary",
  "summary": "ఈ నెల పాఠశాల ముఖ్యమైన తేదీలు మరియు తల్లిదండ్రులు చేయవలసిన పనులు.",
  "events": [
    {
      "id": "evt-1",
      "title": "Early Dismissal / Early Release Day (12:00 PM)",
      "englishTitle": "పాఠశాల హాఫ్ డే: విద్యార్థులను మధ్యాహ్నం 12:00 గంటలకే ఇంటికి తీసుకెళ్లాలి",
      "date": "2026-09-18",
      "time": "12:00 PM",
      "isAllDay": false,
      "location": "Centennial Elementary Carpool Line",
      "actionRequired": "పిల్లలకు లంచ్ బాక్స్ సర్దండి; మధ్యాహ్నం 12:00 గంటలకే కార్‌పూల్ లైన్‌లో ఉండండి.",
      "category": "Early Release"
    }
  ]
}
```

### 4.3 Decodr (Legal Notice Demystifier Schema)
```json
{
  "documentType": "Apartment Lease Renewal & Late Fee Violation Notice",
  "urgency": "Urgent",
  "plainMeaning": {
    "english": "Management requires written notice of renewal or move-out 60 days in advance...",
    "english": "మీ అపార్ట్‌మెంట్ లీజు ముగియడానికి 60 రోజుల ముందే మీరు రాతపూర్వకంగా చెప్పాలి..."
  },
  "actionItems": [
    {
      "step": 1,
      "action": "Sign and submit either 'Intent to Vacate' or 'Lease Renewal' form.",
      "actionTe": "అక్టోబర్ 31 లోపు ఫారం పై సంతకం చేసి ఆఫీస్‌లో ఇవ్వండి.",
      "deadline": "October 31, 5:00 PM"
    }
  ],
  "pitfallsAndFees": [
    {
      "risk": "$500 Non-Notification Fee + Automatic conversion to Market Month-to-Month Rate (+$350/mo).",
      "riskTe": "సకాలంలో చెప్పకపోతే $500 ఫైన్ పడుతుంది మరియు రెంట్ $350 ఆటోమేటిక్‌గా పెరుగుతుంది."
    }
  ],
  "counterResponseScript": "Dear Leasing Office, Please accept this email as my formal confirmation..."
}
```

### 4.4 DMVReady (State & Visa Document Auditor Schema)
```json
{
  "visaType": "H-4 Dependent",
  "state": "Texas (DPS)",
  "requiredDocuments": [
    {
      "category": "Social Security Ineligibility (Mandatory for H-4)",
      "docName": "SSA Ineligibility Letter (Form SSA-L676)",
      "docTe": "సోషల్ సెక్యూరిటీ నిరాకరణ పత్రం (Form SSA-L676)",
      "tip": "Crucial! Obtain from SSA office prior to DPS visit. Prevents immediate rejection."
    }
  ],
  "counterScript": "Hello officer, I am applying for an original Texas Driver License as an H-4 dependent..."
}
```

---

## 5. Directory & File Organization

```
c:\Users\vijay\Documents\AIAgents\immigration\
├── index.html              # Responsive SPA layout, modals, print containers, Lucide markup
├── css/
│   └── styles.css          # Glassmorphism, English line-height rules, @media print stylesheet
├── js/
│   ├── app.js              # Tab controller, DOM event bindings, toast notifications
│   ├── gemini.js           # Gemini Flash API client, prompts, and deterministic fallback store
│   ├── calendar.js         # RFC-5545 .ics calendar generator and Google Calendar URL builder
│   └── speech.js           # Web Speech Synthesis engine (English en-US and English en-US)
├── REQUIREMENTS.md         # Full 8-Track Product Requirements Document
├── REFINED_SOLUTIONS.md    # Master Hackathon Evaluation Matrix & 16-Tool Blueprints
├── DESIGN.md               # System Architecture & UI/UX Design Specification (this file)
├── DEVELOPMENT.md          # Local Setup, One-Click Hosting & Pitch Guide
└── README.md               # Project Overview & Quickstart Guide
```

---

## 6. Print Media Architecture (`@media print`)
When a user clicks **"Print Physical Card"** in ArogyaCard:
* Navigation bars, headers, buttons, and modals are hidden via `display: none !important;`.
* High-contrast black-and-white clinical styling activates.
* Page margins and typography resize to fit standard US Letter paper without clipping.
* Allows an elder or family member to hand a printed sheet directly to triage nurses or emergency responders.
