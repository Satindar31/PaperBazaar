import { prisma } from "@/prisma";

/**
 * Fetch all questions that have at least one bet placed on them.
 * @returns An array of questions with bets, including subject and bet information.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getQuestionsWithBets(): Promise<any[]> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        Bet: {
          some: {},
        },
      },
      include: {
        subject: true,
        grade: true,
        Bet: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return questions;
  } catch (error) {
    console.error("Error fetching questions with bets:", error);
    return [];
  }
}
