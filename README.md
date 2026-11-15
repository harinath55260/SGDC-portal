# Shri Gnanambica Degree College (Autonomous) — Digital Campus Platform 2.0

> **Upgraded Official Digital Campus Portal for Shri Gnanambica Degree College, Madanapalle, Andhra Pradesh.**  
> **Lead Developer & Platform Architect:** [K. Harinath](https://github.com/harinath55260)  
> **GitHub Repository:** [https://github.com/harinath55260/college-website2026](https://github.com/harinath55260/college-website2026)  
> **Live Website:** [https://harinath55260.github.io/college-website2026/](https://harinath55260.github.io/college-website2026/)

---

## 🏛️ Project Overview

This is the upgraded **College Digital Management Platform 2.0** built directly on top of the original Shri Gnanambica Degree College website. It preserves the authentic college identity, campus photography, leadership bios of **Correspondent Sri R. Guru Prasad sir** and **Principal Dr. Sri Ramadevi madam**, verified department faculties, real faculty dossiers, sports galleries, and full autonomous curricula (including the 6-semester BCA-AI syllabus), while elevating the system with enterprise-grade architecture:

1. **Modern Responsive Public Website** (Home, About, Academics, Departments, Courses, Admissions, Campus, Sports, Placements, Events, Notices, Gallery, Contact)
2. **Student Portal** (Dashboard, Profile, Attendance tracking with low-attendance warnings, Semester Exam Results, Online Fees ledger, Weekly Timetable, Coursework Assignments, and Study Materials)
3. **Faculty Portal** (Interactive digital class roll call, assignment creator, grading dashboard, materials manager)
4. **Parent Portal** (Linked ward attendance, GPA tracking, examination dates, fee dues alert)
5. **Admin Dashboard** (Admissions queue approvals, official circular announcements, faculty profiles, analytics)
6. **College AI Assistant** (Trilingual assistant in **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)** strictly grounded in college data)
7. **Progressive Web App (PWA)** (Installable on Android, offline fallback, caching, service worker)
8. **Firebase Backend Architecture** (Firebase Auth, Cloud Firestore schemas, Cloud Storage, and robust `firestore.rules`)
9. **Dark, Light, and System Themes** with instantaneous toggle and persistent preferences.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 + TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Artificial Intelligence:** Google GenAI SDK (`@google/genai` model `gemini-3.8-flash`) + Grounded Offline Fallback
- **Database & Auth:** Firebase SDK (Authentication, Cloud Firestore, Cloud Storage)
- **Offline / PWA:** Web App Manifest (`manifest.json`), Service Worker (`sw.js`), Cache API
- **Routing:** Hash-based SPA routing ensuring 100% reload compatibility across both GitHub Pages (`/college-website2026/`) and custom domains.

---

## 🔑 Environment Variables Setup

Create a `.env` file from `.env.example`:

```bash
# Gemini AI API Key (Optional - Offline grounded fallback included)
GEMINI_API_KEY="your-gemini-api-key"

# Firebase Client Configuration (Optional - Demo mode works out of the box)
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

---

## 🚀 Local Development & Build

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Type check & validate
npm run lint

# 4. Production build
npm run build
```

---

## 🔒 Firebase Security Rules (`firestore.rules`)

The platform includes production-ready role-based security rules in `firestore.rules`:
- **Students:** Read own records, submit assignments, view public notices & materials.
- **Faculty:** Record and update class attendance, publish assignments, grade submissions.
- **Parents:** Read linked student's attendance, marks, fees, and examination schedules.
- **Admins:** Full management access across admissions, faculty, circulars, and students.
- **Public:** Read-only access to courses, departments, faculty profiles, gallery, events, notices, and submit new admissions.

---

## 👨‍💻 Developer Attribution

- **Developer:** K. Harinath
- **Role:** Lead Platform Architect & Student
- **GitHub:** [@harinath55260](https://github.com/harinath55260)
- **Institution:** Shri Gnanambica Degree College (Autonomous), Madanapalle, Andhra Pradesh
