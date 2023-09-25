import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 })
        }

        const requestedProduct = await prisma.requestedProduct.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({ message: requestedProduct }, { status: 200 })


    } catch (error:any) {
        console.log(error.message)
        NextResponse.json({ "message": error.message }, { status: 500 })


    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 });
        }
        let id =params.id
        if(typeof params.id === "string"){
             id = parseInt(params.id)
        }


        const product = await prisma.requestedProduct.findUnique({
            where: {
                id: id,
            },
            include: {
                images: true,
            },
        });

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        if (product.images && product.images.length > 0) {
            for (const image of product.images) {
                await prisma.requestedImages.delete({
                    where: {
                        id: image.id,
                    },
                });
            }
        }

        await prisma.product.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: "Requested Product Deleted Successfully" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}