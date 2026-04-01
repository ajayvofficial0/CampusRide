# College Carpool App - Updated Product Requirements

## Document Purpose
This document replaces the earlier generic plan with a clearer product direction based on the latest vision:

- The app should feel like an Uber-style mobile product.
- The app should feel like an Uber-style product adapted for a strong desktop experience first.
- It is not a taxi app. It is a trusted college commuting community.
- The first release should focus on a tight, desktop-first ride creation and booking flow.
- The UI should look premium, clean, map-first, and student-friendly.

## Product Vision
Build a college-only carpool app where students can quickly:

- log in with mobile OTP,
- create a commute,
- browse ongoing journeys posted by others,
- request a seat,
- coordinate pickup points on the way to or from college,
- message other students directly or in groups.

The product should feel familiar like Uber in interaction patterns, but customized for recurring campus commutes, trust, and community.

## Core UX Direction
### Experience Principles
- Desktop-first design for the web application.
- Map-first interface with strong route visibility.
- Minimal taps to create or join a journey.
- Clear separation between "I am driving" and "I need a ride".
- Safer and more community-oriented than a public ride-sharing app.
- Keep interaction patterns portable to a future React Native app.

### Visual Direction
- Uber-inspired information hierarchy: strong map presence, clean cards, clear CTAs, low clutter.
- Softer and warmer than Uber to match a student community.
- Premium but youthful, not loud or overly playful.
- Rounded cards, tight spacing, prominent bottom sheets, strong black/white contrast with a tuned accent palette.
- Messaging should feel closer to Instagram DM than to a corporate chat tool.
- Desktop should use a composed social-product shell: left rail, center content, right communication rail.

### Design References from User Direction
- Uber-like route selection, booking, and ongoing trip discovery.
- Community app style content organization for secondary screens.
- Focus on daily utility, not social-feed overload.

### Layout Language
The app should adapt by device:

- Mobile later: single-column, app-like flow with bottom navigation and full-screen pages.
- Tablet: center-first layout with collapsible side panels.
- Desktop: three-column product shell.

Desktop three-column shell:
- Left column: profile summary, quick navigation, trusted community shortcuts.
- Middle column: rides, maps, create journey flow, journey details, booking actions.
- Right column: inbox preview, active chats, ride group coordination, quick contacts.

Desktop shell behavior:
- Left rail remains persistent and identity-focused.
- Middle panel changes based on the selected primary task.
- Right rail remains communication-focused and can stay visible across most screens.
- The center should always be the visual priority.

This layout should feel like a hybrid of:
- Uber for ride interactions in the center
- Instagram/social apps for side rails and chat presence
- A student community product for identity and trust signals

### Desktop Zone Definitions
#### Left Rail
- Profile card with photo, name, department/year, and verified badge
- Commute preference summary such as `Usually to college from Whitefield`
- Primary navigation
- Shortcuts like `My Bookings`, `My Journeys`, and later `Commute Circles`

#### Center Panel
- Primary workspace for ride creation, ride discovery, ride details, and booking flow
- Should support map-heavy screens and card-heavy screens
- Search should be prominent and contextual

#### Right Rail
- Message inbox preview
- Active direct chats
- Ride group chat previews
- Recent contacts and quick messaging actions
- Lightweight ride activity snippets if they help coordination

## Primary User Types
### Driver
A student with a vehicle who posts a ride from home to college or college to another point.

### Rider
A student looking for an available ongoing journey and booking a seat.

### Admin
Used only for dev/demo verification and moderation later.

## MVP Entry Flow
### 1. Launch / Login
The very first screen should be a mobile login screen.

Requirements:
- Login by mobile number only.
- OTP-based login flow.
- In development mode, OTP is always `123456`.
- UI should still behave like a real OTP verification flow.
- Keep this screen visually strong and minimal.

### 2. Post-login Landing
After login, the user should immediately enter the app and see two main choices:

- `Create Journey`
- `Ongoing Journeys`

This screen acts like the home action selector, not a crowded dashboard.

Requirements:
- Very few competing elements.
- Large touch-friendly action cards/buttons.
- Optionally include a compact map preview or current campus context.
- Later we can add recent routes, but not in the first pass.

