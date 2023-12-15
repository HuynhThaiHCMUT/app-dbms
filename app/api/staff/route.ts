import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const query = req.nextUrl.searchParams.get("q") ?? "";
    let sql = "SELECT e.uid AS id, position AS role, birthday, fname, lname, email, phone, status FROM Employee e, Store_user s WHERE e.uid = s.uid";


    let data = (await client.execute(sql))[0];
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;
    const staff: StaffData = await req.json();

    try {
        await client.execute("CALL InsertEmployee(?, ?, ?, ?, ?, ?)", [staff.lname, staff.fname, staff.email, staff.phone, staff.role, new Date(staff.birthday)]);
    
        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully inserted data',
        };
    
        return NextResponse.json(response);
    } catch (error: any) {
        // Log the entire error for debugging
        console.error(error);

        const response: DatabaseResponse = {
            success: false,
            message: error.sqlMessage,
        };

        return NextResponse.json(response);
    }
}

export async function PUT(req: NextRequest) {
    const client = await clientPromise;
    const staff: StaffData = await req.json();

    try {
        await client.execute("CALL UpdateEmployee(?, ?, ?, ?, ?, ?, ?)", [staff.id, staff.lname, staff.fname, staff.email, staff.phone, staff.role, new Date(staff.birthday)]);
    

        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully updated employee data',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        // Log the entire error for debugging
        console.error(error);

        const response: DatabaseResponse = {
            success: false,
            message: error.sqlMessage,
        };

        return NextResponse.json(response);
    }
}

export async function DELETE(req: NextRequest) {
    const client = await clientPromise;
    const id = req.nextUrl.searchParams.get("d") ?? "";

    try {
        // Delete an employee from the database
        await client.execute("CALL DeleteEmployee(?)", [parseInt(id)]);

        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully deleted employee',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        // Log the entire error for debugging
        console.error(error);

        const response: DatabaseResponse = {
            success: false,
            message: error.sqlMessage,
        };

        return NextResponse.json(response);
    }
}