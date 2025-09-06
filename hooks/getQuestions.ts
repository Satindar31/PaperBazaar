import { prisma } from "@/prisma";

export async function getQuestionsFromSubject(subjectID:number) {
    const questions = await prisma.question.findMany({
        where: {
            subjectId: subjectID
        },
        select: {
            subject: true,
            text: true,
            id: true,
            grade: true
        }
    });
    return questions;
}