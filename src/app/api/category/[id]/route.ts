import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: number } }){
    try {
        const {userId}=getAuth(request)
        if(!userId){
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
        return NextResponse.json({ message: category }, { status: 200 })
        
    } catch (error:any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
        
    }
}



export async function DELETE(request: NextRequest, { params }: { params: { id: number } }){
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })

        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid category" }, { status: 400 })
        }

        

        let id =params.id
        if(typeof params.id === "string"){
             id = parseInt(params.id)
        }
        const category = await prisma.productCategory.findUnique({
            where: {
                id:id,
            },
            include: {
                products: true,
            },
        });
        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }
        if(category.products){
            return NextResponse.json({ message:"This Category have Products"},{status: 400});
        }

        await prisma.productCategory.delete({
            where: {
                id:id
            }
        });
        return NextResponse.json({ message: "Deleted Succesfully" }, { status: 200 })

    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}