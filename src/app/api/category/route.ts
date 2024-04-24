import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}



export async function GET(request: NextRequest) {
    try {

        const categories = await prisma.productCategory.findMany()
        return NextResponse.json({ message: categories }, {headers: corsHeaders });


    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}



export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json()
        const { category } = requestBody
        const {userId}=auth()

        if (!category) {
            return NextResponse.json({ message: "Invalid Category" }, { status: 400 })
        }

        if(!isAdmin(userId)){
            return NextResponse.json({message:"Only Admin can Edit"},{status:400})
        }

        await prisma.productCategory.create({
            data: {
                name: category
            }
        })
        // await connection.query('INSERT INTO product_categories (name) VALUES (?)', [category]);
        const data = await prisma.productCategory.findMany({})
        //select * from product_categories
        return NextResponse.json({ message: data }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
} 