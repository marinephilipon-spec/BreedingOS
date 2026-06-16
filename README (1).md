# BreedingOS

**AI-powered sport horse breeding management platform**

Streamline your breeding program with smart status tracking, intelligent action management, and real-time breeding cycle monitoring. Designed for serious breeders who need visibility into their mares' reproductive health and breeding strategy.

---

## Table of Contents
- [Product Overview](#product-overview)
- [Features](#features)
- [Use Cases](#use-cases)
- [Quick Start](#quick-start)
- [Features Breakdown](#features-breakdown)
- [Data Model](#data-model)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)

---

## Product Overview

### Mission
BreedingOS eliminates the guesswork from sport horse breeding by providing breeders with an AI-assisted platform to track reproductive cycles, manage breeding schedules, monitor pregnancies, and organize breeding programs in real time.

### Target Users
- Sport horse breeders (KWPN, Warmblood, Thoroughbred)
- Stud farm managers
- Equine veterinarians
- Breeding program coordinators

### Problem Solved
- **No centralized record**: Breeding data scattered across emails, notebooks, vet records
- **Missing cycle windows**: Hard to track 21-day cycles across multiple mares
- **Visibility gaps**: Unclear which mares are due, ready, or need follow-ups
- **Manual scheduling**: Calendar, breeding plans, and follow-ups require constant manual coordination
- **Data loss**: Photos, vet notes, and breeding records go missing

### Solution
BreedingOS provides:
- **Single source of truth** for all breeding data
- **Smart cycle tracking** with automatic foaling countdown
- **AI command center** for 1-tap logging of breeding events
- **Actionable alerts** showing exactly what needs to happen next
- **Season planning** with breed list management for annual strategy

---

## Features

### Core Features (MVP)
✅ **Breeding Status Tracking** (9 medically accurate statuses)
- Waiting for cycle
- Irregular cycle
- Ready to breed
- Inseminated
- 14-day pregnancy check
- Viability confirmed
- Confirmed in foal
- Lost - back open
- Foal

✅ **Mare Management**
- Full pedigree tracking (sire, dam, extended pedigree)
- Breeding status with timestamps
- Nickname shortcuts for chat/voice input
- Foaling countdown (340-day gestation timer)
- On-season breed list marking

✅ **Smart Calendar**
- Day, Week, Month view modes
- Event visualization per mare
- Color-coded event types
- Easy date navigation

✅ **Action Management**
- Smart next-action recommendations (responsive to mare status)
- Priority levels (high/medium/low)
- Due dates with overdue tracking
- Filter view (Today/All/Overdue)
- Completion tracking
- File attachments per action

✅ **Command Center** (AI-assisted logging)
- Natural language event entry ("Bella teased today")
- Auto-detection of mare name, procedure type, status
- File/photo uploads with camera capture
- Timestamp automation
- Suggested quick commands

✅ **Breeding Screen**
- Mare-only filtering
- Breeding status dropdown
- Stallion selection
- "Mark as inseminated" button
- Pregnancy loss flagging

✅ **Event Logging**
- Type categorization (breeding, ultrasound, vet, farrier, collection, foaling, vaccination, reminder)
- Date/time tracking
- Attachments (photos, documents)
- Associated mare reference
- Rich text notes

### Future Features (Roadmap)
🔲 Documents library (persistent file storage per mare)
🔲 Voice-to-text command entry
🔲 Vet integration (API for veterinary records)
🔲 Semen inventory management (location, usage tracking)
🔲 Breeding analytics (success rates, trends)
🔲 Team/farm collaboration (multi-user access)
🔲 Export to PDF (breeding records, reports)
🔲 Mobile app (iOS/Android native)
🔲 Notifications/reminders (desktop & SMS)

---

## Use Cases

### Scenario 1: Tracking a Breeding Cycle
**User**: Sarah, KWPN breeder with 8 mares

1. Mare Bella goes into heat
2. Sarah logs "Bella teased today" via Command Center
3. App suggests "Ready to breed" status
4. Sarah selects stallion "Diamant de Semilly" 
5. Marks as inseminated
6. App creates auto-action: "14-day pregnancy check in 14 days"
7. Sarah receives action reminder
8. Logs ultrasound results → app updates to "Heartbeat confirmed"
9. App shows: "Foal in 322 days" countdown

### Scenario 2: Managing Multiple Mares
**User**: Tom, stud farm manager with 25 mares

1. Filters Horses page to "In foal" - sees 12 pregnant mares
2. Sorts by "Next action" - sees which need 28-day viability checks
3. Uses calendar Month view to spot clustering (good for vet scheduling)
4. Marks qualified mares on "2026 breed list" for planning
5. Command Center logs daily breeding events for all mares
6. Weekly review of timeline to catch missed follow-ups

### Scenario 3: Organizing a Breeding Season
**User**: Emily, breeding coordinator

1. Year starts: adds mares to "2026 breed list" 
2. Plan phase: tracks "Waiting for cycle" mares
3. Active phase: monitors "Inseminated" and "Confirmed in foal" status
4. Late phase: watches foaling countdown, prepares foaling plans
5. Post-foal: logs foal data, transitions mares back to breeding
6. Generates season summary report

---

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/marinephilipon-spec/BreedingOS.git
cd BreedingOS
```

2. **Install dependencies**
```bash
npm install
```

3. **Run locally**
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## Features Breakdown

### 🏠 Home Screen
- **Current date** with full date format (e.g., "Tuesday, June 16, 2026")
- **Daily action count** - "X actions today"
- **Command Center**
  - Text input with AI parsing
  - Media button (📱) for file/photo upload
  - Camera capture support
  - Quick command suggestions
- **Action list** with smart filters
  - Today (default) - due today
  - All - all pending actions
  - Overdue - past due date
- **Recent activity** - last 3 events across all mares
- **Toast notifications** for confirmations

### 🐴 Horses Screen
- **Filter pills**: All / Mares / Foals / In foal
- **Smart mare cards** showing:
  - Mare name + glyph avatar
  - Breed & year
  - Next action (status-responsive)
  - "Season 2026" badge if on breed list
  - Breed list toggle ("+ Add" or "✓ On 2026 breed list")
- **Color-coded urgency**: 
  - Red = urgent (in foal, foaling soon)
  - Gold = active (ready to breed, waiting)
  - Green = monitoring (post-breed checks)
  - Gray = not breeding

### 📖 Horse Detail Screen
- **Header**: Mare name, registered name
- **Nickname editor**: "Chat shortcut" with edit button
- **Breeding status dropdown**: All 9 statuses
- **Breeding plan section**:
  - If in foal: "In foal to: [stallion]"
  - If not: Stallion selector + "Mark as inseminated" button
- **Breed list toggle**: "✓ On 2026 breed list" or "+ Add to breed list"
- **Three tabs**: Timeline | Pedigree | Medical
  - **Timeline**: All events chronologically
  - **Pedigree**: Full pedigree tree
  - **Medical**: Vet records, health events

### 📅 Calendar Screen
- **View toggles**: Day | Week | Month (default)
- **Day view**:
  - Previous/next navigation
  - Full event list for selected day
  - Event details inline
- **Week view**:
  - 7-column grid
  - 140px fixed cell height
  - Max 2 tags per cell + overflow count
- **Month view**:
  - Full month at a glance
  - 80px fixed cell height
  - Max 1 tag per cell + overflow count
  - No expanding cells

### 🔴 Breeding Screen
- **Mare-only list** (no foals/stallions)
- **Status dropdown** for quick updates
- **"Flag lost pregnancy"** button visible for:
  - Heartbeat confirmed
  - Confirmed in foal
- **Card shows**: mare name + current status

### ⚙️ Command Center (AI Event Logger)
**Input parsing recognizes:**

Breeding events:
- "X teased today" → breeding event
- "X follicle 50mm" → includes follicle size
- "X bred/inseminated/covered" → breeding event

Ultrasound/checks:
- "14-day/16-day pregnancy check" → 14-day ultrasound
- "28-day/30-day heartbeat/viability/viable" → 28-day viability check
- "Twin" → notes twin pregnancy

Status changes:
- "X status: [status name]" → updates breeding status directly

Other:
- "X vet/palpation/exam" → vet event
- "X farrier" → farrier event
- "X collection" → semen collection
- "X reminder: [text]" → creates reminder

**Features:**
- Finds mare by: full name, barn name, or nickname
- Auto-timestamps everything (today's date)
- File/photo attachments with captions
- Toast confirmation
- Error handling for ambiguous input

### 📎 Media Upload
- **Media button (+)** opens dropdown above input
- **Options**:
  - 📁 Documents & Photos (file picker)
  - 📷 Take Photo (camera capture)
- **File display**: 60×60 thumbnail cards with ✕ to remove
- **Attachments passed** to logged events
- **Supported formats**: images, PDFs, documents

---

## Data Model

### Horse Object
```javascript
{
  id: string,              // Unique ID
  name: string,            // Registered name
  barnName: string,        // Barn name (short)
  nickname: string,        // Chat shortcut
  sex: 'mare' | 'foal' | 'stallion',
  breed: string,           // e.g., "KWPN"
  yob: number,             // Year of birth
  color: string,           // Coat color
  height: string,          // e.g., "16.2 hh"
  discipline: string,      // Show jumping, dressage, etc.
  
  // Pedigree
  sire: string,            // Sire name
  dam: string,             // Dam name
  damSire: string,
  sireSire: string,
  sireDam: string,
  damDam: string,
  damDamSire: string,
  
  // Breeding
  status: string,          // "active", "pregnant", "retired"
  breedingStatus: string,  // One of 9 statuses
  breedingStatusDate: date,
  plannedStallion: string,
  inFoalTo: string,        // Stallion she's in foal to
  breedListYear: number,   // e.g., 2026 if on breed list
  
  notes: string,
  glyph: string,           // Avatar emoji
}
```

### Action Object
```javascript
{
  id: string,
  horseId: string,
  title: string,
  note: string,
  dueDate: date,
  priority: 'high' | 'medium' | 'low',
  done: boolean,
  attachments: [
    { id, name, type, data (base64), size, isCamera }
  ]
}
```

### Event Object
```javascript
{
  id: string,
  horseId: string,
  date: date,
  type: string,            // breeding, ultrasound, vet, farrier, etc.
  title: string,
  detail: string,          // Rich notes
  attachments: []
}
```

### Semen Object
```javascript
{
  id: string,
  stallion: string,
  type: 'Frozen' | 'Fresh' | 'Fresh-Chilled',
  total: number,           // Total doses
  used: number,            // Doses used
  contract: 'Single' | 'Multi-Dose' | 'LFG',
  location: 'My Tank' | 'Vet' | 'Not Yet Shipped'
}
```

---

## Deployment

### Option 1: GitHub + Netlify (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "BreedingOS deployment"
git push origin main
```

2. **Connect Netlify**
   - Go to [netlify.com](https://netlify.com)
   - "Add new site" → "Import existing project"
   - Select GitHub & authorize
   - Choose `BreedingOS` repo
   - Auto-detects settings:
     - Build: `npm run build`
     - Publish: `dist`
   - Deploy!

3. **Auto-deploy**: Every push to `main` triggers rebuild & deploy

### Option 2: CLI Deploy
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Styling** | Custom CSS (no Tailwind) |
| **Icons** | Lucide React |
| **Fonts** | Fraunces (serif), IBM Plex Sans |
| **Deployment** | Netlify |
| **Version Control** | Git + GitHub |

### Browser Support
- ✅ Chrome 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Mobile: iOS Safari, Chrome Mobile

---

## Project Structure
```
breedingos/
├── src/
│   ├── App.jsx           # Main app (all screens)
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite build config
├── netlify.toml          # Netlify deployment config
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

---

## License
MIT

## Questions?
For issues or feature requests, open a GitHub issue.

---

**Ready to get started?** 
```bash
npm install && npm run dev
```

Visit http://localhost:3000 and start tracking your breeding program! 🐴
