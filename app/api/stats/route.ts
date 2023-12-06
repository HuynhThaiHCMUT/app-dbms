import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    //start and end is Unix Epoch string
    const start = req.nextUrl.searchParams.get("start") ?? "";
    const end = req.nextUrl.searchParams.get("end") ?? "";
    const top = req.nextUrl.searchParams.get("top") ?? "";

    const request = client.request();
    request.input("topCount", sql.Int, parseInt(top));
    request.input("startDate", sql.Date, new Date(parseInt(start)).toDateString())
    request.input("endDate", sql.Date, new Date(parseInt(end)).toDateString())
    const data = (await request.query("SELECT * FROM GetTopSellingProductsFunction(@topCount, @startDate, @endDate)")).recordset;
    return NextResponse.json(data);
}