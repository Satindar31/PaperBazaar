import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { isUserAdmin } from "@/hooks/admin/stats";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    const admin = await isUserAdmin(session?.user?.email);

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { questionId, inExam } = body;

    if (typeof questionId !== "number" || typeof inExam !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: { inExam },
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
