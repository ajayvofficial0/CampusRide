import { CheckCircle2, Clock3, MapPinned } from 'lucide-react';
import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoStops, getDemoUser } from '@/lib/demo-data';

async function getBookings() {
  await ensureDemoDataset();
  const user = await getDemoUser();

  return prisma.booking.findMany({
    where: { passengerId: user.id },
    include: {
      ride: {
        include: {
          driver: {
            select: {
              name: true,
              department: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

const bookingTone: Record<string, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-700',
  PENDING: 'bg-amber-100 text-amber-700',
  REJECTED: 'bg-rose-100 text-rose-700',
};

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bookings</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Your ride requests and confirmed trips</h2>

        <div className="mt-6 space-y-4">
          {bookings.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-border bg-background p-10 text-center">
              <p className="text-lg font-semibold">No bookings yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Request a seat from the journeys feed and your trip status will appear here.
              </p>
            </div>
          ) : (
            bookings.map((booking) => {
              const stops = getDemoStops(booking.ride.origin, booking.ride.destination);
              const boardingStop = stops[0] || 'Direct route';
              const formattedTime = booking.ride.departureTime.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });

              return (
                <div key={booking.id} className="rounded-[24px] border border-border bg-background p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold">
                        {booking.ride.origin} to {booking.ride.destination}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Driver: {booking.ride.driver.name || 'Student driver'}
                        {booking.ride.driver.department ? ` • ${booking.ride.driver.department}` : ''}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{formattedTime}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${bookingTone[booking.status] ?? 'bg-slate-100 text-slate-700'}`}>
                      {booking.status === 'APPROVED' ? 'Accepted' : booking.status === 'PENDING' ? 'Requested' : 'Rejected'}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <MapPinned className="h-4 w-4" />
                      Boarding at {boardingStop}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      Fare Rs {booking.ride.seatPrice}
                    </span>
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
            <h3 className="text-lg font-semibold">Booking flow in this prototype</h3>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>1. Open a journey from the feed.</li>
            <li>2. Review route, stops, and driver trust info.</li>
            <li>3. Request a seat from the journey details page.</li>
            <li>4. Track accepted or pending state here.</li>
          </ol>
        </div>
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold">Tracking strategy</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This demo keeps booking states simple. The next realistic enhancement is tracking-lite with manual trip states like Starting, Reached pickup, and Completed.
          </p>
        </div>
      </section>
    </div>
  );
}
