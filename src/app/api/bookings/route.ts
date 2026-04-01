import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureDemoBooking, ensureDemoDataset, getDemoUser } from '@/lib/demo-data';

export async function POST(req: Request) {
    try {
        await ensureDemoDataset();
        const user = await getDemoUser();
        const { rideId } = await req.json();

        if (!rideId) {
            return NextResponse.json({ error: 'Ride id is required' }, { status: 400 });
        }

        // Check if ride exists
        const ride = await prisma.ride.findUnique({
            where: { id: rideId },
        });

        if (!ride) {
            return NextResponse.json({ error: 'Ride not found' }, { status: 404 });
        }

        if (ride.driverId === user.id) {
            return NextResponse.json({ error: 'You cannot book your own ride' }, { status: 400 });
        }

        // Check if already booked
        const existing = await prisma.booking.findFirst({
            where: { rideId, passengerId: user.id },
        });

        if (existing) {
            return NextResponse.json({ error: 'Already booked' }, { status: 409 });
        }

        const booking = await ensureDemoBooking(rideId, user.id);

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to book ride' }, { status: 500 });
    }
}
