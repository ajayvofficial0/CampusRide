"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RequestSeatButton({ rideId }: { rideId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rideId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to request seat');
        return;
      }

      router.push('/bookings');
      router.refresh();
    } catch {
      setError('Failed to request seat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleRequest}
        disabled={loading}
        className="w-full rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? 'Requesting seat...' : 'Request Seat'}
      </button>
      {error ? (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
