import { component$, useSignal } from "@builder.io/qwik";
import type { Question as QuestionType } from "~/game-state";

export const Question = component$(
  ({
    /**
     * The question to display
     */
    question,
    /**
     * Whether the answer should be shown
     */
    showAnswer,
  }: {
    question: QuestionType;
    showAnswer: boolean;
  }) => {
    const titleRef = useSignal<HTMLHeadingElement>();
    return (
      <div class="bg-primary text-primary-content flex h-full w-full flex-col items-center justify-stretch gap-4 p-8">
        <h2 ref={titleRef} class="my-auto text-7xl font-bold">
          {question.question}
        </h2>
        {question.image && (
          <img
            class="h-full max-h-full w-full max-w-full shrink grow object-contain"
            width="0"
            height="0"
            alt="Additional context for the question"
            src={question.image}
          />
        )}
        {showAnswer && (
          <>
            <hr class="bg-primary-content w-full rounded-4xl border-2" />
            <div class="my-auto text-7xl font-bold">{question.answer}</div>
          </>
        )}
      </div>
    );
  },
);
