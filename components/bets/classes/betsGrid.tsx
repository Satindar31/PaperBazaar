import { Button } from "@/components/ui/button";
import { getQuestionsBySubjectID } from "@/hooks/getBets";
import Link from "next/link";

export default async function SubjectBetsGrid({ id }: { id: string }) {
  const data = await getQuestionsBySubjectID(Number(id));
  return (
    <div className="w-full">
    <div className="grid grid-cols-4 grid-rows-3 gap-4">
      {data.length > 0 &&
      data.slice(0, 11).map((bet) => (
        <div
        key={bet.id}
        className="border rounded-lg p-4 flex flex-col justify-between mt-4"
        >
        <h3 className="font-bold">{bet.text}</h3>
        <p>Subject: {bet.subject.name}</p>
        <p>Bets: {bet.Bet.length}</p>
        </div>
      ))}
      {data.length > 0 && (
      <Link
        href={`/app/bets/subject/${id}/new`}
        className="flex items-center justify-center border rounded-lg"
      >
        <Button
        className="h-24 w-full text-2xl font-semibold"
        variant="outline"
        >
        Place a new bet
        </Button>
      </Link>
      )}
      {data.length === 0 &&
      Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 opacity-0" />
      ))}
    </div>
      {data.length === 0 && (
      <Link
        href={`/app/bets/subject/${id}/new`}
        className="flex items-center justify-center mt-8"
      >
        <Button
          className="h-24 w-full max-w-md mx-auto text-2xl font-semibold"
          variant="outline"
        >
          🎲 Be the first to place a bet!
        </Button>
      </Link>
      )}
    </div>
  );
}
