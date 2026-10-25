

# 🔩 SEATTLE BIKE EVENT WEBSITE — Phase 1: Core Build

## Overview
A mobile-first event discovery site for the Seattle bike community. Riders can browse upcoming events, filter by type and date, and submit new events for moderator approval. One moderator manages all submissions through a password-protected admin panel.

**Vibe:** Bike punk / DIY / zine-inspired. Dark palette, aggressive typography, high contrast. Feels like a flyer stapled to a telephone pole, not a corporate events page.

---

## 🎨 Design & Branding
- **Dark background** with high-contrast text (off-white, neon accents)
- **Rough, bold typography** — blocky headers, hand-drawn or distressed font feel
- Minimal chrome, raw layout — inspired by 90s skate/bike zine culture
- Mobile-first responsive design — thumb-friendly tap targets, fast scrolling
- Event tags styled as gritty badges/stickers

---

## 📱 Pages & Features

### 1. Event Feed (Home Page)
- Shows only **future events**, sorted by soonest first
- Each event card displays: name, date, time, location, tags, and a link out
- **Filter bar** at the top:
  - Filter by **tags** (Race, Alleycat, Group Ride, Show, Protest, Party, WTF, ABC)
  - Filter by **date range**
- Optional toggle to a **calendar view** for browsing by date
- Tapping an event opens a **detail view** with full info + external link

### 2. Event Detail Page
- Full event details: name, date, start/end time, location, description, host name
- Link out to external URL (Instagram, shop site, ticket link, etc.)
- Tags displayed as badges
- Future-ready: placeholder area for social share buttons (Phase 2)

### 3. Submit an Event
- Open to anyone — **no account required**
- Form fields:
  - Event name, date, start time, finish time, location, description
  - External link
  - Event tags (multi-select)
  - Host name, host phone number (marked as private)
  - Submitter name, submitter phone number (marked as private)
- Confirmation message after submission: "Your event has been submitted for review"

### 4. Past Events Archive
- Separate page/section showing events whose date has passed
- Same card format as the main feed
- Future-ready: space for uploaded photos (Phase 2)

### 5. Moderator Admin Panel
- **Email & password login** (single moderator account)
- **Pending events queue**: review submissions, approve or reject
- **Approved events list**: manage all live events
- **Create event manually**: same fields as submission form, publishes immediately (no approval needed)
- Edit or delete any event
- View submitter contact info (phone number) for follow-up

---

## 🗄️ Backend (Lovable Cloud / Supabase)
- **Events table** storing all event data, status (pending/approved/rejected), source (submitted/admin)
- **Tags system** for multi-select event categorization
- **Auth** for moderator login only
- **Row-level security**: public read for approved events, moderator-only write access
- Architecture supports future multi-city expansion (city field ready but not exposed yet)

---

## 🚀 What's Included in This Phase
✅ Event feed with filtering by tags and date  
✅ Event detail pages  
✅ Public event submission form  
✅ Moderator admin panel with approval workflow  
✅ Past events archive  
✅ Bike punk visual design  
✅ Mobile-first responsive layout  

## ⏭️ Planned for Future Phases
- SMS notifications (Twilio) for approval/rejection
- Google Calendar event import
- Social sharing with auto-generated share cards
- Photo uploads for past events
- Saved events & email digests
- Multi-city support

