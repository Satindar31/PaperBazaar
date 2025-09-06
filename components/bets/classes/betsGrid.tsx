import { Button } from "@/components/ui/button";
import { getQuestionsBySubjectID } from "@/hooks/getBets";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default async function SubjectBetsGrid({ id }: { id: string }) {
  const data = await getQuestionsBySubjectID(Number(id));
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 grid-rows-3 gap-4">
        {data.length > 0 &&
          data.slice(0, 11).map((bet) => (
            <Card className="@container/card m-4" key={bet.id}>
              <CardHeader>
                <CardTitle className="text-md font-semibold tabular-numsl">
                  {bet.text}
                </CardTitle>
                <Separator />
                <CardDescription>Subject: {bet.subject.name}</CardDescription>
                <CardAction>
                  <Link
                    href={`/app/bets/subject/${id}/new?questionId=${bet.id}`}
                  >
                    <Badge variant="outline">Place a bet</Badge>
                  </Link>
                </CardAction>
              </CardHeader>
              <CardFooter  className="flex-col items-start gap-1.5 text-sm">
                <p>Bets: {bet.Bet.length}</p>
              </CardFooter>
            </Card>
          ))}
        {data.length > 0 && (
          <Link href={`/app/bets/subject/${id}/new`} className="mt-4">
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
