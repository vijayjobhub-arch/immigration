# Product Requirements Document (PRD)
## Project: BridgeBuilder AI (సేతు / Setu)
**Theme**: "Build something that makes life measurably easier for an immigrant family in America."  
**Target Event**: APTA (American Progressive Telugu Association) Bridge Builders Hackathon  
**Target Audience**: Immigrant families, Telugu elders visiting the US, newly arrived parents, non-native English speakers, multi-generational diaspora households.

---

## 1. Executive Summary & Platform Architecture

BridgeBuilder AI is a unified, accessible, mobile-first web platform engineered to eliminate everyday administrative, medical, institutional, and cultural barriers faced by immigrant families living in the United States.

Rather than fragmented, disconnected utilities, BridgeBuilder AI organizes immigrant empowerment into **8 Core Life Tracks (16 Specialized Capabilities)**, anchored by 4 high-urgency, production-ready modules:

```mermaid
graph TD
    User["Immigrant Family / Elder / Parent"] --> Platform["BridgeBuilder AI Platform"]
    
    subgraph Core Production Modules (Live Tested)
        Platform --> M1["1. ArogyaCard (Doctor Visit & Triage Intake)"]
        Platform --> M2["2. EduBridge (School Flyer to 1-Click Calendar)"]
        Platform --> M3["3. Decodr (Lease & Official Notice Demystifier)"]
        Platform --> M4["4. DMVReady (Immigrant License Document Auditor)"]
    end
    
    subgraph Platform Extension Suite (8-Track Architecture)
        Platform --> E1["Track 1A: School Enrollment Document Wizard"]
        Platform --> E2["Track 2A: AI Government Form Field Explainer"]
        Platform --> E3["Track 3A: Pre-Visit Doctor Phrasebook & Checklist"]
        Platform --> E4["Track 4B: Immigrant Public Transit Route Explainer"]
        Platform --> E5["Track 5: Community 'Safe-Aid' & Zip Starter Kit"]
        Platform --> E6["Track 6: Immigrant Business Directory & Filing Guide"]
        Platform --> E7["Track 7: Cross-Gen Bridge Messenger & Family Board"]
        Platform --> E8["Track 8: Katha Oral Folklore & Recipe Archiver"]
    end
```

---

## 2. User Personas & Real-World Scenarios

### Persona 1: Lakshmi Amma (Age 64) — Visiting Elder (Healthcare & Triage)
* **Background**: Visiting her son in Plano, TX on a B-2 visitor visa from Guntur, Andhra Pradesh. Speaks Telugu, very limited English.
* **Acute Crisis**: Develops sudden epigastric burning pain and dizziness. Her son is stuck in an office meeting. A neighbor drops her at Urgent Care, but Lakshmi cannot communicate onset, severity, or her blood pressure medication.
* **Solution**: ArogyaCard translates 3 taps in Telugu into an authentic nursing clinical triage intake card with "Show to Nurse" fullscreen mode.

### Persona 2: Suresh & Radhika (Ages 36 & 34) — Newly Arrived Parents (School & Enrollment)
* **Background**: Relocated to Frisco, TX on an H-1B visa with an 8-year-old starting 3rd grade.
* **Acute Crisis**: Confused by Texas school district enrollment immunization rules and weekly multi-page PDF newsletters packed with district jargon (*"STAAR Testing", "Early Release Days", "In-Service Days", "Spirit Week"*).
* **Solution**: EduBridge parses school notices into plain Telugu and exports a 1-click `.ics` calendar file; the Enrollment Wizard verifies immunization compliance against Texas requirements.

### Persona 3: Venkat (Age 29) — First-Time Renter & Tech Worker (Legal & Official Documents)
* **Background**: Renting an apartment in Irving, TX.
* **Acute Crisis**: Receives a dense 3-page "Lease Renewal and Vacating Requirements" notice threatening a $500 penalty and month-to-month rent hikes. Panics thinking his lease is violated.
* **Solution**: Decodr breaks down the clause into 3 clear cards (Plain Telugu meaning, action steps, penalties) and provides a ready-to-send polite reply email.

