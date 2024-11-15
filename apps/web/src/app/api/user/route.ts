import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../database/src";


export async function POST(req: NextRequest) {
    const { username, password, email, description, type, metadata } = await req.json();
    console.log("asdasdasd");

    try {
        await prisma.user.create({
            data: {
                username,
                password,
                email
            }
        })
        return NextResponse.json({
            message: "success"
        }, {
            status: 200
        })
    } catch(e) {
        return NextResponse.json({
            message: e
        }, {
            status: 411
        })
    }
    
}