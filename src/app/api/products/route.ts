import { isAdmin } from "@/lib/admin";
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


        const products = await prisma.product.findMany({
            include: {
                category: true,
                images: true
            }
        });
        console.log(products)
        return NextResponse.json({ message: products }, { headers: corsHeaders })

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
        const { categoryId, name,id, price, description, images ,email,phoneNo} = requestBody;

        console.log(categoryId, name, price, description, images ,email,phoneNo)
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }
        if (!isAdmin(userId)) {
            return NextResponse.json({ message: "Only Admin can Edit" }, { status: 400 })
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
                email,
                phoneNo
            },
        },);





        if( id){
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

            await prisma.requestedProduct.delete({
                where: {
                    id:id ,
                },
            });
            
        }

        const data = await prisma.product.findMany();

        console.log(data)
        return NextResponse.json({ message: data }, { status: 200 });
    } catch (error: any) {
        console.log(error.message)
        if (error.code === 'P2002') {
            return NextResponse.json({ message: "Product  already exists" }, { status: 400 });
        }else{
        return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}