### Persona 4: Kavya (Age 31) — Immigrant Dependent (DMV & Mobility)
* **Background**: Arrived in Texas on an H-4 dependent visa without an SSN or EAD.
* **Acute Crisis**: Turned away twice at Texas DPS after waiting 4 hours in line because she was missing the mandatory Social Security Ineligibility Letter (Form SSA-L676).
* **Solution**: DMVReady audits her visa type, flags the mandatory SSA-L676 requirement, and generates a conversational script for the officer.

### Persona 5: Grandpa Ramana (72) & Grandson Kiran (14) — Diaspora Family (Communication & Heritage)
* **Background**: Grandfather in Guntur and American-born grandson in Austin.
* **Acute Crisis**: Kiran texts in modern slang (*"That math test was cap fr"*), while Grandpa texts in formal Telugu blessings. They love each other but struggle to maintain a deep connection.
* **Solution**: Cross-Gen Bridge Messenger translates emotions, idioms, and slang; Katha records and illustrates Ammamma's oral folklore and traditional recipes.

---

## 3. Comprehensive Functional Requirements (All 8 Tracks)

### TRACK 1: School Enrollment and Schedules
* **FR-1.1 (Enrollment Wizard)**: Interactive intake for child's age, grade, target district, and available records. Generates a personalized enrollment checklist (Certified birth certificate with English translation, 2 proofs of residency, Texas immunization gap analysis).
* **FR-1.2 (School Calendar Extractor - Live)**: Parses pasted text or uploaded flyers, translates American school terminology (*Early Release = మధ్యాహ్నం 12:00 గంటలకే పికప్; In-Service = స్కూల్ సెలవు*), and generates an RFC-5545 `.ics` file for 1-click Google/Apple Calendar import.

### TRACK 2: Forms and Official Documents
* **FR-2.1 (AI Form Field Explainer)**: Explains confusing boxes on government forms (W-4, county exemptions, fee waivers) in plain Telugu with sample entries and common mistake warnings.
* **FR-2.2 ("What Does This Letter Mean?" Mail Scanner - Live)**: Evaluates notices from landlords, HOAs, or agencies, producing a 3-Card Decision Matrix (Plain meaning, action items, financial penalties) and a copy-paste response email.

### TRACK 3: Language Barriers at Doctor Visits
* **FR-3.1 (Pre-Visit Phrasebook & Q&A Checklist)**: Converts symptom descriptions into side-by-side English/Telugu questions for the patient to ask their physician, plus anticipated questions the doctor will ask.
* **FR-3.2 (Clinical Doctor Visit Intake Card - Live)**: Visual Telugu symptom and pain slider (1–10) converted into a standardized US nursing clinical triage sheet (Chief complaint, HPI summary, medications, triage urgency) with "Show to Nurse" fullscreen mode and bilingual audio.

### TRACK 4: DMV and Transportation Steps
* **FR-4.1 (Immigrant License Document Auditor - Live)**: State-specific (Texas DPS, California DMV) document checklists tailored to visa category (H-4, H-1B, F-1, B-2). Specifically flags Form SSA-L676 for non-working dependents and provides a counter script for the officer.
* **FR-4.2 (Immigrant Public Transit Explainer)**: Plain-language, step-by-step route directions (which bus/train, fare payment in Telugu, transfer stops, cord-pull etiquette) for non-driving immigrants.

### TRACK 5: Finding Community Resources
* **FR-5.1 ("Safe-Aid" Resource Finder Chatbot)**: Conversational assistant for food assistance, ESL classes, and sliding-scale clinics, with verified **"No SSN Required"** and **"Public Charge Safe"** flags.
* **FR-5.2 (Zip Code Starter Kit Generator)**: Generates a 1-page printable welcome packet for any US zip code, indexing the nearest public library, food pantry, community health center, and cultural association.

