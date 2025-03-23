import type { QRL } from "@builder.io/qwik";
import {
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { BuzzerButton } from "~/components/buzzer/button";
import { EMPTY_STATE, GameStateContext } from "~/game-state";

export const Play = component$(
  ({
    name,
    code,
    onFinished$,
    onBack$,
  }: {
    name: string;
    code: string;
    onFinished$?: QRL<(name: string, score: number) => unknown>;
    onBack$?: QRL<() => unknown>;
  }) => {
    const gameState = useStore(EMPTY_STATE);
    useContextProvider(GameStateContext, gameState);

    // TODO: game network client

    const finishedLoading = useSignal(false);

    return (
      <div class="flex h-full w-full items-center justify-center">
        {finishedLoading.value ? (
          <BuzzerButton
            onClick$={() => {
              // TODO: call to game network client
            }}
          />
        ) : (
          <span class="loading loading-dots loading-xl" />
        )}
      </div>
    );
  },
);
