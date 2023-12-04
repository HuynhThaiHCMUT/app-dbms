import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const query = req.nextUrl.searchParams.get("q") ?? "";
    const category = req.nextUrl.searchParams.get("tag") ?? "";
    const sort = req.nextUrl.searchParams.get("sort") ?? "";

    //TODO: Get product data from database

    //return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;
    const p = await req.json();


    //let res: DatabaseResponse;

    return NextResponse.json({success: false, message: "Feature not implemented"});
}

export async function PUT(req: NextRequest) {
    const client = await clientPromise;
    const reqBody = await req.json();
    
    //let res: DatabaseResponse;
    
    return NextResponse.json({success: false, message: "Feature not implemented"});
}

export async function DELETE(req: NextRequest) {
    const client = await clientPromise;
    const id = req.nextUrl.searchParams.get("d") ?? "";


    //let res: DatabaseResponse;
    
    return NextResponse.json({success: false, message: "Feature not implemented"});
}