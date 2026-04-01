import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoUser } from '@/lib/demo-data';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const user = await getDemoUser();

    const { id } = params;
    const { status } = await req.json(); // "APPROVED" or "REJECTED"

    if (!['APPROVED', 'REJECTED'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    try {
        await ensureDemoDataset();

        // 1. Fetch the booking to find the rideId
        const booking = await prisma.booking.findUnique({
            where: { id },
            include: { ride: true },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // 2. Verify that the current user is the DRIVER of the ride
        if (booking.ride.driverId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 3. Update the booking status
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedBooking);
    } catch (error) {
        console.error('Update booking error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
