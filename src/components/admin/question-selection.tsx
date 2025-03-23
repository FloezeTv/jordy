import type { ContextId, QRL } from "@builder.io/qwik";
import {
  component$,
  useComputed$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import type { GameState, Category } from "~/game-state";
import { GameStateContext } from "~/game-state";

export const QuestionSelection = component$(
  ({
    gameStateContext = GameStateContext,
    onSelected$,
  }: {
    /**
     * The context to use for the game state
     */
    gameStateContext?: ContextId<GameState>;
    /**
     * A callback that is called once a selection has been performed.
     * Question is updated in the game state.
     */
    onSelected$?: QRL<() => unknown>;
  }) => {
    const gameState = useContext(gameStateContext);

    const selectedCategoryIdx = useSignal<number | undefined>();
    const selectedCategory = useComputed$<Category | undefined>(() =>
      selectedCategoryIdx.value !== undefined
        ? gameState.categories[selectedCategoryIdx.value]
        : undefined,
    );

    // Select category
    if (selectedCategory.value === undefined)
      return (
        <div class="align-stretch flex h-full w-full flex-row flex-wrap justify-stretch gap-4 p-4">
          {gameState.categories.map((category, idx) => (
            <button
              class="btn btn-primary h-auto grow text-3xl"
              onClick$={() => (selectedCategoryIdx.value = idx)}
              key={`${category.name}-${idx}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      );

    // Select value inside category
    return (
      <div class="align-stretch flex h-full w-full flex-row flex-wrap justify-stretch gap-4 p-4">
        {selectedCategory.value.questions.map((question, idx) => (
          <button
            class="btn btn-primary h-auto grow text-3xl"
            onClick$={() => {
              gameState.currentQuestion = question;
              onSelected$?.();
            }}
            key={`${question.question}-${idx}`}
          >
            ${question.value}
          </button>
        ))}
      </div>
    );
  },
);
