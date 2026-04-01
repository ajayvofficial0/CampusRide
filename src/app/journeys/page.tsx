import prisma from '@/lib/prisma';
import RideCard from '@/components/RideCard';
import { Clock3, Filter, MapPinned } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getRides() {
  try {
    return await prisma.ride.findMany({
      where: {
        status: 'SCHEDULED',
      },
      include: {
        driver: {
          select: { name: true, collegeIdUrl: true, department: true },
        },
        vehicle: true,
      },
      orderBy: { departureTime: 'asc' },
      take: 8,
    });
  } catch (error) {
    console.error('Error fetching rides:', error);
    return [];
  }
}

export default async function JourneysPage() {
  const rides = await getRides();

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Journeys</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Ongoing journeys around campus</h2>
            <p className="mt-2 text-sm text-muted-foreground">Browse posted rides, compare route fit, and request a seat.</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-background px-4 py-3 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            To college
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {rides.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-border bg-background p-12 text-center">
              <p className="text-lg font-semibold">No rides posted yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Once drivers create journeys, they will appear here for booking.</p>
            </div>
          ) : (
            rides.map((ride) => (
              <RideCard
                key={ride.id}
                id={ride.id}
                driverName={ride.driver.name || 'Student Driver'}
                driverDept={ride.driver.department}
                vehicleModel={ride.vehicle.model}
                origin={ride.origin}
                destination={ride.destination}
                departureTime={ride.departureTime.toISOString()}
                price={ride.seatPrice}
              />
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <MapPinned className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Route discovery</h3>
          </div>
          <div className="mt-4 h-[260px] rounded-[24px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(255,122,84,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_22%),linear-gradient(180deg,#fff,#f7f3ef)] p-5">
            <div className="rounded-2xl bg-card/90 p-4 shadow-sm">
              <p className="text-sm font-semibold">Map layer planned here</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This panel will show route previews, campus direction, and pickup point visibility once the map component is wired into the prototype.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold">Suggested filters</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Whitefield', 'Marathahalli', 'Morning', 'Seats 2+', 'To college'].map((filter) => (
              <span key={filter} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">
                {filter}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
