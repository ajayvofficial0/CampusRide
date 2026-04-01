# College Carpool App - Implementation Plan

## Goal Description
Build a "Social Carpool" web application exclusively for college students. The app allows student drivers to publish their commuting routes and lets other students "tag along" by booking seats. The focus is on safety (verified community), cost-splitting, and socializing, rather than a commercial taxi service.

## User Review Required
> [!IMPORTANT]
> **Verification Strategy**: We will implement a mock verification flow where users must upload an ID card image to "unlock" the app. Real OCR/Aadhar API integration is out of scope for the MVP but the UI will reflect it.

> [!NOTE]
> **Map Engine**: We will use OpenStreetMap (via Leaflet) for the MVP to avoid requiring a Google Maps API Key, which simplifies the setup for you.

## Proposed Architecture
**Tech Stack (SDE Portfolio Standard)**:
*   **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS.
*   **Backend**: Next.js API Routes (Serverless).
*   **Database**: PostgreSQL (via Prisma ORM).
*   **Maps**: Leaflet (OpenStreetMap).
*   **Language**: TypeScript.

## Database Schema (Blueprint)
This schema defines the core data structure for the application.

### `User`
*   `id`: String (UUID)
*   `email`: String (Unique, for login)
*   `role`: Enum (STUDENT, ADMIN)
*   `isVerified`: Boolean (Gated access)
*   `collegeIdUrl`: String (Image Path)
*   `vehicles`: Relation -> `Vehicle[]`
*   `ridesAsDriver`: Relation -> `Ride[]`
*   `bookings`: Relation -> `Booking[]`

### `Vehicle`
*   `id`: String (UUID)
*   `ownerId`: String (FK -> User)
*   `model`: String (e.g., "Swift")
*   `plateNumber`: String (e.g., "KA-05-...")
*   `type`: Enum (CAR, BIKE)
*   `capacity`: Int (e.g., 4)

### `Ride`
*   `id`: String (UUID)
*   `driverId`: String (FK -> User)
*   `vehicleId`: String (FK -> Vehicle)
*   `origin`: String (Lat/Lng + Name)
*   `destination`: String (Lat/Lng + Name)
*   `waypoints`: String[] (JSON of stops)
*   `departureTime`: DateTime
*   `seatPrice`: Float
*   `status`: Enum (SCHEDULED, EN_ROUTE, COMPLETED, CANCELLED)
*   `bookings`: Relation -> `Booking[]`

### `Booking`
*   `id`: String (UUID)
*   `rideId`: String (FK -> Ride)
*   `passengerId`: String (FK -> User)
*   `status`: Enum (PENDING, APPROVED, REJECTED)


### 1. Authentication & Profile
*   **Login**: Simple phone/email login.
*   **Verification Wall**: User cannot see rides until "Verified".
    *   Upload College ID (UI demo).
    *   Upload Aadhar (UI demo).
*   **Profile**: Name, Department (e.g., "CS 3rd Year"), Photo. (Crucial for the social aspect).

### 2. The "Driver" Flow (Publishing)
*   **Post a Ride**:
    *   Origin (Home) -> Destination (College).
    *   Stops/Waypoints (Major landmarks).
    *   Departure Time.
    *   **Vehicle Selection**: Dropdown of saved vehicles + "Add New Vehicle" inline option.
    *   Seats Available & Cost Contribution.
    *   **"Ride Mode"**: A view for the driver to see who has booked and who to pick up.

### 3. The "Rider" Flow (Tagging Along)
*   **Find a Ride**:
    *   Filter by route (e.g., "Anyone going from Whitefield?").
    *   View Driver Profile (Year, Dept, Rating/Reviews).
*   **Booking**: "Request to Tag Along".
*   **Status**: Pending -> Accepted.

### 4. Connect & Social
*   **Chat/Coordination**: A simple message box for the ride context.
*   **Gamification (New)**:
    *   "Green Leaderboard": Rank students by CO2 saved / Km shared.
    *   Badges for top carpoolers.

### 5. Safety Features (New)
*   **Live Share**: Rider can input parent's email to auto-send a live tracking link when the ride starts.

## Improvements to Design
- **"Vibrant & Young" Aesthetic**: Since this is for college students, the UI will use modern, punchy colors (Gen Z aesthetic), rounded cards, and smooth animations.

## Verification Plan
### Manual Verification
1.  **User Flow**: Register -> Upload Fake ID -> Admin (You) approves (or auto-approve for demo) -> Access App.
2.  **Ride Flow**: Post a ride as Driver A -> Switch account to Rider B -> Find matching ride -> Book -> Driver A accepts.
