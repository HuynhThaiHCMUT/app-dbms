import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;

    //TODO: Get employee data from database
    const request = client.request();

    if (req.nextUrl.searchParams.has("start") && req.nextUrl.searchParams.has("end")) {
        const start = req.nextUrl.searchParams.get("start");
        const end = req.nextUrl.searchParams.get("end");
        request.input("StartDate", sql.Date, start);
        request.input("EndDate", sql.Date, end);
        const data = (await request.execute("GetTotalWorkingHours")).recordset;
        return NextResponse.json(data);
    } else {
        const id = req.nextUrl.searchParams.get("id") ?? "-1";
        request.input("id", sql.Int, parseInt(id));
        const data = (await request.query("SELECT start_hour AS startHour, end_hour AS endHour FROM Working_schedule WHERE uid = @id")).recordset;
        return NextResponse.json(data);
    }
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