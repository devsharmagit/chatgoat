import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/types/auth";
import { generateVerificationCode } from "@/lib/verifyCodeGenerator";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: NextRequest) => {
  try {
    const { success, data } = loginSchema.safeParse(await request.json());
    if (!success || !data) {
      return NextResponse.json(
        { message: "please provide valid data" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const verifyCode = generateVerificationCode();
    const verifyExpiry = new Date(Date.now() + 3600000); // 60 min * 60 sec * 1000 milisec
    const res = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    await prisma.user.update({
      where: { email: res.email },
      data: {
        verifyCode: verifyCode,
        verifyExpiry: verifyExpiry,
      },
    });

    const { data: data2, error } = await resend.emails.send({
      from: "test@resend.devsharmacode.com",
      to: [res.email],
      subject: "Verify Code",
      react: EmailTemplate({ verifyCode: verifyCode }),
    });
    console.log({ data2, error });
    if (error) {
      return NextResponse.json(
        { message: "Error whilde sending the mail verify code" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Signed Up successfully", user: res });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Signup failed!",
      },
      { status: 500 }
    );
  }
};
