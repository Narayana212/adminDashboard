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



export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        } if (!params.id) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({ message: product }, {headers:corsHeaders})



    } catch (error: any) {
        console.log(error.message)
        NextResponse.json({ "message": error.message }, { status: 500 })

    }
}



export async function PUT(request: NextRequest, { params }: { params: { id: number } }){
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }
        if(!isAdmin(userId)){
            return NextResponse.json({message:"Only Admin can Edit"},{status:400})
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 });
        }

        let id =params.id
        if(typeof params.id === "string"){
             id = parseInt(params.id)
        }

        await prisma.product.update({
            where:{
                id
            },
            data:{
                isOrdered:true
            }
        })

        return NextResponse.json({ message: "Product updated Successfully" }, {headers:corsHeaders});

        
    } catch (error) {
        
    }
}




export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 });
        }
        if(!isAdmin(userId)){
            return NextResponse.json({message:"Only Admin can Edit"},{status:400})
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 });
        }
        let id =params.id
        if(typeof params.id === "string"){
             id = parseInt(params.id)
        }


        const product = await prisma.product.findUnique({
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
                await prisma.productImage.delete({
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

        return NextResponse.json({ message: "Product Deleted Successfully" }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}