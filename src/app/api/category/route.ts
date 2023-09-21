import { prisma } from "@/lib/prisma";
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

        if (!category) {
            return NextResponse.json({ message: "Invalid Category" }, { status: 400 })
        }

        await prisma.productCategory.create({
            data: {
                name: category
            }
        })
        const data = await prisma.productCategory.findMany()
        return NextResponse.json({ message: data }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
} 