import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoUser } from '@/lib/demo-data';

export async function GET(req: Request) {
    try {
        await ensureDemoDataset();

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
        const user = await getDemoUser();
        const { vehicleId, origin, destination, departureTime, seatPrice } = await req.json();

        if (!vehicleId || !origin || !destination || !departureTime || !seatPrice) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const ride = await prisma.ride.create({
            data: {
                driverId: user.id,
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
