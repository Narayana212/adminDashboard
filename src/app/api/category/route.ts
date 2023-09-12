import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request)
        if (!userId) {
            return NextResponse.json({ message: "UnAuthorizesd User" }, { status: 401 })
        }
        const categories = await prisma.productCategory.findMany()
        return NextResponse.json({ message: categories }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })

    }
}



export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request)
        const requestBody = await request.json()
        const { category } = requestBody
        if (!userId) {
            return NextResponse.json({ message: "UnAuthorizesd User" }, { status: 401 })
        }
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
        return NextResponse.json({ message: error.message }, { status: 500 })


    }
} 