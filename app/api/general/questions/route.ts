import { prisma } from "@/prisma";

export async function POST(req: Request) {
  const { subjectId, text, grade } = await req.json();

  if (!subjectId || !text || !grade) {
    return new Response("Subject ID, text, and grade are required", {
      status: 400,
    });
  }

  try {
    const question = await prisma.question.create({
      data: {
        text,
        subject: { connect: { id: Number(subjectId) } },
        grade: {
          connect: { grade: Number(grade) },
        },
      },
    });
    return new Response(JSON.stringify(question), { status: 201 });
  } catch (error) {
    console.error("Error creating question:", error);
    return new Response("Failed to create question", { status: 500 });
  }
}
