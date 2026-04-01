# College Carpool App - Desktop Screen Architecture

## Purpose
This document defines the desktop-first screen architecture for the web app.

It converts the product vision into a concrete layout system so implementation can begin without ambiguity.

## Desktop Shell Overview
The desktop app should use a persistent three-column shell:

- Left rail: profile, trust, verification, primary navigation
- Center panel: journeys, maps, ride creation, booking, and main product content
- Right rail: chats, inbox, ride-group communication

This shell should stay structurally stable across the main product experience.

## Shell Priorities
### Left Rail
The left rail is about identity and trust.

It should answer:
- who the user is
- whether they are verified
- what they can access
- how they navigate the app

### Center Panel
The center is the main product workspace.

It should answer:
- what ride-related action the user is taking now
- what journeys exist
- how the user creates, joins, or manages a ride

### Right Rail
The right rail is about communication.

It should answer:
- who is messaging the user
- what ride group conversations are active
- how the user quickly opens a direct or group conversation

## Left Rail Specification
The left rail should feel inspired by social apps, but adapted for a trusted college commuting product.

### Left Rail Sections
#### 1. Brand Area
- App logo
- Product name

#### 2. Profile Card
- User photo or avatar
- Full name
- Department / year
- Short commute label, for example `Usually from Whitefield`

#### 3. Trust And Verification
- Verification badge
- Verification state such as:
- `Verified Student`
- `Pending Verification`
- `Not Verified`
- Small CTA if verification is incomplete

#### 4. Quick Profile Metrics
These should be commute-related, not influencer-style.

Suggested items:
- rides created
- rides joined
- trusted trips completed

#### 5. Main Navigation
- `Home`
- `Journeys`
- `Create Journey`
- `Messages`
- `Bookings`
- `Profile`

#### 6. Secondary Actions
- `Settings`
- `Logout`

### Left Rail Design Notes
- It should feel calm and clean.
- Profile and verification should be visually prominent.
- Do not overload it with too many metrics.
- It should remain useful even when center content changes.

## Center Panel Specification
The center panel is the main working surface and should always hold the primary task.

### Center Panel Modes
#### 1. Home
Main purpose:
- show the two main actions

Content:
- large `Create Journey` card
- large `Ongoing Journeys` card
- optional recent ride activity
- optional quick route suggestions later

#### 2. Ongoing Journeys
Main purpose:
- browse rides created by others

Content:
- search bar
- route or place filters
- journey cards
- compact route details
- seats left
- fare
- driver trust info

#### 3. Create Journey
Main purpose:
- publish a new ride

Content:
- route type toggle
- source field
- destination field
- add stop flow
- map preview
- vehicle selection
- seats and price
- publish CTA

#### 4. Journey Details
Main purpose:
- inspect a selected ride before booking

Content:
- route map
- pickup points
- driver profile summary
- vehicle info
- fare
- seats left
- request seat CTA

#### 5. Booking Status
Main purpose:
- let rider understand current state

Content:
- booking status
- selected pickup point
- ride info
- message driver CTA
- ride group CTA when available

#### 6. Driver Ride Management
Main purpose:
- let the driver manage an active ride

Content:
- rider requests
- accept / reject actions
- stop list
- current trip stage
- start trip CTA
- complete trip CTA

### Center Panel Design Notes
- This panel should hold the strongest visual hierarchy.
- Maps belong here.
- Search belongs here.
- Booking and creation flows should never be visually weaker than the side rails.

## Right Rail Specification
The right rail should behave like a communication dock.

It should stay visible on desktop but never overpower the center.

### Right Rail Sections
#### 1. Inbox Header
- `Messages` title
- unread count
- new chat button
- new group button

#### 2. Recent Chats
- recent direct messages
- recent ride-group threads
- unread indicators
- active selection highlight

#### 3. Quick Contacts
- recent classmates
- recent drivers or riders
- trusted frequent contacts later

#### 4. Active Conversation Preview
Depending on layout choice, the right rail can:
- show the recent chat list only, or
- show the selected conversation preview in the lower part

### Right Rail Chat Types
- Direct chat
- Ride group chat
- User-created group chat

### Right Rail Design Notes
- Chat should feel lightweight and familiar.
- Ride-linked groups should be visually distinct from generic groups.
- The rail should support staying inside the ride workflow while messaging.

## Primary Navigation Behavior
### Home
- Left rail highlights `Home`
- Center shows action cards
- Right rail shows inbox preview

### Journeys
- Left rail highlights `Journeys`
- Center shows ride discovery feed
- Right rail remains messaging-focused

### Create Journey
- Left rail highlights `Create Journey`
- Center becomes the route creation workspace
- Right rail can show recent ride groups or stay in inbox mode

### Messages
- Left rail highlights `Messages`
- Center can expand the selected conversation if needed
- Right rail can remain the inbox list

### Bookings
- Left rail highlights `Bookings`
- Center shows booked rides and their states
- Right rail shows relevant chats

### Profile
- Left rail highlights `Profile`
- Center shows full profile and verification management
- Right rail remains available for messaging

## Verification Placement
Verification should not be hidden deep in settings.

It should appear in two places:
- in the left rail as a visible trust state
- in the profile center view as a full verification management flow

### Verification states
- `Verified`
- `Pending`
- `Needs Action`

## Messaging Placement
Messaging should appear in two ways:

### Persistent desktop access
- always visible in the right rail

### Contextual access
- from ride details
- from booking status
- from driver ride management

This means messaging is integrated into the journey workflow, not separated from it.

## Search Placement
Search should belong to the center top area.

### Unified desktop search
Search can later support:
- places
- journeys
- students

This should not live in the left rail because it is a task tool, not an identity tool.

## Suggested Visual Weight
- Left rail: medium emphasis
- Center panel: highest emphasis
- Right rail: low to medium emphasis

The user’s attention should return to the center naturally.

## MVP Desktop Screens
### 1. Login
Single focused screen, outside the three-column shell.

### 2. Home
Inside shell.

### 3. Ongoing Journeys
Inside shell.

### 4. Create Journey
Inside shell.

### 5. Journey Details
Inside shell.

### 6. Bookings
Inside shell.

### 7. Driver Ride Management
Inside shell.

### 8. Messages
Inside shell.

### 9. Profile And Verification
Inside shell.

## MVP Build Recommendation From This Architecture
Build in this order:

1. Desktop shell layout
2. Left rail with profile and verification state
3. Center `Home`
4. Center `Ongoing Journeys`
5. Center `Create Journey`
6. Journey details and booking state
7. Right rail messaging shell
8. Profile and verification center views

## Locked Decisions
- Desktop is the first-class experience.
- Left rail is for profile, verification, and navigation.
- Center is for journeys, maps, booking, and ride creation.
- Right rail is for chats and communication.
- Verification must be visible in the shell.
- Messaging must remain accessible without leaving the ride flow.
