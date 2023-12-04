import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const start = req.nextUrl.searchParams.get("q") ?? "";
    const end = req.nextUrl.searchParams.get("q") ?? "";
    const top = req.nextUrl.searchParams.get("q") ?? "";

    //TODO: Get statistic from database

    //return NextResponse.json(data);
}