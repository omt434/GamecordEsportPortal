# GamecordEsportPortal
# 🎮 GameCord Esports Portal — Project Documentation & Progress

> **GameCord** is an automated competitive eSports management portal built with a dark cyberpunk aesthetic. It features email-based OTP verification, in-game UID tracking, dynamic match room distribution, bracket generation, and AI-powered OCR for profile verification and endgame scoreboard winner extraction.

---

## 📌 Project Overview & Current State

- **Framework:** Next.js (Version 16.2.x, App Router, Turbopack)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 (Cyberpunk Dark Neon Theme with `@theme` variables)
- **Database:** MongoDB via Mongoose ODM (with in-memory fallback for local testing)
- **Authentication:** Custom JWT sessions using the `jose` library stored in HTTP-Only cookies
- **Email Verification Engine:** Nodemailer with Google App Password integration & HTML templates
- **AI / OCR Engines:** Tesseract.js for gamer tag UID verification & match scoreboard result parsing

---

## 🚀 Completed Features

### 1. 📧 Player Registration with Gmail OTP Verification
- **User Flow:**
  1. The player enters their Gmail address and clicks **"Send OTP"**.
  2. A 60-second cooldown timer begins with a disabled state to prevent spamming.
  3. A 6-digit cryptographic verification code is generated with a **10-minute expiry**.
  4. An HTML email featuring dark cyberpunk branding is delivered to the user's Gmail inbox.
  5. The user fills in:
     - **6-Digit OTP**
     - **Game UID** (unique in-game player ID)
     - **In-Game Name (IGN)**
     - **Password**
  6. Upon submission, the OTP is validated, the password is encrypted using `bcryptjs`, the account is created, and the user is automatically logged in.
- **Resilience:** Includes an `otpMemoryStore` fallback mechanism, enabling seamless email OTP testing even if the local MongoDB instance is offline.

### 2. 🔑 Dual Player Login (Email OR Game UID)
- Players can log into their dashboard using **either**:
  - Registered **Gmail address** + Password
  - **In-Game UID** + Password
- A single input field automatically detects whether the input is an email address or a UID and queries the database accordingly.

### 3. 🛡️ Dedicated Admin Command Portal (`/admin/login`)
- **Navbar Integration:** Added a glowing **Admin** button directly adjacent to Login & Register in the top navigation bar.
- **Header & Branding:**
  - The header displays **"Welcome OMT, please login"** alongside a glowing cyber shield icon.
  - The form requires an **Admin Email / Username** and **Password** (no Game UID required).
- **Access Control:**
  - The footer displays: **"Want admin access? Contact Admin"**.
  - Protected by Next.js middleware: unauthorized users attempting to access `/admin` are automatically redirected to `/admin/login`.
  - Default master admin credentials (`omt@gamecord.com` / `omt123`) can initialize the database on first run.

### 4. 🏆 Tournament System (`/tournaments`)
- Browse active, upcoming, and completed competitive events.
- Filter by games, prize pools, and entry fees.
- **Tournament Detail & Registration (`/tournaments/[id]`):**
  - Players view tournament rules, dates, and prize distributions.
  - Players submit a **Payment Receipt Screenshot URL** and an **In-Game Profile Screenshot URL** to enter.

### 5. 👥 Player Dashboard (`/dashboard`)
- Displays tournaments the player is currently registered for.
- Displays approval status (Pending / Approved / Rejected).
- **Dynamic Room Access:** Displays the Match Room ID and Password 10–15 minutes before match start once approved by an Admin.

### 6. ⚙️ Admin Control Panel (`/admin`)
- **Overview Dashboard (`/admin`):** High-level metrics tracking active tournaments, registrations, and pending verifications.
- **Tournament Manager (`/admin/tournaments`):** Create tournaments, set rules, assign game titles, entry fees, available slots, and prize pools.
- **Verifications Panel (`/admin/verifications`):** 1-Click Approve / Reject registrations after inspecting payment and profile screenshots.
- **Dynamic Bracket Generator (`/api/tournaments/[id]/generate-brackets`):** Automatically pairs approved participants into 1v1 bracket rounds and match rooms.

