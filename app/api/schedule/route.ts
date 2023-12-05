import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;

    //TODO: Get employee data from database
    //return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;

    //TODO: Insert new employee to database
    const request = client.request()

    try {
        await request.execute("")
    
        const response: DatabaseResponse = {
          success: true,
          message: '',
        };
    
        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Insert failed. ';
        console.error(error);
    
        const response: DatabaseResponse = {
            success: false,
            message: errorMessage,
        };
    
        return NextResponse.json(response);
    }
}

export async function PUT(req: NextRequest) {
    const client = await clientPromise;
    const staff: StaffData = await req.json();

    const request = client.request()
    

    try {
        await request.execute("")

        const response: DatabaseResponse = {
            success: true,
            message: '',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Update failed. ';

        // Log the entire error for debugging
        console.error(error);

        const response: DatabaseResponse = {
            success: false,
            message: errorMessage,
        };

        return NextResponse.json(response);
    }
}

export async function DELETE(req: NextRequest) {
    const client = await clientPromise;

    const request = client.request()

    try {
        // Delete an employee from the database
        await request.execute("");

        const response: DatabaseResponse = {
            success: true,
            message: '',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Delete failed. ';

        // Log the entire error for debugging
        console.error(error);

        const response: DatabaseResponse = {
            success: false,
            message: errorMessage,
        };

        return NextResponse.json(response);
    }
}