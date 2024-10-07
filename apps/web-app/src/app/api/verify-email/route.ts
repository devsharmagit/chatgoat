import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { verifyCode, userId } = await req.json();
    const user = await prisma.user.findFirst({ where: { id:  userId } });

    const nowTime = new Date();

    if (user?.isVerified) {
      return NextResponse.json(
        { message: "User already verified!" },
        { status: 400 }
      );
    }

    if (user?.verifyExpiry) {
      if (user?.verifyExpiry < nowTime)
        return NextResponse.json(
          { message: "Verification code expired!" },
          { status: 400 }
        );
    }

    if (verifyCode === user?.verifyCode) {
      await prisma.user.update({
        where: { id: userId },
        data: { isVerified: true, verifyCode: null, verifyExpiry: null },
      });
    }
    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "something went wrong server side" },
      { status: 500 }
    );
  }
};
