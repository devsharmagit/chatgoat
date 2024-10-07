import prisma from "@repo/db/client";
import { visitorPost } from "@repo/types/visitor";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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
    revalidatePath(`/chatbot/${data.chatbotId}`)
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