### TRACK 6: Immigrant-Owned Businesses
* **FR-6.1 (Bilingual Immigrant Business Directory)**: Community-curated directory of regional immigrant businesses (catering, saree alterations, groceries, tax consulting) searchable by language spoken (Telugu, Hindi, Tamil).
* **FR-6.2 (State Small Business Registration Guide)**: Step-by-step roadmap for immigrant entrepreneurs (LLC Certificate of Formation, free IRS EIN filing, state sales tax permit, visa work authorization compliance).

### TRACK 7: Family Communication
* **FR-7.1 (Generational Slang & Idiom Bridge Messenger)**: Bidirectional chat engine that preserves emotional warmth (*Vatsalyam*) while translating between American teen slang and formal Telugu blessings.
* **FR-7.2 (Shared Bilingual Family Board)**: Simple, high-contrast shared calendar and chore board displaying tasks in English and Telugu side-by-side for multi-generational homes.

### TRACK 8: Stories and Traditions
* **FR-8.1 (Katha Oral Folklore Keeper)**: 1-tap Telugu voice recording transcribed, translated into lyrical English storybook prose, and formatted into an illustrated digital memory card with cultural glossaries.
* **FR-8.2 (Spoken Recipe & Tradition Archiver)**: Converts spoken grandmother culinary instructions (measured by "eyeball estimates") into standardized, illustrated recipe cards with US grocery substitutions.

---

## 4. Non-Functional Requirements (NFR)

* **NFR-1 (Hackathon Resilience & Portability)**: Client-side single page architecture with zero backend server dependencies. Runs locally on any standard browser via `py -m http.server 8000` or static hosting (GitHub Pages, Vercel).
* **NFR-2 (Offline Fallback Preset System)**: Every module contains verified, deterministic mock data (Lakshmi Amma triage, Frisco ISD calendar, $500 lease penalty, Texas DPS H-4 audit) to ensure zero failures during live demos even without internet or API keys.
* **NFR-3 (Performance & Latency)**: Gemini 1.5 Flash API responses return in $< 2.5\text{ seconds}$; mock presets render in $< 100\text{ ms}$.
* **NFR-4 (Accessibility & Typography)**: High-contrast color contrast ratios ($\ge 4.5:1$), tap targets $\ge 48\text{px}$, and native typography via Google Fonts *Noto Sans Telugu* to ensure diacritic integrity.
* **NFR-5 (Privacy & Zero-Knowledge Architecture)**: No health information (PHI) or personal identifiable information (PII) is stored on remote servers. All processing is transient.

---

## 5. Measurable Impact Metrics

| Problem Track | Status Quo | With BridgeBuilder AI | Quantifiable Benefit |
| :--- | :--- | :--- | :--- |
| **Doctor Visits (Track 3)** | 15–25 min delay waiting for phone interpreter | **30 seconds** via ArogyaCard | **95% faster emergency triage; prevents medication errors** |
| **School Calendar (Track 1)** | 30 min deciphering flyers; missed early releases | **5 seconds** via 1-Click `.ics` | **100% deadline capture; 0 missed pickups** |
| **Legal Notices (Track 2)** | Panic, confusion, costly attorney calls | **10 seconds** via Decodr 3-Card Matrix | **Eliminates anxiety; avoids $500+ penalty fees** |
| **DMV Visits (Track 4)** | 4–8 hours lost in line $\rightarrow$ rejected at counter | **Pre-audited checklist & counter script** | **0 counter rejections; saves entire workday** |
| **Community Aid (Track 5)** | Fear of public charge $\rightarrow$ foregone medical care | **Verified "No-SSN" safety badges** | **Safe access to essential healthcare and food** |
| **Family Bonds (Track 7 & 8)** | Generational language erosion and lost folklore | **Bilingual chat, illustrated audio storybooks** | **Permanent preservation of cultural heritage** |
