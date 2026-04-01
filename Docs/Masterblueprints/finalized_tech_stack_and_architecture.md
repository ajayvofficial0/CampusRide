# College Carpool App - Finalized Tech Stack And Architecture

## Purpose
This document defines the recommended technical stack and application architecture for the college carpool app based on:

- the current codebase,
- the updated product requirements,
- the need to move fast on an MVP without over-engineering.
- the decision to design desktop web first and add a mobile app later if needed.

## Final Recommendation
Use a unified full-stack `Next.js` architecture instead of splitting frontend and backend into separate projects.

Recommended stack:
- `Frontend`: React via `Next.js`
- `Backend`: `Next.js` Route Handlers running on Node.js
- `Database`: PostgreSQL
- `ORM`: Prisma
- `Language`: TypeScript
- `Styling`: Tailwind CSS
- `Maps`: Leaflet + OpenStreetMap
- `Authentication`: mobile OTP flow, mocked first
- `Realtime later`: WebSockets or Socket.IO for chat and live updates

Future client extension:
- `React Native` can be added later as a separate mobile client consuming the same backend and database.

## Why This Stack Fits The Project
### 1. It matches the current codebase
The project already uses:
- `Next.js`
- `React`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `Leaflet`

Changing to a separate React frontend and standalone Node/Express backend now would slow the project down without improving the MVP.

### 2. It is better for fast product iteration
This app needs:
- fast UI iteration,
- quick API changes,
- easy auth handling,
- map screens,
- desktop-first product flows,
- later messaging and ride updates.

Keeping frontend and backend in one application is the most practical choice for that.

### 3. It avoids unnecessary complexity
For the current stage, we do not need:
- separate frontend and backend repositories,
- microservices,
- event-driven architecture,
- heavy realtime infrastructure from day one.

## Chosen Architecture
### App Layer
Use `Next.js App Router` for:
- routes,
- pages,
- layouts,
- server components where useful,
- client components where interaction is needed.

Primary presentation target:
- desktop web first

Secondary future target:
- React Native mobile client using the same product model and backend APIs

### API Layer
Use `Next.js Route Handlers` for backend endpoints.

Examples:
- auth
- rides
- bookings
- vehicles
- conversations
- messages

This keeps API logic close to the product and reduces deployment friction.

### Database Layer
Use PostgreSQL as the primary relational database.

Why PostgreSQL:
- strong fit for relational ride, booking, user, and chat data
- stable for production
- works well with Prisma
- good future support for geospatial extensions if needed later

### ORM Layer
Use Prisma for:
- schema management
- database migrations
- typed queries
- relation handling

This is already the right choice for the project and should be kept.

## Frontend Stack
### Core
- `Next.js 14`
- `React 18`
- `TypeScript`

### Styling
- `Tailwind CSS`

Why:
- fast UI iteration
- good fit for responsive product shells
- good fit for desktop rail layouts and future responsive adaptation

### Icons
- `lucide-react`

### Maps
- `Leaflet`
- `react-leaflet`
- `OpenStreetMap`

Why:
- no paid dependency required for MVP
- enough for route visualization, stop picking, and ride detail maps

## Backend Stack
### Runtime
- Node.js through `Next.js`

### API Strategy
Use route handlers under `src/app/api`.

Recommended endpoint groups:
- `/api/auth/*`
- `/api/users/*`
- `/api/vehicles/*`
- `/api/rides/*`
- `/api/bookings/*`
- `/api/conversations/*`
- `/api/messages/*`

### Auth Strategy
For MVP:
- mobile number login
- mocked OTP verification using `123456` in development
- session or JWT-based auth

Short-term recommendation:
- keep auth simple in MVP
- move away from email/password-first flow
- replace current login model with phone-based login flow

## Data Layer Recommendation
### Current database direction
The current Prisma datasource is already PostgreSQL, which is correct.

### Recommended core entities
- `User`
- `Vehicle`
- `Ride`
- `RideStop`
- `Booking`
- `Conversation`
- `ConversationMember`
- `Message`

### Future optional entities
- `College`
- `CommuteCircle`
- `TripStatusUpdate`
- `Notification`

