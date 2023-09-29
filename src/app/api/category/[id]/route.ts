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
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid category" }, { status: 400 })
        }

        const category = await prisma.productCategory.findUnique({
            where: {
                id: params.id
            }
        });
        return NextResponse.json({ message: category }, {
            headers: corsHeaders
        })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}



export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const { userId } = getAuth(request);
        
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })

        }
        if(!isAdmin(userId)){
            return NextResponse.json({message:"Only Admin can Edit"},{status:400})
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid category" }, { status: 400 })
        }



        let id = params.id
        if (typeof params.id === "string") {
            id = parseInt(params.id)
        }
        const category = await prisma.productCategory.findUnique({
            where: {
                id: id,
            },
            include: {
                products: true,
            },
        });
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        if (category.products.length > 0) {
            return NextResponse.json({ message: "This Category have Products" }, { status: 400 });
        }

        await prisma.productCategory.delete({
            where: {
                id: id
            }
        });
        return NextResponse.json({ message: "Deleted Succesfully" }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}