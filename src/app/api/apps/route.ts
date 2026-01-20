import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const apps = await prisma.application.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(apps);
    } catch (error) {
        console.error('Error fetching apps:', error);
        return NextResponse.json({ error: 'Error fetching applications' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, url, imageUrl, stack } = body;

        const newApp = await prisma.application.create({
            data: {
                name,
                url,
                imageUrl,
                stack,
            },
        });

        return NextResponse.json(newApp, { status: 201 });
    } catch (error) {
        console.error('Error creating app:', error);
        return NextResponse.json({ error: 'Error creating application' }, { status: 500 });
    }
}