## Realtime Recommendation
Do not introduce realtime infrastructure in the first build unless the messaging requirement forces it immediately.

### Phase 1
No live sockets required.

Use:
- normal API calls
- polling where acceptable for lightweight status refresh

### Phase 2
Introduce realtime for:
- direct messaging
- ride-group chat updates
- unread counts if needed

Recommended choices later:
- `Socket.IO`
- or native WebSocket setup if the deployment model supports it cleanly

### Phase 3
Only then consider realtime for:
- live trip progress
- live location sharing
- full chat presence

## Deployment Recommendation
Keep deployment simple.

Recommended shape:
- one Next.js app deployment
- one PostgreSQL database
- environment variables for auth and database config

Good MVP deployment targets:
- Vercel for the app
- Neon, Supabase Postgres, Railway, or managed PostgreSQL for the database

Future mobile app note:
- if a React Native client is added later, it should reuse the same backend and database instead of creating a second backend stack

## Folder Structure Recommendation
Recommended application structure:

```text
src/
  app/
    api/
    login/
    otp/
    home/
    journeys/
    create-journey/
    bookings/
    messages/
    profile/
  components/
    shell/
    rides/
    messaging/
    maps/
    profile/
  lib/
    auth/
    db/
    maps/
    messaging/
    utils/
  types/
```

Notes:
- Keep product surfaces grouped by domain.
- Avoid placing all components in one flat folder as the app grows.

## State Management Recommendation
For the MVP, do not introduce a heavy global state solution immediately.

Recommended approach:
- local component state for forms and UI state
- server data fetched through route handlers
- add a client data library later only if needed

Optional later additions:
- `TanStack Query` for caching and async state
- `Zustand` only if local cross-screen state becomes hard to manage

## Validation Recommendation
Add schema validation for API inputs as the app grows.

Recommended:
- `Zod`

Why:
- safer request validation
- better API reliability
- cleaner server-side form handling

## Authentication Recommendation
### MVP auth
- mobile number input
- mock OTP input
- OTP `123456` in dev mode
- issue signed auth token or session after successful verification

### Do not prioritize yet
- social login
- full SMS integration
- password-based auth as the main model

## Messaging Architecture Recommendation
Messaging should be built in a way that supports both:
- direct student chats
- ride-linked group chats

Recommended phases:
- Phase 1: schema and UI planning
- Phase 2: direct chat with standard message list and send flow
- Phase 3: ride-group chat and richer message behaviors

## Maps Architecture Recommendation
### MVP
- static and interactive maps for route understanding
- stop selection
- journey detail visualization

### Later
- manual progress updates
- live tracking if validated by actual product need

## Security And Access Notes
Even in MVP, these should be treated seriously:
- protect APIs with auth
- check ownership on ride and vehicle actions
- restrict booking changes to allowed users
- restrict chat membership access to conversation members

## Tech Choices To Avoid Right Now
- Separate React SPA + Express backend unless there is a hard deployment requirement
- React Native in the first implementation phase
- Firebase-first architecture replacing PostgreSQL
- GraphQL
- Microservices
- Premature realtime stack everywhere
- Complex event bus architecture

## Current Project Assessment
The current project is already close to the correct technical foundation.

What is already right:
- `Next.js`
- `TypeScript`
- `PostgreSQL`
- `Prisma`
- `Leaflet`

What should change next:
- shift auth from email/password-centric flow to mobile OTP-centric flow
- extend schema for rides, stops, booking details, and messaging
- reorganize product screens around the new UX

## Final Decision
The technical direction for this project should be:

`Next.js + React + Node.js route handlers + PostgreSQL + Prisma + Tailwind + Leaflet`

This is the right stack for:
- speed,
- product clarity,
- easier deployment,
- easier iteration,
- and clean expansion into messaging and map-based features later.
- It also keeps the backend reusable if a React Native app is added later.

## Recommended Build Order
1. Keep `Next.js` as the single full-stack app.
2. Design and build the desktop shell and screen structure first.
3. Update auth to mobile OTP dev flow.
4. Update Prisma schema for the new product model.
5. Build rides and booking flow.
6. Add messaging.
7. Add tracking-lite later.
8. Reuse the backend for React Native later if the mobile app is needed.