Unified search concept:
- A single search surface can later support place search, ride search, and student search.
- Search results should be grouped by `Places`, `Journeys`, and `Students`.
- On desktop, this search belongs in the center top bar.

## Core MVP Features
### A. Create Journey
This is the driver flow.

#### Main use cases
- Home to college
- College to home
- College to another point
- Point to college

#### Required fields
- Trip type / direction
- Start location
- Destination
- Intermediate pickup points / stops
- Date and departure time
- Vehicle selection
- Available seats
- Price per seat

#### Interaction expectations
- User should be able to add multiple stops on the route.
- Stops should be shown on a map and in a reorderable list.
- Route summary should feel similar to Uber route selection.
- User should be able to confirm and publish the journey in one clear CTA.

#### Driver-side details
- Show who booked.
- Show booking status.
- Show remaining seats.
- Allow driver to start journey when ready.

### B. Ongoing Journeys
This is the rider discovery flow.

#### Purpose
Display all currently available rides posted by other students.

#### Required list card content
- Driver name
- Route summary
- Pickup points / stops
- Departure time
- Seat price
- Seats left
- Vehicle type
- Verification / trusted badge

#### Required actions
- View route details
- Request seat / book ride
- Save or revisit ride later

#### Filter ideas for MVP
- To college
- From college
- Nearby pickup point
- Time
- Seats available

### C. Booking Flow
The booking flow must be simple and familiar.

#### Rider journey
1. Open ongoing journey.
2. Review route, driver, time, fare, pickup points.
3. Choose boarding point.
4. Tap `Request Seat`.
5. See booking status.

#### Booking states
- Requested
- Accepted
- Rejected
- Cancelled
- Ongoing
- Completed

#### MVP behavior
- No online payment in the first version.
- Fare shown as contribution per seat.
- Driver approves or rejects manually.

### D. Messaging
Messaging should support both ride coordination and student community interaction.

#### Messaging goals
- Let students contact each other without leaving the app.
- Support direct conversations between two students.
- Support small group conversations for ride coordination.
- Keep the UI familiar and quick, similar to Instagram DM entry patterns.

#### Core messaging entry points
- Top-right message icon from the main app shell.
- Message action on a ride details screen.
- Group chat auto-created or available from an accepted ride.

#### Messaging types
- Direct messages
- Ride group chats
- User-created groups

#### MVP messaging behavior
- A user can open inbox from the top-right.
- A user can search students and start a direct chat.
- A user can create a group and add students manually.
- A booked ride can have a dedicated group thread for the driver and approved riders.
- Messages are plain text in MVP.

#### Post-MVP messaging enhancements
- Read receipts
- Image sharing
- Voice notes
- Ride-linked pinned messages
- Unread badges

## Suggested MVP Screen List
### Authentication
- Mobile number login
- OTP verification

### Core app
- Landing action screen
- Create journey screen
- Route and stops selection screen
- Vehicle selection / add vehicle screen
- Ongoing journeys list
- Journey details screen
- Booking confirmation / status screen
- Driver ongoing trip management screen
- Messaging inbox
- Direct message thread
- Group chat thread
- New chat / new group screen

### Supporting screens
- My bookings
- My journeys
- Profile

## Detailed Screen Requirements
### 1. Mobile Login Screen
- Phone number input
- OTP request CTA
- OTP entry screen or bottom sheet
- Dev note: accept `123456`

### 2. Home Action Screen
- Two primary cards:
- `Create Journey`
- `Ongoing Journeys`
- Optional secondary items:
- `My Bookings`
- `My Journeys`

Desktop adaptation:
- Left rail shows profile card, trust badge, and primary nav.
- Center panel shows the two main actions and recent ride activity.
- Right rail shows inbox preview and suggested recent contacts or ride groups.

Center panel behavior:
- `Home` shows the two large actions and recent ride context.
- `Create Journey` opens the route-building workspace.
- `Ongoing Journeys` opens the ride discovery feed.
- `Ride Details` opens a map and booking-focused detail view.
- `Booking Status` opens the current booking state and ride-linked communication context.

