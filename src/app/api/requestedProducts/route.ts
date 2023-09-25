import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);

        if (!userId) {
            return NextResponse.json("unAuthorized User", { status: 401 })
        }

        const requestedProducts = await prisma.requestedProduct.findMany({
            include: {
                images: true
            }
        });
        return NextResponse.json({ message: requestedProducts }, { status: 200 })


    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { name, price, description, images, email, phoneNo } = requestBody;
        await prisma.requestedProduct.create({
            data: {
                name,
                price,
                description,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
                email,
                phoneNo

            },
        },);

        const data = await prisma.requestedProduct.findMany();

        console.log(data)
        return NextResponse.json({ message: data }, {headers:corsHeaders}); 
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}