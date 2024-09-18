import prisma from "@/lib/db";
import { visitorPost } from "@repo/types/visitor";
import { NextRequest, NextResponse } from "next/server";


// create visitor POST endpoint
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { success, data } = visitorPost.safeParse(body);
    if (!success)
      return NextResponse.json({ message: "Invalid data!" }, { status: 400 });
    const visitor = await prisma.visitor.create({
      data: {
        chatbotId: data.chatbotId,
      },
    });
    return NextResponse.json(
      { message: "successfully created visitor", visitor },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong server side",
      },
      { status: 500 }
    );
  }
};
