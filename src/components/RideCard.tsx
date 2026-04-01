"use client";

import Link from 'next/link';
import { Car, Clock, ShieldCheck, User } from 'lucide-react';

interface RideProps {
  id: string;
  driverName: string;
  driverDept?: string | null;
  driverPhoto?: string | null;
  vehicleModel: string;
  origin: string;
  destination: string;
  departureTime: string;
  price: number;
}

export default function RideCard({
  id,
  driverName,
  driverDept,
  driverPhoto,
  vehicleModel,
  origin,
  destination,
  departureTime,
  price,
}: RideProps) {
  const formattedTime = new Date(departureTime).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-[28px] border border-border/80 bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-secondary/10">
          {driverPhoto ? (
            <img src={driverPhoto} alt={driverName} className="h-full w-full object-cover" />
          ) : (
            <User className="h-6 w-6 text-secondary" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{driverName}</h3>
          {driverDept ? <p className="text-xs text-muted-foreground">{driverDept}</p> : null}
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-accent px-2 py-1">
          <Car className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">{vehicleModel}</span>
        </div>
      </div>

      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
        <ShieldCheck className="h-3 w-3" />
        Verified route
      </div>

      <div className="relative space-y-3 pl-2">
        <div className="absolute bottom-6 left-[3px] top-2 w-0.5 bg-border" />

        <div className="flex items-start gap-3">
          <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-sm font-medium">{origin}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
          <div>
            <p className="text-xs text-muted-foreground">To</p>
            <p className="text-sm font-medium">{destination}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-medium">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Rs {price}</span>
          <Link
            href={`/journeys?ride=${id}`}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book Seat
          </Link>
        </div>
      </div>
    </div>
  );
}
