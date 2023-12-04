import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const query = req.nextUrl.searchParams.get("q") ?? "";

    //TODO: Get employee data from database

    //return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;
    const staff: NewStaffData = await req.json();

    //TODO: Insert new employee to database

    //let res: DatabaseResponse;

    //TODO: Return response message

    //return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {
    const client = await clientPromise;
    const requestBody: PutStaffRequestBody = await req.json();

    //TODO: Insert new employee to database

    //let res: DatabaseResponse;

    //TODO: Return response message

    //return NextResponse.json(res);
}

export async function DELETE(req: NextRequest) {
    const client = await clientPromise;
    const id = req.nextUrl.searchParams.get("d") ?? "";

    //TODO: Delete an employee from database

    //let res: DatabaseResponse;

    //TODO: Return response message
    
    //return NextResponse.json(res);
}