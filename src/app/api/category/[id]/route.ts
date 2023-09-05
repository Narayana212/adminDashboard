import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }){
    try {
        const {userId}=getAuth(request)
        if(!userId){
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })
        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid color" }, { status: 400 })
        }
        
        const category = await prisma.productCategory.findUnique({
            where: {
                id: parseInt(params.id)
            }
        });
        return NextResponse.json({ message: category }, { status: 200 })
        
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
        
    }
}



export async function DELETE(request: NextRequest, { params }: { params: { id: string } }){
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 401 })

        }
        if (!params.id) {
            return NextResponse.json({ message: "Invalid color" }, { status: 400 })
        }
        console.log(params.id)
        await prisma.productCategory.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        return NextResponse.json({ message: "Deleted Succesfully" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }


}