### 3. Create Journey Screen
- Toggle: `To College` / `From College`
- Start and destination location fields
- Add stop button
- Map route preview
- Seats input
- Price input
- Departure date/time
- Vehicle selector
- Publish journey CTA

### 4. Ongoing Journeys Screen
- Search by route or landmark
- Filter chips
- Journey cards
- Quick map preview

### 5. Journey Details Screen
- Large route map
- Pickup points
- Driver info
- Vehicle info
- Available seats
- Price
- Request seat CTA

### 6. Driver Trip Screen
- Rider requests list
- Accept / reject controls
- Stop list
- Start trip CTA
- Mark completed CTA

### 7. Messaging Inbox
- Accessible from top-right action icon
- List of recent chats
- Unread indicators
- Search conversations
- New message / new group CTA
- On desktop, this can also persist as the default right-rail state

### 8. Direct Message Screen
- Instagram-like conversation layout
- Header with user avatar and name
- Message composer fixed at bottom
- Lightweight and fast, designed for short ride coordination chats
- Should be openable without leaving the main ride context on desktop

### 9. Group Chat Screen
- Group name and members
- Messages list
- Group creation and member management in MVP-lite form
- Ride-linked groups should show ride context in the header
- Ride-linked groups should feel operational, not like a generic social chat room

## College-specific Product Requirements
- Verified student-only environment.
- College should be a central route anchor in the product.
- Frequent commutes should be easy to recreate.
- Rides should support major student pickup landmarks.
- Trust indicators matter more than ratings in MVP.
- Messaging should stay limited to the college community for trust and safety.
- Student identity should be visible enough to build trust without making the UI feel crowded.
- The product should support repeated neighborhood or route-based communities later.

## Features To Add Soon After MVP
These fit the product and can be added after the base flow is stable:

- Repeat journey templates for daily commute
- Favorite pickup points
- Emergency contact / trip sharing
- In-ride group chat
- Ride reminders
- Driver reliability score
- Route-based matching suggestions
- Women-only preference option
- Campus event-based pooling
- Media sharing in chat
- Ride invite links into group conversations
- Announcement groups for clubs or neighborhoods
- Commute circles for locality, hostel, or department-based mini communities

## Features Explicitly Out of Scope for First MVP
- Real payment gateway
- Real live GPS tracking
- Public marketplace outside the college community
- Complex rating and review system
- Multi-college support
- Real OTP provider integration

## Maps And Tracking Strategy
Maps are important to the product, but live tracking should be staged carefully.

### Phase 1: Core Map Features
- Map picker for source, destination, and stops
- Route preview while creating a journey
- Compact route preview in ongoing journey cards where useful
- Full route map in journey details
- Landmark and area-based ride discovery

Why this matters:
- It makes ride matching understandable.
- It gives the app the correct Uber-like interaction feel.
- It improves trust by showing exactly where a ride starts, stops, and ends.

### Phase 2: Tracking-lite
- Driver can mark journey progress with manual statuses
- Riders can see trip stage such as `Starting`, `Reached pickup`, `Near college`, `Completed`
- Optional manual location milestone updates

Why this matters:
- It adds useful coordination without the cost of real live tracking.
- It keeps the experience simple for MVP growth.

### Phase 3: Full Tracking
- Live driver location updates
- Real-time ride progress on the map
- Optional live trip sharing with emergency contacts

Why this is delayed:
- It requires location permissions, more backend coordination, and real-time infrastructure.
- It is not necessary to validate the core carpool loop.

## Functional Requirements
### Authentication
- User can enter mobile number.
- User can verify using OTP.
- Dev OTP is fixed as `123456`.
- Session persists after login.

### Journey Creation
- Driver can create a journey with source, destination, stops, time, seats, and price.
- Driver can publish only if required fields are filled.
- Driver can select a saved vehicle or add one.

### Journey Discovery
- Rider can browse active journeys.
- Rider can filter journeys.
- Rider can open a details view before booking.

### Booking
- Rider can request a seat.
- Driver can approve or reject.
- Seats left should update correctly.

### Messaging
- User can open inbox from the top-right action.
- User can create a direct message thread.
- User can create a group chat.
- Ride participants can access a ride-linked group thread.
- Unread count should be visible in the app shell.
- Desktop users should be able to read or send messages while still viewing ride content.

