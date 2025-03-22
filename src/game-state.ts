import { createContextId } from "@builder.io/qwik";

export type GameState = {
  /**
   * Categories to display along with their questions
   */
  categories: Category[];
};

export type Category = {
  /**
   * Name of the category
   */
  name: string;
  /**
   * Questions in the category
   */
  questions: Question[];
};

export type Question = {
  /**
   * How much the question is worth
   */
  value: number;
  /**
   * The question-part (i.e., what is displayed at the start)
   */
  question: string;
  /**
   * An optional image to display with this question
   */
  image?: string;
  /**
   * The answer to the question (i.e., what is shown as the solution)
   */
  answer: string;
  /**
   * Whether this question was already answered
   */
  answered?: boolean;
};

/**
 * Context-ID for the current game state
 */
export const GameStateContext = createContextId<GameState>(
  "tv.floeze.jordy.gamestate",
);
