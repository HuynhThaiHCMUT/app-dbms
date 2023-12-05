import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    const query = req.nextUrl.searchParams.get("q") ?? "";

    //TODO: Get employee data from database
    let data = (await client.query`SELECT e.uid AS id, position AS role, birthday, fname, lname, email, phone, status FROM Employee e, Store_user s WHERE e.uid = s.uid`).recordset;
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;
    const staff: StaffData = await req.json();

    //TODO: Insert new employee to database
    const request = client.request()
    request.input("lname", sql.NVarChar, staff.lname)
    request.input("fname", sql.NVarChar, staff.fname)
    request.input("email", sql.VarChar, staff.email)
    request.input("phone", sql.VarChar, staff.phone)
    request.input("position", sql.NVarChar, staff.role)
    request.input("birthday", sql.Date, staff.birthday)

    try {
        await request.execute("InsertEmployee")
    
        const response: DatabaseResponse = {
          success: true,
          message: 'Successfully inserted data',
        };
    
        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Insert failed. ';
        console.error(error);
        // Check the error details to provide more specific messages
        if (error.number) {
          // SQL Server error number
            switch (error.number) {
                case 51001:
                    errorMessage += 'Error: Last name cannot be NULL.';
                    break;
                case 51002:
                    errorMessage += 'Error: Last name exceeds the maximum length of 30 characters.';
                    break;
                case 51003:
                    errorMessage += 'Error: First name cannot be NULL.';
                    break;
                case 51004:
                    errorMessage += 'Error: First name exceeds the maximum length of 15 characters.';
                    break;
                case 51005:
                    errorMessage += 'Error: Email cannot be NULL and must be in a valid format.';
                    break;
                case 51006:
                    errorMessage += 'Error: Email exceeds the maximum length of 50 characters.';
                    break;
                case 51007:
                    errorMessage += 'Error: Phone number cannot be NULL and must be in a valid format.';
                    break;
                case 51008:
                    errorMessage += 'Error: Phone number exceeds the maximum length of 15 characters.';
                    break;
                case 51009:
                    errorMessage += 'Error: Position cannot be NULL.';
                    break;
                case 51010:
                    errorMessage += 'Error: Position exceeds the maximum length of 15 characters.';
                    break;
                case 51011:
                    errorMessage += 'Error: Birthday cannot be NULL.';
                    break;
                case 51012:
                    errorMessage += 'Error: Employee must be at least 18 years old.';
                    break;   
                default:
                    break;
            }
        }
    
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
    request.input("uid", sql.Int, staff.id)
    request.input("lname", sql.NVarChar, staff.lname)
    request.input("fname", sql.NVarChar, staff.fname)
    request.input("email", sql.VarChar, staff.email)
    request.input("phone", sql.VarChar, staff.phone)
    request.input("position", sql.NVarChar, staff.role)
    request.input("birthday", sql.Date, staff.birthday)

    try {
        await request.execute("UpdateEmployee")

        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully updated employee data',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Update failed. ';

        // Log the entire error for debugging
        console.error(error);
        // Check the error details to provide more specific messages
        if (error.number) {
            // SQL Server error number
            switch (error.number) {
                case 52000:
                    errorMessage += 'Error: Employee with the specified UID does not exist.';
                    break;
                case 52001:
                    errorMessage += 'Error: Last name cannot be NULL.';
                    break;
                case 52002:
                    errorMessage += 'Error: Last name exceeds the maximum length of 30 characters.';
                    break;
                case 52003:
                    errorMessage += 'Error: First name cannot be NULL.';
                    break;
                case 52004:
                    errorMessage += 'Error: First name exceeds the maximum length of 15 characters.';
                    break;
                case 52005:
                    errorMessage += 'Error: Email cannot be NULL and must be in a valid format.';
                    break;
                case 52006:
                    errorMessage += 'Error: Email exceeds the maximum length of 50 characters.';
                    break;
                case 52007:
                    errorMessage += 'Error: Phone number cannot be NULL and must be in a valid format.';
                    break;
                case 52008:
                    errorMessage += 'Error: Phone number exceeds the maximum length of 15 characters.';
                    break;
                case 52009:
                    errorMessage += 'Error: Position cannot be NULL.';
                    break;
                case 52010:
                    errorMessage += 'Error: Position exceeds the maximum length of 15 characters.';
                    break;
                case 52011:
                    errorMessage += 'Error: Birthday cannot be NULL.';
                    break;
                case 52012:
                    errorMessage += 'Error: Employee must be at least 18 years old.';
                    break;   
                default:
                    break;
            }
        }

        const response: DatabaseResponse = {
            success: false,
            message: errorMessage,
        };

        return NextResponse.json(response);
    }
}

export async function DELETE(req: NextRequest) {
    const client = await clientPromise;
    const id = req.nextUrl.searchParams.get("d") ?? "";

    const request = client.request()
    request.input("uid", sql.Int, id)

    try {
        // Delete an employee from the database
        await request.execute("DeleteEmployee");

        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully deleted employee',
        };

        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Delete failed. ';

        // Log the entire error for debugging
        console.error(error);

        // Check the error details to provide more specific messages
        if (error.number) {
            // SQL Server error number
            switch (error.number) {
                case 53000:
                    errorMessage += 'Error: Employee with the specified UID does not exist.';
                    break;
                case 53001:
                    errorMessage += 'Error: Last name cannot be NULL.';
                    break;
                case 53002:
                    errorMessage += 'Error: Last name exceeds the maximum length of 30 characters.';
                    break;   
                default:
                    break;
            }
        }

        const response: DatabaseResponse = {
            success: false,
            message: errorMessage,
        };

        return NextResponse.json(response);
    }
}