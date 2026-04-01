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

export async function GET(req: Request) {
    const userId = getUserId(req);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const vehicles = await prisma.vehicle.findMany({
            where: { ownerId: userId },
        });
        return NextResponse.json(vehicles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const userId = getUserId(req);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { model, plateNumber, type, capacity } = body;

        const vehicle = await prisma.vehicle.create({
            data: {
                ownerId: userId,
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
