# CampusRide

Desktop-first college carpool demo built with `Next.js`, `TypeScript`, `Prisma`, `PostgreSQL`, and `Tailwind CSS`.

This project is intentionally demo-first:
- login is fake
- OTP is fixed to `123456`
- data is seeded automatically from the app
- messaging is demo-backed
- no real payment, OTP provider, or live tracking is included

## What It Demonstrates

- mobile-number OTP style login flow
- desktop three-column product shell
- create journey flow
- ongoing journeys feed
- journey details and seat request flow
- bookings view for riders
- ride management view for drivers
- demo-backed inbox/messages experience

## Tech Stack

- `Next.js 14`
- `React 18`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `Tailwind CSS`
- `Leaflet` and `react-leaflet` planned for fuller map work

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your env file

Copy [`.env.example`](D:\learning_workspace\projects\carpoolapp\.env.example) to `.env` and keep the default values unless you changed the database port.

Example:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/carpool_db?schema=public"
JWT_SECRET="supersecret_jwt_key_change_me"
```

### 3. Start PostgreSQL with Docker

This repo expects PostgreSQL from Docker via [docker-compose.yml](D:\learning_workspace\projects\carpoolapp\docker-compose.yml).

```bash
docker compose up -d
```

If Docker is not running, Prisma will fail to connect to `localhost:5432`.

### 4. Apply Prisma migration and generate client

```bash
npx prisma migrate dev
npx prisma generate
```

If the database is already initialized and you just want to apply existing migrations:

```bash
npx prisma migrate deploy
```

### 5. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Demo Login

Use any 10-digit phone number and this OTP:

```text
123456
```

## Database Notes

The Docker database config in this repo is:

- host: `localhost`
- port: `5432`
- database: `carpool_db`
- username: `user`
- password: `password`

If port `5432` is already occupied on your machine:

1. change the host-side port in [docker-compose.yml](D:\learning_workspace\projects\carpoolapp\docker-compose.yml)
2. update `DATABASE_URL` in your `.env`

Example alternate port:

```yml
ports:
  - "5433:5432"
```

```env
DATABASE_URL="postgresql://user:password@localhost:5433/carpool_db?schema=public"
```

## Current Demo Flows

### Rider flow

`Login -> Ongoing Journeys -> Journey Details -> Request Seat -> Bookings`

### Driver flow

`Login -> Create Journey -> My Journeys -> Accept/Reject rider`

## Project Structure

```text
src/
  app/
    api/
    bookings/
    home/
    journeys/
    login/
    messages/
    my-journeys/
    post-ride/
    profile/
  components/
  lib/
prisma/
Docs/
```

## Important Demo Constraints

- authentication is intentionally fake
- shell/profile/messages use shared demo-backed content
- seeded demo users, rides, bookings, and conversations are created through app logic
- some route/map data is still placeholder-level for UI presentation

## Useful Commands

```bash
npm run dev
npx tsc --noEmit
npx prisma studio
docker compose up -d
docker compose down
```

## Next Improvements

- persist route direction and pickup stops in the Prisma schema instead of demo helpers
- wire map views with Leaflet route visuals
- add lightweight demo message sending
- add a cleaner seeding workflow separate from request-time bootstrapping
