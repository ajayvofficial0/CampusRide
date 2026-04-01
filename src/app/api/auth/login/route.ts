import { NextResponse } from 'next/server';
import { getDemoUser } from '@/lib/demo-data';

export async function POST(req: Request) {
    try {
        const { phone, otp } = await req.json();

        if (!phone) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        if (otp && otp !== '123456') {
            return NextResponse.json({ error: 'Use 123456 for the dev OTP.' }, { status: 401 });
        }

        const user = await getDemoUser();

        return NextResponse.json({
            token: 'dev-demo-token',
            user: {
                id: user.id,
                name: user.name,
                phone,
                department: user.department,
                isVerified: user.isVerified,
            },
        }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
