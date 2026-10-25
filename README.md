# Seattle Bike Scene

## Bike Event Website – Clear Requirements & Vision

### Purpose

Create a **Seattle-area bike event website** where anyone in the local bike community can discover and submit upcoming bike-related events. The site is designed primarily for **mobile users**, with strong social media integration and a raw, DIY bike-punk aesthetic.

While the initial scope is Seattle-specific, the architecture should support expansion to additional cities in the future.

---

### Audience

* Seattle bike community
* Mobile-first users
* Riders, racers, organizers, collectives, shops, and crews
* Social-media-driven discovery and sharing

---

### Design & Tone

* **Bike punk / DIY aesthetic**
* Inspired by **90s to early-2000s skateboard and underground bike culture**
* Dark color palette, metal and zine-inspired typography
* Aggressive, minimalist copy
* High contrast and readable on mobile
* Feels raw, fast, and underground, not corporate

---

### Event Visibility Rules

* Only **future events** appear in the main event feed
* Events are sorted by **soonest upcoming date by default**
* Past events are:

  * Archived in a separate section
  * Able to have photos uploaded after the event
  * Used for future highlights and historical reference

---

### Event Fields (Required Data Model)

Each event includes the following fields:

* Event Name
* Date
* Start Time
* Finish Time
* Location (full address)
* Description
* External Link

  * Examples: Instagram, bike shop website, Google Maps pin, ticket link
* Event Type / Tags (multi-select)
* Host Name
* Host Phone Number (private, not publicly visible)

---

### Event Tags

* Events can have **multiple tags**
* Example tags include:

  * Race
  * Alleycat
  * Group Ride
  * Show
  * Protest
  * Party
  * WTF
  * ABC (Asian Bicycle Club)
* Tags should be **inclusive and community-aware**
* Tags are used for filtering and discovery

---

### Filtering & Views

Mobile-first filtering is essential.

Required filters:

* Date range
* Event type / tags

Views:

* Default list view sorted by soonest upcoming event
* Optional calendar-style view for browsing by date

---

### Event Submission Flow

* Anyone can submit an event without creating an account
* Submission form collects:

  * All event fields listed above
  * Submitter name
  * Submitter phone number
* Submitter phone numbers:

  * Are **never public**
  * Used only by the moderator for clarification or verification

---

### Moderation & Approval

* All user-submitted events require **manual approval**
* Sole moderator approves or denies events
* Upon decision:

  * Submitters receive a **text message confirmation or rejection**
* Moderator may contact submitters via text if clarification is needed

---

### Imported Events

The site supports events that are not user-submitted:

* Google Calendar imports
* Manual admin-created events

Imported events:

* Do **not** require approval
* Follow the same display and filtering rules as submitted events

---

### Social Sharing

* One-click sharing to:

  * Instagram
  * Twitter
  * TikTok
* Auto-generated event share cards optimized for social platforms
* Shared events link back to:

  * The event page
  * Or the external URL provided by the host

---

### Future Expansion (Not Required Now, But Planned)

The system should be designed to support future features such as:

* Saved events
* Email digests
* Featured events
* Event highlights
* Photo galleries and post-event media
* Historical event archive
* Multi-city support

## How it works

* **Events** come from the first tab of the [events Google Sheet](https://docs.google.com/spreadsheets/d/1mxP2-lY1-fhWoHr_LOBLFw4OXnEHmhC8yuqZraPCGdM/edit?gid=0#gid=0). Add, edit or delete a row there and the site picks it up on the next page load.
* **Submissions** go through the Google Form linked from the SUBMIT button.
* **Hosting** is GitHub Pages. Every push to `main` builds and publishes the site automatically (see `.github/workflows/deploy.yml`).

There is no database or server — the site is plain static files plus the Google Sheet.

## Development

You need Node.js (LTS).

```sh
git clone https://github.com/bikemike7/cranky-mike-bikes
cd cranky-mike-bikes
npm install
npm run dev
```

Then open http://localhost:8080.
