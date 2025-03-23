import type { QRL } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const BuzzerButton = component$(
  ({ onClick$ }: { onClick$?: QRL<() => unknown> }) => {
    return (
      <button
        onClick$={onClick$}
        class="btn btn-primary h-full w-full text-7xl"
      />
    );
  },
);
