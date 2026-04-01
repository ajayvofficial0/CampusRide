import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware helper to verify token (simplified for MVP)
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

export async function GET(req: Request) {
    try {
        const rides = await prisma.ride.findMany({
            include: {
                driver: {
                    select: { name: true, collegeIdUrl: true, department: true }
                },
                vehicle: true
            },
            orderBy: { departureTime: 'asc' }
        });
        return NextResponse.json(rides);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch rides' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const userId = getUserId(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { vehicleId, origin, destination, departureTime, seatPrice } = await req.json();

        const ride = await prisma.ride.create({
            data: {
                driverId: userId,
                vehicleId,
                origin,
                destination,
                departureTime: new Date(departureTime),
                seatPrice: parseFloat(seatPrice),
                status: 'SCHEDULED'
            }
        });

        return NextResponse.json(ride, { status: 201 });
    } catch (error) {
        console.error('Create ride error:', error);
        return NextResponse.json({ error: 'Failed to create ride' }, { status: 500 });
    }
}
