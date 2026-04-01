import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CarFront, Clock3, MapPinned, ShieldCheck, Ticket, UserRound } from 'lucide-react';
import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoStops, getDemoUser } from '@/lib/demo-data';
import RequestSeatButton from '@/components/RequestSeatButton';

async function getRideDetails(id: string) {
  await ensureDemoDataset();

  return prisma.ride.findUnique({
    where: { id },
    include: {
      driver: {
        select: {
          id: true,
          name: true,
          department: true,
          isVerified: true,
        },
      },
      vehicle: true,
      bookings: {
        include: {
          passenger: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export default async function JourneyDetailsPage({ params }: { params: { id: string } }) {
  const [ride, currentUser] = await Promise.all([getRideDetails(params.id), getDemoUser()]);

  if (!ride) {
    notFound();
  }

  const isOwnRide = ride.driver.id === currentUser.id;
  const existingBooking = ride.bookings.find((booking) => booking.passengerId === currentUser.id);
  const stops = getDemoStops(ride.origin, ride.destination);
  const bookedSeats = ride.bookings.filter((booking) => booking.status !== 'REJECTED').length;
  const seatsLeft = Math.max(ride.vehicle.capacity - bookedSeats, 0);
  const formattedTime = ride.departureTime.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="space-y-4 rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Journey Details</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {ride.origin} to {ride.destination}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Review the route, pickup context, and driver before you request a seat.
          </p>
        </div>

        <div className="rounded-[28px] border border-border bg-background p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                {ride.driver.isVerified ? 'Verified student' : 'Profile review pending'}
              </div>
              <div className="relative space-y-4 pl-2">
                <div className="absolute bottom-7 left-[3px] top-2 w-0.5 bg-border" />
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="text-base font-semibold">{ride.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="text-base font-semibold">{ride.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Per seat</p>
              <p className="mt-1 text-2xl font-semibold">Rs {ride.seatPrice}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <InfoPill icon={<Clock3 className="h-4 w-4" />} label={formattedTime} />
            <InfoPill icon={<CarFront className="h-4 w-4" />} label={ride.vehicle.model} />
            <InfoPill icon={<Ticket className="h-4 w-4" />} label={`${seatsLeft} seats left`} />
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-background p-5">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Pickup stops</h3>
          </div>
          <div className="mt-4 space-y-3">
            {stops.length === 0 ? (
              <p className="text-sm text-muted-foreground">This ride currently goes directly to destination without saved intermediate stops.</p>
            ) : (
              stops.map((stop, index) => (
                <div key={stop} className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium">{stop}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <UserRound className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold">{ride.driver.name || 'Student driver'}</p>
              <p className="text-sm text-muted-foreground">{ride.driver.department || 'College community member'}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {isOwnRide ? (
              <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                This is your ride. Use the driver management view to review rider requests and update trip decisions.
                <Link href="/my-journeys" className="mt-3 inline-flex text-sm font-semibold text-primary">
                  Open my journeys
                </Link>
              </div>
            ) : existingBooking ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Booking already created</p>
                <p className="mt-1 text-sm text-emerald-700">
                  Current status: {existingBooking.status.toLowerCase()}
                </p>
                <Link href="/bookings" className="mt-3 inline-flex text-sm font-semibold text-emerald-800">
                  Open bookings
                </Link>
              </div>
            ) : (
              <RequestSeatButton rideId={ride.id} />
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold">Ride context</p>
          <div className="mt-4 h-[240px] rounded-[24px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(255,122,84,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_24%),linear-gradient(180deg,#fff,#f7f3ef)] p-5">
            <div className="rounded-2xl bg-card/90 p-4 shadow-sm">
              <p className="text-sm font-semibold">Map integration placeholder</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The visual structure is ready for Leaflet. For the GitHub demo, route stops and pickup context are already visible without adding live map complexity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
  );
}
