import { prisma } from "@/lib/prisma";
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


        const products = await prisma.product.findMany({
            include: {
                category: true,
                images: true
            },
            where:{
                isOrdered:false
            }
        });
        console.log(products)
        return NextResponse.json({ message: products }, { headers: corsHeaders })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
