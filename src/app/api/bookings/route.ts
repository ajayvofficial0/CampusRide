import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const getUserId = (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch {
        return null;
    }
};

export async function POST(req: Request) {
    const userId = getUserId(req);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { rideId } = await req.json();

        // Check if ride exists
        const ride = await prisma.ride.findUnique({
            where: { id: rideId },
        });

        if (!ride) {
            return NextResponse.json({ error: 'Ride not found' }, { status: 404 });
        }

        // Check if already booked
        const existing = await prisma.booking.findFirst({
            where: { rideId, passengerId: userId },
        });

        if (existing) {
            return NextResponse.json({ error: 'Already booked' }, { status: 409 });
        }

        const booking = await prisma.booking.create({
            data: {
                rideId,
                passengerId: userId,
                status: 'PENDING',
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json({ error: 'Failed to book ride' }, { status: 500 });
    }
}
