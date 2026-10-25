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

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://spoke-n-word.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/631e55c1-d8e7-439a-b08d-de8cd3c317bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
