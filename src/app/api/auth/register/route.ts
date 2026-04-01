import { NextResponse } from 'next/server';
import { getDemoUser } from '@/lib/demo-data';

export async function POST(req: Request) {
    try {
        const { name, phone, department } = await req.json();

        if (!name || !phone) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const user = await getDemoUser();

        return NextResponse.json({
            token: 'dev-demo-token',
            user: {
                id: user.id,
                name,
                phone,
                department: department || user.department,
                isVerified: true,
            },
        }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
