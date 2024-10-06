import { getMessages } from "@/lib/database/messages";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const GETMessages = z.object({
  chatbotId: z.string().min(5),
  visitorId: z.string().min(5),
});

export const GET = async (
  req: NextRequest,
  { params }: { params: { chatbotId: string; visitorId: string } }
) => {
  try {
    const { success, data } = GETMessages.safeParse(params);

    if (!success)
      return NextResponse.json(
        {
          message: "Invalid data",
        },
        { status: 400 }
      );

    if (data) {
      const messages = await getMessages({chatbotId: data.chatbotId, visitorId: data.visitorId})
      return NextResponse.json(
        {
          messages: messages,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong server side",
      error: error,
    });
  }
};
