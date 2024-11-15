import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database/src";


export async function GET({ params }: { params: { contentId: number } }) {
    const contentId = params.contentId;

    try {
        const content = await prisma.savedContent.findFirst({
            where: {
                id: contentId
            }
        })
        return NextResponse.json({
            content
        }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: e
        }, {
            status: 500
        })
    }

}

export async function PUT(req: NextRequest, { params }: { params: { contenId: number } }) {
    const { title, description } = await req.json();
    const contenId = params.contenId

    try {
        await prisma.savedContent.update({
            where: {
                id: contenId
            }, 
            data: {
                title,
                description
            }
        })
        return NextResponse.json({
            message: "updated",
        }, {
            status: 200
        })
    } catch(e) {
        return NextResponse.json({
            message: e
        }, {
            status: 500
        })
    }
}

export async function DELETE({params}:{params:{contentId: number}}) {
    const contenId = params.contentId;
    
    try {
        await prisma.savedContent.delete({
            where: {
                id: contenId
            }
        })
        return NextResponse.json({
            message: "deleted successfully"
        }, {
            status: 200
        })
    } catch(e) {
        return NextResponse.json({
            message: e
        }, {
            status: 500
        })
    }
}