### Profile and Trust
- User profile includes name, department/year, phone, and optional photo.
- User verification state should exist, even if mocked for now.
- Profile card should surface commute-relevant details before generic social details.

### Search
- User can search for places, rides, and students from a unified search entry.
- Results should be grouped by type to reduce confusion.

## Non-functional Requirements
- Optimized first for desktop web usage.
- Desktop should feel intentional and product-grade, not like an expanded mobile mockup or an admin panel.
- Core actions should be possible in under 3 taps from the home action screen.
- UI should remain fast and visually clean.
- Desktop layout should preserve clear visual ownership of the three zones: identity, ride content, communication.
- Multi-panel desktop layout should not feel overloaded; right rail content should remain secondary.

## Data Model Adjustments Needed
The current project schema is not enough for the updated product. We should extend it with:

### User
- mobileNumber
- otpVerified
- profilePhoto
- yearOrDepartment

### Ride
- direction (`TO_COLLEGE`, `FROM_COLLEGE`, `CUSTOM`)
- availableSeats
- totalSeats
- routePolyline or routeMeta
- startLat
- startLng
- destinationLat
- destinationLng

### RideStop
- rideId
- label
- lat
- lng
- sequence

### Booking
- boardingStopId
- passengerCount
- status timeline

### Conversation
- id
- type (`DIRECT`, `GROUP`, `RIDE_GROUP`)
- title
- createdById
- rideId optional
- lastMessageAt

### ConversationMember
- conversationId
- userId
- role (`MEMBER`, `ADMIN`)
- lastReadAt

### Message
- conversationId
- senderId
- body
- sentAt

## Recommended MVP Navigation
- Bottom navigation should not be overloaded.
- Recommended tabs:
- `Home`
- `Journeys`
- `Create`
- `Messages`
- `Bookings`
- `Profile`

The first entry experience should still prioritize the two main actions instead of showing all tabs as equally important.

Desktop shell recommendation:
- Left rail navigation replaces the bottom bar as the primary persistent nav.
- Right rail keeps messaging visible without pulling focus from ride actions.
- Center column remains the main working surface.
- Top-center search becomes a shared discovery tool for places, rides, and students.

## Implementation Priority
### Phase 1
- Mobile login with dev OTP
- Home action screen
- Create journey flow
- Ongoing journeys list
- Journey details
- Seat request flow

### Phase 2
- Driver request management
- My bookings
- My journeys
- Messaging inbox and direct chat
- Verification wall

### Phase 3
- Group chat, ride-linked chat, templates, sharing, trust enhancements

## Product Decisions Locked From Current Discussion
- Mobile login is the first screen.
- Dev OTP is `123456`.
- Post-login screen shows `Create Journey` and `Ongoing Journeys`.
- Product style should be Uber-inspired.
- Create journey must support route direction and addable stops.
- Ongoing journeys is the rider feed.
- Booking is a core MVP feature, not a later add-on.
- Messaging should be available from a top-right inbox entry and support both DMs and groups.
- Desktop design language should use left profile/navigation, middle rides, and right chats.
- The left rail should carry profile and trust context.
- The center should be a dynamic ride workspace.
- The right rail should make messaging continuously accessible.
- Desktop web is the primary design target for the first release.
- Mobile app patterns should be kept portable for future React Native implementation.
- Maps are part of the MVP for route clarity.
- Real-time tracking is not part of the first MVP.
- Tracking should be introduced in three stages: map-first, tracking-lite, then full live tracking if needed.

## Open Design Decisions To Confirm Later
- Should the college destination be fixed globally from config, or chosen per user profile?
- Should riders choose one seat only in MVP, or allow multiple seats per booking?
- Should the home screen include a map preview or remain action-card only?
- Should ride creation open as a full page or bottom-sheet-driven flow?
- Should ride group chats be auto-created on first approved booking, or manually opened by the driver?

## Recommendation
Build the product around a single strong commuting loop:

`Login -> Choose action -> Create or Join journey -> Manage booking -> Complete ride`

That loop is the right MVP. Community extras should only be added after this flow feels complete and polished.
