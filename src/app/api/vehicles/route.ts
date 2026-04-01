import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getDemoUser } from '@/lib/demo-data';

export async function GET(req: Request) {
    try {
        const user = await getDemoUser();
        const vehicles = await prisma.vehicle.findMany({
            where: { ownerId: user.id },
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const user = await getDemoUser();
        const body = await req.json();
        const { model, plateNumber, type, capacity } = body;

        if (!model || !plateNumber || !type || !capacity) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                ownerId: user.id,
                model,
                plateNumber,
                type, // Ensure this matches usage in frontend (CAR/BIKE)
                capacity: parseInt(capacity),
            },
        });

        return NextResponse.json(vehicle, { status: 201 });
    } catch (error) {
        console.error('Create vehicle error:', error);
        return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
    }
}
