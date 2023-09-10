import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ message: "UnAuthorizesd User" }, { status: 401 })
        }

        const products = await prisma.product.findMany({
            include: {
                category: true 
            }
        });
        console.log(products)
        return NextResponse.json({ message: products }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

interface image {
    url?: String
}


export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        const requestBody = await request.json();
        const { categoryId, name, price, description, images } = requestBody;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }

        await prisma.product.create({
            data: {
                name,
                price,
                description,
                categoryId: parseInt(categoryId),
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        },);

        const data = await prisma.product.findMany();

        console.log(data)
        return NextResponse.json({ message: data }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

