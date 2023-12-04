import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    //start and end is Unix Epoch string
    const start = req.nextUrl.searchParams.get("start") ?? "";
    const end = req.nextUrl.searchParams.get("end") ?? "";
    const top = req.nextUrl.searchParams.get("top") ?? "";

    //TODO: Get statistic from database

    //return NextResponse.json(data);
}