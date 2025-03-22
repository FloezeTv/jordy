import type { ContextId } from "@builder.io/qwik";
import { component$, useContext } from "@builder.io/qwik";
import type { GameState } from "~/game-state";
import { GameStateContext } from "~/game-state";

export const GameBoard = component$(
  ({
    gameStateContext = GameStateContext,
  }: {
    gameStateContext?: ContextId<GameState>;
  }) => {
    const gameState = useContext(gameStateContext);
    return (
      <div class="bg-neutral grid h-full w-full auto-cols-fr grid-flow-col grid-rows-[repeat(2,auto)] text-center text-2xl font-bold text-wrap break-all lg:text-3xl xl:text-4xl 2xl:text-5xl">
        {gameState.categories.map(({ name, questions }, idx) => (
          <>
            <div
              key={`${name}-${idx}-header`}
              class="bg-primary border-neutral text-primary-content flex items-center justify-center border-2 p-2"
            >
              {name}
            </div>
            <div
              key={`${name}-${idx}-questions`}
              class="grid grid-flow-row auto-rows-fr"
            >
              {questions.map((question, idx) => (
                <div
                  class="bg-primary border-neutral text-primary-content flex items-center justify-center border-2 p-2"
                  key={`${question.question}-${idx}`}
                >
                  {!question.answered && `$${question.value}`}
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    );
  },
);
