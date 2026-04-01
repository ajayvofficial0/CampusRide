import { CheckCircle2, Clock3, MapPinned } from 'lucide-react';

const bookings = [
  { route: 'Marathahalli to Campus', time: 'Today, 8:15 AM', status: 'Accepted' },
  { route: 'Campus to Whitefield', time: 'Today, 5:45 PM', status: 'Requested' },
  { route: 'Bellandur to Campus', time: 'Tomorrow, 8:00 AM', status: 'Accepted' },
];

export default function BookingsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Bookings</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Your ride requests and confirmed trips</h2>

        <div className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <div key={`${booking.route}-${booking.time}`} className="rounded-[24px] border border-border bg-background p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">{booking.route}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{booking.time}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="h-4 w-4" />
                  Boarding at main signal
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  Track status from booking view
                </span>
              </div>
            </div>
          ))}
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
            <li>3. Choose a pickup point and request a seat.</li>
            <li>4. Use chat for coordination once accepted.</li>
          </ol>
        </div>
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold">Tracking strategy</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This prototype keeps booking visible without live tracking. The next step would be tracking-lite with manual trip states like Starting, Reached pickup, and Completed.
          </p>
        </div>
      </section>
    </div>
  );
}
