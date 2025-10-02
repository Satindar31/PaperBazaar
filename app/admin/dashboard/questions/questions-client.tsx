"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type Question = {
  id: number;
  text: string;
  inExam: boolean;
  subject: {
    name: string;
  };
  grade: {
    grade: number;
  };
  Bet: { id: number }[];
};

export default function QuestionsClient({
  initialQuestions,
}: {
  initialQuestions: Question[];
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [updating, setUpdating] = useState<number | null>(null);

  const handleCheckboxChange = async (questionId: number, newValue: boolean) => {
    setUpdating(questionId);

    try {
      const response = await fetch("/api/admin/questions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId,
          inExam: newValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, inExam: newValue } : q
        )
      );

      toast.success(
        newValue
          ? "Question marked as in exam"
          : "Question unmarked from exam"
      );
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Questions with Bets</h1>
        <p className="text-muted-foreground mt-2">
          Manage questions that have bets placed on them. Check the box to mark
          a question as being in the exam paper.
        </p>
      </div>

      {questions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Questions Found</CardTitle>
            <CardDescription>
              There are no questions with bets placed on them yet.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={question.inExam}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(question.id, checked as boolean)
                    }
                    disabled={updating === question.id}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{question.text}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                          {question.subject.name}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-50 dark:bg-purple-950 px-2 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                          Grade {question.grade.grade}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-950 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                          {question.Bet.length} bet{question.Bet.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