### 7. 🤖 AI & OCR Verification System
- **Profile Screenshot Scanner (`/api/verifications/ocr`):**
  - Admin clicks "Verify Profile".
  - Runs Tesseract.js OCR across the player's screenshot.
  - Matches the player's registered UID (100% exact match) and IGN (fuzzy match) against text detected in the image.
- **Scoreboard Result Match Parser (`/api/results/process`):**
  - Scans final scoreboard screenshots uploaded by players or admins.
  - Strips stylized gamer fonts and symbols using a cleanup dictionary.
  - Runs a sliding-window Levenshtein distance algorithm (>65% similarity threshold) against match participants to auto-detect the winning player.

---

## 📂 Project Directory Structure

```text
gamecord-esports-portal/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/page.tsx          # Dedicated OMT Admin Login Portal
│   │   │   ├── matches/page.tsx        # Live matches & room ID management
│   │   │   ├── results/page.tsx        # Scoreboard OCR result parser UI
│   │   │   ├── tournaments/page.tsx    # Admin tournament creation & controls
│   │   │   ├── verifications/page.tsx  # Player payment & profile review panel
│   │   │   ├── layout.tsx              # Admin layout with side navigation
│   │   │   └── page.tsx                # Admin overview dashboard
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── admin-login/route.ts# Admin authentication & OMT auto-seed
│   │   │   │   ├── login/route.ts      # Player login (Email OR UID)
│   │   │   │   ├── logout/route.ts     # Session termination
│   │   │   │   ├── me/route.ts         # Active session check
│   │   │   │   ├── otp/send/route.ts   # 6-digit OTP generation & Gmail dispatch
│   │   │   │   └── register/route.ts   # OTP verification & player creation
│   │   │   ├── results/process/route.ts# OCR scoreboard winner detection
│   │   │   ├── tournaments/
│   │   │   │   ├── [id]/generate-brackets/route.ts # 1v1 bracket engine
│   │   │   │   └── route.ts            # Tournaments CRUD API
│   │   │   └── verifications/
│   │   │       ├── ocr/route.ts        # Profile UID/IGN OCR verification API
│   │   │       └── route.ts            # Registration status update API
│   │   ├── dashboard/page.tsx          # Player Dashboard (Room IDs & stats)
│   │   ├── login/page.tsx              # Player Login (Email or UID)
│   │   ├── register/page.tsx           # Player Register with Email OTP flow
│   │   ├── tournaments/
│   │   │   ├── [id]/page.tsx           # Tournament detail & screenshot registration
│   │   │   └── page.tsx                # Tournament list & filters
│   │   ├── globals.css                 # Cyberpunk neon styles & glassmorphism
│   │   ├── layout.tsx                  # Root layout with Navbar
│   │   └── page.tsx                    # Homepage Hero & Feature Showcase
│   ├── components/
│   │   └── layout/
│   │       └── Navbar.tsx              # Navbar with Login, Register & Admin links
│   ├── lib/
│   │   ├── auth.ts                     # JWT encryption/decryption using jose
│   │   ├── email.ts                    # Nodemailer Gmail service & HTML template
│   │   ├── mongodb.ts                  # Mongoose cached connection helper
│   │   └── otpStore.ts                 # Resilient in-memory OTP fallback
│   ├── models/
│   │   ├── Match.ts                    # Matches & bracket rounds schema
│   │   ├── Otp.ts                      # Email OTP schema with auto-TTL index
│   │   ├── Registration.ts             # Tournament entry & verification schema
│   │   ├── Tournament.ts               # Tournament schema
│   │   └── User.ts                     # User schema (email, UID, IGN, role)
│   └── middleware.ts                   # Route protection (/admin & /dashboard)
├── .env.local                          # Environment secrets
├── package.json                        # Dependencies & scripts
└── README.md                           # This documentation file
