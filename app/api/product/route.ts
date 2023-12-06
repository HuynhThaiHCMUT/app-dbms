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