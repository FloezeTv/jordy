import { component$ } from "@builder.io/qwik";

export const Finish = component$(
  ({ name, score }: { name: string; score: number }) => {
    return (
      <div class="h-full w-full p-8">
        <div class="bg-primary rounded-box flex h-full w-full flex-col items-center justify-center gap-8 p-8">
          <div class="text-6xl">{name}</div>
          <div class="text-7xl">${score}</div>
        </div>
      </div>
    );
  },
);
