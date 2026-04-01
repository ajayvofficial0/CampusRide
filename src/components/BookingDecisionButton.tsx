"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BookingDecisionButtonProps = {
  bookingId: string;
  status: 'APPROVED' | 'REJECTED';
  label: string;
  tone: 'approve' | 'reject';
};

export default function BookingDecisionButton({
  bookingId,
  status,
  label,
  tone,
}: BookingDecisionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`rounded-xl px-4 py-2 text-xs font-semibold transition disabled:opacity-60 ${
        tone === 'approve'
          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
      }`}
    >
      {loading ? 'Updating...' : label}
    </button>
  );
}
