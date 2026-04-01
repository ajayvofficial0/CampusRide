import Link from 'next/link';
import { CheckCircle2, Clock3, MapPinned, Route, Ticket, UserRound } from 'lucide-react';
import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoStops, getDemoUser } from '@/lib/demo-data';
import BookingDecisionButton from '@/components/BookingDecisionButton';

async function getMyRides() {
  await ensureDemoDataset();
  const user = await getDemoUser();

  return prisma.ride.findMany({
    where: { driverId: user.id },
    include: {
      vehicle: true,
      bookings: {
        include: {
          passenger: {
            select: {
              name: true,
              department: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    orderBy: {
      departureTime: 'asc',
    },
  });
}

const statusTone: Record<string, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};

export default async function MyJourneysPage() {
  const rides = await getMyRides();

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4 rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">My Journeys</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Manage your posted rides</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Review rider requests, check route context, and decide who gets a seat.
          </p>
        </div>

        <div className="space-y-4">
          {rides.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-border bg-background p-10 text-center">
              <p className="text-lg font-semibold">No journeys posted yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Publish a ride first and it will show up here for management.</p>
            </div>
          ) : (
            rides.map((ride) => {
              const stops = getDemoStops(ride.origin, ride.destination);
              const approvedSeats = ride.bookings.filter((booking) => booking.status === 'APPROVED').length;
              const pendingRequests = ride.bookings.filter((booking) => booking.status === 'PENDING');
              const formattedTime = ride.departureTime.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });

              return (
                <div key={ride.id} className="rounded-[28px] border border-border bg-background p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-semibold">
                        {ride.origin} to {ride.destination}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{formattedTime}</p>
                    </div>
                    <Link href={`/journeys/${ride.id}`} className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent">
                      Open journey
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <InfoPill icon={<Ticket className="h-4 w-4" />} label={`${approvedSeats}/${ride.vehicle.capacity} seats filled`} />
                    <InfoPill icon={<Clock3 className="h-4 w-4" />} label={`${pendingRequests.length} pending requests`} />
                    <InfoPill icon={<Route className="h-4 w-4" />} label={ride.vehicle.model} />
                  </div>

                  <div className="mt-5 rounded-2xl border border-border/80 p-4">
                    <div className="flex items-center gap-2">
                      <MapPinned className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">Pickup flow</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(stops.length > 0 ? stops : ['Direct route']).map((stop) => (
                        <span key={stop} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Rider requests</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {ride.bookings.length} total
                      </p>
                    </div>

                    {ride.bookings.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                        No riders have requested this trip yet.
                      </div>
                    ) : (
                      ride.bookings.map((booking) => (
                        <div key={booking.id} className="rounded-2xl border border-border p-4">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">
                                <UserRound className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{booking.passenger.name || 'Student rider'}</p>
                                <p className="text-sm text-muted-foreground">{booking.passenger.department || 'College community member'}</p>
                              </div>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[booking.status] ?? 'bg-slate-100 text-slate-700'}`}>
                              {booking.status === 'APPROVED' ? 'Accepted' : booking.status === 'PENDING' ? 'Requested' : 'Rejected'}
                            </span>
                          </div>

                          {booking.status === 'PENDING' ? (
                            <div className="mt-4 flex gap-2">
                              <BookingDecisionButton bookingId={booking.id} status="APPROVED" label="Accept rider" tone="approve" />
                              <BookingDecisionButton bookingId={booking.id} status="REJECTED" label="Reject request" tone="reject" />
                            </div>
                          ) : (
                            <div className="mt-4 text-sm text-muted-foreground">
                              {booking.status === 'APPROVED'
                                ? 'This rider is confirmed for the trip and can continue coordination in messages.'
                                : 'This request was declined and is no longer active.'}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Driver workflow</h3>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>1. Publish a journey from the create screen.</li>
            <li>2. Open this page to review inbound requests.</li>
            <li>3. Accept or reject riders.</li>
            <li>4. Use messages for pickup coordination after approval.</li>
          </ol>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold">Why this matters</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This page completes the other half of the MVP loop. Riders can now request seats, and drivers can actually act on those requests instead of the app stopping at a static demo.
          </p>
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
