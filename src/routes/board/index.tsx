import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GameBoard } from "~/components/game-board";
import type { GameState } from "~/game-state";
import { GameStateContext, stateFromSave } from "~/game-state";

export default component$(() => {
  const gameState = useStore<GameState>(
    stateFromSave({
      categories: [],
    }),
  );
  useContextProvider(GameStateContext, gameState);
  return <GameBoard />;
});

export const head: DocumentHead = {
  title: "Game Board - Jordy",
  meta: [
    {
      name: "description",
      content: "Game Board for Jordy",
    },
  ],
};
