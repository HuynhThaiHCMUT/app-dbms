import { NextRequest, NextResponse } from 'next/server';
import { clientPromise, sql } from '../db';

export async function GET(req: NextRequest) {
    const client = await clientPromise;
    
    const request = client.request();

    if (req.nextUrl.searchParams.has("getCategory")) {
        const data = (await request.query("SELECT cid AS id, name FROM Category")).recordset

        return NextResponse.json(data);
    }
    else {
        const query = req.nextUrl.searchParams.get("q") ?? "";
        const category = req.nextUrl.searchParams.get("tag") ?? "";
        const sort = req.nextUrl.searchParams.get("sort") ?? "";

        request.input("categoryName", sql.NVarChar, category);

        let data;
        if (category == "Tất cả") {
            data = (await request.query("SELECT pid AS id, name, base_price AS basePrice, description, quantity, status FROM Product")).recordset;
        } else {
            data = (await request.execute("SearchProductsByCategory")).recordset;
        }
        const filtered = data.filter((value) => (value.name.match(new RegExp(query, "i")) != null))
        return NextResponse.json(filtered);
    }
}

export async function POST(req: NextRequest) {
    const client = await clientPromise;
    const p: ProductData = await req.json();

    const request = client.request();
    request.input("id", sql.Int, p.id);
    request.input("name", sql.NVarChar, p.name);
    request.input("description", sql.NVarChar, p.description);
    request.input("quantity", sql.Int, p.quantity);
    request.input("status", sql.NVarChar, p.status);
    request.input("basePrice", sql.Int, p.basePrice)

    try {
        await request.execute("InsertProduct");
    
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
                    errorMessage += 'Error: ID cannot be NULL or an existing value.';
                    break;
                case 51002:
                    errorMessage += 'Error: Name cannot be NULL.';
                    break;
                case 51003:
                    errorMessage += 'Error: Name exceeds the maximum length of 50 characters.';
                    break;
                case 51004:
                    errorMessage += 'Error: Description exceeds the maximum length of 100 characters.';
                    break;
                case 51005:
                    errorMessage += 'Error: Status exceeds the maximum length of 20 characters.';
                    break;
                case 51006:
                    errorMessage += 'Error: Quantity cannot be NULL.';
                    break;
                case 51007:
                    errorMessage += 'Error: Base price cannot be NULL.';
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
    const p: ProductData = await req.json();
    
    const request = client.request();
    request.input("id", sql.Int, p.id);
    request.input("name", sql.NVarChar, p.name);
    request.input("description", sql.NVarChar, p.description);
    request.input("quantity", sql.Int, p.quantity);
    request.input("status", sql.NVarChar, p.status);
    request.input("basePrice", sql.Int, p.basePrice)

    try {
        await request.execute("UpdateProduct");
    
        const response: DatabaseResponse = {
          success: true,
          message: 'Successfully updated data',
        };
    
        return NextResponse.json(response);
    } catch (error: any) {
        let errorMessage = 'Update failed. ';
        console.error(error);
        // Check the error details to provide more specific messages
        if (error.number) {
          // SQL Server error number
            switch (error.number) {
                case 51001:
                    errorMessage += 'Error: ID cannot be NULL or a non-existing value.';
                    break;
                case 51002:
                    errorMessage += 'Error: Name cannot be NULL.';
                    break;
                case 51003:
                    errorMessage += 'Error: Name exceeds the maximum length of 50 characters.';
                    break;
                case 51004:
                    errorMessage += 'Error: Description exceeds the maximum length of 100 characters.';
                    break;
                case 51005:
                    errorMessage += 'Error: Status exceeds the maximum length of 20 characters.';
                    break;
                case 51006:
                    errorMessage += 'Error: Quantity cannot be NULL.';
                    break;
                case 51007:
                    errorMessage += 'Error: Base price cannot be NULL.';
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

    const request = client.request();
    request.input("id", sql.Int, id);

    try {
        // Delete an employee from the database
        await request.execute("DeleteProduct");

        const response: DatabaseResponse = {
            success: true,
            message: 'Successfully deleted product',
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
                    errorMessage += 'Error: Product with the specified PID does not exist.';
                    break;
                case 53001:
                    errorMessage += 'Error: Cannot delete product. Related records exist in other tables: Unit.';
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