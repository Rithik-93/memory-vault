import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database/src";


export default async function POST(req: NextRequest) {
    const { userId, contentUrl, title, description, type } = await req.json();
    
    try {
        await prisma.savedContent.create({
            data: {
                userId,
                title,
                description,
                contentUrl,
                type
            }
        })

        return NextResponse.json({
            message: "content saved successfully"
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

export async function GET() {
    const content = await prisma.savedContent.findMany({})
    if (!content) {
        return NextResponse.json({
            message: "error while getting content"
        }, {
            status: 500
        })
    }
    return NextResponse.json({
        content
    }, {
        status: 200
    })
}