import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database/src";



export async function GET(req: NextRequest, { params }: { params: { contentId: string } }) {
    const { contentId } = params;

    if (!contentId) {
        return NextResponse.json(
            { error: "contentId is required" },
            { status: 400 }
        );
    }

    return NextResponse.json({ message: `Content ID is ${contentId}` });
}

export async function PUT(req: NextRequest, { params }: { params: { contenId: number } }) {
    const { title, description } = await req.json();
    const { contenId } = params;

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

export async function DELETE(req: NextRequest, { params }: { params: { contentId: string } }) {
    const contentId = parseInt(params.contentId, 10);

    try {
        await prisma.savedContent.delete({
            where: {
                id: contentId,
            },
        });
        return NextResponse.json(
            { message: "deleted successfully" },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json(
            { message: "Failed to delete content" },
            { status: 500 }
        );
    }
}