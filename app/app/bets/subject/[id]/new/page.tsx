import SubjectList from "@/components/bets/subject-list";
import BetForm from "@/components/bets/bet-form";
import { getQuestionsFromSubject } from "@/hooks/getQuestions";

// Example questions per subject. In a real app, fetch these from your backend.
// const questionsBySubject: Record<string, { id: string; label: string }[]> = {
//   math: [
//     { id: "q1", label: "Q1: Quadratic roots" },
//     { id: "q2", label: "Q2: Calculus - limits" },
//     { id: "q3", label: "Q3: Trigonometric identities" },
//   ],
//   eng: [
//     { id: "q1", label: "Q1: Comprehension passage" },
//     { id: "q2", label: "Q2: Parts of speech" },
//     { id: "q3", label: "Q3: Essay prompt" },
//   ],
//   physics: [
//     { id: "q1", label: "Q1: Work power energy" },
//     { id: "q2", label: "Q2: Laws of motion" },
//     { id: "q3", label: "Q3: Unit and Dimensions" },
//   ],
//   chemistry: [
//     { id: "q1", label: "Q1: Sigma bonds" },
//     { id: "q2", label: "Q2: Resonance" },
//     { id: "q3", label: "Q3: Atomic structure" },
//   ],
// };

export default async function BetsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // eslint-disable-next-line prefer-const
  let questionsOnSubject: { [key: string]: { id: string; label: string }[] } = {};
  const { id } = await params;
  const questions = await getQuestionsFromSubject(Number(id));
  questionsOnSubject[questions[0].subject.name] = questions.map((q) => ({
    id: String(q.id),
    label: q.text,
  }));

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-balance">Place Your Bets</h1>
        <p className="text-muted-foreground mt-2 text-pretty">
          Choose a subject, pick a question, and set your stake. Optionally
          specify the question paper set for a double payout.
        </p>
      </header>

      {questions[0] && questions[0].subject ? (
        <>
          <section className="mb-8">
            <h2 className="sr-only">Selected Subject Subjects</h2>
            <SubjectList subjects={[{ ...questions[0].subject, id: String(questions[0].subject.id) }]} selected={Number(id)} />
          </section>
          <section>
            <h2 className="sr-only">Betting Form</h2>
            <BetForm grade={questions[0].grade.grade} subjects={[{ ...questions[0].subject, id: String(questions[0].subject.id) }]} questionsBySubject={questionsOnSubject} />
          </section>
        </>
      ) : (
        <div>No questions available.</div>
      )}
    </main>
  );
}
